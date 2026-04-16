# =============================================================================
# Environment Variables
# =============================================================================
# Converted from: dotfiles-macos/.config/fish/conf.d/20-environment.fish

# --- $EDITOR / $VISUAL fallback chain: nvim > vim > nano ---
foreach ($editor in @('nvim', 'vim', 'nano')) {
    if (Get-Command $editor -ErrorAction SilentlyContinue) {
        $env:EDITOR = $editor
        $env:VISUAL = $editor
        break
    }
}
