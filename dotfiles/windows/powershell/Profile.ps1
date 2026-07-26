# =============================================================================
# PowerShell Profile — Entry Point
# =============================================================================
# Modular profile: dot-sources all scripts in modules/ and functions/.
# Symlink this file to:
#   ~/Documents/PowerShell/Microsoft.PowerShell_profile.ps1

# Dotfiles config root — setup tool symlinks/copies .config files here
$Global:DotfilesConfig = Join-Path $env:USERPROFILE '.config'

# --- Load modules (feature-grouped config scripts) ---
$modulesDir = Join-Path (Split-Path -Parent $PSCommandPath) 'modules'
if (Test-Path $modulesDir) {
    Get-ChildItem -Path $modulesDir -Filter '*.ps1' |
        Sort-Object Name |
        ForEach-Object { . $_.FullName }
}

# --- Load functions (individual utility functions) ---
$functionsDir = Join-Path (Split-Path -Parent $PSCommandPath) 'functions'
if (Test-Path $functionsDir) {
    Get-ChildItem -Path $functionsDir -Filter '*.ps1' |
        Sort-Object Name |
        ForEach-Object { . $_.FullName }
}

# --- Bun ---
$bunBin = Join-Path $env:USERPROFILE '.bun\bin'
if (Test-Path $bunBin) {
    $env:PATH = "$bunBin;$env:PATH"
}

# --- Node + pnpm ---
# pnpm owns both the package manager and the Node runtime.
# Node lives under $env:PNPM_HOME (`pnpm runtime set node lts -g`) and ships
# WITHOUT npm/npx/corepack by design - use `pnpm` and `pnpx` instead.
# See docs/node-pnpm-setup.md.
$env:PNPM_HOME = Join-Path $env:LOCALAPPDATA 'pnpm'
if (Test-Path $env:PNPM_HOME) {
    if ($env:PATH -notlike "*$env:PNPM_HOME*") {
        $env:PATH = "$env:PNPM_HOME;$env:PATH"
    }
}

