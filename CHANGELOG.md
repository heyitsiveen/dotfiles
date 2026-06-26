# Changelog

All notable changes to `@heyitsiveen/dotfiles` are documented here.
Format loosely follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added

- Four more `mattpocock/skills` to the Skills reference (`docs/skills.md`, both platforms): `setup-matt-pocock-skills`, `ask-matt`, `handoff`, and `writing-great-skills`.

### Changed

- Reordered the `mattpocock/skills` section to follow the upstream official flow — `setup-matt-pocock-skills` runs once per repo first, then the `idea → ship` flow — and retitled it from "Spec-Driven Workflow" to "Engineering Workflow" to match Matt's framing (small, composable skills, not a process-owning framework).
- Refreshed the Better Auth skill descriptions to match the latest upstream summaries.

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
