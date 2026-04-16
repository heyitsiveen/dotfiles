import {
  cancel,
  confirm,
  intro,
  isCancel,
  log,
  multiselect,
  outro,
  select,
  spinner as createSpinner
} from '@clack/prompts';
import fse from 'fs-extra';
import pc from 'picocolors';
const { copy, pathExists } = fse;
import { execSync } from 'node:child_process';
import { join } from 'node:path';

import { ASCII_BANNER, THEMES, VERSION } from './constants.js';
import {
  createManifest,
  deleteManifest,
  findAllBackups,
  install,
  readManifest,
  uninstallGroups,
  updateManifest,
  type BackupEntry,
  type Manifest
} from './installer.js';
import {
  detectPlatform,
  detectTool,
  getDependencyTools,
  getDotfileGroups,
  type DotfileGroup,
  type Platform,
  type ThemeName
} from './platform.js';
import { switchTheme } from './theme.js';

// --- Shared helpers ---

function handleCancel(value: unknown): void {
  if (isCancel(value)) {
    cancel('Operation cancelled.');
    process.exit(0);
  }
}

function showBanner(): void {
  console.log(pc.cyan(ASCII_BANNER));
  console.log(pc.dim(`  v${VERSION}`));
  console.log();
}

function showPrerequisites(platform: Platform): void {
  const items: Array<{ name: string; description: string; link: string; ok: boolean }> = [
    {
      name: 'Nerd Font',
      description: 'required for icons (Tide, oh-my-posh, Neovim)',
      link: 'https://www.nerdfonts.com/',
      ok: true // can't detect
    }
  ];

  if (platform === 'macos') {
    items.push({
      name: 'Homebrew',
      description: 'package manager for macOS',
      link: 'https://brew.sh/',
      ok: detectTool('brew')
    });
  } else {
    items.push({
      name: 'winget',
      description: 'package manager for Windows',
      link: 'https://aka.ms/getwinget',
      ok: detectTool('winget')
    });
  }

  log.info('Prerequisites:');
  for (const item of items) {
    const marker = item.ok ? pc.green('◆') : pc.yellow('⚠');
    const label = item.ok ? item.name : pc.yellow(item.name);
    log.message(`  ${marker} ${pc.bold(label)} — ${item.description}`);
    log.message(`    ${pc.cyan(item.link)}`);
  }
}

async function showToolStatus(groups: DotfileGroup[], platform: Platform): Promise<void> {
  // Combine dependency tools + dotfile-group tools
  type ToolEntry = {
    name: string;
    binary: string;
    description: string;
    installCmd: string;
    required: boolean;
  };
  const allTools: ToolEntry[] = [];

  // Separate forGroup tools (shown indented under their parent) from regular tools
  const groupNames = new Set(groups.map((g) => g.name));
  const subTools = new Map<string, Array<ToolEntry & { ok: boolean }>>();
  for (const dep of getDependencyTools(platform)) {
    if (dep.forGroup) {
      if (!groupNames.has(dep.forGroup)) continue;
      const ok = detectTool(dep.binary);
      if (!subTools.has(dep.forGroup)) subTools.set(dep.forGroup, []);
      subTools.get(dep.forGroup)!.push({ ...dep, ok });
      // Still add to allTools for the install prompt
      allTools.push(dep);
    } else {
      allTools.push(dep);
    }
  }
  for (const g of groups) {
    if (g.toolBinary && g.installCmd) {
      allTools.push({
        name: g.name,
        binary: g.toolBinary,
        description: g.toolDescription!,
        installCmd: g.installCmd,
        required: g.required
      });
    }
  }

  if (allTools.length === 0) return;

  // Detect and categorize (exclude forGroup tools — they render as sub-items)
  const forGroupNames = new Set([...subTools.values()].flat().map((t) => t.name));
  const requiredTools: Array<ToolEntry & { ok: boolean }> = [];
  const optionalTools: Array<ToolEntry & { ok: boolean }> = [];
  const missing: ToolEntry[] = [];

  for (const t of allTools) {
    const ok = detectTool(t.binary);
    const entry = { ...t, ok };
    if (!forGroupNames.has(t.name)) {
      if (t.required) {
        requiredTools.push(entry);
      } else {
        optionalTools.push(entry);
      }
    }
    if (!ok) missing.push(t);
  }

  const showTool = (t: { name: string; description: string; ok: boolean }) => {
    const marker = t.ok ? pc.green('◆') : pc.yellow('⚠');
    const label = t.ok ? t.name : pc.yellow(t.name);
    log.message(`    ${marker} ${pc.bold(label)} — ${t.description}`);
  };

  const showSubTool = (t: { name: string; description: string; ok: boolean }) => {
    const marker = t.ok ? pc.green('◆') : pc.yellow('⚠');
    const label = t.ok ? t.name : pc.yellow(t.name);
    log.message(`      ${marker} ${label} — ${pc.dim(t.description)}`);
  };

  log.info('Tools:');
  log.message(`  ${pc.bold('Required')}`);
  for (const t of requiredTools) {
    showTool(t);
    // Show indented sub-tools (e.g., tree-sitter-cli under Neovim)
    const subs = subTools.get(t.name);
    if (subs) for (const st of subs) showSubTool(st);
  }
  log.message('');
  log.message(`  ${pc.bold('Optional')}`);
  for (const t of optionalTools) {
    showTool(t);
    const subs = subTools.get(t.name);
    if (subs) for (const st of subs) showSubTool(st);
  }

  // Offer to install missing tools
  if (missing.length > 0) {
    const options = missing.map((t) => ({
      value: t.name,
      label: `${t.name} — ${t.description}`,
      hint: t.installCmd
    }));

    const selectedNames = await multiselect({
      message: 'Install missing tools?',
      options,
      initialValues: missing.map((t) => t.name),
      required: false
    });
    handleCancel(selectedNames);

    const toInstall = missing.filter((t) => (selectedNames as string[]).includes(t.name));

    if (toInstall.length > 0) {
      // Install Homebrew first if selected (other brew commands depend on it)
      const brewFirst = toInstall.filter((t) => t.name === 'Homebrew');
      const rest = toInstall.filter((t) => t.name !== 'Homebrew');
      const ordered = [...brewFirst, ...rest];
      const total = ordered.length;
      let installed = 0;

      for (const t of ordered) {
        log.message(`  ${pc.dim('○')} Installing ${t.name}...`);
        try {
          execSync(t.installCmd, { stdio: 'pipe', encoding: 'utf-8', timeout: 300000 });
          installed++;
          log.message(`  ${pc.green('◆')} ${t.name} installed`);
        } catch (err) {
          log.message(`  ${pc.yellow('⚠')} ${t.name} failed`);
          log.message(
            `    ${pc.dim(t.installCmd)} — ${pc.dim(err instanceof Error ? err.message : String(err))}`
          );
        }
      }

      log.message('');
      if (installed === total) {
        log.message(
          `  ${pc.green('◆')} ${installed} tool${installed > 1 ? 's' : ''} installed successfully`
        );
      } else {
        log.message(
          `  ${pc.yellow('⚠')} ${installed}/${total} tools installed (${total - installed} failed)`
        );
      }
    }
  } else {
    log.success('All tools installed!');
  }
}

const groupCategories: Record<string, string[]> = {
  'Shell & Terminal': ['Fish Shell', 'PowerShell', 'Ghostty', 'WezTerm', 'tmux'],
  Editor: ['Neovim'],
  'CLI Tools': ['bat', 'btop', 'ripgrep', 'oh-my-posh'],
  Other: ['Claude Code']
};

function showOverview(groups: DotfileGroup[]): void {
  log.info('Available configurations:');
  for (const [category, names] of Object.entries(groupCategories)) {
    const categoryGroups = groups.filter((g) => names.includes(g.name));
    if (categoryGroups.length === 0) continue;
    log.message(`  ${pc.bold(category)}`);
    for (const g of categoryGroups) {
      log.message(`    ${pc.green('◆')} ${pc.bold(g.name)} — ${pc.dim(g.description)}`);
      log.message(`      ${pc.dim('→')} ${pc.dim(g.target)}`);
    }
    log.message('');
  }
}

function showReloadCommands(groups: DotfileGroup[]): void {
  const reloads: Array<{ name: string; cmd: string }> = [];
  for (const g of groups) {
    switch (g.name) {
      case 'Fish Shell':
        reloads.push({ name: 'Fish Shell', cmd: 'exec fish' });
        break;
      case 'tmux':
        reloads.push({
          name: 'tmux',
          cmd: 'tmux source ~/.config/tmux/tmux.conf'
        });
        break;
      case 'Neovim':
        reloads.push({
          name: 'Neovim',
          cmd: 'restart nvim, then run :Lazy sync'
        });
        break;
    }
  }
  if (reloads.length > 0) {
    log.message(pc.bold('\n  Reload your configs:'));
    for (const r of reloads) {
      log.message(`    ${r.name.padEnd(12)} →  ${pc.cyan(r.cmd)}`);
    }
  }
}

// --- Platform selection ---

async function resolvePlatform(flagPlatform?: string): Promise<Platform> {
  if (flagPlatform === 'macos' || flagPlatform === 'windows') {
    return flagPlatform;
  }

  const detected = detectPlatform();
  if (detected) {
    log.info(`Detected platform: ${pc.bold(detected === 'macos' ? 'macOS' : 'Windows 11')}`);
    return detected;
  }

  // Linux fallback or unknown
  if (process.platform === 'linux') {
    log.info('Linux detected — macOS configs will be used (most tools are shared).');
    return 'macos';
  }

  const chosen = await select({
    message: 'Which platform?',
    options: [
      { value: 'macos' as const, label: 'macOS' },
      { value: 'windows' as const, label: 'Windows 11' }
    ]
  });
  handleCancel(chosen);
  return chosen as Platform;
}

// --- First run flow ---

export async function firstRunFlow(flagPlatform?: string, dryRun = false): Promise<void> {
  showBanner();
  intro(pc.bold('heyitsiveen'));

  const platform = await resolvePlatform(flagPlatform);
  showPrerequisites(platform);

  const allGroups = getDotfileGroups(platform);

  // Tool detection + install offer
  await showToolStatus(allGroups, platform);

  showOverview(allGroups);

  // Group selection — re-detect tools (user may have skipped installs)
  const depTools = getDependencyTools(platform);
  const groupOptions = allGroups.map((g) => {
    const toolMissing = g.toolBinary && !detectTool(g.toolBinary);
    const missingDeps = depTools
      .filter((d) => d.forGroup === g.name && !detectTool(d.binary))
      .map((d) => d.name);
    const warnings: string[] = [];
    if (toolMissing) warnings.push('not installed');
    if (missingDeps.length > 0) warnings.push(`${missingDeps.join(', ')} missing`);
    const suffix = warnings.length > 0 ? pc.yellow(` ⚠ (${warnings.join(', ')})`) : '';
    return {
      value: g.name,
      label: `${g.name} — ${g.description}${suffix}`
    };
  });

  const selectedNames = await multiselect({
    message: 'Which dotfiles would you like to install?',
    options: groupOptions,
    initialValues: allGroups.map((g) => g.name),
    required: true
  });
  handleCancel(selectedNames);

  const selectedGroups = allGroups.filter((g) => (selectedNames as string[]).includes(g.name));

  // Theme selection
  const theme = await select({
    message: 'Which color theme would you like?',
    options: [
      {
        value: 'solarized-dark' as const,
        label: 'Solarized Dark',
        hint: 'default'
      },
      { value: 'vercel' as const, label: 'Vercel' },
      { value: 'vesper' as const, label: 'Vesper' }
    ]
  });
  handleCancel(theme);

  // Backup check — only prompt if actual dotfiles would be overwritten.
  // For multi-source groups (Claude Code), check each specific file/dir.
  // For single-source groups, check if the target directory exists.
  let shouldBackup = false;
  for (const g of selectedGroups) {
    const sources = Array.isArray(g.source) ? g.source : [g.source];
    const isMultiSource = Array.isArray(g.source);
    for (const source of sources) {
      const checkPath = isMultiSource ? join(g.target, source.split('/').pop()!) : g.target;
      if (await pathExists(checkPath)) {
        shouldBackup = true;
        break;
      }
    }
    if (shouldBackup) break;
  }

  if (shouldBackup) {
    const doBackup = await confirm({
      message: 'Existing dotfiles found. Create backup?'
    });
    handleCancel(doBackup);
    shouldBackup = doBackup as boolean;
  }

  // Install
  if (dryRun) {
    log.info(pc.yellow('Dry run — showing planned operations:'));
  }

  const s = createSpinner();
  s.start('Installing dotfiles...');

  const result = await install({
    platform,
    selectedGroups,
    theme: theme as ThemeName,
    backup: shouldBackup,
    dryRun
  });

  // Apply theme
  const themeGroups = selectedGroups.filter((g) => g.themeSupport);
  if (themeGroups.length > 0) {
    const themeInstalledGroups = result.installedGroups.filter((ig) =>
      themeGroups.some((sg) => sg.name === ig.name)
    );
    await switchTheme(theme as ThemeName, themeInstalledGroups, platform, dryRun);
  }

  // Write manifest
  if (!dryRun) {
    await createManifest(result, {
      platform,
      selectedGroups,
      theme: theme as ThemeName,
      backup: shouldBackup,
      dryRun
    });
  }

  s.stop('Installation complete!');

  // Grouped summary
  if (result.backedUp.length > 0) {
    const unique = [...new Set(result.backedUp)];
    log.message(
      `  ${pc.green('◆')} Backed up ${unique.length} existing configs → ${pc.dim('~/.config/heyitsiveen/dotfiles/backup/')}`
    );
  }

  for (const [category, names] of Object.entries(groupCategories)) {
    const installed = result.installedGroups.filter((ig) => names.includes(ig.name));
    if (installed.length === 0) continue;
    log.message(`  ${pc.bold(category)}`);
    for (const ig of installed) {
      log.message(`    ${pc.green('◆')} ${ig.name} → ${pc.dim(ig.target)}`);
    }
  }

  log.message(`  ${pc.green('◆')} Theme: ${theme as string} activated`);

  if (result.errors.length > 0) {
    for (const err of result.errors) {
      log.message(`    ${pc.yellow('⚠')} ${err.file}: ${pc.dim(err.error)}`);
    }
  }

  showReloadCommands(selectedGroups);
  log.message('');
  log.info(pc.bold('Restart your terminal for all changes to take effect.'));
  outro('Done! Your dotfiles are installed.');
}

// --- Re-run flow ---

export async function reRunFlow(
  manifest: Manifest,
  flagPlatform?: string,
  dryRun = false
): Promise<void> {
  showBanner();
  intro(pc.bold('heyitsiveen'));
  showPrerequisites(manifest.platform);
  log.info(
    `Existing installation detected (v${manifest.version}, installed ${manifest.installedAt.split('T')[0]})`
  );

  const mode = await select({
    message: 'What would you like to do?',
    options: [
      { value: 'fresh', label: 'Fresh install (backup + overwrite all)' },
      {
        value: 'update',
        label: 'Update (apply changes from new package version)'
      },
      { value: 'theme', label: 'Change theme' },
      { value: 'uninstall', label: 'Uninstall' },
      { value: 'restore', label: 'Restore from backup' }
    ]
  });
  handleCancel(mode);

  switch (mode) {
    case 'fresh':
      await firstRunFlow(flagPlatform, dryRun);
      break;
    case 'update':
      await updateFlow(manifest, dryRun);
      break;
    case 'theme':
      await themeFlow(manifest, dryRun);
      break;
    case 'uninstall':
      await uninstallFlow(manifest, dryRun);
      break;
    case 'restore':
      await restoreFlow(dryRun);
      break;
  }
}

// --- Theme flow ---

export async function themeFlow(
  manifest: Manifest,
  dryRun = false,
  flagTheme?: string
): Promise<void> {
  let theme: ThemeName;

  if (flagTheme && THEMES.includes(flagTheme as ThemeName)) {
    theme = flagTheme as ThemeName;
  } else {
    if (!flagTheme) {
      showBanner();
      intro(pc.bold('heyitsiveen'));
    }
    const chosen = await select({
      message: 'Which color theme would you like?',
      options: [
        { value: 'solarized-dark' as const, label: 'Solarized Dark' },
        { value: 'vercel' as const, label: 'Vercel' },
        { value: 'vesper' as const, label: 'Vesper' }
      ]
    });
    handleCancel(chosen);
    theme = chosen as ThemeName;
  }

  const s = createSpinner();
  s.start(`Switching theme → ${theme}...`);

  const results = await switchTheme(theme, manifest.groups, manifest.platform, dryRun);

  if (!dryRun) {
    await updateManifest({ theme });
  }

  s.stop('Theme updated!');

  for (const r of results) {
    log.success(r);
  }

  outro(`Theme switched to ${theme}. Restart your terminal to apply.`);
}

// --- Uninstall flow ---

export async function uninstallFlow(manifest: Manifest, dryRun = false): Promise<void> {
  // Step 1: mode selection
  const mode = await select({
    message: 'What would you like to uninstall?',
    options: [
      { value: 'configs', label: 'Configs only', hint: 'remove installed dotfiles' },
      { value: 'tools', label: 'Tools only', hint: 'uninstall via brew/winget' },
      { value: 'both', label: 'Both', hint: 'remove configs and uninstall tools' }
    ]
  });
  handleCancel(mode);

  const uninstallConfigs = mode === 'configs' || mode === 'both';
  const uninstallTools = mode === 'tools' || mode === 'both';

  // Step 2: config selection (if configs or both)
  let selectedConfigGroups = manifest.groups;
  let configNames: string[] = manifest.groups.map((g) => g.name);
  if (uninstallConfigs) {
    const groupOptions = manifest.groups.map((g) => ({
      value: g.name,
      label: `${g.name} — ${g.target}`
    }));
    const selected = await multiselect({
      message: 'Which configs to remove?',
      options: groupOptions,
      initialValues: manifest.groups.map((g) => g.name),
      required: true
    });
    handleCancel(selected);
    configNames = selected as string[];
    selectedConfigGroups = manifest.groups.filter((g) => configNames.includes(g.name));
  }

  // Step 3: tool selection (if tools or both)
  // Build tool list from dotfile groups + dependency tools that are currently installed
  type UninstallTool = { name: string; uninstallCmd: string };
  let selectedTools: UninstallTool[] = [];
  if (uninstallTools) {
    const allGroups = getDotfileGroups(manifest.platform);
    const allDeps = getDependencyTools(manifest.platform);
    const toolOptions: Array<{ value: UninstallTool; label: string; hint: string }> = [];

    // Add dotfile group tools
    for (const g of allGroups) {
      if (g.installCmd && g.toolBinary && detectTool(g.toolBinary)) {
        const cmd = g.installCmd.replace(/\binstall\b/, 'uninstall');
        toolOptions.push({ value: { name: g.name, uninstallCmd: cmd }, label: g.name, hint: cmd });
      }
    }
    // Add dependency tools (fd, eza, fastfetch, tree-sitter-cli, etc.)
    for (const d of allDeps) {
      if (d.installCmd && detectTool(d.binary)) {
        const cmd = d.installCmd.replace(/\binstall\b/, 'uninstall');
        toolOptions.push({ value: { name: d.name, uninstallCmd: cmd }, label: d.name, hint: cmd });
      }
    }

    if (toolOptions.length === 0) {
      log.info('No installed tools found to uninstall.');
    } else {
      const selected = await multiselect({
        message: 'Which tools to uninstall?',
        options: toolOptions,
        required: false
      });
      handleCancel(selected);
      selectedTools = selected as UninstallTool[];
    }
  }

  // Dry run
  if (dryRun) {
    log.info(pc.yellow('Dry run — would remove:'));
    if (uninstallConfigs) {
      for (const g of selectedConfigGroups) log.info(`  ${g.name}: ${g.files.length} config files`);
    }
    for (const t of selectedTools) log.info(`  ${t.name}: ${t.uninstallCmd}`);
    return;
  }

  // Execute config removal
  if (uninstallConfigs) {
    const s = createSpinner();
    s.start('Removing configs...');
    const errors = await uninstallGroups(selectedConfigGroups);
    s.stop('Configs removed!');
    for (const g of selectedConfigGroups) log.success(`Removed ${g.name} config`);
    for (const err of errors) log.warn(err);
  }

  // Execute tool uninstallation
  if (selectedTools.length > 0) {
    for (const t of selectedTools) {
      log.message(`  ${pc.dim('○')} Uninstalling ${t.name}...`);
      try {
        execSync(t.uninstallCmd, { stdio: 'pipe', encoding: 'utf-8', timeout: 300000 });
        log.message(`  ${pc.green('◆')} ${t.name} uninstalled`);
      } catch (err) {
        log.message(`  ${pc.yellow('⚠')} ${t.name} failed`);
        log.message(
          `    ${pc.dim(t.uninstallCmd)} — ${pc.dim(err instanceof Error ? err.message : String(err))}`
        );
      }
    }
  }

  // Offer restore from backup
  if (uninstallConfigs) {
    const backupMap = await findAllBackups();
    if (backupMap.size > 0) {
      const doRestore = await confirm({ message: 'Restore from backup?' });
      handleCancel(doRestore);
      if (doRestore) await restoreFlow(dryRun);
    }

    // Update or delete manifest
    const isFullUninstall = configNames.length === manifest.groups.length;
    if (isFullUninstall) {
      await deleteManifest();
    } else {
      const remainingGroups = manifest.groups.filter((g) => !configNames.includes(g.name));
      await updateManifest({ groups: remainingGroups });
    }
  }

  outro('Uninstall complete.');
}

// --- Update flow ---

export async function updateFlow(manifest: Manifest, dryRun = false): Promise<void> {
  log.info(`Installed: v${manifest.version} → Current: v${VERSION}`);

  const allGroups = getDotfileGroups(manifest.platform);
  const installedNames = manifest.groups.map((g) => g.name);
  const updatableGroups = allGroups.filter((g) => installedNames.includes(g.name));

  if (updatableGroups.length === 0) {
    log.info('No groups to update.');
    return;
  }

  const groupOptions = updatableGroups.map((g) => ({
    value: g.name,
    label: g.name
  }));

  const selectedNames = await multiselect({
    message: 'Which groups would you like to update?',
    options: groupOptions,
    initialValues: updatableGroups.map((g) => g.name),
    required: true
  });
  handleCancel(selectedNames);

  const selected = updatableGroups.filter((g) => (selectedNames as string[]).includes(g.name));

  if (dryRun) {
    log.info(pc.yellow('Dry run — would update:'));
    for (const g of selected) {
      log.info(`  ${g.name} → ${g.target}`);
    }
    return;
  }

  const s = createSpinner();
  s.start('Updating...');

  const result = await install({
    platform: manifest.platform,
    selectedGroups: selected,
    theme: manifest.theme,
    backup: true,
    dryRun: false
  });

  // Re-apply theme
  const themeGroups = selected.filter((g) => g.themeSupport);
  if (themeGroups.length > 0) {
    const themeInstalledGroups = result.installedGroups.filter((ig) =>
      themeGroups.some((sg) => sg.name === ig.name)
    );
    await switchTheme(manifest.theme, themeInstalledGroups, manifest.platform, false);
  }

  await updateManifest({
    version: VERSION,
    installedAt: new Date().toISOString(),
    groups: result.installedGroups
  });

  s.stop('Update complete!');

  for (const g of result.installedGroups) {
    log.success(`Updated ${g.name} → ${g.target}`);
  }
  if (result.errors.length > 0) {
    for (const err of result.errors) {
      log.warn(`${err.file}: ${err.error}`);
    }
  }

  outro('Update complete.');
}

// --- Restore flow ---

export async function restoreFlow(dryRun = false): Promise<void> {
  const allBackups = await findAllBackups();

  if (allBackups.size === 0) {
    log.info('No backups found. Nothing to restore.');
    process.exit(0);
  }

  const manifest = await readManifest();
  if (!manifest) {
    log.warn('No installation record found. Restore may overwrite untracked files.');
  }

  // Step 1: multiselect — which configs to restore
  const groupOptions = [...allBackups.entries()].map(([group, entries]) => ({
    value: group,
    label: `${group.padEnd(16)} (${entries.length} backup${entries.length > 1 ? 's' : ''})`,
    hint: `★ latest: ${entries[0].name}`
  }));

  const selectedGroups = await multiselect({
    message: 'Which configs to restore?',
    options: groupOptions,
    initialValues: [...allBackups.keys()],
    required: true
  });
  handleCancel(selectedGroups);

  // Step 2: per-group select — which version to restore
  const toRestore: BackupEntry[] = [];
  for (const group of selectedGroups as string[]) {
    const entries = allBackups.get(group)!;
    const chosen = await select({
      message: `Which ${group} backup to restore?`,
      options: entries.map((e, i) => ({
        value: e,
        label: e.name,
        hint: i === 0 ? '★ latest' : undefined
      }))
    });
    handleCancel(chosen);
    toRestore.push(chosen as BackupEntry);
  }

  // Step 3: confirmation
  const doConfirm = await confirm({
    message: `Restore ${toRestore.length} config${toRestore.length > 1 ? 's' : ''}?`
  });
  handleCancel(doConfirm);
  if (!doConfirm) return;

  if (dryRun) {
    log.info(pc.yellow('Dry run — would restore:'));
    for (const b of toRestore) log.info(`  ${b.group} → ${b.name}`);
    return;
  }

  const s = createSpinner();
  s.start('Restoring...');

  for (const backup of toRestore) {
    const matchingGroup = manifest?.groups.find((g) => g.name === backup.group);
    if (matchingGroup) {
      try {
        const configSubdir = join(backup.path, 'config');
        if (matchingGroup.extraBackupPaths && (await pathExists(configSubdir))) {
          // Structured backup: config/ → target, data/ → extra path
          await copy(configSubdir, matchingGroup.target, { overwrite: true });
          log.success(`Restored ${backup.group} config → ${matchingGroup.target}`);
          for (const extra of matchingGroup.extraBackupPaths) {
            const extraSubdir = join(backup.path, extra.label);
            if (await pathExists(extraSubdir)) {
              await copy(extraSubdir, extra.path, { overwrite: true });
              log.success(`Restored ${backup.group} ${extra.label} → ${extra.path}`);
            }
          }
        } else {
          // Flat backup (no extra paths or old format)
          await copy(backup.path, matchingGroup.target, { overwrite: true });
          log.success(`Restored ${backup.group} → ${matchingGroup.target}`);
        }
      } catch (err) {
        log.warn(
          `Failed to restore ${backup.group}: ${err instanceof Error ? err.message : String(err)}`
        );
      }
    } else {
      log.warn(`Skipped ${backup.group} — no matching installation record`);
    }
  }

  s.stop('Restore complete!');
  outro('Dotfiles restored from backup.');
}
