# Dotfiles — Windows 11

> Personal development environment configurations for Windows 11. Managed with an interactive [React + Ink](setup/) setup wizard.

[![PowerShell](https://img.shields.io/badge/Shell-PowerShell%207-blue?logo=powershell)](https://github.com/PowerShell/PowerShell)
[![WezTerm](https://img.shields.io/badge/Terminal-WezTerm-purple)](https://wezfurlong.org/wezterm/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## Table of Contents

- [Features at a Glance](#features-at-a-glance)
- [Repository Structure](#repository-structure)
- [System Requirements](#system-requirements)
- [Setup Guide](#setup-guide)
  - [Option A: Interactive Wizard](#option-a-interactive-wizard)
  - [Option B: Manual Setup](docs/manual-setup.md)
- [Node + pnpm Setup](docs/node-pnpm-setup.md)
- [Tool Configuration Details](#tool-configuration-details)
- [Command Reference](docs/command-reference.md)
  - [Custom Functions](docs/command-reference.md#custom-functions)
  - [Shell Aliases](docs/command-reference.md#shell-aliases)
  - [FZF Keybindings](docs/command-reference.md#fzf-keybindings)
  - [WezTerm Keybindings](docs/command-reference.md#wezterm-keybindings)
  - [Lazygit Keybindings](docs/command-reference.md#lazygit-keybindings)
- [MCP Servers](docs/mcp-servers.md)
- [Skills](docs/skills.md)
- [Plugins](docs/plugins.md)
- [Customization](#customization)
- [Updating](#updating)
- [Backup & Restore](#backup--restore)
- [Uninstallation](#uninstallation)
- [Troubleshooting](#troubleshooting)

---

## Features at a Glance

| Category            | Tools                                                                                                                                                                     | Highlights                                                    |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| **Terminal**        | [WezTerm](https://wezfurlong.org/wezterm/)                                                                                                                                | Solarized Dark theme, GPU-accelerated, tabs                   |
| **Shell**           | [PowerShell 7](https://github.com/PowerShell/PowerShell) + [oh-my-posh](https://ohmyposh.dev/)                                                                            | Modular config, 3 theme palettes                              |
| **File Navigation** | [fzf](https://github.com/junegunn/fzf), [fd](https://github.com/sharkdp/fd), [eza](https://github.com/eza-community/eza), [zoxide](https://github.com/ajeetdsouza/zoxide) | Fuzzy search, smart `cd`, modern `ls`                         |
| **Text Processing** | [bat](https://github.com/sharkdp/bat), [ripgrep](https://github.com/BurntSushi/ripgrep), [delta](https://github.com/dandavison/delta)                                     | Syntax highlighting, better diffs                             |
| **Monitoring**      | [btop](https://github.com/aristocratos/btop) (optional), [fastfetch](https://github.com/fastfetch-cli/fastfetch)                                                          | Beautiful system stats                                        |
| **Git**             | [lazygit](https://github.com/jesseduffield/lazygit), delta                                                                                                                | TUI interface, enhanced diffs                                 |
| **HTTP**            | [HTTPie](https://httpie.io/)                                                                                                                                              | Human-friendly HTTP client                                    |
| **Node / Packages** | [pnpm](https://pnpm.io/)                                                                                                                                                  | Package manager **and** Node version manager — see [docs/node-pnpm-setup.md](docs/node-pnpm-setup.md) |
| **Editor**          | [VS Code](https://code.visualstudio.com/)                                                                                                                                 | Zed-inspired custom CSS, Solarized Dark theme, JetBrains Mono |

---

## Repository Structure

```
dotfiles-windows/
├── .claude/
│   ├── CLAUDE.md                    # Claude Code project instructions
│   └── settings.json               # Settings
├── .claude.json                     # MCP server configurations
├── .config/
│   ├── bat/
│   │   ├── config                   # Bat configuration
│   │   └── themes/                  # Vercel/Vesper bat themes
│   ├── btop/
│   │   ├── btop.conf                # Btop configuration
│   │   └── themes/                  # Solarized/Vercel/Vesper btop themes
│   ├── omp-themes/
│   │   ├── solarized-dark.omp.json  # oh-my-posh Solarized Dark
│   │   ├── vercel.omp.json          # oh-my-posh Vercel
│   │   └── vesper.omp.json          # oh-my-posh Vesper
│   ├── ripgrep/
│   │   └── config                   # Ripgrep defaults
│   └── wezterm/
│       └── wezterm.lua              # WezTerm configuration
├── powershell/
│   ├── Profile.ps1                  # Entry point (loads modules/ + functions/)
│   ├── modules/                     # Feature-grouped config scripts
│   │   ├── aliases.ps1              # Git, lazygit, httpie, btop aliases
│   │   ├── environment.ps1          # $EDITOR fallback chain
│   │   ├── fzf.ps1                  # fzf colors + fd/bat/eza previews
│   │   ├── prompt.ps1               # oh-my-posh init + theme selection
│   │   └── tools.ps1                # bat, eza, zoxide, ripgrep, delta
│   └── functions/                   # Individual utility functions
│       ├── backup.ps1               # Timestamped file backup
│       ├── reload-shell.ps1         # Restart PowerShell session
│       └── Switch-PromptPalette.ps1 # Theme switching
├── vscode/
│   └── zed-style.css                # VS Code custom CSS (Zed-inspired UI)
├── git/
│   ├── .gitconfig                   # Git template configuration
│   └── .gitignore_global            # Windows-adapted global ignores
├── setup/                           # React + Ink interactive wizard
│   ├── package.json
│   ├── tsdown.config.ts
│   └── src/
│       ├── cli.tsx                  # Entry point
│       ├── app.tsx                  # Wizard state machine
│       ├── steps/                   # Wizard step components
│       └── utils/                   # Detection + symlink logic
├── docs/
│   ├── command-reference.md         # CLI reference
│   ├── manual-setup.md              # Manual setup path
│   ├── mcp-servers.md               # MCP server list
│   ├── plugins.md                   # Claude Code plugins
│   └── skills.md                    # Claude Code skills
├── SKIPPED.md                       # What was skipped and why
├── README.md
├── LICENSE
└── .gitignore
```

---

## System Requirements

### Platform

- **Windows 11** (primary, fully tested)

### Prerequisites

- **Git** — For cloning and version control
- **winget** — Windows Package Manager (included in Windows 11)
- **Node.js ≥ 20** (or **Bun**) — Required to run the setup wizard. Easiest route: install pnpm (below), then `pnpm runtime set node lts -g`
- **Developer Mode** — Required for symlink creation without admin

### Core Dependencies

All tools are installed via winget:

```powershell
winget install --id Microsoft.PowerShell
winget install --id JanDeDobbeleer.OhMyPosh
winget install --id wez.wezterm
winget install --id sharkdp.bat
winget install --id eza-community.eza
winget install --id junegunn.fzf
winget install --id sharkdp.fd
winget install --id BurntSushi.ripgrep.MSVC
winget install --id dandavison.delta
winget install --id ajeetdsouza.zoxide
winget install --id JesseDuffield.lazygit
# pnpm — package manager AND Node version manager (installs Node itself)
iwr https://get.pnpm.io/install.ps1 -useb | iex
pnpm runtime set node lts -g

# Previously (replaced by pnpm — kept for reference):
# winget install --id Schniz.fnm
winget install --id fastfetch-cli.fastfetch
```

### Optional

- **btop** — System monitor (install via `scoop install btop`)
- **HTTPie** — HTTP client (`winget install --id httpie.cli`)
- **Nerd Font** — For icons in eza and prompt (`winget install --id DEVCOM.JetBrainsMonoNerdFont`)

---

## Setup Guide

### Option A: Interactive Wizard

The setup wizard replaces GNU Stow with a cross-platform React + Ink CLI app. It works from any directory — clone the repo wherever you like.

#### 1. Enable Developer Mode

Settings → System → For developers → Developer Mode → **On**

This allows symlink creation without administrator privileges.

#### 2. Install Prerequisites

```powershell
# Install core tools (see full list above)
winget install --id Microsoft.PowerShell
winget install --id JanDeDobbeleer.OhMyPosh
winget install --id wez.wezterm
winget install --id sharkdp.bat
# ... (see Core Dependencies)
```

#### 3. Clone Repository

```powershell
git clone git@github.com:USERNAME/dotfiles-windows.git ~/Developer/dotfiles-windows
cd ~/Developer/dotfiles-windows/setup
```

#### 4. Run the Wizard

```bash
# bun (primary — fastest, runs TypeScript directly)
bun install && bun run dev

# pnpm
pnpm install && pnpm start

# npm
npm install && npm start

# yarn
yarn install && yarn start
```

The wizard will:
1. Detect which tools you have installed
2. Let you select which configs to install (pre-selects installed tools)
3. Create symlinks (or copies if Developer Mode is off)
4. Run post-setup tasks (`bat cache --build`, etc.)

#### 5. Configure VS Code

1. Open VS Code and sign in with your GitHub account — all settings and extensions will sync automatically
2. Open the Command Palette (`Ctrl+Shift+P`) and run **Enable Custom CSS and JS**
3. VS Code will prompt to restart — click **Restart**
4. If a warning appears: _"Your Code installation appears to be corrupt. Please reinstall."_ — click **Don't Show Again** (this is normal when using Custom CSS and JS Loader)
5. After restart, the Zed-inspired styling from `zed-style.css` will be applied

#### 6. Verify Installation

```powershell
# Open a new PowerShell 7 window to load your profile
pwsh

# Test aliases
gs          # git status
ls          # eza with icons

# Test fzf
fzf

# Test zoxide
z --help

# Test theme switching
Switch-PromptPalette vercel
Switch-PromptPalette solarized-dark
```

- [ ] WezTerm opens with Solarized Dark theme and pwsh
- [ ] VS Code opens with Solarized Dark theme and Zed-style breadcrumbs

### Option B: Manual Setup

If you prefer installing tools and creating symlinks individually instead of using the wizard, use the standalone [Manual Setup](docs/manual-setup.md) guide.

It covers: tool installation via winget, PowerShell profile linking, OXC formatter/linter setup, and VS Code configuration.

---

## Tool Configuration Details

### Terminal Emulator

#### WezTerm

- **Default Theme**: `Solarized Dark (Gogh)`
- **Alternate Palettes Defined in Lua**: `Vercel`, `Vesper`
- **Features**: Multiplexing, Lua configuration, GPU-accelerated, cross-platform
- **Cursor**: Blinking bar
- **Default Shell**: `pwsh.exe -NoLogo`
- **Tab Bar**: Hidden when single tab

### PowerShell Profile

The PowerShell configuration uses a **modular structure** with `modules/` and `functions/`:

| File              | Purpose                                       |
| ----------------- | --------------------------------------------- |
| `Profile.ps1`     | Entry point — loads modules/ and functions/    |
| `aliases.ps1`     | Git, lazygit, HTTPie, btop function aliases    |
| `environment.ps1` | EDITOR/VISUAL fallback chain                   |
| `fzf.ps1`         | FZF with Solarized Dark colors + fd/bat/eza    |
| `prompt.ps1`      | oh-my-posh init with theme from preference file|
| `tools.ps1`       | bat, eza, zoxide, ripgrep, delta, PSReadLine   |

`Profile.ps1` dot-sources all `modules/*.ps1` and `functions/*.ps1` alphabetically, then adds Bun and pnpm (`$env:PNPM_HOME`) to PATH. Node lives under `PNPM_HOME` — see [docs/node-pnpm-setup.md](docs/node-pnpm-setup.md).

### CLI Tools

#### FZF Integration

- Uses `fd` for file listing (respects `.gitignore`)
- `bat` for file preview with syntax highlighting
- `eza` for directory preview with tree view
- Solarized Dark is the active palette; commented Vercel/Vesper blocks remain in the file as alternates

#### Bat Configuration

- Default theme: `Solarized (dark)`
- Bundled optional themes: `Vercel`, `Vesper`
- Italics enabled, auto paging, and auto line wrapping

#### Ripgrep Defaults

- `--smart-case`
- Searches hidden files
- Excludes `.git/`, `node_modules/`, `dist/`, and `build/`

#### Delta (Git Pager)

- Enabled automatically when `delta` is installed
- Exported via `$env:GIT_PAGER = 'delta'`

#### Btop Configuration

- Default theme: `solarized_dark`
- Bundled optional themes: `Vercel`, `Vesper`
- Truecolor enabled with rounded corners and theme background disabled

### Claude Code Configuration

Configuration for [Claude Code](https://claude.ai/code).

> ⚠️ **This is the author's personal Claude Code setup.** `settings.json` enables specific plugins, sets `effortLevel: xhigh`, `advisorModel: opus`, and skips dangerous-mode permission prompts. `.claude.json` wires three MCP servers (exa, grep, better-auth). `CLAUDE.md` is the author's 13-rule instruction set. If you prefer Claude Code defaults, **deselect "Claude Code"** in the CLI — or replace the installed files afterward.

#### Files

| Path                    | Purpose                   |
| ----------------------- | ------------------------- |
| `.claude.json`          | MCP server configurations |
| `.claude/CLAUDE.md`     | Project instructions      |
| `.claude/settings.json` | Settings                  |

### MCP Servers

The standalone [MCP Servers](docs/mcp-servers.md) reference lists the configured server categories and their documentation links.

### Skills

The standalone [Skills](docs/skills.md) reference groups the available skill installs by provider and keeps the install commands in one place.

### Plugins

The standalone [Plugins](docs/plugins.md) reference lists the installed Claude Code plugins with descriptions and usage notes.

### Editor

#### VS Code

- **Theme**: Solarized Dark (color), Symbols (icons)
- **Font**: JetBrains Mono NL / Zed Mono
- **Custom CSS**: Zed-inspired breadcrumbs with `/` separators, monospace tabs & sidebar
- **UI**: Activity bar on top, sidebar on right, no minimap, smooth cursor
- **Formatters**: OXC (JS/TS/CSS/HTML), Biome (fallback)
- **Requires**: [Custom CSS and JS Loader](https://marketplace.visualstudio.com/items?itemName=be5invis.vscode-custom-css) extension

---

## Command Reference

The standalone [Command Reference](docs/command-reference.md) holds the CLI reference.

It covers custom functions, shell aliases, FZF keybindings, WezTerm keybindings, prompt palettes, zoxide, and lazygit keybindings.

---

## Customization

### oh-my-posh Prompt Configuration

This repo ships with three oh-my-posh themes:

```powershell
Switch-PromptPalette list
Switch-PromptPalette solarized-dark
Switch-PromptPalette vercel
Switch-PromptPalette vesper
```

`solarized-dark` is the default on first load. Running `Switch-PromptPalette <name>` switches immediately and persists the choice across new shells via `~/.config/heyitsiveen/dotfiles/oh-my-posh/prompt-theme.txt`.

### Solarized Dark Theme Colors

Canonical Solarized Dark palette used by the active oh-my-posh, fzf, bat, btop, and VS Code styling defaults:

#### Base Tones

| Name   | Hex       |
| ------ | --------- |
| base03 | `#002B36` |
| base02 | `#073642` |
| base01 | `#586E75` |
| base00 | `#657B83` |
| base0  | `#839496` |
| base1  | `#93A1A1` |
| base2  | `#EEE8D5` |
| base3  | `#FDF6E3` |

#### Accent Colors

| Name    | Hex       |
| ------- | --------- |
| yellow  | `#B58900` |
| orange  | `#CB4B16` |
| red     | `#DC322F` |
| magenta | `#D33682` |
| violet  | `#6C71C4` |
| blue    | `#268BD2` |
| cyan    | `#2AA198` |
| green   | `#859900` |

---

## Updating

### Pull Latest Dotfiles

```powershell
cd ~/Developer/dotfiles-windows
git pull

# Re-run the wizard to update symlinks
cd setup
bun run dev
```

### Update Tools

```powershell
# Update all winget packages
winget upgrade --all
```

---

## Backup & Restore

### Using the Backup Function

```powershell
# Backup individual config
backup ~/.config/wezterm/wezterm.lua

# Creates: wezterm.lua.20240115-143000.bak
```

### Full Config Backup

```powershell
# Backup PowerShell profile
Compress-Archive -Path "$HOME\Documents\PowerShell" -DestinationPath "$HOME\pwsh-backup-$(Get-Date -Format 'yyyyMMdd').zip"
```

### Restore Procedures

```powershell
# From dotfiles repo (preferred — re-run wizard)
cd ~/Developer/dotfiles-windows/setup
bun run dev

# From backup archive
Expand-Archive -Path "$HOME\pwsh-backup-20240115.zip" -DestinationPath "$HOME\Documents\PowerShell"
```

---

## Uninstallation

### Remove Symlinks

```powershell
# Remove PowerShell profile link
Remove-Item "$HOME\Documents\PowerShell\Microsoft.PowerShell_profile.ps1"
Remove-Item "$HOME\Documents\PowerShell\modules" -Force
Remove-Item "$HOME\Documents\PowerShell\functions" -Force

# Remove tool config links
Remove-Item "$env:APPDATA\bat" -Force
Remove-Item "$HOME\.config\wezterm\wezterm.lua"
Remove-Item "$HOME\.config\omp-themes" -Force
```

### Restore Default Shell

PowerShell 7 can be uninstalled via Settings → Apps, reverting to the built-in Windows PowerShell 5.

---

## Troubleshooting

### PowerShell profile not loading

```powershell
# Check PowerShell is finding the profile
$PROFILE
# Should output: C:\Users\username\Documents\PowerShell\Microsoft.PowerShell_profile.ps1

# Verify symlink exists
Get-Item $PROFILE | Select-Object Target
```

### oh-my-posh prompt not rendering

```powershell
# Check oh-my-posh is installed
oh-my-posh version

# Check theme file exists
Test-Path "$HOME\.config\omp-themes\solarized-dark.omp.json"

# Ensure a Nerd Font is set in WezTerm or Windows Terminal
```

### Bat theme not found

```powershell
# List available themes
bat --list-themes

# Rebuild cache if custom theme was added
bat cache --build
```

### FZF not working

```powershell
# Check fzf is in PATH
Get-Command fzf

# Check PSFzf module is available
Get-Module -ListAvailable PSFzf
```

### Zoxide not jumping correctly

```powershell
# Zoxide needs usage data — use cd normally first
# Check zoxide database
zoxide query -l
```

### Symlinks not created (Developer Mode)

```powershell
# Check Developer Mode status
reg query "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\AppModelUnlock" /v AllowDevelopmentWithoutDevLicense

# Enable: Settings → System → For developers → Developer Mode → On
# Then re-run the setup wizard
```

---

## What Was Skipped

See [`SKIPPED.md`](./SKIPPED.md) for tools that have no native Windows equivalent (tmux, Ghostty, Homebrew) and their closest Windows alternatives.

---

## macOS Version

The macOS counterpart lives in [`dotfiles-macos`](https://github.com/USERNAME/dotfiles-macos) and is managed with GNU Stow.

---

<p align="center">
  <sub>Built with care and maintained with precision</sub>
</p>
