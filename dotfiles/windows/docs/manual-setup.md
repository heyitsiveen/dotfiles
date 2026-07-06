# Manual Setup

Manual, non-wizard setup path for this dotfiles repo.

Follow these steps to set up each tool individually.

## 1. Terminal Emulator

**WezTerm**

```powershell
winget install --id wez.wezterm
```

## 2. PowerShell 7 + oh-my-posh

```powershell
winget install --id Microsoft.PowerShell
winget install --id JanDeDobbeleer.OhMyPosh
```

oh-my-posh renders the prompt; the theme palette is wired up once the profile is linked in step 5 below.

## 3. Core CLI Tools

```powershell
winget install --id sharkdp.bat
winget install --id eza-community.eza
winget install --id junegunn.fzf
winget install --id sharkdp.fd
winget install --id BurntSushi.ripgrep.MSVC
winget install --id dandavison.delta
winget install --id ajeetdsouza.zoxide
```

## 4. Utility Tools

```powershell
winget install --id JesseDuffield.lazygit
winget install --id Schniz.fnm
winget install --id fastfetch-cli.fastfetch
winget install --id httpie.cli
```

Optional: `scoop install btop` (system monitor — no winget package) and `winget install --id DEVCOM.JetBrainsMonoNerdFont` (Nerd Font, needed for icons in eza/oh-my-posh).

## 5. Link PowerShell Profile + Config Files

```powershell
# PowerShell profile — entry point + modules/functions
New-Item -ItemType Directory -Force -Path "$HOME\Documents\PowerShell" | Out-Null
Copy-Item .\powershell\Profile.ps1 "$HOME\Documents\PowerShell\Microsoft.PowerShell_profile.ps1"
Copy-Item -Recurse -Force .\powershell\modules "$HOME\Documents\PowerShell\modules"
Copy-Item -Recurse -Force .\powershell\functions "$HOME\Documents\PowerShell\functions"

# Tool configs
New-Item -ItemType Directory -Force -Path "$HOME\.config\wezterm", "$HOME\.config\omp-themes", "$HOME\.config\ripgrep", "$HOME\.config\btop", "$env:APPDATA\bat" | Out-Null
Copy-Item .\.config\wezterm\wezterm.lua "$HOME\.config\wezterm\wezterm.lua"
Copy-Item -Recurse -Force .\.config\omp-themes\* "$HOME\.config\omp-themes\"
Copy-Item .\.config\ripgrep\config "$HOME\.config\ripgrep\config"
Copy-Item -Recurse -Force .\.config\btop\* "$HOME\.config\btop\"
Copy-Item .\.config\bat\config "$env:APPDATA\bat\config"
Copy-Item -Recurse -Force .\.config\bat\themes "$env:APPDATA\bat\themes"

# Open a new PowerShell 7 window to load the profile
pwsh
```

`Profile.ps1` dot-sources everything under `modules/` and `functions/` alphabetically, then inits fnm and adds Bun to PATH.

## 6. OXC (Formatter & Linter)

### Install Globally

```powershell
# Linter
npm add -g oxlint

# Formatter
npm add -g oxfmt
```

### Install Per-Project

```powershell
# npm
npm add -D oxlint oxfmt

# pnpm
pnpm add -D oxlint oxfmt

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

```powershell
oxfmt --init
# or manually
New-Item "$HOME\.oxfmtrc.json"
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

```powershell
# Generate default config
oxfmt --init

# Or migrate from Prettier / Biome
oxfmt --migrate prettier
oxfmt --migrate biome
```

> Oxfmt looks for `.oxfmtrc.json` in the project root first; if not found, it falls back to `~/.oxfmtrc.json`.

## 7. VS Code

### Settings

Open the Command Palette (`Ctrl+Shift+P`), run **Preferences: Open User Settings (JSON)**, and paste:

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
  // "vscode_custom_css.imports": ["file:///C:/Users/YourUsername/.config/Code/zed-style.css"],

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

> **Note:** Update the `vscode_custom_css.imports` path to match your username.

### Custom CSS

Create the config directory and CSS file:

```powershell
New-Item -ItemType Directory -Force -Path "$HOME\.config\Code"
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

1. Open the Command Palette (`Ctrl+Shift+P`) and run **Enable Custom CSS and JS**
2. VS Code will prompt to restart — click **Restart**
3. If a warning appears: _"Your Code installation appears to be corrupt. Please reinstall."_ — click **Don't Show Again** (this is normal when using Custom CSS and JS Loader)
4. After restart, the Zed-inspired styling from `zed-style.css` will be applied
