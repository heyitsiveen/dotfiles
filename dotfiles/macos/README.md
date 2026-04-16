# Dotfiles

> Personal development environment configurations for macOS, Linux, and WSL. Managed with [GNU Stow](https://www.gnu.org/software/stow/).

[![Fish Shell](https://img.shields.io/badge/Shell-Fish-blue?logo=fish)](https://fishshell.com/)
[![Ghostty](https://img.shields.io/badge/Terminal-Ghostty-purple)](https://ghostty.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## Table of Contents

- [Features at a Glance](#features-at-a-glance)
- [Repository Structure](#repository-structure)
- [System Requirements](#system-requirements)
- [Setup Guide](#setup-guide)
  - [Option A: Automated Setup (GNU Stow)](#option-a-automated-setup-gnu-stow)
  - [Option B: Manual Setup](docs/manual-setup.md)
- [Tool Configuration Details](#tool-configuration-details)
- [Command Reference](docs/command-reference.md)
  - [Custom Functions](docs/command-reference.md#custom-functions)
  - [Shell Abbreviations](docs/command-reference.md#shell-abbreviations)
  - [Tmux Keybindings](docs/command-reference.md#tmux-keybindings)
  - [FZF Keybindings](docs/command-reference.md#fzf-keybindings)
  - [Lazygit Keybindings](docs/command-reference.md#lazygit-keybindings)
- [MCP Servers](docs/mcp-servers.md)
- [Skills](docs/skills.md)
- [Plugins](docs/plugins.md)
- [Customization](#customization)
- [Updating](#updating)
- [Backup & Restore](#backup--restore)
- [Uninstallation](#uninstallation)
- [Troubleshooting](#troubleshooting)
- [Fresh macOS Setup Guide](docs/fresh-macos-setup.md)

---

## Features at a Glance

| Category            | Tools                                                                                                                                                                     | Highlights                                                    |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| **Terminal**        | [Ghostty](https://ghostty.org/), [WezTerm](https://wezfurlong.org/wezterm/)                                                                                               | Solarized Dark theme, GPU-accelerated                         |
| **Shell**           | [Fish](https://fishshell.com/) + [Tide](https://github.com/IlanCosman/tide) + [Fisher](https://github.com/jorgebucaran/fisher)                                            | Modular config, smart completions                             |
| **Multiplexer**     | [Tmux](https://github.com/tmux/tmux/wiki)                                                                                                                                 | Ctrl+A prefix, vi-mode, clipboard integration                 |
| **File Navigation** | [fzf](https://github.com/junegunn/fzf), [fd](https://github.com/sharkdp/fd), [eza](https://github.com/eza-community/eza), [zoxide](https://github.com/ajeetdsouza/zoxide) | Fuzzy search, smart `cd`, modern `ls`                         |
| **Text Processing** | [bat](https://github.com/sharkdp/bat), [ripgrep](https://github.com/BurntSushi/ripgrep), [delta](https://github.com/dandavison/delta), [jq](https://jqlang.github.io/jq/) | Syntax highlighting, better diffs                             |
| **Monitoring**      | [btop](https://github.com/aristocratos/btop), [fastfetch](https://github.com/fastfetch-cli/fastfetch)                                                                     | Beautiful system stats                                        |
| **Git**             | [lazygit](https://github.com/jesseduffield/lazygit), delta                                                                                                                | TUI interface, enhanced diffs                                 |
| **HTTP**            | [HTTPie](https://httpie.io/)                                                                                                                                              | Human-friendly HTTP client                                    |
| **Node**            | [fnm](https://github.com/Schniz/fnm)                                                                                                                                      | Fast Node.js version manager                                  |
| **Editor**          | [VS Code](https://code.visualstudio.com/)                                                                                                                                 | Zed-inspired custom CSS, Solarized Dark theme, JetBrains Mono |

---

## Repository Structure

```
dotfiles/
├── .config/
│   ├── fish/
│   │   ├── config.fish              # Lean entry point, fnm setup, ~/.local/bin + Bun
│   │   ├── conf.d/                  # Modular configs (loaded in order)
│   │   │   ├── 00-platform.fish     # OS detection ($OS_TYPE)
│   │   │   ├── 10-homebrew.fish     # Cross-platform Homebrew init
│   │   │   ├── 20-environment.fish  # EDITOR/VISUAL fallback chain
│   │   │   ├── 30-aliases.fish      # Git, tmux, HTTPie, btop abbreviations
│   │   │   ├── 40-fzf.fish          # FZF with Solarized Dark colors + fd/bat/eza
│   │   │   ├── 50-tools.fish        # bat, eza, zoxide, ripgrep, delta setup
│   │   │   ├── 60-tmux.fish         # Auto-attach to 'main' session
│   │   │   └── 70-tide.fish         # Tide prompt with selectable palettes
│   │   └── functions/               # Autoloaded functions
│   │       ├── _tide_palette_heyitsiveen.fish
│   │       ├── _tide_palette_vercel.fish
│   │       ├── _tide_palette_vesper.fish
│   │       ├── backup.fish
│   │       ├── fish_greeting.fish
│   │       ├── reload-fish.fish
│   │       └── tide_palette.fish
│   ├── ripgrep/
│   │   └── config                   # Ripgrep defaults used via RIPGREP_CONFIG_PATH
│   ├── ghostty/
│   │   └── config                   # Ghostty terminal config
│   ├── wezterm/
│   │   └── wezterm.lua              # WezTerm configuration (Solarized default + optional palettes)
│   ├── tmux/
│   │   ├── tmux.conf                # Main tmux configuration
│   │   ├── keybinds.conf            # All keybindings
│   │   ├── notifications.conf       # Message + command prompt styling
│   │   ├── statusbar.conf           # Status bar styling
│   │   ├── pane.conf                # Pane settings
│   │   └── popup-window.conf       # Popup window keybindings
│   ├── bat/
│   │   ├── config                   # Bat configuration
│   │   └── themes/                  # Optional Vercel/Vesper bat themes
│   ├── btop/
│   │   ├── btop.conf                # Btop configuration
│   │   └── themes/                  # Optional Vercel/Vesper btop themes
│   └── Code/
│       └── zed-style.css            # VS Code custom CSS (Zed-inspired UI)
├── docs/
│   ├── command-reference.md
│   ├── fresh-macos-setup.md
│   ├── manual-setup.md
│   ├── mcp-servers.md
│   └── skills.md
├── .claude/                         # Claude Code configuration
│   ├── CLAUDE.md                    # Project instructions
│   └── settings.json               # Statusline plugin config
├── .claude.json                     # Optional user-defined MCP server config
├── .gitconfig                       # Template-only Git identity example
├── LICENSE
├── .stow-local-ignore               # Stow exclusion patterns
└── README.md
```

> **Note:** `.gitconfig` in this repo is template-only and ignored by Stow.

---

## System Requirements

### Supported Platforms

- **macOS** (primary, fully tested)
- **Linux** (Debian/Ubuntu, Fedora, Arch)
- **WSL2** (Windows Subsystem for Linux)

### Prerequisites

- **Git** - For cloning and version control
- **Homebrew** (macOS/Linux) - Package manager

### Core Dependencies

All tools are installed via Homebrew:

```bash
fish fd fzf bat eza zoxide ripgrep delta tmux jq httpie btop fastfetch lazygit fnm
```

### Optional

- **Ghostty** or **WezTerm** - Recommended terminal emulators
- **Nerd Font** - For icons in eza and prompt (e.g., JetBrainsMono Nerd Font)

---

## Setup Guide

### Option A: Automated Setup (GNU Stow)

GNU Stow creates symlinks from this repo to your home directory, making updates seamless.

#### 1. Install Prerequisites

```bash
# Install Homebrew (if not installed)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Git and Stow
brew install git stow
```

#### 2. Clone Repository

```bash
git clone https://github.com/USERNAME/dotfiles.git ~/dotfiles
cd ~/dotfiles
```

#### 3. Install CLI Tools

```bash
brew install fish fd fzf bat eza zoxide ripgrep delta tmux jq httpie btop fastfetch lazygit fnm
```

#### 4. Deploy with Stow

```bash
# Preview what will be linked (dry run)
stow -n -v .

# Create symlinks
stow .
```

#### Stow with Non-Home Directory

If your dotfiles repo isn't in `~`:

```bash
# From ~/Developer/dotfiles instead of ~/dotfiles
cd ~/Developer/dotfiles
stow -t ~ .

# Preview first
stow -n -v -t ~ .
```

#### 5. Set Fish as Default Shell

```bash
# Add Fish to allowed shells
echo $(which fish) | sudo tee -a /etc/shells

# Set as default
chsh -s $(which fish)
```

#### 6. Fisher + Tide (Already Configured)

Fisher and Tide ship pre-configured in this repo. Stow symlinks them into place in step 4 — there is nothing to install and no wizard to run. On first launch, `conf.d/70-tide.fish` applies the committed `heyitsiveen` palette automatically, and `tide_palette <name>` switches between `heyitsiveen`, `vercel`, and `vesper` (persisted via the `dotfiles_tide_palette` universal variable).

<details>
<summary><strong>Fallback: reinstall Fisher and Tide if the prompt is broken</strong></summary>

Use this only if you see one of the following after launching Fish:

- Prompt shows raw text (`>_` or bare `$`) with no icons or git segment
- `fisher: command not found`
- `tide: command not found` or `tide_palette: command not found`
- Tide errors about missing functions or corrupt universal variables
- Icons render as tofu (`□`) — check your terminal has a Nerd Font first

Then run:

```fish
# Re-bootstrap Fisher (rewrites functions/fisher.fish from upstream)
curl -sL https://raw.githubusercontent.com/jorgebucaran/fisher/main/functions/fisher.fish | source && fisher install jorgebucaran/fisher

# Reinstall everything declared in fish_plugins (Tide included)
fisher update

# Last resort only — re-runs the interactive wizard
tide configure
```

> **Warning:** `tide configure` overwrites the Tide universal variables committed to `fish_variables`, wiping the shipped prompt look. Afterward, restore it with `tide_palette heyitsiveen` (or `vercel` / `vesper`).

</details>

#### 7. Configure VS Code

1. Open VS Code and sign in with your GitHub account — all settings and extensions will sync automatically
2. Open the Command Palette (`Cmd+Shift+P`) and run **Enable Custom CSS and JS**
3. VS Code will prompt to restart — click **Restart**
4. If a warning appears: _"Your Code installation appears to be corrupt. Please reinstall."_ — click **Don't Show Again** (this is normal when using Custom CSS and JS Loader)
5. After restart, the Zed-inspired styling from `zed-style.css` will be applied

#### 8. Verify Installation

```bash
# Check Fish version
fish --version

# Test fzf
echo "hello" | fzf

# Test eza
eza --icons

# Test zoxide (after some cd usage)
z --help

# Test tmux
tmux -V
```

- [ ] VS Code opens with Solarized Dark theme and Zed-style breadcrumbs

#### Troubleshooting Stow

```bash
# If Stow reports conflicts, check existing files:
ls -la ~/.config/fish/

# Remove conflicting files or backup them:
mv ~/.config/fish ~/.config/fish.backup

# Restow after resolving:
stow -R .
```

---

### Option B: Manual Setup

If you prefer installing tools and copying configuration files individually instead of using GNU Stow, use the standalone [Manual Setup](docs/manual-setup.md) guide.

It keeps the full manual path in one place: terminal setup, Fish/Fisher/Tide, CLI tools, config copying, VS Code setup, and the verification checklist.

---

## Tool Configuration Details

### Terminal Emulators

#### Ghostty

- **Default Theme**: `Solarized Dark Patched`
- **Alternate Theme Lines in Config**: `Vercel`, `Vesper`
- **Font**: JetBrains Mono
- **Features**: GPU rendering, native macOS feel
- **Cursor**: Bar style
- **Window**: Background blur (20), opacity (0.9)

#### WezTerm

- **Default Theme**: `Solarized Dark (Gogh)`
- **Alternate Palettes Defined in Lua**: `Vercel`, `Vesper`
- **Features**: Multiplexing, Lua configuration, cross-platform
- **Cursor**: Blinking bar
- **Window**: Background blur (20), opacity (0.9)
- **Windows/WSL**: Prefers the first detected WSL domain and falls back to PowerShell when none are available

### Fish Shell

The Fish configuration uses a **modular structure** in `conf.d/`:

| File                  | Purpose                                           |
| --------------------- | ------------------------------------------------- |
| `config.fish`         | Lean entry point, fnm setup, ~/.local/bin + Bun   |
| `00-platform.fish`    | OS detection - sets `$OS_TYPE` (macos/linux/wsl)  |
| `10-homebrew.fish`    | Homebrew init with path order based on `$OS_TYPE` |
| `20-environment.fish` | EDITOR/VISUAL fallback chain                      |
| `30-aliases.fish`     | Git, tmux, HTTPie, btop abbreviations             |
| `40-fzf.fish`         | FZF with Solarized Dark colors + fd/bat/eza       |
| `50-tools.fish`       | bat, eza, zoxide, ripgrep, delta setup            |
| `60-tmux.fish`        | Auto-attach to 'main' session                     |
| `70-tide.fish`        | Tide prompt with selectable palettes              |

`00-platform.fish` is loaded first and is now used by `10-homebrew.fish` to choose the preferred Homebrew path for macOS vs Linux/WSL.
`config.fish` enables `fnm env --use-on-cd`, adds `~/.local/bin`, and exports Bun paths when available.
`60-tmux.fish` auto-attaches only for interactive local shells and skips existing tmux sessions, VS Code terminals, and SSH sessions.

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
- Exported via `GIT_PAGER=delta`

#### Btop Configuration

- Default theme: `solarized_dark`
- Bundled optional themes: `Vercel`, `Vesper`
- Truecolor enabled with rounded corners and theme background disabled

### Tmux

- **Prefix**: `Ctrl+A` (changed from default `Ctrl+B`)
- **Base Index**: Windows and panes start at 1
- **Mouse**: Enabled for scrolling and selection
- **Modules**: Main config sources dedicated keybind, notification, status bar, pane, and popup files
- **Theme**: Solarized is the active default; Vercel/Vesper style blocks remain in the config as alternates
- **Clipboard**: Platform-aware (pbcopy/clip.exe/wl-copy/xclip)
- **Plugins**: TPM (Tmux Plugin Manager)
- **Popup Windows**: Lazygit and Claude Code in centered popups

### Claude Code Configuration

Configuration for [Claude Code](https://claude.ai/code).

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
- **Formatters**: Prettier (default), Biome (TSX)
- **Requires**: [Custom CSS and JS Loader](https://marketplace.visualstudio.com/items?itemName=be5invis.vscode-custom-css) extension

---

## Command Reference

The standalone [Command Reference](docs/command-reference.md) now holds the CLI reference.

It starts with custom functions, then shell abbreviations, tmux keybindings, FZF keybindings, and lazygit keybindings.

---

## Customization

### Tide Prompt Configuration

Re-run the Tide wizard anytime:

```bash
tide configure
```

Or manually edit prompt items in your Fish config.

This repo ships with three Tide palettes:

```bash
tide_palette list
tide_palette heyitsiveen
tide_palette vercel
tide_palette vesper
```

`heyitsiveen` is the default on first load. Running `tide_palette <name>` switches immediately and persists the choice across new shells via the universal Fish variable `dotfiles_tide_palette`.

### Solarized Dark Theme Colors

Canonical Solarized Dark palette used by the active tmux, fzf, bat, btop, and VS Code styling defaults:

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

```bash
cd ~/dotfiles
git pull

# Restow to update any new files
stow -R .
```

### Update Tools

```bash
# Update all Homebrew packages
brew update && brew upgrade

# Update Fisher plugins
fisher update
```

### Update Tmux Plugins

```bash
# Inside tmux
Prefix + U  # Update plugins via TPM
```

> **Note:** `Prefix + U` works only when TPM is installed and enabled in `.config/tmux/tmux.conf`.

---

## Backup & Restore

### Using the Backup Function

```fish
# Backup individual config
backup ~/.config/fish/config.fish

# Creates: config.fish.20240115-143000.bak
```

### Full Config Backup

```bash
# Backup entire .config
tar -czvf config-backup-$(date +%Y%m%d).tar.gz ~/.config

# Or specific directories
tar -czvf fish-backup.tar.gz ~/.config/fish ~/.config/ghostty ~/.config/tmux
```

### Restore Procedures

```bash
# From dotfiles repo (preferred)
cd ~/dotfiles && stow -R .

# From backup archive
tar -xzvf config-backup-20240115.tar.gz -C ~/
```

---

## Uninstallation

### Remove Symlinks (Stow)

```bash
cd ~/dotfiles
stow -D .  # Remove all symlinks created by stow
```

### Manual Removal

```bash
# Remove config directories
rm -rf ~/.config/fish ~/.config/ghostty ~/.config/tmux ~/.config/bat
```

### Restore Default Shell

```bash
# Change back to bash or zsh
chsh -s /bin/bash
# or
chsh -s /bin/zsh
```

---

## Troubleshooting

### Fish config not loading

```bash
# Check Fish is finding config
fish -c "echo $__fish_config_dir"
# Should output: /Users/username/.config/fish

# Verify symlinks
ls -la ~/.config/fish/
```

### Tmux colors look wrong

```bash
# Ensure terminal supports 256 colors
echo $TERM
# Should be: xterm-256color or similar

# Add to tmux.conf if needed
set -g default-terminal "tmux-256color"
```

### Stow reports conflicts

```bash
# Check what's conflicting
stow -n -v .

# Common fix: backup and remove existing files
mv ~/.config/fish ~/.config/fish.old
stow .
```

### FZF not working

```bash
# Reinstall FZF key bindings
$(brew --prefix)/opt/fzf/install

# Verify fzf is in PATH
which fzf
```

### Bat theme not found

```bash
# List available themes
bat --list-themes

# Update bat cache if custom theme added
bat cache --build
```

### Zoxide not jumping correctly

```bash
# Zoxide needs usage data - use cd normally first
# Check zoxide database
zoxide query -l

# Reimport from z (if migrating)
zoxide import --from z ~/.z
```

---

## Fresh macOS Setup Guide

For recommended macOS apps and a fresh-Mac settings checklist, see [Fresh macOS Setup Guide](docs/fresh-macos-setup.md).

---

## License

MIT License - See [LICENSE](LICENSE) for details.

---

<p align="center">
  <sub>Built with care and maintained with precision</sub>
</p>
