# Changelog

All notable changes to `@heyitsiveen/dotfiles` are documented here.
Format loosely follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [1.1.6] — 2026-07-02

### Added

- `setup-pre-commit` and `git-guardrails-claude-code` to the `mattpocock/skills` reference (`docs/skills.md` table + full entries in `matt-pocock-workflow.md`, both platforms): husky + lint-staged commit-time quality gates, and the PreToolUse hook that blocks dangerous git commands — both model-invoked, from the upstream misc bucket (non-promoted since 2026-07-01), documented because they're part of the local install. Their one-line rows moved out of the "Not promoted / drafts" table into the model-invoked reference.

## [1.1.5] — 2026-07-02

### Added

- "Quick reference — official order" in `matt-pocock-workflow.md` and atop the Engineering Workflow section of `docs/skills.md` (both platforms, identical block): the numbered official pipeline — per step: command · model · session · when-to-use — plus plain-language `/handoff` vs `/compact` guidance, off-chain skills, and standing rules; every claim sourced or explicitly marked "not specified by Pocock". Supersedes the interim "system on one page" table, which never shipped.
- "What's literally in his own files" inventory in the CLAUDE.md section of `matt-pocock-workflow.md` (both platforms): his six-word global CLAUDE.md, the generated per-repo `## Agent skills` block, the thin AGENTS.md glossary pointer, and the plan-mode rules he has since dropped.

### Changed

- Engineering Workflow intro (`docs/skills.md`, both platforms) trimmed of the chain narration now covered by the quick reference directly above it.

## [1.1.4] — 2026-07-02

### Added

- `matt-pocock-workflow.md` deep reference (`docs/`, both platforms): Matt Pocock's full AI coding workflow from primary sources — the 7 phases, the current five-step skill chain (`grill-with-docs → to-prd → to-issues → implement → code-review`), model strategy (frontier for grilling, Sonnet-implements/Opus-reviews, Opus 4.8 medium as daily driver), session hygiene (~100–120k smart zone; clear vs compact vs handoff), CLAUDE.md philosophy (never `/init`; undiscoverable + globally relevant), the v1 user-invoked/model-invoked taxonomy, subagent patterns (Sandcastle, DIY sub-agents via handoff), per-skill walkthroughs for the 20-skill promoted set, install/repair commands, decisions, glossary, and dated source links.
- Six skills to the `mattpocock/skills` table (`docs/skills.md`, both platforms): `implement`, `code-review`, `grilling`, `domain-modeling`, `codebase-design`, and `resolving-merge-conflicts` — the v1.0.0 shared model-invoked layer plus the post-v1 build and review steps.

### Changed

- Engineering Workflow section (`docs/skills.md`, both platforms) updated to the upstream flow as of 2026-07-01: the main chain now ends `implement → code-review` instead of `tdd` (tdd runs inside implement at pre-agreed seams); `diagnose` renamed `diagnosing-bugs` (v1.0.0 breaking rename); `grill-me` noted as de-emphasized for coding in favour of `grill-with-docs`; the table gains an Invocation column (user-invoked orchestrators vs model-invoked disciplines) and a pointer to the new deep reference.

## [1.1.3] — 2026-07-02

### Added

- Eight more `mattpocock/skills` to the Skills reference (`docs/skills.md`, both platforms): `setup-matt-pocock-skills`, `ask-matt`, `handoff`, `writing-great-skills`, `teach`, `prototype`, `triage`, and `diagnose` — each placed in Matt's official taxonomy: main flow (with the `prototype` detour), the `triage` on-ramp, `diagnose` / `tdd` for building, and the standalone `teach` / `writing-great-skills`.
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
