import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const pkg = JSON.parse(readFileSync(join(__dirname, '..', 'package.json'), 'utf-8'));

export const PACKAGE_NAME = '@heyitsiveen/dotfiles';
export const VERSION: string = pkg.version;
export const BACKUP_PREFIX = '.dotfiles-backup-'; // legacy — kept for old backup discovery
export const BACKUP_DIR = '.config/heyitsiveen/dotfiles/backup';
export const MANIFEST_DIR = '.config/heyitsiveen/dotfiles';
export const MANIFEST_FILENAME = 'manifest.json';
export const THEMES = ['solarized-dark', 'vercel', 'vesper'] as const;
export const DOTFILES_DIR = join(__dirname, '..', 'dotfiles');

export const COPY_EXCLUDE = new Set(['.DS_Store', 'Thumbs.db', 'desktop.ini']);

export const ASCII_BANNER = `  ██╗  ██╗███████╗██╗   ██╗██╗████████╗███████╗██╗   ██╗███████╗███████╗███╗   ██╗
  ██║  ██║██╔════╝╚██╗ ██╔╝██║╚══██╔══╝██╔════╝╚██╗ ██╔╝██╔════╝██╔════╝████╗  ██║
  ███████║█████╗   ╚████╔╝ ██║   ██║   ███████╗ ╚████╔╝ █████╗  █████╗  ██╔██╗ ██║
  ██╔══██║██╔══╝    ╚██╔╝  ██║   ██║   ╚════██║  ╚██╔╝  ██╔══╝  ██╔══╝  ██║╚██╗██║
  ██║  ██║███████╗   ██║   ██║   ██║   ███████║   ██║   ███████╗███████╗██║ ╚████║
  ╚═╝  ╚═╝╚══════╝   ╚═╝   ╚═╝   ╚═╝   ╚══════╝   ╚═╝   ╚══════╝╚══════╝╚═╝  ╚═══╝`;
