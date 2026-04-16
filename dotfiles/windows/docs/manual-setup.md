# Manual Setup

Manual, non-wizard setup path for this dotfiles repo.

Follow these steps to set up each tool individually.

## 1. Terminal Emulator

**WezTerm (Recommended)**

```powershell
winget install --id wez.wezterm
```

## 2. PowerShell 7

```powershell
winget install --id Microsoft.PowerShell
```

After installation, open a new PowerShell 7 terminal (`pwsh`) instead of Windows PowerShell 5.

## 3. oh-my-posh (Prompt)

```powershell
winget install --id JanDeDobbeleer.OhMyPosh
```

## 4. Core CLI Tools

```powershell
# Fuzzy finder
winget install --id junegunn.fzf

# Fast find
winget install --id sharkdp.fd

# Better cat
winget install --id sharkdp.bat

# Modern ls
winget install --id eza-community.eza

# Smarter cd
winget install --id ajeetdsouza.zoxide

# Fast grep
winget install --id BurntSushi.ripgrep.MSVC

# Better git diff
winget install --id dandavison.delta
```

## 5. Utility Tools

```powershell
winget install --id JesseDuffield.lazygit
winget install --id Schniz.fnm
winget install --id fastfetch-cli.fastfetch
winget install --id httpie.cli

# btop (optional — install via scoop)
# scoop install btop
```

## 6. Fonts

```powershell
winget install --id DEVCOM.JetBrainsMonoNerdFont
```

## 7. Enable Developer Mode

Required for symlink creation without admin privileges.

Settings → System → For developers → Developer Mode → **On**

## 8. Copy Configuration Files

```powershell
$repo = "C:\path\to\dotfiles-windows"

# PowerShell profile
New-Item -ItemType SymbolicLink -Path "$HOME\Documents\PowerShell\Microsoft.PowerShell_profile.ps1" -Target "$repo\powershell\Profile.ps1"
New-Item -ItemType Junction -Path "$HOME\Documents\PowerShell\modules" -Target "$repo\powershell\modules"
New-Item -ItemType Junction -Path "$HOME\Documents\PowerShell\functions" -Target "$repo\powershell\functions"

# bat
New-Item -ItemType Junction -Path "$env:APPDATA\bat" -Target "$repo\.config\bat"
bat cache --build

# WezTerm
mkdir "$HOME\.config\wezterm" -Force
New-Item -ItemType SymbolicLink -Path "$HOME\.config\wezterm\wezterm.lua" -Target "$repo\.config\wezterm\wezterm.lua"

# oh-my-posh themes
New-Item -ItemType Junction -Path "$HOME\.config\omp-themes" -Target "$repo\.config\omp-themes"

# ripgrep (referenced via $env:RIPGREP_CONFIG_PATH in tools.ps1)

# btop (optional)
New-Item -ItemType Junction -Path "$env:APPDATA\btop" -Target "$repo\.config\btop"

# VS Code custom CSS
New-Item -ItemType SymbolicLink -Path "$env:APPDATA\Code\User\zed-style.css" -Target "$repo\vscode\zed-style.css"

# Claude Code
mkdir "$HOME\.claude" -Force
New-Item -ItemType SymbolicLink -Path "$HOME\.claude\CLAUDE.md" -Target "$repo\.claude\CLAUDE.md"
New-Item -ItemType SymbolicLink -Path "$HOME\.claude\settings.json" -Target "$repo\.claude\settings.json"
New-Item -ItemType SymbolicLink -Path "$HOME\.claude.json" -Target "$repo\.claude.json"

# Git (copy, not symlink)
Copy-Item "$repo\git\.gitconfig" "$HOME\.gitconfig"
Copy-Item "$repo\git\.gitignore_global" "$HOME\.gitignore_global"
```

## 9. OXC (Formatter & Linter)

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

## 10. VS Code

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
  "editor.fontWeight": "400",
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

  // --- Breadcrumbs ---
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

  // --- CSS LOADER ---
  // "vscode_custom_css.imports": ["file:///C:/Users/USERNAME/AppData/Roaming/Code/User/zed-style.css"],

  // EDITOR
  "typescript.referencesCodeLens.enabled": true,
  "explorer.compactFolders": false,
  "javascript.updateImportsOnFileMove.enabled": "always",
  "editor.tabSize": 2,
  "editor.defaultFormatter": "biomejs.biome",
  "editor.formatOnSave": true,
  "editor.formatOnSaveMode": "file",
  "editor.codeActionsOnSave": {
    "source.fixAll.oxc": "always",
  },
  "[javascript]": {
    "editor.defaultFormatter": "oxc.oxc-vscode",
  },
  "[javascriptreact]": {
    "editor.defaultFormatter": "oxc.oxc-vscode",
  },
  "[typescript]": {
    "editor.defaultFormatter": "oxc.oxc-vscode",
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "oxc.oxc-vscode",
  },
  "[html]": {
    "editor.defaultFormatter": "oxc.oxc-vscode",
  },
  "[css]": {
    "editor.defaultFormatter": "oxc.oxc-vscode",
  },
  "[scss]": {
    "editor.defaultFormatter": "oxc.oxc-vscode",
  },
  "[less]": {
    "editor.defaultFormatter": "oxc.oxc-vscode",
  },
  "[yaml]": {
    "editor.defaultFormatter": "oxc.oxc-vscode",
  },
  "[toml]": {
    "editor.defaultFormatter": "oxc.oxc-vscode",
  },
  "[markdown]": {
    "editor.defaultFormatter": "oxc.oxc-vscode",
  },
  "symbols.hidesExplorerArrows": false,
}
```

> **Note:** Update the `vscode_custom_css.imports` path to match your Windows username.

### Custom CSS

The `zed-style.css` file is included in `vscode/` and symlinked to `%APPDATA%\Code\User\` by the setup wizard.

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
