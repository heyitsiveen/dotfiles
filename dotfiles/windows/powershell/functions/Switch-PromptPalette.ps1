# =============================================================================
# Switch-PromptPalette — Theme switcher for oh-my-posh
# =============================================================================
# Converted from: dotfiles-macos/.config/fish/functions/tide_palette.fish
# Usage:
#   Switch-PromptPalette solarized-dark   # (default)
#   Switch-PromptPalette vercel
#   Switch-PromptPalette vesper
#   Switch-PromptPalette list             # show available palettes

function Switch-PromptPalette {
    param(
        [ValidateSet('solarized-dark', 'vercel', 'vesper', 'list')]
        [string]$Palette = 'list'
    )

    if ($Palette -eq 'list') {
        Write-Host 'Available palettes:'
        Write-Host '  solarized-dark  (default)'
        Write-Host '  vercel'
        Write-Host '  vesper'
        return
    }

    # Persist selection
    $configDir = Join-Path $env:USERPROFILE '.config\dotfiles'
    if (-not (Test-Path $configDir)) {
        New-Item -ItemType Directory -Path $configDir -Force | Out-Null
    }
    Set-Content -Path (Join-Path $configDir 'prompt-theme.txt') -Value $Palette

    # Apply immediately
    $themePath = Join-Path $Global:DotfilesConfig "omp-themes\$Palette.omp.toml"
    oh-my-posh init pwsh --config $themePath | Out-String | Invoke-Expression

    Write-Host "Prompt palette set to: $Palette"
}
