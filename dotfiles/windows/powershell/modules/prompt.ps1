# =============================================================================
# Prompt — oh-my-posh initialization
# =============================================================================
# Converted from: dotfiles-macos/.config/fish/conf.d/70-tide.fish
# Reads the active palette from ~/.config/heyitsiveen/dotfiles/prompt-theme.txt
# Valid values: solarized-dark (default), vercel, vesper

if (-not (Get-Command oh-my-posh -ErrorAction SilentlyContinue)) { return }

# Read persisted theme preference (defaults to solarized-dark)
$themeConfigDir  = Join-Path $env:USERPROFILE '.config\heyitsiveen\dotfiles\oh-my-posh'
$themeConfigFile = Join-Path $themeConfigDir 'prompt-theme.txt'
$validThemes     = @('solarized-dark', 'vercel', 'vesper')

if (Test-Path $themeConfigFile) {
    $palette = (Get-Content $themeConfigFile -Raw).Trim()
} else {
    $palette = 'solarized-dark'
}

if ($palette -notin $validThemes) { $palette = 'solarized-dark' }

$themePath = Join-Path $Global:DotfilesConfig "omp-themes\$palette.omp.toml"

oh-my-posh init pwsh --config $themePath | Out-String | Invoke-Expression
