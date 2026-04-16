# heyitsiveen

Interactive CLI to set up dotfiles for macOS and Windows 11. One command to install, theme, backup, and manage your development environment.

<!-- TODO: Replace with actual recording -->
<!-- ![Demo](docs/demo.gif) -->
<!-- [How to record the demo GIF](docs/recording-demo.md) -->

## Table of Contents

- [Quick Start](#quick-start)
- [Prerequisites](#prerequisites)
- [Tools](#tools)
- [What's Included](#whats-included)
- [Color Themes](#color-themes)
- [CLI Flags](#cli-flags)
- [How It Works](#how-it-works)
- [Development](#development)

## Quick Start

```bash
bunx @heyitsiveen/dotfiles@latest
```

Or with other package runners:

```bash
npx @heyitsiveen/dotfiles@latest
pnpm dlx @heyitsiveen/dotfiles@latest
yarn dlx @heyitsiveen/dotfiles@latest
```

## Prerequisites

| Prerequisite | Why | Install |
|---|---|---|
| [Node.js >= 22](https://nodejs.org/) | Running the CLI | `brew install node` or [nodejs.org](https://nodejs.org/) |
| [Nerd Font](https://www.nerdfonts.com/) | Icons in Tide, oh-my-posh, Neovim | [nerdfonts.com](https://www.nerdfonts.com/) (recommended: JetBrains Mono NF) |
| [Homebrew](https://brew.sh/) (macOS) / [winget](https://aka.ms/getwinget) (Windows) | Installing tools | [brew.sh](https://brew.sh/) / pre-installed on Windows 11 |

## Tools

The CLI automatically detects all tools and offers to install missing ones via Homebrew (macOS) or winget (Windows).

**Required** (core tools for the dotfiles):

| Tool | macOS | Windows |
|---|---|---|
| Git | `brew install git` | `winget install Git.Git` |
| Fish Shell / PowerShell | `brew install fish` | `winget install Microsoft.PowerShell` |
| Ghostty / WezTerm | `brew install --cask ghostty` | `winget install wez.wezterm` |
| Neovim | `brew install neovim` | `winget install Neovim.Neovim` |
| tree-sitter-cli | `brew install tree-sitter-cli` | `npm i -g tree-sitter-cli` |
| C compiler | `xcode-select --install` | [VS Build Tools](https://visualstudio.microsoft.com/visual-cpp-build-tools/) |

> **Note:** tree-sitter-cli and a C compiler are only needed if you install Neovim. LazyVim uses them to compile syntax parsers. macOS usually has the C compiler pre-installed via Xcode Command Line Tools.

**Optional** (enhance the experience):

| Tool | macOS | Windows |
|---|---|---|
| tmux | `brew install tmux` | N/A |
| bat | `brew install bat` | `winget install sharkdp.bat` |
| btop | `brew install btop` | `winget install aristocratos.btop4win` |
| ripgrep | `brew install ripgrep` | `winget install BurntSushi.ripgrep.MSVC` |
| fd | `brew install fd` | `winget install sharkdp.fd` |
| eza | `brew install eza` | `winget install eza-community.eza` |
| fastfetch | `brew install fastfetch` | `winget install Fastfetch-cli.Fastfetch` |
| oh-my-posh | N/A | `winget install JanDeDobbeleer.OhMyPosh` |

## What's Included

### macOS

| Tool | Description |
|---|---|
| Fish Shell | config.fish, 8 conf.d modules, 7 functions, 3 Tide palette themes |
| Ghostty | Terminal emulator with JetBrains Mono, 0.9 opacity, 3 themes |
| WezTerm | Cross-platform terminal with Solarized/Vercel/Vesper color schemes |
| tmux | 7 config files (main, keybinds, statusbar, pane, notifications, popup) |
| Neovim | LazyVim with solarized-osaka, Snacks, Mason (oxfmt + oxlint), conform |
| bat | Config + Vercel/Vesper custom .tmTheme themes |
| btop | System monitor + 3 theme files |
| ripgrep | Smart-case, hidden files, common excludes |
| Claude Code | 6 MCP servers, CLAUDE.md, settings |

### Windows

| Tool | Description |
|---|---|
| PowerShell | Profile, 5 modules, 3 functions |
| oh-my-posh | 3 TOML prompt themes (Solarized, Vercel, Vesper) |
| WezTerm | Windows-adapted config with tab bar |
| Neovim | LazyVim (same config as macOS) |
| bat | Config + custom themes |
| btop | System monitor + 3 theme files |
| ripgrep | Search config |
| Claude Code | 6 MCP servers, CLAUDE.md, settings |

## Color Themes

Three themes are available across all tools:

| Theme | Style |
|---|---|
| **Solarized Dark** | Warm, low-contrast dark theme (default) |
| **Vercel** | Minimal, high-contrast dark theme |
| **Vesper** | Soft, warm dark theme with orange accents |

Switch themes instantly across all installed tools:

```bash
npx @heyitsiveen/dotfiles --theme vercel
npx @heyitsiveen/dotfiles --theme vesper
npx @heyitsiveen/dotfiles --theme solarized-dark
```

## CLI Flags

| Flag | Description |
|---|---|
| `--platform <macos\|windows>` | Skip OS detection |
| `--dry-run` | Show planned operations without writing files |
| `--theme <name>` | Switch theme: `solarized-dark`, `vercel`, `vesper` |
| `--restore` | Restore from backup |
| `--uninstall` | Remove installed dotfiles |
| `--version` | Show version |
| `--help` | Show usage |

## How It Works

1. Detects your OS (macOS or Windows)
2. Checks for missing tools and offers to install them (brew/winget)
3. Shows available dotfile configurations
4. You select which configs to install
5. You pick a color theme
6. Backs up existing dotfiles (optional — Neovim backups include LazyVim plugin data)
7. Copies configs to the right locations
8. Activates your chosen theme across all tools
9. Checks for updates and notifies you if a new version is available

Subsequent runs detect the existing installation and offer:
- **Fresh install** — backup + overwrite
- **Update** — apply changes from a new package version
- **Change theme** — switch colors across all tools
- **Uninstall** — remove configs, uninstall tools (brew/winget), or both
- **Restore** — restore from per-tool timestamped backups

## Development

```bash
# Install dependencies (bun is the primary package manager)
bun install

# Build
bun run build

# Run locally
node dist/index.mjs

# Run all checks (typecheck + lint + format)
bun run check

# Or with npm
npm install && npm run build && npm run check
```

**Pre-commit hooks** are set up via [husky](https://typicode.github.io/husky/) + [lint-staged](https://github.com/lint-staged/lint-staged). Every `git commit` automatically:
1. Formats staged `.ts` files with oxfmt
2. Lints staged `.ts` files with oxlint
3. Typechecks the project with tsc

## License

MIT
