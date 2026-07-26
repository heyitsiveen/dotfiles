# Node + pnpm Setup

**One tool owns both the package manager and the Node runtime: pnpm.**

No fnm. No nvm. No volta. No npm, no npx, no corepack.

---

## Why pnpm owns Node

- **Corepack is a dead end.** The Node TSC voted to stop distributing it; it was removed from Node 25+. Anything built on `corepack enable` has an expiry date.
- **One tool instead of two.** `fnm` managed Node, npm managed packages. pnpm does both, so there's one thing to install, one thing to update, one PATH entry.
- **Node without npm is a supported state.** Since pnpm v11, installing a runtime deliberately *does not* extract the bundled `npm`, `npx`, or `corepack` from the Node tarball. This isn't a workaround — it's the documented behaviour.
- **Runtimes get pinned in the lockfile.** A project declares its Node version in `devEngines.runtime`, and pnpm records the resolved version *and checksum* in `pnpm-lock.yaml`. Stronger than an `.nvmrc` that nothing enforces.

---

## Fresh install

### 1. Install pnpm (standalone binary)

```bash
PNPM_HOME="$HOME/.local/share/pnpm" curl -fsSL https://get.pnpm.io/install.sh | sh -
```

The standalone binary bundles its own Node, so this works on a machine with no Node at all. Setting `PNPM_HOME` up front keeps everything under `~/.local/share/` instead of the platform default.

> **Do not `brew install pnpm`.** The Homebrew formula is the plain JS bundle and prints `pnpm requires a Node installation to function` — it needs Node from somewhere else, which is the exact problem this setup removes. It also can't `pnpm self-update`.

### 2. Install Node

```bash
pnpm runtime set node lts -g
```

`lts` tracks the current LTS line (24.x "Krypton" as of July 2026, rolling to 26 in October). Use `latest` for the Current line, or a specific major like `24`.

### 3. Shell configuration

Already in `config.fish` in this repo:

```fish
set --export PNPM_HOME "$HOME/.local/share/pnpm"
if test -d "$PNPM_HOME/bin"
    if not contains -- "$PNPM_HOME/bin" $PATH
        set --export PATH $PNPM_HOME/bin $PATH
    end
end
```

Note the PATH entry is `$PNPM_HOME/bin`, not `$PNPM_HOME`.

### 4. Verify

```bash
node -v                          # v24.18.0, from ~/.local/share/pnpm/bin
which node                       # ~/.local/share/pnpm/bin/node
pnpm -v                          # 11.x
pnpx --version
command -v npm npx corepack      # all empty — this is correct
```

---

## Migrating from fnm / nvm / volta

**Install the replacement first, remove the old manager second** — never leave the machine without a Node.

1. Note your global packages so they can be reinstalled:
   ```bash
   npm ls -g --depth=0
   ```
2. Install pnpm + Node (steps 1–2 above).
3. Reinstall globals through pnpm:
   ```bash
   pnpm add -g @shopify/cli     # …and whatever else step 1 listed
   ```
4. Verify everything works (step 4 above) **before** deleting anything.
5. Remove the old manager:
   ```bash
   # fnm
   brew uninstall fnm
   rm -rf ~/.local/share/fnm ~/.local/state/fnm_multishells ~/.cache/fnm_multishells

   # nvm
   rm -rf ~/.nvm

   # volta
   rm -rf ~/.volta
   ```
6. Remove its shell hook (in this repo, the `fnm env --use-on-cd` block in `config.fish` is commented out rather than deleted).

**Rollback** if something goes wrong: `brew install fnm && fnm install 24 && fnm default 24`, then uncomment the block. Nothing above is irreversible.

### `~/.npmrc`

pnpm reads the same `~/.npmrc` as npm, so registry config and auth tokens carry over untouched — **do not delete it blindly**. That said, a plaintext `_authToken` sitting on disk is a standing risk; if your CI publishes via OIDC trusted publishing, you don't need a local token at all.

---

## Daily use

| Task | Command |
| --- | --- |
| Install deps | `pnpm install` |
| Add a dep | `pnpm add <pkg>` / `pnpm add -D <pkg>` |
| Run a one-off tool (was `npx`) | `pnpx <pkg>` or `pnpm dlx <pkg>` |
| Run a project binary | `pnpm exec <bin>` |
| Run a script | `pnpm run <script>` |
| Install a global | `pnpm add -g <pkg>` |
| List globals | `pnpm ls -g --depth=0` |
| Update pnpm itself | `pnpm self-update` |
| Change Node version | `pnpm runtime set node <version> -g` |
| List runtimes | `pnpm runtime list` |

---

## Per-project Node pinning

Instead of `.nvmrc`, declare the runtime in `package.json`:

```json
{
  "devEngines": {
    "runtime": {
      "name": "node",
      "version": "^24.0.0",
      "onFail": "download"
    }
  }
}
```

With `onFail: "download"`, pnpm fetches that Node version automatically and records the exact version + checksum in `pnpm-lock.yaml`. Scripts run under it. CI honours it too — `pnpm/setup@v1` reads `devEngines.runtime` with no `actions/setup-node` step at all.

> **Caveat, and it's the real cost of this setup:** this only applies *inside pnpm projects*, for commands run *through pnpm*. There is no `cd`-triggered auto-switch like `fnm env --use-on-cd`. A client repo using npm or yarn with an `.nvmrc` will just get the one global Node. If a project genuinely needs a different major, run it via `pnpm exec` inside a project with `devEngines` set, or switch the global with `pnpm runtime set node <v> -g`.

---

## Gotchas

- **`npx` does not exist.** Copy-pasted commands from any README in the ecosystem will fail with "command not found". Retype them as `pnpx`. This is a deliberate trade-off, not a bug.
- **`npm` does not exist either.** Node installed by `pnpm runtime` omits it. If some tool genuinely requires the npm CLI, `pnpm add -g npm` installs it without making it the default.
- **Never `brew install pnpm`.** See the callout above.
- **`$PNPM_HOME/bin`, not `$PNPM_HOME`.** A common off-by-one when hand-writing the PATH export.
- **Non-Fish shells see none of this.** All PATH exports live in the Fish config only. A bare `/bin/zsh` or `/bin/sh` spawned by another tool will not find `node` or `pnpm`.
