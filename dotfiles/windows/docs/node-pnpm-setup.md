# Node + pnpm Setup (Windows)

**One tool owns both the package manager and the Node runtime: pnpm.**

No fnm. No nvm-windows. No volta. No npm, no npx, no corepack.

---

## Why pnpm owns Node

- **Corepack is a dead end.** The Node TSC voted to stop distributing it; it was removed from Node 25+. Anything built on `corepack enable` has an expiry date.
- **One tool instead of two.** `fnm` managed Node, npm managed packages. pnpm does both, so there's one thing to install, one thing to update, one PATH entry.
- **Node without npm is a supported state.** Since pnpm v11, installing a runtime deliberately *does not* extract the bundled `npm`, `npx`, or `corepack` from the Node archive. This isn't a workaround — it's the documented behaviour.
- **Runtimes get pinned in the lockfile.** A project declares its Node version in `devEngines.runtime`, and pnpm records the resolved version *and checksum* in `pnpm-lock.yaml`. Stronger than an `.nvmrc` that nothing enforces.

---

## Fresh install

### 1. Install pnpm (standalone binary)

In PowerShell:

```powershell
iwr https://get.pnpm.io/install.ps1 -useb | iex
```

The standalone binary bundles its own Node, so this works on a machine with no Node at all. It installs to `%LOCALAPPDATA%\pnpm` and sets `PNPM_HOME`.

> **Don't `winget install pnpm`** if that package pulls Node as a dependency — the point of this setup is that pnpm supplies Node, not the other way around.

### 2. Install Node

```powershell
pnpm runtime set node lts -g
```

`lts` tracks the current LTS line (24.x "Krypton" as of July 2026, rolling to 26 in October). Use `latest` for the Current line, or a specific major like `24`.

### 3. Shell configuration

Already in `powershell/Profile.ps1` in this repo:

```powershell
$env:PNPM_HOME = Join-Path $env:LOCALAPPDATA 'pnpm'
if (Test-Path $env:PNPM_HOME) {
    if ($env:PATH -notlike "*$env:PNPM_HOME*") {
        $env:PATH = "$env:PNPM_HOME;$env:PATH"
    }
}
```

The installer also sets `PNPM_HOME` as a persistent user environment variable. The profile block makes the current session consistent regardless.

### 4. Verify

```powershell
node -v                    # v24.x, from %LOCALAPPDATA%\pnpm
Get-Command node           # should resolve under PNPM_HOME
pnpm -v                    # 11.x
pnpx --version
Get-Command npm, npx -ErrorAction SilentlyContinue   # should find nothing
```

---

## Migrating from fnm / nvm-windows / volta

**Install the replacement first, remove the old manager second** — never leave the machine without a Node.

1. Note your global packages so they can be reinstalled:
   ```powershell
   npm ls -g --depth=0
   ```
2. Install pnpm + Node (steps 1–2 above).
3. Reinstall globals through pnpm:
   ```powershell
   pnpm add -g tree-sitter-cli    # …and whatever else step 1 listed
   ```
4. Verify everything works (step 4 above) **before** removing anything.
5. Remove the old manager:
   ```powershell
   winget uninstall Schniz.fnm
   Remove-Item -Recurse -Force "$env:APPDATA\fnm" -ErrorAction SilentlyContinue

   # nvm-windows
   winget uninstall CoreyButler.NVMforWindows
   ```
6. Remove its profile hook and any leftover PATH entries (System Properties → Environment Variables).

**Rollback:** reinstall via winget and restore the profile block. Nothing above is irreversible.

### `%USERPROFILE%\.npmrc`

pnpm reads the same `.npmrc` as npm, so registry config and auth tokens carry over untouched — **do not delete it blindly**. That said, a plaintext `_authToken` on disk is a standing risk; if your CI publishes via OIDC trusted publishing, you don't need a local token at all.

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

> **Caveat, and it's the real cost of this setup:** this only applies *inside pnpm projects*, for commands run *through pnpm*. There is no directory-triggered auto-switch like fnm's. A repo using npm or yarn with an `.nvmrc` will just get the one global Node.

---

## Gotchas

- **`npx` does not exist.** Copy-pasted commands from any README in the ecosystem will fail. Retype them as `pnpx`. This is a deliberate trade-off, not a bug.
- **`npm` does not exist either.** Node installed by `pnpm runtime` omits it. If some tool genuinely requires the npm CLI, `pnpm add -g npm` installs it without making it the default.
- **tree-sitter-cli** (needed by LazyVim on Windows) installs with `pnpm add -g tree-sitter-cli` and still requires a C compiler — VS Build Tools or `scoop install gcc`.
- **PATH ordering.** If an old fnm/nvm shim directory is still on PATH, it can shadow the pnpm-managed `node`. Check with `Get-Command node -All`.
