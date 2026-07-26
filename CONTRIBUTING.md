# Contributing

Thanks for your interest in `@heyitsiveen/dotfiles`. This is a small CLI project; contributions of any size are welcome.

## Development setup

Requires **pnpm** — see [docs/pnpm-setup.md](docs/pnpm-setup.md). You don't need
Node installed first; pnpm provisions it from `devEngines.runtime` (Node `^24`).

```bash
git clone https://github.com/heyitsiveen/dotfiles.git
cd dotfiles
pnpm install       # installs deps + Node runtime + runs husky (pre-commit hooks)
pnpm run build     # bundles src/ → dist/index.mjs
pnpm run check     # typecheck + lint + format check
```

To run the CLI locally:

```bash
node dist/index.mjs --dry-run
```

## Pull requests

- Open an issue first for larger changes so we can align on approach.
- Keep PRs focused — one feature or fix per PR.
- Run `pnpm run check` before pushing. The pre-commit hook (husky + lint-staged) will format and lint staged files automatically.
- Commit messages follow the [Conventional Commits](https://www.conventionalcommits.org/) style: `feat(scope): ...`, `fix(scope): ...`, `docs(scope): ...`, `chore(scope): ...`.

## What's in scope

- Fixes for installer/uninstaller safety, theme handling, and OS detection.
- Additional dotfile groups (editor configs, terminal emulators, shells) with matching install + theme support.
- UX polish for the interactive flows (prompts, spinners, messages).
- Documentation improvements, especially the README and macOS/Windows guides.

## What's out of scope

- Personal customisations that don't generalise (hard-coded paths, usernames, aliases that only make sense for a specific workflow).
- Breaking changes to the manifest format without a migration path.
- Adding new themes without the accompanying palette files for every themeable tool.

## Licence

By contributing you agree that your contributions are licensed under the [MIT Licence](LICENSE).
