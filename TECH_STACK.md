# Tech Stack

Reference doc for the stack, tools, and release pipeline of `@heyitsiveen/dotfiles` — an interactive CLI that sets up dotfiles for macOS and Windows 11.

> **The split personality of this repo:** The **CLI itself** is a Node/TypeScript ESM bundle (`src/` → `dist/`), but the **payload it ships** is shell-level dotfiles (Fish config, PowerShell scripts, Lua for Neovim, etc.). The `files` field in `package.json` bundles the raw `dotfiles/` tree into the npm tarball, so a single `bunx @heyitsiveen/dotfiles` pulls both the compiled CLI and the source dotfiles together.

---

## Table of Contents

- [Runtime & Language](#runtime--language)
- [Package Management & Build](#package-management--build)
- [Code Quality](#code-quality)
- [CLI Framework](#cli-framework)
- [Source Architecture](#source-architecture)
- [CI/CD](#cicd)
- [Payload — The Dotfiles Themselves](#payload--the-dotfiles-themselves)
- [Theme System](#theme-system)
- [Release Flow](#release-flow)
- [TL;DR](#tldr)

---

## Runtime & Language

| Layer | Choice | Rationale |
|---|---|---|
| **Runtime** | Node.js `>=22` (ESM) | Modern ESM, top-level await, native `fetch` |
| **Language** | TypeScript 6.x (strict) | Single source of truth for CLI logic types |
| **Target** | `ES2025` / `node22` | Keeps output lean — no transpilation overhead |
| **Module mode** | `"module": "preserve"` + `verbatimModuleSyntax: true` | Forces explicit `import type` — catches runtime/type mix-ups at compile time |

Compiler config: `tsconfig.json` (strict, `noEmit: true`, `target: ES2025`, `module: preserve`).

---

## Package Management & Build

| Tool | Role |
|---|---|
| **Bun** | Dev + CI install + local scripts (`bun install`, `bun run build`) — primary |
| **npm** | Publish only (OIDC Trusted Publishing via `id-token: write`) |
| **tsdown** | Bundler — compiles `src/index.ts` → `dist/index.mjs` (ESM, node22 target, shims enabled) |
| **TypeScript** | Typechecking only (`--noEmit`) — tsdown does the actual transpile/bundle |

Build config: `tsdown.config.ts`.

> **Why split bun and npm?** Bun is faster for installs and script execution locally and in CI. But npm publishing with OIDC (Trusted Publishing) requires the official `npm publish` command on `registry.npmjs.org` with `id-token: write` — `bun publish` doesn't integrate with npm's OIDC flow. So the workflow uses bun for everything **except** the final `npm publish` step (see `.github/workflows/publish.yml:44`).

---

## Code Quality

| Tool | Role | Notes |
|---|---|---|
| **oxlint** | Linter | Rust-based — ~50–100× faster than ESLint |
| **oxfmt** | Formatter | Rust-based — Prettier replacement from the same oxc project |
| **tsc** | Type check | `--noEmit` (types only, no output) |
| **husky + lint-staged** | Pre-commit hook | Runs oxfmt + oxlint on staged `.ts` files, then tsc on the whole project |
| **`scripts/check.mjs`** | Unified check runner | Wraps typecheck/lint/format with `@clack/prompts` spinners |

Lint config: `.oxlintrc.json` (5 rules: `no-unused-vars: warn`, `eqeqeq: error`, `no-var: error`, `prefer-const: error`, `no-console: off`).

> **The oxc ecosystem bet:** The project picked `oxlint` + `oxfmt` (both part of [oxc](https://oxc.rs)) over the ESLint/Prettier pairing. `.oxlintrc.json` is deliberately minimal — oxlint is opinionated and ships with sensible defaults. The trade-off: less rule coverage than ESLint's ecosystem, but roughly 100× faster feedback, which matters when it runs on every keystroke in a pre-commit hook.

---

## CLI Framework

| Library | Role | Entry point |
|---|---|---|
| **@clack/prompts** | Interactive TUI (intro/outro, spinners, select, confirm, multiselect) | `src/prompts.ts`, `scripts/check.mjs` |
| **citty** | Command / flag parsing, subcommands, help text | `src/index.ts:4` |
| **picocolors** | ANSI colour (tiny, zero-dep alternative to chalk) | `src/index.ts:5` |
| **fs-extra** | `remove`, `pathExists`, `ensureDir` — richer than `node:fs` | `src/installer.ts` |

> **Why @clack + citty together?** citty handles the declarative command layer (flags, help, subcommands); @clack handles the interactive layer (prompts when flags aren't provided). It's a clean separation — the CLI degrades gracefully from fully interactive (zero flags) to fully scripted (`--theme vercel --dry-run`) without if-branches scattered through the code.

---

## Source Architecture

All source lives in `src/` and compiles to a single `dist/index.mjs`.

| File | Responsibility |
|---|---|
| `index.ts` | Citty entry — flag wiring, dispatch to flows |
| `prompts.ts` | Interactive flows (first-run, re-run, theme switch, uninstall, restore) |
| `installer.ts` | Filesystem ops — install/uninstall/manifest (tracks installed groups) |
| `theme.ts` | Theme application across tools (Fish/Tide, oh-my-posh, bat, btop, etc.) |
| `platform.ts` | OS detection, group definitions, install commands per OS |
| `update-check.ts` | Notifies user when a newer npm version is available |
| `constants.ts` | `PACKAGE_NAME`, `VERSION`, `THEMES`, `MANIFEST_DIR` |

`MANIFEST_DIR` resolves to `~/.config/heyitsiveen/dotfiles/` — the single directory holding all CLI state (oh-my-posh prompt theme, per-tool manifests, backups).

---

## CI/CD

| Workflow | Trigger | Steps |
|---|---|---|
| **CI** (`ci.yml`) | push/PR to `main` | `bun ci` → typecheck → lint → format check → build |
| **Publish** (`publish.yml`) | GitHub Release published | Same checks + `npm publish --access public` (OIDC) |

Both use:
- `oven-sh/setup-bun@v2` for bun
- `actions/setup-node@v6` only on publish (for `npm publish`)
- `actions/cache@v5` keyed on `bun.lock` hash
- `concurrency` group that cancels in-progress runs on new pushes (CI only)

> **Why OIDC Trusted Publishing over `NPM_TOKEN`?** Trusted Publishing uses short-lived OIDC tokens minted per-workflow-run — no long-lived secret stored in GitHub. If the repo is ever compromised, there's no token to exfiltrate. The cost: you must configure the GitHub repo + workflow as a trusted publisher on npmjs.com once. After that, `npm publish` "just works" in CI with `id-token: write` permission (`.github/workflows/publish.yml:9`).

---

## Payload — The Dotfiles Themselves

### macOS (`dotfiles/macos/`)

| Tool | Description |
|---|---|
| **Fish** | `config.fish`, 8 `conf.d/` modules, 7 functions, 3 Tide palettes, Fisher + Tide committed in-repo |
| **Ghostty / WezTerm** | Terminal emulators, JetBrains Mono NF, themed |
| **tmux** | 6 config files split by concern (keybinds, statusbar, pane, popup, notifications) |
| **Neovim** | LazyVim-based, solarized-osaka, Snacks, Mason (oxfmt + oxlint), conform |
| **bat / btop / ripgrep / fastfetch** | CLI tool configs |
| **Claude Code** | 6 MCP servers, `CLAUDE.md`, settings |

### Windows (`dotfiles/windows/`)

| Tool | Description |
|---|---|
| **PowerShell 7** | Profile, 5 modules, 3 functions |
| **oh-my-posh** | 3 TOML prompt themes (parallel to Fish Tide on macOS) |
| **WezTerm** | Windows-adapted config |
| **Neovim** | Same LazyVim config as macOS (portable) |
| **bat / btop / ripgrep / fastfetch** | CLI tool configs |

> **Why commit Fisher + Tide in-repo?** A fresh `stow .` gives you a working Tide prompt with no `fisher install` or `tide configure` step. The `_tide_init_install` hook runs `tide configure --auto` with all flags hardcoded, so `fisher update` silently applies the full prompt structure without the interactive wizard.

---

## Theme System

Three themes applied uniformly across every themeable tool via `src/theme.ts`:

| Theme | Style |
|---|---|
| **Solarized Dark** | Warm, low-contrast dark theme (default) |
| **Vercel** | Minimal, high-contrast dark theme |
| **Vesper** | Soft, warm dark theme with orange accents |

Theme state persists in `~/.config/heyitsiveen/dotfiles/` (the `MANIFEST_DIR` constant). Switch with `bunx @heyitsiveen/dotfiles --theme <name>` — the CLI rewrites every installed tool's theme config in one pass.

---

## Release Flow

```
local:   npm version patch → git push --tags
github:  gh release create vX.Y.Z → triggers publish.yml
ci:      bun ci → checks → build → npm publish (OIDC)
npm:     package goes live
```

> **Why `npm version` not `bun version`?** `npm version` creates an annotated tag (`v1.0.3`) that CI keys off via `on.release.types: [published]`. Bun's version command exists but doesn't create the git tag the same way. Bun stays as your dev/install tool; npm owns versioning + publish.

`package.json` helper scripts that run automatically:
- `"prepare"`: runs on `npm install` — installs husky hooks + builds
- `"prepublishOnly"`: runs before `npm publish` — executes full check pipeline

---

## TL;DR

**CLI:** Node 22 + TypeScript 6 (strict, ESM) → tsdown bundle → Bun-driven dev loop → oxc (oxlint/oxfmt) for quality → @clack/prompts + citty for UX → husky/lint-staged pre-commit gate → GitHub Actions CI + OIDC publish to npm.

**Payload:** Fish/Tide/Fisher (macOS) & PowerShell/oh-my-posh (Windows), plus cross-platform WezTerm, Neovim/LazyVim, bat, btop, ripgrep, tmux, Claude Code.

**One-liner:** A Node CLI that ships a curated cross-platform shell environment, glued together by a three-theme system.
