# Manual Setup

Manual, non-Stow setup path for this dotfiles repo.

Follow these steps to set up each tool individually.

## 1. Terminal Emulator

**Ghostty (Recommended)**

```bash
# Download from https://ghostty.org/download
# Or via Homebrew
brew install --cask ghostty
```

**WezTerm (Alternative)**

```bash
brew install --cask wezterm
```

> **Shell note:** Neither terminal config hardcodes Fish — Ghostty's `command` line is commented out and the macOS WezTerm config sets no `default_prog`, so both inherit whatever your login shell is. Set Fish as your login shell in step 3 and both launch it automatically. (Skipping step 3? Uncomment the Ghostty `command` line or set WezTerm's `default_prog = { '/opt/homebrew/bin/fish', '-l' }`.)

## 2. Homebrew

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

## 3. Fish Shell (+ Pre-Configured Fisher + Tide)

```bash
# Install Fish
brew install fish

# Add to shells and set as default
echo $(which fish) | sudo tee -a /etc/shells
chsh -s $(which fish)

# Launch Fish
fish
```

Then **log out and back in** (or open a new terminal) so the login shell takes effect, and verify:

```bash
dscl . -read ~/ UserShell   # → UserShell: /opt/homebrew/bin/fish
echo $SHELL                 # → /opt/homebrew/bin/fish
```

`$SHELL` is derived from that login-shell record — `chsh` updates it and macOS sets `$SHELL` to Fish on your next login; never set it by hand. Because Fish is now your login shell, **Ghostty and WezTerm launch it automatically** — which is why their configs don't hardcode Fish (see step 1). Revert with `chsh -s /bin/zsh`; if a bad path locks you out, reset the login shell in **System Settings → Users & Groups → (ctrl-click user) → Advanced Options…**.

See **Set Fish as Default Shell** (step 5) in the main [README](../README.md) for why the `chsh` step matters and a zsh-PATH gotcha it avoids.

Fisher and Tide are committed to this repo under `.config/fish/` — they are copied over in step 7 below, so you don't need to bootstrap Fisher or run `tide configure`. The committed `fish_plugins` manifest declares `jorgebucaran/fisher` and `ilancosman/tide@v6`, and `fish_variables` holds the prompt settings for the `heyitsiveen` palette.

<details>
<summary><strong>Fallback: reinstall Fisher and Tide if the prompt is broken</strong></summary>

Use this only if, after copying configs in step 7 and restarting Fish, you see:

- Prompt shows raw text (`>_` or bare `$`) with no icons or git segment
- `fisher: command not found`
- `tide: command not found` or `tide_palette: command not found`
- Tide errors about missing functions or corrupt universal variables
- Icons render as tofu (`□`) — check your terminal has a Nerd Font first

Then run:

```fish
# Re-bootstrap Fisher
curl -sL https://raw.githubusercontent.com/jorgebucaran/fisher/main/functions/fisher.fish | source && fisher install jorgebucaran/fisher

# Reinstall everything in fish_plugins — fires _tide_init_install which auto-configures the prompt
fisher update

# Restore your palette choice afterward
tide_palette heyitsiveen
```

</details>

## 4. Core CLI Tools

```bash
# Fuzzy finder
brew install fzf
$(brew --prefix)/opt/fzf/install  # Install key bindings

# Fast find
brew install fd

# Better cat
brew install bat

# Modern ls
brew install eza

# Smarter cd
brew install zoxide

# Fast grep
brew install ripgrep

# Better git diff
brew install delta
```

## 5. Tmux

```bash
brew install tmux
```

## 6. Utility Tools

```bash
brew install lazygit jq httpie btop fastfetch
```

## 6b. Node + pnpm

pnpm is the package manager **and** the Node version manager. Do **not**
`brew install pnpm` — that formula requires a separate Node install. Use the
standalone binary, which needs nothing pre-installed:

```bash
PNPM_HOME="$HOME/.local/share/pnpm" curl -fsSL https://get.pnpm.io/install.sh | sh -
pnpm runtime set node lts -g
```

Node installed this way ships **without** npm/npx/corepack — that's intentional.
Full walkthrough, including migrating off fnm/nvm: [node-pnpm-setup.md](node-pnpm-setup.md).

```bash
# Previously (replaced by pnpm — kept for reference):
# brew install fnm
```

## 7. Copy Configuration Files

```bash
# Create config directories
mkdir -p ~/.config/{fish,ghostty,wezterm,tmux,bat,btop,ripgrep}

# Copy configs manually from this repo
cp -r .config/fish/* ~/.config/fish/
cp -r .config/ghostty/* ~/.config/ghostty/
cp -r .config/wezterm/* ~/.config/wezterm/
cp -r .config/tmux/* ~/.config/tmux/
cp -r .config/bat/* ~/.config/bat/
cp -r .config/btop/* ~/.config/btop/
cp -r .config/ripgrep/* ~/.config/ripgrep/
```

## 8. OXC (Formatter & Linter)

### Install Globally

```bash
# Linter
pnpm add -g oxlint

# Formatter
pnpm add -g oxfmt

# Previously (replaced by pnpm — kept for reference):
# npm add -g oxlint
# npm add -g oxfmt
```

### Install Per-Project

```bash
# pnpm
pnpm add -D oxlint oxfmt

# npm
npm add -D oxlint oxfmt

# yarn
yarn add -D oxlint oxfmt

# bun
bun add -D oxlint oxfmt
```

Add scripts to `package.json`:

```json
{
  "scripts": {
    "lint": "oxlint",
    "lint:fix": "oxlint --fix",
    "fmt": "oxfmt",
    "fmt:check": "oxfmt --check"
  }
}
```

### Global Config

Create `~/.oxfmtrc.json` — applies to all projects by default:

```bash
oxfmt --init
# or manually
touch ~/.oxfmtrc.json
```

Paste the following into `~/.oxfmtrc.json`:

```json
{
  "printWidth": 80,
  "tabWidth": 2,
  "semi": true,
  "singleQuote": true,
  "jsxSingleQuote": true,
  "trailingComma": "none",
  "arrowParens": "always",
  "bracketSpacing": true,
  "sortImports": {
    "newlinesBetween": true,
    "order": "asc",
    "ignoreCase": true,
    "internalPattern": ["@workspace/**", "@repo/**", "@/**", "~/**", "#**"],
    "customGroups": [
      {
        "groupName": "react",
        "elementNamePattern": ["react", "react-dom", "react-*"]
      },
      {
        "groupName": "next",
        "elementNamePattern": ["next", "next/*"]
      },
      {
        "groupName": "tanstack",
        "elementNamePattern": ["@tanstack/*"]
      },
      {
        "groupName": "expo",
        "elementNamePattern": [
          "expo",
          "expo-*",
          "@expo/*",
          "react-native",
          "react-native-*",
          "@react-native/*",
          "@react-native-community/*"
        ]
      },
      {
        "groupName": "desktop",
        "elementNamePattern": ["@tauri-apps/*", "electron", "electron-*", "@electron/*"]
      },
      {
        "groupName": "backend",
        "elementNamePattern": ["hono", "hono/*", "@hono/*", "elysia", "@elysiajs/*"]
      },
      {
        "groupName": "api",
        "elementNamePattern": ["@trpc/*", "@orpc/*", "orpc"]
      },
      {
        "groupName": "db",
        "elementNamePattern": [
          "drizzle-orm",
          "drizzle-orm/*",
          "drizzle-kit",
          "@prisma/*",
          "prisma",
          "@neondatabase/*",
          "neon"
        ]
      },
      {
        "groupName": "auth",
        "elementNamePattern": ["better-auth", "better-auth/*"]
      },
      {
        "groupName": "services",
        "elementNamePattern": ["inngest", "inngest/*", "@polar-sh/*", "@sentry/*", "sentry/*"]
      },
      {
        "groupName": "ui",
        "elementNamePattern": [
          "@radix-ui/*",
          "lucide-react",
          "class-variance-authority",
          "cva",
          "clsx",
          "tailwind-merge",
          "tailwind-variants",
          "fabric",
          "konva",
          "react-konva",
          "@excalidraw/*"
        ]
      }
    ],
    "groups": [
      "side-effect",
      "side-effect-style",
      { "newlinesBetween": true },
      "builtin",
      { "newlinesBetween": true },
      "react",
      ["next", "tanstack"],
      ["expo", "desktop"],
      ["backend", "api"],
      ["db", "auth"],
      "services",
      "ui",
      "external",
      { "newlinesBetween": true },
      "internal",
      { "newlinesBetween": true },
      ["parent", "sibling", "index"],
      { "newlinesBetween": true },
      "style",
      "unknown"
    ]
  }
}
```

### Per-Project Config

In any project root, create `.oxfmtrc.json` to override the global config:

```bash
# Generate default config
oxfmt --init

# Or migrate from Prettier / Biome
oxfmt --migrate prettier
oxfmt --migrate biome
```

> Oxfmt looks for `.oxfmtrc.json` in the project root first; if not found, it falls back to `~/.oxfmtrc.json`.

## 9. VS Code

### Settings

Open the Command Palette (`Cmd+Shift+P`), run **Preferences: Open User Settings (JSON)**, and paste:

```jsonc
{
  // APPEARANCE
  "window.commandCenter": true,
  "workbench.colorTheme": "Solarized Dark",
  "workbench.iconTheme": "symbols",

  // --- Typography ---
  "editor.fontSize": 14,
  "editor.fontFamily": "'JetBrains Mono NL','JetBrains Mono', 'Zed Mono', monospace",
  // "editor.lineHeight": 2,
  "editor.fontWeight": "400",
  // "editor.letterSpacing": 0.5,
  "editor.fontLigatures": true,
  "editor.codeLensFontFamily": "JetBrains Mono",
  "editor.inlayHints.fontFamily": "JetBrains Mono",
  "terminal.integrated.fontLigatures": true,

  // --- UI Minimalism ---
  "editor.cursorStyle": "line",
  "editor.cursorBlinking": "smooth",
  "editor.cursorSmoothCaretAnimation": "on",
  "workbench.activityBar.location": "top",
  "workbench.sideBar.location": "right",
  "editor.minimap.enabled": true,
  "editor.scrollbar.vertical": "hidden",
  "editor.scrollbar.horizontal": "hidden",
  "editor.overviewRulerBorder": false,
  "editor.hideCursorInOverviewRuler": true,
  "editor.guides.indentation": true,
  "editor.renderLineHighlight": "none",
  "editor.occurrenceHighlight": "off",
  "editor.selectionHighlight": false,
  "editor.bracketPairColorization.enabled": true,
  "workbench.secondarySideBar.defaultVisibility": "hidden",

  // --- Breadcrumbs (The file path bar) ---
  "breadcrumbs.enabled": true,
  "breadcrumbs.icons": false,
  "breadcrumbs.symbolPath": "off",

  // --- Tab & Navigation ---
  "workbench.editor.showTabs": "multiple",
  "workbench.editor.tabSizing": "shrink",
  "workbench.editor.labelFormat": "default",
  "workbench.editor.showIcons": false,
  "workbench.editor.navigationControl": true,
  "workbench.editor.customLabels.patterns": {
    "**/app/**/page.tsx": "${dirname} - page.tsx",
    "**/app/**/*slug*/page.tsx": "${dirname(1)}/[slug] - page.tsx",
    "**/app/**/{layout,route}.{tsx,ts}": "${dirname} - ${filename}.${extname}",
    "*/{components,hooks,lib,modules,server}/**/.{ts,tsx}": "${dirname} - ${filename}.${extname}",
  },

  // --- Editor Behavior ---
  "editor.lineNumbers": "on",
  "editor.glyphMargin": false,
  "editor.folding": false,
  "editor.matchBrackets": "always",
  "editor.renderWhitespace": "none",
  "workbench.tree.indent": 16,
  "workbench.tree.renderIndentGuides": "none",
  "windowColors.askToColorizeRepoWhenOpened": false,
  "window.customTitleBarVisibility": "auto",

  // --- COLOR CUSTOMIZATIONS ---
  "workbench.colorCustomizations": {
    "[Ayu Mirage Zed]": {
      "editor.background": "#1A1A1A",
      "editorGutter.background": "#1A1A1A",
      "breadcrumb.background": "#1A1A1A",
      "breadcrumb.foreground": "#666666",
      "breadcrumb.focusForeground": "#999999",
      "breadcrumb.activeSelectionForeground": "#AAAAAA",
      "sideBar.background": "#141414",
      "sideBar.border": "#141414",
      "activityBar.background": "#141414",
      "activityBar.border": "#141414",
      "editorGroupHeader.tabsBackground": "#141414",
      "editorGroupHeader.tabsBorder": "#141414",
      "tab.activeBackground": "#141414",
      "tab.inactiveBackground": "#141414",
      "tab.border": "#141414",
      "terminal.background": "#141414",
      "panel.background": "#141414",
      "panel.border": "#141414",
      "statusBar.background": "#141414",
      "statusBar.border": "#141414",
      "focusBorder": "#00000000",
      "input.border": "#00000000",
      "input.background": "#252525",
      "quickInput.background": "#141414",
      "quickInput.foreground": "#CCCCCC",
      "quickInputList.focusBackground": "#2d2d2d",
      "quickInputTitle.background": "#141414",
      "pickerGroup.foreground": "#575757",
      "widget.border": "#333333",
      "widget.shadow": "#000000aa",
    },
  },

  // --- CSS LOADER (This makes the "/" happen) ---
  // "vscode_custom_css.imports": ["file:///Users/ali/.config/Code/zed-style.css"],

  // EDITOR
  "typescript.referencesCodeLens.enabled": true,
  "explorer.compactFolders": false,
  "javascript.updateImportsOnFileMove.enabled": "always",
  "editor.tabSize": 2,
  // "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.defaultFormatter": "biomejs.biome",
  // "editor.defaultFormatter": "oxc.oxc-vscode",
  "editor.formatOnSave": true,
  "editor.formatOnSaveMode": "file",
  "editor.codeActionsOnSave": {
    // "source.format.oxc": "always",
    "source.fixAll.oxc": "always", // OXC lint fixes on save (only applies to files OXC supports)
  },
  "[javascript]": {
    "editor.defaultFormatter": "oxc.oxc-vscode", // OXC handles JS family
  },
  "[javascriptreact]": {
    "editor.defaultFormatter": "oxc.oxc-vscode", // OXC handles JSX family
  },
  "[typescript]": {
    "editor.defaultFormatter": "oxc.oxc-vscode", // OXC handles TS family
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "oxc.oxc-vscode", // OXC handles TSX family
  },
  "[html]": {
    "editor.defaultFormatter": "oxc.oxc-vscode", // OXC handles HTML family
  },
  "[css]": {
    "editor.defaultFormatter": "oxc.oxc-vscode", // OXC handles CSS family
  },
  "[scss]": {
    "editor.defaultFormatter": "oxc.oxc-vscode", // OXC handles SCSS family
  },
  "[less]": {
    "editor.defaultFormatter": "oxc.oxc-vscode", // OXC handles LESS family
  },
  // "[json]": {
  // 	"editor.defaultFormatter": "oxc.oxc-vscode" // OXC handles JSON family
  // },
  // "[jsonc]": {
  // 	"editor.defaultFormatter": "oxc.oxc-vscode" // OXC handles JSONC family
  // },
  "[yaml]": {
    "editor.defaultFormatter": "oxc.oxc-vscode", // OXC handles YAML family
  },
  "[toml]": {
    "editor.defaultFormatter": "oxc.oxc-vscode", // OXC handles TOML family
  },
  "[markdown]": {
    "editor.defaultFormatter": "oxc.oxc-vscode", // OXC handles LESS family
  },
  // "[typescriptreact]": {
  //   "editor.defaultFormatter": "biomejs.biome",
  // },
  // "[liquid]": {
  //   "editor.defaultFormatter": "Shopify.theme-check-vscode",
  // },
  "symbols.hidesExplorerArrows": false,
}
```

> **Note:** Update the `vscode_custom_css.imports` path to match your OS and username.

### Custom CSS

Create the config directory and CSS file:

```bash
mkdir -p ~/.config/Code
```

Create `~/.config/Code/zed-style.css` with the Zed-inspired breadcrumb/tab/sidebar styling (included in this repo).

### Extensions

Install the following VS Code extensions:

- [Better Comments](https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments) — Human-friendly comment annotations
- [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker) — Catch spelling mistakes in code
- [Color Highlight](https://marketplace.visualstudio.com/items?itemName=naumovs.color-highlight) — Highlight CSS colors inline
- [Error Lens](https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens) — Show errors and warnings inline
- [Even Better TOML](https://marketplace.visualstudio.com/items?itemName=tamasfe.even-better-toml) — TOML language support
- [Hono](https://marketplace.visualstudio.com/items?itemName=Hono.hono-snippets) — Hono framework snippets
- [Import Cost](https://marketplace.visualstudio.com/items?itemName=wix.vscode-import-cost) — Display import size inline
- [Oxc](https://marketplace.visualstudio.com/items?itemName=oxc.oxc-vscode) — OXC linter & formatter
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) — Code formatter
- [Pretty TypeScript Errors](https://marketplace.visualstudio.com/items?itemName=yoavbls.pretty-ts-errors) — Readable TypeScript errors
- [Prisma](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma) — Prisma schema language support
- [Rainbow CSV](https://marketplace.visualstudio.com/items?itemName=mechatroner.rainbow-csv) — Colorize CSV columns
- [Shopify Liquid](https://marketplace.visualstudio.com/items?itemName=Shopify.theme-check-vscode) — Liquid template language support
- [Symbols](https://marketplace.visualstudio.com/items?itemName=castrogusttavo.symbols) — File icon theme
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) — Tailwind autocomplete and linting
- [TODO Highlight](https://marketplace.visualstudio.com/items?itemName=wayou.vscode-todo-highlight) — Highlight TODOs and FIXMEs
- [YAML](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml) — YAML language support

### Enable Custom CSS

1. Open the Command Palette (`Cmd+Shift+P`) and run **Enable Custom CSS and JS**
2. VS Code will prompt to restart — click **Restart**
3. If a warning appears: _"Your Code installation appears to be corrupt. Please reinstall."_ — click **Don't Show Again** (this is normal when using Custom CSS and JS Loader)
4. After restart, the Zed-inspired styling from `zed-style.css` will be applied
