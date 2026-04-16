# =============================================================================
# CLI Tool Integrations
# =============================================================================
# Converted from: dotfiles-macos/.config/fish/conf.d/50-tools.fish
# Note: MANPAGER (bat as man pager) is omitted — man pages not used on Windows.

# --- bat (cat replacement) ---
if (Get-Command bat -ErrorAction SilentlyContinue) {
    # Active theme: Solarized (dark)
    # Alternates (uncomment to switch):
    # $env:BAT_THEME = 'Vercel'
    # $env:BAT_THEME = 'Vesper'
    $env:BAT_THEME = 'Solarized (dark)'

    function cat { bat --paging=never @args }
}

# --- eza (ls replacement) ---
if (Get-Command eza -ErrorAction SilentlyContinue) {
    function ls  { eza --icons --group-directories-first @args }
    function ll  { eza -l --icons --git --header --group-directories-first @args }
    function la  { eza -la --icons --git --header --group-directories-first @args }
    function lt  { eza --tree --level=2 --icons @args }
    function lta { eza --tree --level=2 --icons -a @args }
}

# --- zoxide (smarter cd) ---
if (Get-Command zoxide -ErrorAction SilentlyContinue) {
    Invoke-Expression (& { (zoxide init powershell | Out-String) })
}

# --- ripgrep ---
if (Get-Command rg -ErrorAction SilentlyContinue) {
    $rgConfig = Join-Path $Global:DotfilesConfig 'ripgrep\config'
    if (Test-Path $rgConfig) {
        $env:RIPGREP_CONFIG_PATH = $rgConfig
    }
}

# --- delta (git diff pager) ---
if (Get-Command delta -ErrorAction SilentlyContinue) {
    $env:GIT_PAGER = 'delta'
}

# --- PSReadLine (history search + completion UX) ---
if (Get-Module -ListAvailable -Name PSReadLine -ErrorAction SilentlyContinue) {
    Set-PSReadLineOption -PredictionSource History
    Set-PSReadLineOption -PredictionViewStyle ListView
    Set-PSReadLineKeyHandler -Key UpArrow   -Function HistorySearchBackward
    Set-PSReadLineKeyHandler -Key DownArrow -Function HistorySearchForward
    Set-PSReadLineKeyHandler -Key Tab       -Function MenuComplete
}
