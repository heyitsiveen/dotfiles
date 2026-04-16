# =============================================================================
# fzf — Fuzzy Finder Configuration
# =============================================================================
# Converted from: dotfiles-macos/.config/fish/conf.d/40-fzf.fish
# FZF_DEFAULT_OPTS is shell-agnostic — same value works on any shell.

if (-not (Get-Command fzf -ErrorAction SilentlyContinue)) { return }

# ╔══════════════════════════════════════╗
# ║           VERCEL                     ║
# ╚══════════════════════════════════════╝
# $env:FZF_DEFAULT_OPTS = @"
#     --style=full:rounded
#     --color=bg:-1,list-bg:-1,input-bg:-1,preview-bg:-1,header-bg:-1
#     --color=fg:#A8A8A8,current-fg:#FEFFFF,query:#FEFFFF,ghost:#A8A8A8
#     --color=current-bg:-1,selected-bg:-1
#     --color=hl:#49AEFF,current-hl:#00E4C4,selected-hl:#00E4C4
#     --color=info:#00AC96,header:#A8A8A8,prompt:#006AFF,pointer:#005BE7
#     --color=marker:#F32882,spinner:#F32882,gutter:-1
#     --color=border:#171717,list-border:#171717,input-border:#171717,preview-border:#171717,header-border:#171717
#     --color=separator:#171717,label:#A8A8A8,list-label:#A8A8A8,input-label:#A8A8A8,preview-label:#A8A8A8,header-label:#A8A8A8
#     --height 50% --layout reverse --info inline --marker '>' --pointer '>' --prompt '> '
#     --bind 'ctrl-/:toggle-preview'
# "@

# ╔══════════════════════════════════════╗
# ║           VESPER                     ║
# ╚══════════════════════════════════════╝
# $env:FZF_DEFAULT_OPTS = @"
#     --style=full:rounded
#     --color=bg:-1,list-bg:-1,input-bg:-1,preview-bg:-1,header-bg:-1
#     --color=fg:#A0A0A0,current-fg:#FFFFFF,query:#FFFFFF,ghost:#7E7E7E
#     --color=current-bg:-1,selected-bg:-1
#     --color=hl:#FFC799,current-hl:#FFC799,selected-hl:#FFC799
#     --color=info:#A0A0A0,header:#7E7E7E,prompt:#FFC799,pointer:#FFC799
#     --color=marker:#FFC799,spinner:#FFC799,gutter:-1
#     --color=border:#282828,list-border:#282828,input-border:#282828,preview-border:#282828,header-border:#282828
#     --color=separator:#282828,label:#7E7E7E,list-label:#7E7E7E,input-label:#7E7E7E,preview-label:#7E7E7E,header-label:#7E7E7E
#     --height 50% --layout reverse --info inline --marker '>' --pointer '>' --prompt '> '
#     --bind 'ctrl-/:toggle-preview'
# "@

# ╔══════════════════════════════════════╗
# ║           SOLARIZED DARK (active)    ║
# ╚══════════════════════════════════════╝
$env:FZF_DEFAULT_OPTS = @"
    --style=full:rounded
    --color=bg:-1,list-bg:-1,input-bg:-1,preview-bg:-1,header-bg:-1
    --color=fg:#839496,current-fg:#93A1A1,query:#93A1A1,ghost:#586E75
    --color=current-bg:-1,selected-bg:-1
    --color=hl:#B58900,current-hl:#CB4B16,selected-hl:#CB4B16
    --color=info:#268BD2,header:#586E75,prompt:#B58900,pointer:#B58900
    --color=marker:#B58900,spinner:#B58900,gutter:-1
    --color=border:#586E75,list-border:#586E75,input-border:#586E75,preview-border:#586E75,header-border:#586E75
    --color=separator:#586E75,label:#586E75,list-label:#586E75,input-label:#586E75,preview-label:#586E75,header-label:#586E75
    --height 50% --layout reverse --info inline --marker '>' --pointer '>' --prompt '> '
    --bind 'ctrl-/:toggle-preview'
"@

# --- fd integration (file/directory listing) ---
if (Get-Command fd -ErrorAction SilentlyContinue) {
    $env:FZF_DEFAULT_COMMAND  = 'fd --type file --strip-cwd-prefix --hidden --follow --exclude .git'
    $env:FZF_CTRL_T_COMMAND   = $env:FZF_DEFAULT_COMMAND
    $env:FZF_ALT_C_COMMAND    = 'fd --type dir --strip-cwd-prefix --hidden --follow --exclude .git'
}

# --- bat preview for Ctrl+T ---
if (Get-Command bat -ErrorAction SilentlyContinue) {
    $env:FZF_CTRL_T_OPTS = "--preview 'bat --style=numbers --color=always --line-range :300 {}'"
}

# --- eza preview for Alt+C ---
if (Get-Command eza -ErrorAction SilentlyContinue) {
    $env:FZF_ALT_C_OPTS = "--preview 'eza --tree --level=2 --icons --color=always {}'"
}

# --- PSFzf keybindings (Ctrl+F file search, Ctrl+R history) ---
if (Get-Module -ListAvailable -Name PSFzf -ErrorAction SilentlyContinue) {
    Import-Module PSFzf
    Set-PsFzfOption -PSReadlineChordProvider 'Ctrl+f'
    Set-PsFzfOption -PSReadlineChordReverseHistory 'Ctrl+r'
}
