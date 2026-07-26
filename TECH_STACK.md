# Tech Stack

Reference doc for the stack, tools, and release pipeline of `@heyitsiveen/dotfiles` — an interactive CLI that sets up dotfiles for macOS and Windows 11.

> **The split personality of this repo:** The **CLI itself** is a Node/TypeScript ESM bundle (`src/` → `dist/`), but the **payload it ships** is shell-level dotfiles (Fish config, PowerShell scripts, Lua for Neovim, etc.). The `files` field in `package.json` bundles the raw `dotfiles/` tree into the npm tarball, so a single `pnpm dlx @heyitsiveen/dotfiles` pulls both the compiled CLI and the source dotfiles together.

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
| **pnpm** | Everything — install, scripts, CI, and publish. Pinned via `packageManager: "pnpm@11.17.0"` |
| **pnpm runtime** | Also supplies **Node itself**. Version declared in `devEngines.runtime`, resolved + checksummed into `pnpm-lock.yaml` |
| **tsdown** | Bundler — compiles `src/index.ts` → `dist/index.mjs` (ESM, node22 target, shims enabled) |
| **TypeScript** | Typechecking only (`--noEmit`) — tsdown does the actual transpile/bundle |

Build config: `tsdown.config.ts`.

> **Why pnpm for everything?** Previously this repo ran npm in CI (and the docs here described a bun-based flow that no longer matched reality). One tool now covers all of it: pnpm installs deps, runs scripts, provisions the Node runtime, and publishes. Corepack — the old way to pin a package manager — was removed from Node 25+, so `packageManager` is enforced by the pnpm binary itself rather than by Node.
>
> **Why not `brew install pnpm`?** That formula is the JS bundle and requires a separate Node install. The standalone binary bundles its own Node and can `pnpm self-update`.
>
> **Bun** is no longer part of the build/CI path. It's still fine as a local scratch runtime, but `pnpm-lock.yaml` is the source of truth.

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
| **CI** (`ci.yml`) | push/PR to `main` | `pnpm/setup` → typecheck → lint → format check → build |
| **Publish** (`publish.yml`) | GitHub Release published | Same checks + `pnpm publish --access public` (OIDC) |

Both use:
- `pnpm/setup@v1` — installs the standalone pnpm binary **and** the Node version from `devEngines.runtime`, then runs `pnpm install`. Replaces `actions/setup-node` + `oven-sh/setup-bun` + a separate cache step (`cache: true` handles the pnpm store).
- `concurrency` group that cancels in-progress runs on new pushes (CI only)

> **Why OIDC Trusted Publishing over `NPM_TOKEN`?** Trusted Publishing uses short-lived OIDC tokens minted per-workflow-run — no long-lived secret stored in GitHub. If the repo is ever compromised, there's no token to exfiltrate. The cost: you must configure the GitHub repo + workflow as a trusted publisher on npmjs.com once. After that, publishing "just works" in CI with `id-token: write` permission (`.github/workflows/publish.yml:9`).
>
> **pnpm + OIDC caveat:** OIDC publishing regressed in pnpm 11.0.8 ([pnpm#11513](https://github.com/pnpm/pnpm/issues/11513)) and was fixed in [pnpm#11526](https://github.com/pnpm/pnpm/pull/11526). This repo pins 11.17.0. `publish.yml` keeps the old `actions/setup-node` + `npm publish` steps as commented-out fallback in case it ever breaks again.

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

Theme state persists in `~/.config/heyitsiveen/dotfiles/` (the `MANIFEST_DIR` constant). Switch with `pnpm dlx @heyitsiveen/dotfiles --theme <name>` — the CLI rewrites every installed tool's theme config in one pass.

---

## Release Flow

```
local:   pnpm version patch → git push --tags
github:  gh release create vX.Y.Z → triggers publish.yml
ci:      pnpm/setup → checks → build → pnpm publish (OIDC)
npm:     package goes live
```

> `pnpm version patch` creates the annotated tag (`v1.0.3`) that CI keys off via `on.release.types: [published]`.

`package.json` helper scripts that run automatically:
- `"prepare"`: runs on `pnpm install` — installs husky hooks + builds
- `"prepublishOnly"`: runs before `pnpm publish` — executes full check pipeline

---

## TL;DR

**CLI:** Node 24 (provisioned by pnpm) + TypeScript 6 (strict, ESM) → tsdown bundle → pnpm-driven dev loop → oxc (oxlint/oxfmt) for quality → @clack/prompts + citty for UX → husky/lint-staged pre-commit gate → GitHub Actions CI + OIDC publish to npm.

**Payload:** Fish/Tide/Fisher (macOS) & PowerShell/oh-my-posh (Windows), plus cross-platform WezTerm, Neovim/LazyVim, bat, btop, ripgrep, tmux, Claude Code.

**One-liner:** A Node CLI that ships a curated cross-platform shell environment, glued together by a three-theme system.
