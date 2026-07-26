# Security Policy

## Supported Versions

Only the latest published version of `@heyitsiveen/dotfiles` on npm receives security fixes. Upgrade with:

```bash
pnpm dlx @heyitsiveen/dotfiles@latest
```

## Reporting a Vulnerability

**Please do not open public GitHub issues for security reports.**

If you find a vulnerability — credential leakage, destructive-operation bypass, malicious-payload smuggling via the dotfiles tree, or anything that could harm a user running this CLI — report it privately by one of:

1. Opening a [GitHub private security advisory](https://github.com/heyitsiveen/dotfiles/security/advisories/new) (preferred).
2. Emailing the maintainer directly — contact info is on the maintainer's GitHub profile.

Include:

- A description of the issue.
- Steps to reproduce (or a minimal proof of concept).
- The version you reproduced it on (`pnpm dlx @heyitsiveen/dotfiles --version`) and your OS.
- Any suggested remediation.

## What happens next

- You'll get an acknowledgement within 72 hours.
- We'll work with you to understand scope and impact, then release a fix in the next patch version.
- If the report is valid, you'll be credited in the release notes unless you prefer anonymity.

## Scope

In scope: the CLI itself (`dist/`), the dotfiles payload (`dotfiles/`), build and release pipelines (`.github/workflows/`), dependencies declared in `package.json`.

Out of scope: configurations that users modify post-install, third-party tools the CLI helps install (report those upstream), and personal-preference defaults like the Claude Code config, which are documented in the README as the author's personal setup rather than security defaults.
