# Changelog

All notable changes to `@heyitsiveen/dotfiles` are documented here.
Format loosely follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [2.0.1] — 2026-08-04

### Changed

- Completed the Emil Kowalski section of `docs/skills.md` (both macOS and Windows payloads) — added `pick-ui-library` and `prototype`, the two skills from [emilkowalski/skills](https://github.com/emilkowalski/skills) the reference was missing, bringing it to all 8. Both are user-invoked only (`disable-model-invocation: true`); a note records how Emil's `prototype` coexists with Matt Pocock's namespaced `mattpocock-skills:prototype`.

## [2.0.0] — 2026-07-26

### Breaking

- **The dotfiles no longer set up fnm.** On macOS, `config.fish` exports `PNPM_HOME` instead of running `fnm env --use-on-cd`; on Windows, `Profile.ps1` gains an equivalent `$env:PNPM_HOME` block. Node installed via `pnpm runtime` ships **without** `npm`, `npx`, and `corepack` — use `pnpm` and `pnpx`. Updating costs you fnm's per-directory Node switching in non-pnpm projects (`devEngines.runtime` replaces `.nvmrc`, but only inside pnpm projects). The previous fnm block is retained commented out in both shell configs, so rolling back is uncommenting it and reinstalling fnm.

### Changed

- **Migrated the whole repo from npm to pnpm.** `pnpm-lock.yaml` replaces `package-lock.json`; `packageManager: "pnpm@11.17.0"` and `devEngines.runtime` (Node `^24.0.0`, `onFail: "download"`) pin the toolchain so pnpm provisions the Node runtime itself — contributors no longer need Node pre-installed. `scripts/check.mjs` and `.husky/pre-commit` now call `pnpm exec` instead of `npx`; `prepare`/`prepublishOnly` call `pnpm run`.
- **CI/publish rebuilt on `pnpm/setup@v1`.** One step replaces `actions/setup-node` + `npm ci` + the cache step in both `ci.yml` and `publish.yml`; it reads the Node version from `devEngines.runtime`. Publishing is now `pnpm publish --access public` over the same OIDC Trusted Publishing flow (no `NPM_TOKEN`). The previous npm steps are kept commented out in both workflows as a documented fallback.
- **Dotfiles payload now sets up Node via pnpm instead of fnm** (`dotfiles/macos/.config/fish/config.fish`): `PNPM_HOME` export replaces the `fnm env --use-on-cd` block, which is retained commented out. Node installed by `pnpm runtime` deliberately ships without npm/npx/corepack — Corepack was removed from Node 25+, so the old `corepack enable` path is a dead end. Per-project Node pinning moves from `.nvmrc` to `devEngines.runtime`; the trade-off is the loss of fnm's `cd`-triggered auto-switching in non-pnpm projects.
- Rewrote `TECH_STACK.md`'s package-management, CI/CD, and release sections — they described a bun-driven pipeline that no longer matched the actual workflows. Updated `README.md`, `CONTRIBUTING.md`, and `docs/testing-and-publishing.md` to pnpm commands throughout.
- Windows tree-sitter-cli install hint (`src/platform.ts`) now suggests `pnpm add -g tree-sitter-cli`, with the npm command kept in the description for users without pnpm. The Node version guard in `src/index.ts` points at `pnpm runtime set node lts -g` instead of nvm/fnm/volta.

### Added

- `docs/pnpm-setup.md` — contributor guide for this repo: installing standalone pnpm, how `devEngines` provisions Node, commands, the husky hook, CI, and the release flow.
- `dotfiles/macos/docs/node-pnpm-setup.md` — end-user guide shipped with the dotfiles: why pnpm owns Node, fresh install, migrating off fnm/nvm/volta, daily commands, per-project pinning, and gotchas.

## [1.2.0] — 2026-07-25

### Changed

- **Tmux no longer auto-attaches on shell startup.** The auto-attach block in `dotfiles/macos/.config/fish/conf.d/60-tmux.fish` is now commented out instead of removed, so opening a terminal lands you in plain Fish rather than the `main` tmux session. Start tmux explicitly with `tmux new-session -A -s main` (or the `tn main` / `ta main` abbreviations), and uncomment the block to restore the previous behaviour. Documented in `dotfiles/macos/README.md` (directory tree, `conf.d` table, and the `60-tmux.fish` note).
- Synced `.claude/settings.json` across both platforms (`dotfiles/macos` and `dotfiles/windows`) with the maintainer's live Claude Code config: added the `heyitsiveen`, `mattpocock`, and `anthropic-agent-skills` marketplaces plus the `heyitsiveen-skills-personal` and `document-skills` plugins; dropped `superpowers`, `feature-dev`, `skill-creator`, `commit-commands`, and the explanatory/learning output styles; pinned `model: opus[1m]`; and set `effortLevel: medium`, `tui: fullscreen`, `autoMemoryEnabled: false`, `autoCompactEnabled: false`, and the input/agent notification preferences. Both platforms now ship an identical file.

## [1.1.15] — 2026-07-25

### Changed

- Rewrote the no-global-installs rule (rule 17, `dotfiles/macos/.claude/CLAUDE.md` and `dotfiles/windows/.claude/CLAUDE.md`, both platforms) as a check-installed-first ladder: a CLI already installed (on PATH, as a project dependency, or an npm script) is invoked directly (`shopify theme dev`, `npm run …`) instead of through a runner; a missing tool runs through the ecosystem's on-demand runner (`npx` / `pnpm dlx` / `bunx` / `pipx run`), never a global install; and only when a runner can't work (persistent binary/venv needed) does a project-local or venv install go on the cleanup ledger. Also scoped the ledger/cleanup step to standalone CLIs that would otherwise need a global install — packages meant as project dependencies install normally through the project's own package manager as part of regular setup, so nothing temporary gets tracked and the rule doesn't trigger.

## [1.1.14] — 2026-07-19

### Added

- Documented three more `emilkowalski/skills` in the Emil Kowalski table (`docs/skills.md`, both platforms): `apple-design` (Apple's fluid, physical motion & interface design — springs, gestures, materials, type), `improve-animations` (read-only audit that produces prioritized findings & fix plans), and `find-animation-opportunities` (restraint-first sweep for moments that genuinely benefit from motion). The section now covers all six upstream skills alongside the existing `emil-design-eng`, `review-animations`, and `animation-vocabulary`.

## [1.1.13] — 2026-07-17

### Changed

- Synced the `mattpocock/skills` reference (`docs/skills.md` quick-reference/intro/table + the full `docs/matt-pocock-workflow.md` deep dive, both platforms) to upstream HEAD [`e9fcdf9`](https://github.com/mattpocock/skills/commit/e9fcdf9) (2026-07-14). **Reverted 1.1.11's wayfinder-first framing:** the main chain is `grill-with-docs → to-spec → to-tickets → implement → code-review` again, with **`/wayfinder` as the on-ramp for efforts too big for one session** — the flow the written SKILL.md and `ask-matt` router actually encode. Matt's v1.1-video "default to Wayfinder instead" is kept as a sourced *spoken* caveat, not the spine. Also adopted model-tier vocabulary (Smartest/Latest = Fable 5, Fast/Cheap = Haiku 4.5; Pocock names skills, never models), added the two new `in-progress/` skills (`setup-ts-deep-modules`, `to-questionnaire`) and the 40-skill count (22 promoted + 18 experimental), and documented `/wayfinder`'s research-subagent parallelism (PRs #534/#535/#538). Recorded as deep-dive ADR #10.
- Slimmed `docs/skills.md`'s Engineering Workflow section (both platforms): removed the numbered "Quick reference — recommended order" walkthrough that duplicated the deep dive — it now points to `matt-pocock-workflow.md` for per-step model/session/effort detail — and added an `ask-matt`/`wayfinder` **TIP callout** (start at `/ask-matt`; parallelize a wayfinder map's AFK tickets with sub-agents) adapted from the upstream README.

### Added

- Documented the **Claude Code plugin** install path for `mattpocock/skills` (`/plugin marketplace add mattpocock/skills` → `/plugin install mattpocock-skills@mattpocock`) in both docs: a read-only, always-current bundle of the 22 promoted skills that reports **v1.2.0** (native plugin on `main` since 2026-07-13, PR #536) while the newest upstream git tag/CHANGELOG entry is still v1.1.0.

## [1.1.12] — 2026-07-17

### Added

- New global agent rule (`dotfiles/macos/.claude/CLAUDE.md` and `dotfiles/windows/.claude/CLAUDE.md`, both platforms): "When reporting information to me, be extremely concise and sacrifice grammar for the sake of concision." Extends the existing plan-concision rule to all reporting. Renumbered the trailing rules (unresolved-questions list, no-global-installs) so the list stays sequential.

## [1.1.11] — 2026-07-10

### Changed

- Reframed the `mattpocock/skills` reference (`docs/skills.md` quick-reference + intro + table, and the full `docs/matt-pocock-workflow.md` deep dive, both platforms) so **`/wayfinder` is the default entry point / main spine** and `/grill-with-docs` is the single-session shortcut — reversing 1.1.10's "situational on-ramp, not the main spine" framing. The main chain is now `wayfinder → to-spec → to-tickets → implement → code-review`, with `grill-with-docs` (or `grill-me`) branching straight into `to-spec` when an idea fits one session. Driver: Matt Pocock's [v1.1 launch video](https://www.youtube.com/watch?v=A8mokin_YOs) (2026-07-08), where he says to "default to Wayfinder instead" of grill-with-docs and to "get obsessed with Wayfinder," especially for anything touching the front-end. Kept inline as a **sourced caveat** that this is his *spoken* position running ahead of his *written* docs: the live `ask-matt` router still lists grill as main-flow step 1 and files wayfinder under on-ramps, and the v1.1.0 CHANGELOG still calls crowning wayfinder "a v2-sized move, not a 1.1" — no newer version (no v1.2) or dedicated wayfinder post existed at 2026-07-10.

## [1.1.10] — 2026-07-09

### Changed

- Updated the `mattpocock/skills` reference (`docs/skills.md` quick-reference + table, and the full `docs/matt-pocock-workflow.md` deep dive, both platforms) to upstream **v1.1.0** (2026-07-08). The main chain is now `grill-with-docs → to-spec → to-tickets → implement → code-review`: `/to-prd` was renamed to `/to-spec`, and `/to-plan` + `/to-issues` were merged into `/to-tickets` (`/to-issues` deleted), which now slices a **wide refactor** by expand–contract so CI stays green batch to batch. Four skills graduated out of the upstream `in-progress/` bucket into the promoted set and are now documented in full: `wayfinder` (plan work too big for one session as a shared `wayfinder:map` on the tracker — framed as a situational on-ramp, not the main spine), `code-review` (now carries a fixed ~12-smell Fowler baseline on its Standards axis), `research` (a background agent that investigates primary sources and leaves one cited note), and `prototype` (now model-invoked). `grilling` gained a confirmation gate plus a facts-vs-decisions split; `tdd` is now red→green (refactoring moved to `code-review`); `triage` folds in external PRs; and `writing-great-skills` adds the negation ("elephant") and negative-space ("void") steering failure modes. `wayfinder` moved out of the "Not promoted / drafts" table accordingly.

## [1.1.9] — 2026-07-06

### Added

- Explanation under "Set Fish as Default Shell" (`dotfiles/macos/README.md`, macOS only): documents that `chsh -s $(which fish)` changes the account-level `UserShell`, which is what GUI apps like Zed and Claude Desktop use for their embedded terminals — and why a bare zsh still finds `brew` (via the system-wide `/etc/paths.d/homebrew`) but not `node`/`npm`/`npx`/Bun (fnm/Bun PATH setup lives only in the Fish config). Prompted by a support case where Claude Code commands failed in Zed/Claude Desktop because those apps were opening zsh instead of Fish.
- Terminal configs no longer hardcode Fish (macOS only): `command = /opt/homebrew/bin/fish` commented out in `dotfiles/macos/.config/ghostty/config`, and a commented `default_prog` example added to `dotfiles/macos/.config/wezterm/wezterm.lua`. Once Fish is your login shell (`chsh`), both terminals launch it automatically — Ghostty via its `$SHELL`/passwd fallback, WezTerm via the password-database login shell (it ignores `$SHELL`) — so hardcoding Fish per-terminal is redundant; the commented lines stay as an opt-in for anyone who has not changed their login shell. The "Set Fish as Default Shell" (`README.md` step 5) and manual-setup (`docs/manual-setup.md` steps 1 & 3) docs now cover: log-out/verify (`dscl . -read ~/ UserShell`), that `$SHELL` is derived from the login-shell record (never set by hand), revert (`chsh -s /bin/zsh`), System Settings recovery, and that both terminals inherit the login shell.

### Fixed

- `dotfiles/windows/docs/manual-setup.md` was an unconverted copy of the macOS manual setup guide — `brew install --cask`, Homebrew, Fish + `chsh`, `cp -r .config/fish` paths, and `Cmd+Shift+P` throughout, none of it valid on Windows. Rewritten to match the Windows README's actual conventions: winget package IDs, PowerShell 7 + oh-my-posh, profile linking to `$HOME\Documents\PowerShell\Microsoft.PowerShell_profile.ps1` and real Windows config paths (`$env:APPDATA\bat`, `$HOME\.config\wezterm`, etc.), and `Ctrl+Shift+P`.
- Root `README.md`'s home-directory disclosure said the CLI writes to `~/.zshrc` (macOS) — stale, the macOS payload is Fish, not zsh, and nothing in `src/` ever touches `.zshrc`. Reworded to `~/.config/` (Fish config on macOS).

## [1.1.8] — 2026-07-04

### Added

- `brew` Fish function (macOS) that guards against tmux display corruption: after `brew upgrade`/`update` it warns when the tmux binary was replaced while an older tmux server is still running — the version mismatch makes TUIs (Claude Code, lazygit, Neovim) render with missing/blank text until the server is restarted. Documented in `docs/command-reference.md` and the README Troubleshooting section.

### Fixed

- tmux truecolor `terminal-features` pattern for Ghostty (macOS): `ghostty:RGB` → `xterm-ghostty:RGB` so it matches the terminal's real `TERM` (`xterm-ghostty`). The old pattern silently never matched; 24-bit color only worked via Ghostty's `COLORTERM=truecolor` auto-detection.

## [1.1.7] — 2026-07-04

### Added

- Global-install hygiene rule to the Claude Code `CLAUDE.md` (both platforms): prefer `npx`/project-local/venv over global installs; track and remove any temporary install. Distilled from the `figma-shopify-builder` skill's cleanup discipline.

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
