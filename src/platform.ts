import { execSync } from 'node:child_process';
import { homedir } from 'node:os';
import { join } from 'node:path';

export type Platform = 'macos' | 'windows';
export type ThemeName = 'solarized-dark' | 'vercel' | 'vesper';

export interface ExtraBackupPath {
  label: string;
  path: string;
}

export interface DotfileGroup {
  name: string;
  source: string | string[];
  target: string;
  description: string;
  toolBinary?: string;
  toolDescription?: string;
  installCmd?: string;
  required: boolean;
  themeSupport: boolean;
  extraBackupPaths?: ExtraBackupPath[];
}

export interface ToolDep {
  name: string;
  binary: string;
  description: string;
  installCmd: string;
  required: boolean;
  forGroup?: string; // only show when this dotfile group is available
}

export function getDependencyTools(platform: Platform): ToolDep[] {
  if (platform === 'macos') {
    return [
      {
        name: 'Git',
        binary: 'git',
        description: 'Version control + Neovim plugins',
        installCmd: 'brew install git',
        required: true
      },
      {
        name: 'fd',
        binary: 'fd',
        description: 'File finder used by FZF',
        installCmd: 'brew install fd',
        required: false
      },
      {
        name: 'eza',
        binary: 'eza',
        description: 'Modern ls for FZF tree preview',
        installCmd: 'brew install eza',
        required: false
      },
      {
        name: 'fastfetch',
        binary: 'fastfetch',
        description: 'System info tool',
        installCmd: 'brew install fastfetch',
        required: false
      },
      {
        name: 'tree-sitter-cli',
        binary: 'tree-sitter',
        description: 'LazyVim parser compiler (requires C compiler — included in Xcode CLT)',
        installCmd: 'brew install tree-sitter-cli',
        required: true,
        forGroup: 'Neovim'
      }
    ];
  }

  return [
    {
      name: 'Git',
      binary: 'git',
      description: 'Version control + Neovim plugins',
      installCmd: 'winget install Git.Git',
      required: true
    },
    {
      name: 'fd',
      binary: 'fd',
      description: 'File finder used by FZF',
      installCmd: 'winget install sharkdp.fd',
      required: false
    },
    {
      name: 'eza',
      binary: 'eza',
      description: 'Modern ls for FZF tree preview',
      installCmd: 'winget install eza-community.eza',
      required: false
    },
    {
      name: 'fastfetch',
      binary: 'fastfetch',
      description: 'System info tool',
      installCmd: 'winget install Fastfetch-cli.Fastfetch',
      required: false
    },
    {
      name: 'tree-sitter-cli',
      binary: 'tree-sitter',
      description:
        'LazyVim parser compiler (requires C compiler — VS Build Tools or scoop install gcc)',
      installCmd: 'npm i -g tree-sitter-cli',
      required: true,
      forGroup: 'Neovim'
    }
  ];
}

export function detectPlatform(): Platform | null {
  switch (process.platform) {
    case 'darwin':
      return 'macos';
    case 'win32':
      return 'windows';
    default:
      return null;
  }
}

export function getHomedir(): string {
  return homedir();
}

export function detectTool(binary: string): boolean {
  try {
    const cmd = process.platform === 'win32' ? `where.exe ${binary}` : `which ${binary}`;
    execSync(cmd, { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

export function getDotfileGroups(platform: Platform): DotfileGroup[] {
  const home = getHomedir();
  const config = join(home, '.config');

  if (platform === 'macos') {
    return [
      {
        name: 'Fish Shell',
        source: '.config/fish',
        target: join(config, 'fish'),
        description: 'Config, 8 modules, Tide palettes',
        toolBinary: 'fish',
        toolDescription: 'Modern shell with autosuggestions',
        installCmd: 'brew install fish',
        required: true,
        themeSupport: true
      },
      {
        name: 'Ghostty',
        source: '.config/ghostty',
        target: join(config, 'ghostty'),
        description: 'Terminal emulator',
        toolBinary: 'ghostty',
        toolDescription: 'GPU-accelerated terminal emulator',
        installCmd: 'brew install --cask ghostty',
        required: true,
        themeSupport: true
      },
      {
        name: 'WezTerm',
        source: '.config/wezterm',
        target: join(config, 'wezterm'),
        description: 'Cross-platform terminal',
        toolBinary: 'wezterm',
        toolDescription: 'Cross-platform terminal emulator',
        installCmd: 'brew install --cask wezterm',
        required: true,
        themeSupport: true
      },
      {
        name: 'tmux',
        source: '.config/tmux',
        target: join(config, 'tmux'),
        description: '7 config files + keybinds',
        toolBinary: 'tmux',
        toolDescription: 'Terminal multiplexer',
        installCmd: 'brew install tmux',
        required: false,
        themeSupport: true
      },
      {
        name: 'Neovim',
        source: '.config/nvim',
        target: join(config, 'nvim'),
        description: 'LazyVim + solarized-osaka',
        toolBinary: 'nvim',
        toolDescription: 'Hyperextensible text editor',
        installCmd: 'brew install neovim',
        required: true,
        themeSupport: true,
        extraBackupPaths: [{ label: 'data', path: join(home, '.local', 'share', 'nvim') }]
      },
      {
        name: 'bat',
        source: '.config/bat',
        target: join(config, 'bat'),
        description: 'Config + custom themes',
        toolBinary: 'bat',
        toolDescription: 'Cat clone with syntax highlighting',
        installCmd: 'brew install bat',
        required: false,
        themeSupport: true
      },
      {
        name: 'btop',
        source: '.config/btop',
        target: join(config, 'btop'),
        description: 'System monitor + themes',
        toolBinary: 'btop',
        toolDescription: 'System resource monitor',
        installCmd: 'brew install btop',
        required: false,
        themeSupport: true
      },
      {
        name: 'ripgrep',
        source: '.config/ripgrep',
        target: join(config, 'ripgrep'),
        description: 'Search config',
        toolBinary: 'rg',
        toolDescription: 'Fast search tool',
        installCmd: 'brew install ripgrep',
        required: false,
        themeSupport: false
      },
      {
        name: 'Claude Code',
        source: ['.claude.json', '.claude'],
        target: home,
        description: 'MCP servers + settings',
        required: false,
        themeSupport: false
      }
    ];
  }

  // Windows — PowerShell profile target: ~/Documents/PowerShell/
  const psProfileDir = join(home, 'Documents', 'PowerShell');

  return [
    {
      name: 'PowerShell',
      source: 'powershell',
      target: psProfileDir,
      description: 'Profile, 5 modules, 3 functions',
      toolBinary: 'pwsh',
      toolDescription: 'Modern cross-platform shell',
      installCmd: 'winget install Microsoft.PowerShell',
      required: true,
      themeSupport: true
    },
    {
      name: 'oh-my-posh',
      source: '.config/omp-themes',
      target: join(config, 'omp-themes'),
      description: '3 TOML prompt themes',
      toolBinary: 'oh-my-posh',
      toolDescription: 'Prompt theme engine',
      installCmd: 'winget install JanDeDobbeleer.OhMyPosh',
      required: false,
      themeSupport: true
    },
    {
      name: 'WezTerm',
      source: '.config/wezterm',
      target: join(config, 'wezterm'),
      description: 'Terminal config',
      toolBinary: 'wezterm',
      toolDescription: 'Cross-platform terminal emulator',
      installCmd: 'winget install wez.wezterm',
      required: true,
      themeSupport: true
    },
    {
      name: 'Neovim',
      source: '.config/nvim',
      target: join(process.env.LOCALAPPDATA || join(home, 'AppData', 'Local'), 'nvim'),
      description: 'LazyVim + solarized-osaka',
      toolBinary: 'nvim',
      toolDescription: 'Hyperextensible text editor',
      installCmd: 'winget install Neovim.Neovim',
      required: true,
      themeSupport: true,
      extraBackupPaths: [
        {
          label: 'data',
          path: join(process.env.LOCALAPPDATA || join(home, 'AppData', 'Local'), 'nvim-data')
        }
      ]
    },
    {
      name: 'bat',
      source: '.config/bat',
      target: join(process.env.APPDATA || join(home, 'AppData', 'Roaming'), 'bat'),
      description: 'Config + custom themes',
      toolBinary: 'bat',
      toolDescription: 'Cat clone with syntax highlighting',
      installCmd: 'winget install sharkdp.bat',
      required: false,
      themeSupport: true
    },
    {
      name: 'btop',
      source: '.config/btop',
      target: join(process.env.APPDATA || join(home, 'AppData', 'Roaming'), 'btop'),
      description: 'System monitor + themes',
      toolBinary: 'btop',
      toolDescription: 'System resource monitor',
      installCmd: 'winget install aristocratos.btop4win',
      required: false,
      themeSupport: true
    },
    {
      name: 'ripgrep',
      source: '.config/ripgrep',
      target: join(config, 'ripgrep'),
      description: 'Search config',
      toolBinary: 'rg',
      toolDescription: 'Fast search tool',
      installCmd: 'winget install BurntSushi.ripgrep.MSVC',
      required: false,
      themeSupport: false
    },
    {
      name: 'Claude Code',
      source: ['.claude.json', '.claude'],
      target: home,
      description: 'MCP servers + settings',
      required: false,
      themeSupport: false
    }
  ];
}
