# Changelog

All notable changes to `@heyitsiveen/dotfiles` are documented here.
Format loosely follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added

- Five more `mattpocock/skills` to the Skills reference (`docs/skills.md`, both platforms): `setup-matt-pocock-skills`, `ask-matt`, `handoff`, `writing-great-skills`, and `teach` — the last marked standalone (a stateful, multi-session learning workspace), off the `idea → ship` flow.
- `review-animations` and `animation-vocabulary` to the Skills reference (`docs/skills.md`, both platforms) under a new consolidated **Emil Kowalski** section (`emilkowalski/skills`) — a motion-code review skill held to a high craft bar, and a reverse-lookup glossary that turns a vague motion description into the precise term.

### Changed

- Reordered the `mattpocock/skills` section to follow the upstream official flow — `setup-matt-pocock-skills` runs once per repo first, then the `idea → ship` flow — and retitled it from "Spec-Driven Workflow" to "Engineering Workflow" to match Matt's framing (small, composable skills, not a process-owning framework).
- Refreshed the Better Auth skill descriptions to match the latest upstream summaries.
- Expanded the Figma Skills section (`figma/mcp-server-guide`) from the single `figma-implement-design` entry to the current curated skill set (`figma-use`, `figma-generate-design`, `figma-code-connect`, `figma-create-design-system-rules`, and more), and noted that the old `figma/dev-mode-mcp-server-guide` slug redirects to this repo.
- Consolidated Emil Kowalski's skills under the `emilkowalski/skills` repo: `emil-design-eng` now installs from `emilkowalski/skills` (previously the single-skill `emilkowalski/skill`), grouped with `review-animations` and `animation-vocabulary` in one section. `transitions-dev` moved to its own **CSS Transitions** section (`jakubantalik/transitions.dev`).

### Removed

- The third-party `emilkowal-animations` mirror (`pproenca/dot-skills`) from the Skills reference — superseded by Emil's official `review-animations` and its `STANDARDS.md` rule catalog.

## [1.1.2] — 2026-06-08

### Added

- Design Engineering & Animation section in the Skills reference (`docs/skills.md`, both platforms) documenting `emil-design-eng`, `emilkowal-animations`, and `transitions-dev`.
- Spec-Driven Workflow section in the Skills reference (`docs/skills.md`, both platforms) documenting the `mattpocock/skills` set — `grill-me`, `grill-with-docs`, `to-prd`, `to-issues`, `tdd`, and `improve-codebase-architecture`.

## [1.1.1] — 2026-05-22

### Changed

- Tide prompt now shows the Apple logo for `tide_os_icon` on macOS instead of the palette-default Tux glyph; other platforms unchanged.

## [1.1.0] — 2026-04-18

### Changed

- Switched primary toolchain from Bun to npm/npx; `package-lock.json` is now the tracked lockfile. Bun still works for contributors who prefer it.
- Lowered tsdown build target to `node20` so the Node-version guard can run before parse errors on older Node.
- Bundle split via dynamic imports — `dist/index.mjs` entry shrinks; per-flow chunks load lazily.

### Added

- Node.js `>=22` runtime guard with a friendly upgrade message (no more raw `SyntaxError`).
- Uninstall confirmation dialog that lists the exact directories about to be deleted.
- Theme-switch "skipped" messages when a target config file is missing.
- Restore flow reports partial-failure counts instead of always saying "complete".
- Atomic manifest writes (tmp file + rename) to survive mid-write interruption.
- CONTRIBUTING.md, CODE_OF_CONDUCT.md, SECURITY.md, CHANGELOG.md.
- `author`, `bugs`, `homepage` fields in `package.json`.
- README call-outs: upfront warning that the CLI modifies `~/.config` and shell profiles; Claude Code personal-config disclosure.

### Removed

- `lazy-lock.json` no longer tracked or shipped — LazyVim generates it per-machine.

## [1.0.4] — 2026-04-18

- fix(tide): auto-configure prompt on `fisher update` via `--auto` — no interactive wizard.
- docs(readme): add demo gif.
- chore(plugins): migrate MCP servers to plugin equivalents.

## [1.0.3] — 2026-04-17

- fix(theme): move `prompt-theme.txt` to `~/.config/heyitsiveen/dotfiles/oh-my-posh/`.
- chore(dotfiles): remove fastfetch from shell greeting.
- chore(config): fix `.gitignore` to exclude only root `/docs/`.

## [1.0.2] — 2026-04-15

- feat(dotfiles): include Tide and Fisher runtime files so a fresh install has a working prompt.
- fix(installer): remove entire config directory on uninstall (no empty leftovers).

## [1.0.1] — 2026-04-12

- feat(index): move update notification inside prompt flow.
- fix(installer): replace terminal configs with defaults on uninstall.
- improve(prompts): use name as label and hint for multiselect pickers.

## [1.0.0] — 2026-04-10

- Initial release: interactive dotfiles CLI for macOS and Windows 11.
