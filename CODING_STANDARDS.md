# Coding standards

Read at **review** time, not while writing. This file holds the rules that need **judgement** — the ones no tool can decide. The mechanical rules are not here: they are checks, because a check can fail and a sentence in a Markdown file cannot.

Process and scope live in [`CONTRIBUTING.md`](CONTRIBUTING.md); this is where the review happens. When a check turns out to be wrong, change the rule and the check **in the same commit** — a check nobody believes is worse than no check.

## What the tools already enforce — don't review for these

| Check | Covers | Runs |
| :--- | :--- | :--- |
| `tsc --noEmit` | Types across `src/`, including that every theme map is a total `Record<ThemeName, …>` | pre-commit, CI, `pnpm run check` |
| `oxlint src/` | Lint rules on the installer | pre-commit (staged), CI, `pnpm run check` |
| `oxfmt --check src/` | Formatting on the installer | pre-commit (staged), CI, `pnpm run check` |
| `scripts/check-configs.mjs` | Syntax of every shipped `.fish`, `.lua` and `.ps1`, via each language's own parser | pre-commit (staged), CI, `pnpm run check` |
| `tsdown` build | The package actually builds | CI, `prepublishOnly` |

`pnpm run check` runs all of them. The config check skips a language whose parser isn't installed locally and says so; CI installs fish and lua so nothing is skipped there.

**Why the config check exists:** `src/` is 7 files. The configs it installs are 137. A config with a syntax error used to ship green and break the user's shell on their next login, after the installer had already run — the worst failure this repo has.

## Judgement calls — review for these

### A theme is only added with every palette it needs

`THEMES` in `src/constants.ts` is the canonical list, and TypeScript forces each tool's map in `src/theme.ts` to carry an entry for every theme. What it cannot check is whether the **palette files** behind those entries exist and look right, because some entries name a builtin rather than a file (bat's `Solarized (dark)` ships with bat; its Vercel and Vesper do not).

**Reject:** a new theme whose map entry names a palette file that was never added; a palette added for some themeable tools and not others; a theme added without checking it in every tool that claims support.

### Portability over personal convenience

A config here is installed on someone else's machine. `CONTRIBUTING.md` puts personal customisations that don't generalise out of scope — hard-coded paths, usernames, aliases that only make sense for one workflow.

**Reject:** an absolute path under `/Users/<name>`; a tool assumed present with no guard; a macOS-only construct in a file both platforms install. Guard with a capability test (`command -v`, `type -q`) rather than a platform name wherever the capability is the real condition.

### Parity between macos and windows

The two trees deliberately differ — fish is macOS-only, `omp-themes` is Windows-only — so a diff between them is not automatically a defect, and no check can tell the two apart.

**Reject:** a change to a shared config applied to one tree and not the other; a new dotfile group added for one platform with no decision recorded about the other.

### The manifest format is a contract

The installer reads manifests written by earlier versions. `CONTRIBUTING.md` puts breaking manifest changes without a migration path out of scope.

**Reject:** a renamed or removed manifest field with no migration; a field whose meaning changed while its name stayed.

### Vendored configs are not ours to edit

`functions/tide/`, `completions/tide.fish` and `completions/fisher.fish` come from fisher. They are syntax-checked because a bad vendored update breaks the shell just as hard, but they are not a place to make changes.

**Reject:** a hand-edit to a vendored file. Pin or update the plugin instead, and put local behaviour in `conf.d/70-tide.fish` where it survives the next update.

### Installer safety

Install and uninstall touch a user's home directory. Every destructive step needs a dry-run path and a backup, and `--dry-run` has to stay honest.

**Reject:** a write with no dry-run branch; an uninstall that removes a file the installer didn't create; a backup written somewhere the uninstall doesn't look.

### Commit messages

[Conventional Commits](https://www.conventionalcommits.org/): `feat(scope): …`, `fix(scope): …`, `docs(scope): …`, `chore(scope): …`. Nothing enforces this, and release tooling reads it — so the scope and type are a review item, not a formality. Keep PRs to one feature or fix.
