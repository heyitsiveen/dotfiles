import fse from 'fs-extra';
const { copy, ensureDir, pathExists, readJson, remove, writeJson } = fse;
import { readdir, stat } from 'node:fs/promises';
import { homedir } from 'node:os';
import { basename, join, relative } from 'node:path';

import {
  BACKUP_DIR,
  BACKUP_PREFIX,
  COPY_EXCLUDE,
  DOTFILES_DIR,
  MANIFEST_DIR,
  MANIFEST_FILENAME,
  VERSION
} from './constants.js';
import type { DotfileGroup, ExtraBackupPath, Platform, ThemeName } from './platform.js';

export interface Manifest {
  version: string;
  installedAt: string;
  platform: Platform;
  theme: ThemeName;
  groups: InstalledGroup[];
}

export interface InstalledGroup {
  name: string;
  files: string[];
  target: string;
  extraBackupPaths?: ExtraBackupPath[];
}

export interface InstallOptions {
  platform: Platform;
  selectedGroups: DotfileGroup[];
  theme: ThemeName;
  backup: boolean;
  dryRun: boolean;
}

export interface InstallResult {
  installed: string[];
  backedUp: string[];
  errors: Array<{ file: string; error: string }>;
  installedGroups: InstalledGroup[];
}

function copyFilter(src: string): boolean {
  return !COPY_EXCLUDE.has(basename(src));
}

async function collectFiles(dir: string): Promise<string[]> {
  const files: string[] = [];
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (COPY_EXCLUDE.has(entry.name)) continue;
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectFiles(fullPath)));
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

export async function install(options: InstallOptions): Promise<InstallResult> {
  const { platform, selectedGroups, backup, dryRun } = options;
  const home = homedir();
  const platformDir = join(DOTFILES_DIR, platform);

  const result: InstallResult = {
    installed: [],
    backedUp: [],
    errors: [],
    installedGroups: []
  };

  const dateStamp = new Date().toISOString().slice(0, 10); // "2026-04-14"

  for (const group of selectedGroups) {
    const sources = Array.isArray(group.source) ? group.source : [group.source];
    const isMultiSource = Array.isArray(group.source);
    const installedFiles: string[] = [];

    // Resolve per-group backup dir (only if backup enabled)
    let groupBackupDir: string | null = null;
    if (backup) {
      const slug = isMultiSource
        ? group.name.toLowerCase().replace(/\s+/g, '-')
        : basename(sources[0]);
      const baseName = `${slug}-backup-${dateStamp}`;
      const groupDir = join(home, BACKUP_DIR, group.name);

      // Same-day collision: append -2, -3, etc.
      let backupName = baseName;
      let counter = 2;
      while (await pathExists(join(groupDir, backupName))) {
        backupName = `${baseName}-${counter}`;
        counter++;
      }
      groupBackupDir = join(groupDir, backupName);
    }

    for (const source of sources) {
      const sourcePath = join(platformDir, source);

      if (!(await pathExists(sourcePath))) {
        result.errors.push({ file: source, error: 'Source not found' });
        continue;
      }

      // For single-source groups, target IS the destination.
      // For multi-source groups (Claude Code), target is the parent and each source
      // goes to join(target, basename(source)).
      const targetPath = isMultiSource ? join(group.target, basename(source)) : group.target;

      // Backup existing target into per-group dated folder
      // Groups with extraBackupPaths use config/ subfolder; others stay flat
      if (backup && groupBackupDir && (await pathExists(targetPath))) {
        const hasExtra = group.extraBackupPaths && group.extraBackupPaths.length > 0;
        const backupTarget = hasExtra
          ? join(groupBackupDir, 'config')
          : join(groupBackupDir, basename(source));
        if (!dryRun) {
          try {
            await ensureDir(groupBackupDir);
            await copy(targetPath, backupTarget, { filter: copyFilter });
            result.backedUp.push(group.name);
          } catch (err) {
            result.errors.push({
              file: `backup:${group.name}`,
              error: err instanceof Error ? err.message : String(err)
            });
          }
        } else {
          result.backedUp.push(group.name);
        }
      }

      // Copy source to target
      if (!dryRun) {
        try {
          const sourceIsDir = (await stat(sourcePath)).isDirectory();
          if (sourceIsDir) {
            await ensureDir(targetPath);
          } else {
            await ensureDir(join(targetPath, '..'));
          }

          // Handle type mismatch: fs-extra.copy can't overwrite a file with
          // a directory (or vice versa). Remove the target first when types differ.
          if (await pathExists(targetPath)) {
            const targetIsDir = (await stat(targetPath)).isDirectory();
            if (sourceIsDir !== targetIsDir) {
              await remove(targetPath);
            }
          }

          await copy(sourcePath, targetPath, {
            filter: copyFilter,
            overwrite: true
          });

          // Collect installed file paths
          if ((await stat(sourcePath)).isDirectory()) {
            const sourceFiles = await collectFiles(sourcePath);
            for (const f of sourceFiles) {
              installedFiles.push(join(targetPath, relative(sourcePath, f)));
            }
          } else {
            installedFiles.push(targetPath);
          }
        } catch (err) {
          result.errors.push({
            file: source,
            error: err instanceof Error ? err.message : String(err)
          });
        }
      } else {
        installedFiles.push(`${sourcePath} → ${targetPath}`);
      }
    }

    // Backup extra paths (e.g., LazyVim data directory)
    if (backup && groupBackupDir && group.extraBackupPaths) {
      for (const extra of group.extraBackupPaths) {
        if (await pathExists(extra.path)) {
          const extraTarget = join(groupBackupDir, extra.label);
          if (!dryRun) {
            try {
              await ensureDir(extraTarget);
              await copy(extra.path, extraTarget, { filter: copyFilter });
            } catch (err) {
              result.errors.push({
                file: `backup:${group.name}/${extra.label}`,
                error: err instanceof Error ? err.message : String(err)
              });
            }
          }
        }
      }
    }

    result.installed.push(...installedFiles);
    result.installedGroups.push({
      name: group.name,
      files: installedFiles,
      target: group.target,
      extraBackupPaths: group.extraBackupPaths
    });
  }

  return result;
}

// --- Manifest ---

export function getManifestPath(): string {
  return join(homedir(), MANIFEST_DIR, MANIFEST_FILENAME);
}

export async function readManifest(): Promise<Manifest | null> {
  const manifestPath = getManifestPath();
  if (await pathExists(manifestPath)) {
    try {
      return (await readJson(manifestPath)) as Manifest;
    } catch {
      return null;
    }
  }
  return null;
}

export async function createManifest(
  result: InstallResult,
  options: InstallOptions
): Promise<void> {
  const manifest: Manifest = {
    version: VERSION,
    installedAt: new Date().toISOString(),
    platform: options.platform,
    theme: options.theme,
    groups: result.installedGroups
  };
  const manifestPath = getManifestPath();
  await ensureDir(join(manifestPath, '..'));
  await writeJson(manifestPath, manifest, { spaces: 2 });
}

export async function updateManifest(updates: Partial<Manifest>): Promise<void> {
  const manifest = await readManifest();
  if (!manifest) return;
  const updated = { ...manifest, ...updates };
  const manifestPath = getManifestPath();
  await writeJson(manifestPath, updated, { spaces: 2 });
}

export async function deleteManifest(): Promise<void> {
  const manifestPath = getManifestPath();
  if (await pathExists(manifestPath)) {
    await remove(manifestPath);
  }
}

// --- Uninstall ---

export async function uninstallGroups(groups: InstalledGroup[]): Promise<string[]> {
  const errors: string[] = [];
  for (const group of groups) {
    for (const file of group.files) {
      try {
        if (await pathExists(file)) {
          await remove(file);
        }
      } catch (err) {
        errors.push(`${file}: ${err instanceof Error ? err.message : String(err)}`);
      }
    }
  }
  return errors;
}

// --- Backup discovery ---

export interface BackupEntry {
  group: string;
  name: string;
  path: string;
}

/** Scan ~/.config/heyitsiveen/dotfiles/backup/ and return all backups grouped by tool */
export async function findAllBackups(): Promise<Map<string, BackupEntry[]>> {
  const backupRoot = join(homedir(), BACKUP_DIR);
  const result = new Map<string, BackupEntry[]>();

  if (!(await pathExists(backupRoot))) return result;

  const groups = await readdir(backupRoot, { withFileTypes: true });
  for (const group of groups) {
    if (!group.isDirectory()) continue;
    const groupPath = join(backupRoot, group.name);
    const backups = await readdir(groupPath, { withFileTypes: true });
    const entries: BackupEntry[] = backups
      .filter((b) => b.isDirectory() && b.name.includes('-backup-'))
      .map((b) => ({ group: group.name, name: b.name, path: join(groupPath, b.name) }))
      .sort((a, b) => b.name.localeCompare(a.name)); // newest first
    if (entries.length > 0) result.set(group.name, entries);
  }

  return result;
}

/** Legacy: scan ~/ for old .dotfiles-backup-* directories */
export async function findLegacyBackupDirs(): Promise<string[]> {
  const home = homedir();
  const entries = await readdir(home, { withFileTypes: true });
  return entries
    .filter((e) => e.isDirectory() && e.name.startsWith(BACKUP_PREFIX))
    .map((e) => join(home, e.name))
    .sort()
    .reverse();
}
