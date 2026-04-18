import { readFile, writeFile } from 'node:fs/promises';
import { homedir } from 'node:os';
import { join } from 'node:path';

import fse from 'fs-extra';
const { ensureDir, pathExists } = fse;
import { MANIFEST_DIR } from './constants.js';
import type { InstalledGroup } from './installer.js';
import type { ThemeName } from './platform.js';

// --- Theme value maps per tool ---

const ghosttyThemes: Record<ThemeName, string> = {
  'solarized-dark': 'Solarized Dark Patched',
  vercel: 'Vercel',
  vesper: 'Vesper'
};

const batThemes: Record<ThemeName, string> = {
  'solarized-dark': 'Solarized (dark)',
  vercel: 'Vercel',
  vesper: 'Vesper'
};

const btopThemes: Record<ThemeName, string> = {
  'solarized-dark': 'Solarized_Dark',
  vercel: 'Vercel',
  vesper: 'Vesper'
};

const weztermThemes: Record<ThemeName, string> = {
  'solarized-dark': 'Solarized Dark (Gogh)',
  vercel: 'Vercel',
  vesper: 'Vesper'
};

const nvimPlugins: Record<ThemeName, string> = {
  'solarized-dark': 'craftzdog/solarized-osaka.nvim',
  vercel: 'tiesen243/vercel.nvim',
  vesper: 'datsfilipe/vesper.nvim'
};

const tidePalettes: Record<ThemeName, string> = {
  'solarized-dark': 'heyitsiveen',
  vercel: 'vercel',
  vesper: 'vesper'
};

// Header patterns used to identify theme blocks in FZF/tmux configs
const themeHeaderPatterns: Record<ThemeName, string> = {
  'solarized-dark': 'SOLARIZED',
  vercel: 'VERCEL',
  vesper: 'VESPER'
};

// Format a "skipped" result line when a theme target file is missing
function skipped(tool: string, path: string): string {
  return `${tool} → skipped (config missing at ${path.replace(homedir(), '~')})`;
}

// --- Main entry point ---

export async function switchTheme(
  theme: ThemeName,
  installedGroups: InstalledGroup[],
  platform: string,
  dryRun: boolean
): Promise<string[]> {
  const results: string[] = [];

  for (const group of installedGroups) {
    try {
      switch (group.name) {
        case 'Ghostty': {
          const missing = dryRun ? null : await switchGhosttyTheme(group.target, theme);
          results.push(missing ? skipped('Ghostty', missing) : `Ghostty → ${ghosttyThemes[theme]}`);
          break;
        }

        case 'bat': {
          const missing = dryRun ? null : await switchBatTheme(group.target, theme);
          results.push(missing ? skipped('bat', missing) : `bat → ${batThemes[theme]}`);
          break;
        }

        case 'btop': {
          const missing = dryRun
            ? null
            : await switchSingleLine(
                join(group.target, 'btop.conf'),
                /^color_theme = .*$/m,
                `color_theme = "${btopThemes[theme]}"`
              );
          results.push(missing ? skipped('btop', missing) : `btop → ${btopThemes[theme]}`);
          break;
        }

        case 'WezTerm': {
          const missing = dryRun
            ? null
            : await switchSingleLine(
                join(group.target, 'wezterm.lua'),
                /^config\.color_scheme = .*$/m,
                `config.color_scheme = '${weztermThemes[theme]}'`
              );
          results.push(missing ? skipped('WezTerm', missing) : `WezTerm → ${weztermThemes[theme]}`);
          break;
        }

        case 'Neovim': {
          const missing = dryRun ? null : await switchNeovimTheme(group.target, theme);
          results.push(missing ? skipped('Neovim', missing) : `Neovim → ${nvimPlugins[theme]}`);
          break;
        }

        case 'Fish Shell': {
          if (dryRun) {
            results.push(`Fish/Tide palette → ${tidePalettes[theme]}`);
            results.push(`FZF → ${theme}`);
            break;
          }
          const tideMissing = await switchTideTheme(group.target, theme);
          const fzfMissing = await switchFzfTheme(
            join(group.target, 'conf.d', '40-fzf.fish'),
            theme,
            /^set -gx FZF_DEFAULT_OPTS/
          );
          results.push(
            tideMissing
              ? skipped('Fish/Tide palette', tideMissing)
              : `Fish/Tide palette → ${tidePalettes[theme]}`
          );
          results.push(fzfMissing ? skipped('FZF', fzfMissing) : `FZF → ${theme}`);
          break;
        }

        case 'tmux': {
          const missing = dryRun ? null : await switchTmuxTheme(group.target, theme);
          results.push(missing ? skipped('tmux statusbar', missing) : `tmux statusbar → ${theme}`);
          break;
        }

        case 'PowerShell': {
          const missing = dryRun
            ? null
            : await switchFzfTheme(
                join(group.target, 'modules', 'fzf.ps1'),
                theme,
                /^\$env:FZF_DEFAULT_OPTS/
              );
          results.push(
            missing ? skipped('FZF (PowerShell)', missing) : `FZF (PowerShell) → ${theme}`
          );
          break;
        }

        case 'oh-my-posh':
          if (!dryRun) await switchOmpTheme(theme);
          results.push(`oh-my-posh → ${theme}`);
          break;
      }
    } catch (err) {
      results.push(`${group.name} — failed: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  return results;
}

// --- Ghostty: switch theme + toggle background override ---

async function switchGhosttyTheme(targetDir: string, theme: ThemeName): Promise<string | null> {
  const filePath = join(targetDir, 'config');
  if (!(await pathExists(filePath))) return filePath;
  let content = await readFile(filePath, 'utf-8');

  // Switch theme line
  content = content.replace(/^theme = .*$/m, `theme = "${ghosttyThemes[theme]}"`);

  // Solarized uses a custom background; other themes use their own default
  if (theme === 'solarized-dark') {
    // Add background if not present
    if (!/^background = /m.test(content)) {
      content = content.replace(/^(theme = .*)$/m, '$1\n\n# Window\nbackground = #031219');
    }
  } else {
    // Remove the background line for non-Solarized themes
    content = content.replace(/^background = #031219\n/m, '');
  }

  await writeFile(filePath, content, 'utf-8');
  return null;
}

// --- Simple single-line replacements ---

async function switchSingleLine(
  filePath: string,
  pattern: RegExp,
  replacement: string
): Promise<string | null> {
  if (!(await pathExists(filePath))) return filePath;
  const content = await readFile(filePath, 'utf-8');
  const updated = content.replace(pattern, replacement);
  await writeFile(filePath, updated, 'utf-8');
  return null;
}

// --- bat: toggle commented/uncommented --theme lines ---

async function switchBatTheme(targetDir: string, theme: ThemeName): Promise<string | null> {
  const filePath = join(targetDir, 'config');
  if (!(await pathExists(filePath))) return filePath;
  let content = await readFile(filePath, 'utf-8');

  // Comment out any active --theme line
  content = content.replace(/^(--theme=.*)$/m, '# $1');
  // Uncomment the target theme line
  const targetValue = batThemes[theme];
  content = content.replace(
    new RegExp(`^# (--theme="${targetValue.replace(/[()]/g, '\\$&')}")$`, 'm'),
    '$1'
  );

  await writeFile(filePath, content, 'utf-8');
  return null;
}

// --- Neovim: swap plugin name in colorscheme.lua ---

async function switchNeovimTheme(targetDir: string, theme: ThemeName): Promise<string | null> {
  const filePath = join(targetDir, 'lua', 'plugins', 'colorscheme.lua');
  if (!(await pathExists(filePath))) return filePath;
  const content = await readFile(filePath, 'utf-8');

  // Match any of the known plugin names and replace with target
  const allPlugins = Object.values(nvimPlugins);
  const pluginPattern = new RegExp(
    `"(${allPlugins.map((p) => p.replace(/[/.]/g, '\\$&')).join('|')})"`
  );
  const updated = content.replace(pluginPattern, `"${nvimPlugins[theme]}"`);
  await writeFile(filePath, updated, 'utf-8');
  return null;
}

// --- Fish/Tide: change default palette in 70-tide.fish ---

async function switchTideTheme(targetDir: string, theme: ThemeName): Promise<string | null> {
  const filePath = join(targetDir, 'conf.d', '70-tide.fish');
  if (!(await pathExists(filePath))) return filePath;
  const content = await readFile(filePath, 'utf-8');
  const updated = content.replace(
    /^(set -l tide_default_palette )\S+$/m,
    `$1${tidePalettes[theme]}`
  );
  await writeFile(filePath, updated, 'utf-8');
  return null;
}

// --- oh-my-posh: write theme name to prompt-theme.txt ---

async function switchOmpTheme(theme: ThemeName): Promise<void> {
  const themeDir = join(homedir(), MANIFEST_DIR, 'oh-my-posh');
  await ensureDir(themeDir);
  await writeFile(join(themeDir, 'prompt-theme.txt'), theme, 'utf-8');
}

// --- FZF: toggle comment blocks in fish or PowerShell config ---

async function switchFzfTheme(
  filePath: string,
  theme: ThemeName,
  commandStart: RegExp
): Promise<string | null> {
  if (!(await pathExists(filePath))) return filePath;
  const content = await readFile(filePath, 'utf-8');
  const updated = toggleThemeBlocks(content, theme, commandStart);
  await writeFile(filePath, updated, 'utf-8');
  return null;
}

// --- tmux: toggle comment blocks in statusbar.conf ---

async function switchTmuxTheme(targetDir: string, theme: ThemeName): Promise<string | null> {
  const filePath = join(targetDir, 'statusbar.conf');
  if (!(await pathExists(filePath))) return filePath;
  const content = await readFile(filePath, 'utf-8');
  const updated = toggleThemeBlocks(content, theme, /^(set|setw) -g /);
  await writeFile(filePath, updated, 'utf-8');
  return null;
}

// --- Generic comment-block toggling ---
// Handles FZF (fish/PS) and tmux configs that use commented/uncommented blocks
// per theme. Identifies theme sections by their box-drawing headers
// (e.g. ║  VERCEL  ║), then toggles command lines within each section.

function toggleThemeBlocks(content: string, theme: ThemeName, commandStart: RegExp): string {
  const lines = content.split('\n');
  const result: string[] = [];
  const targetHeader = themeHeaderPatterns[theme];

  let currentSection: string | null = null; // which theme section we're in
  let inMultiline = false;
  let inHereString = false; // PowerShell @"..."@ blocks

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Detect theme section headers (║  THEME_NAME  ║)
    const headerMatch = line.match(/║\s+(\S+)/);
    if (headerMatch) {
      const headerName = headerMatch[1];
      // Check if this header starts a new theme section
      for (const [, pattern] of Object.entries(themeHeaderPatterns)) {
        if (headerName.startsWith(pattern)) {
          currentSection = pattern;
          break;
        }
      }
      // Non-theme headers (STATUS BAR, STATUS LEFT, etc.) don't change currentSection
      if (headerName === 'STATUS' || headerName === 'WINDOW' || headerName === 'FZF') {
        // Don't change currentSection — these are sub-headers within a theme
      }
    }

    // If we're not inside a theme section, pass through
    if (currentSection === null) {
      result.push(line);
      // Track multiline state for non-section content
      const stripped = line.replace(/^# /, '');
      inMultiline = stripped.endsWith('\\');
      continue;
    }

    const shouldBeActive = currentSection === targetHeader;
    const stripped = line.replace(/^# /, '');
    const isCommented = line !== stripped && line.startsWith('# ');

    // Determine if this line is a toggleable command
    const isCommandStart = commandStart.test(stripped);
    const isToggleable = isCommandStart || inMultiline;

    if (isToggleable) {
      if (shouldBeActive && isCommented) {
        result.push(stripped); // uncomment
      } else if (!shouldBeActive && !isCommented && !line.match(/^\s*$/)) {
        result.push(`# ${line}`); // comment out
      } else {
        result.push(line); // already in correct state
      }
    } else {
      result.push(line); // non-command line (headers, descriptions), leave as-is
    }

    // Track multi-line command state (using stripped content)
    const contentForState = isCommented ? stripped : line;
    if (isCommandStart || inMultiline) {
      if (!inHereString && contentForState.trimEnd().endsWith('\\')) {
        // Fish/tmux backslash continuation
        inMultiline = true;
      } else if (contentForState.trim() === '"@') {
        // PowerShell here-string terminator
        inMultiline = false;
        inHereString = false;
      } else if (contentForState.includes('@"')) {
        // PowerShell here-string start — continues until "@
        inMultiline = true;
        inHereString = true;
      } else if (inHereString) {
        // Inside a here-string: stay in multiline until "@ found
        inMultiline = true;
      } else {
        inMultiline = false;
      }
    }
  }

  return result.join('\n');
}
