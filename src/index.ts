#!/usr/bin/env node

// Node version guard — runs BEFORE any ESM imports.
// Written in syntax parseable by Node 14+ so the guard itself does not trip a SyntaxError.
const nodeMajor = Number(process.versions.node.split('.')[0]);
if (nodeMajor < 22) {
  process.stderr.write(
    '\n' +
      '  \x1b[33m@heyitsiveen/dotfiles\x1b[0m requires \x1b[1mNode.js 22\x1b[0m or newer.\n' +
      '  You are running Node ' +
      process.versions.node +
      '.\n' +
      '\n' +
      '  Upgrade:  \x1b[36mpnpm runtime set node lts -g\x1b[0m  (or https://nodejs.org/)\n' +
      '\n'
  );
  process.exit(1);
}

import { log } from '@clack/prompts';
import { defineCommand, runMain } from 'citty';
import pc from 'picocolors';

import { PACKAGE_NAME, THEMES, VERSION } from './constants.js';
import { readManifest } from './installer.js';
import type { ThemeName } from './platform.js';
import { checkForUpdate } from './update-check.js';

const main = defineCommand({
  meta: {
    name: PACKAGE_NAME,
    version: VERSION,
    description: 'Interactive CLI to set up dotfiles for macOS and Windows 11'
  },
  args: {
    platform: {
      type: 'string',
      description: 'Skip OS detection: macos or windows'
    },
    'dry-run': {
      type: 'boolean',
      description: 'Show planned operations without writing files',
      default: false
    },
    restore: {
      type: 'boolean',
      description: 'Restore from backup (bypasses mode menu)',
      default: false
    },
    uninstall: {
      type: 'boolean',
      description: 'Remove installed dotfiles (bypasses mode menu)',
      default: false
    },
    theme: {
      type: 'string',
      description: 'Switch theme in-place: solarized-dark, vercel, vesper'
    }
  },
  async run({ args }) {
    // Fire update check in background (resolves while user interacts with prompts)
    const updatePromise = checkForUpdate();

    try {
      const dryRun = args['dry-run'];
      const manifest = await readManifest();

      // Flag bypass: --restore
      if (args.restore) {
        const { restoreFlow } = await import('./prompts.js');
        await restoreFlow(dryRun);
        return;
      }

      // Flag bypass: --uninstall
      if (args.uninstall) {
        if (!manifest) {
          log.error('No installation found. Run `pnpm dlx @heyitsiveen/dotfiles` to install.');
          process.exit(1);
        }
        const { uninstallFlow } = await import('./prompts.js');
        await uninstallFlow(manifest, dryRun);
        return;
      }

      // Flag bypass: --theme
      if (args.theme) {
        if (!THEMES.includes(args.theme as ThemeName)) {
          log.error(`Invalid theme "${args.theme}".`);
          const label = '─ Available themes: ';
          const longest = Math.max(...THEMES.map((t) => `  ◆ ${t}`.length));
          const w = Math.max(label.length, longest) + 2;
          const box = [
            '',
            `  ${pc.dim('╭' + label + '─'.repeat(w - label.length) + '╮')}`,
            ...THEMES.map(
              (t) => `  ${pc.dim('│')}  ${pc.green('◆')} ${t.padEnd(w - 4)}${pc.dim('│')}`
            ),
            `  ${pc.dim('╰' + '─'.repeat(w) + '╯')}`
          ];
          console.log(box.join('\n'));
          process.exit(1);
        }
        if (!manifest) {
          log.error('No installation found. Install dotfiles first, then switch theme.');
          process.exit(1);
        }
        const { themeFlow } = await import('./prompts.js');
        await themeFlow(manifest, dryRun, args.theme);
        return;
      }

      // Interactive flow (update promise passed so flows can show notification inline)
      if (manifest) {
        const { reRunFlow } = await import('./prompts.js');
        await reRunFlow(manifest, args.platform, dryRun, updatePromise);
      } else {
        const { firstRunFlow } = await import('./prompts.js');
        await firstRunFlow(args.platform, dryRun, updatePromise);
      }
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code === 'ERR_USE_AFTER_CLOSE') {
        // User closed stdin — silently exit
        process.exit(0);
      }
      log.error(pc.red(err instanceof Error ? err.message : 'An unexpected error occurred.'));
      process.exit(1);
    }
  }
});

runMain(main);
