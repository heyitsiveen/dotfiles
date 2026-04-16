# FZF Configuration with Vercel, Vesper, Solarized Dark Theme

if not status is-interactive
    return
end

if not type -q fzf
    return
end

# Initialize fzf
fzf --fish | source

# ╔══════════════════════════════════════╗
# ║           VERCEL                     ║
# ╚══════════════════════════════════════╝
# - Background: #101010
# - Surface: #171717
# - Foreground: #FAFAFA
# - Muted: #A8A8A8
# - Blue: #005BE7 / #006AFF / #49AEFF
# - Pink: #F32882
# - Teal: #00AC96 / #00E4C4

# set -gx FZF_DEFAULT_OPTS "\
#     --style=full:rounded \
#     --color=bg:-1,list-bg:-1,input-bg:-1,preview-bg:-1,header-bg:-1 \
#     --color=fg:#A8A8A8,current-fg:#FEFFFF,query:#FEFFFF,ghost:#A8A8A8 \
#     --color=current-bg:-1,selected-bg:-1 \
#     --color=hl:#49AEFF,current-hl:#00E4C4,selected-hl:#00E4C4 \
#     --color=info:#00AC96,header:#A8A8A8,prompt:#006AFF,pointer:#005BE7 \
#     --color=marker:#F32882,spinner:#F32882,gutter:-1 \
#     --color=border:#171717,list-border:#171717,input-border:#171717,preview-border:#171717,header-border:#171717 \
#     --color=separator:#171717,label:#A8A8A8,list-label:#A8A8A8,input-label:#A8A8A8,preview-label:#A8A8A8,header-label:#A8A8A8 \
#     --height 50% \
#     --layout reverse \
#     --info inline \
#     --marker '>' \
#     --pointer '>' \
#     --prompt '> ' \
#     --bind 'ctrl-/:toggle-preview'"

# ╔══════════════════════════════════════╗
# ║           VESPER                     ║
# ╚══════════════════════════════════════╝
# Based on the official Vesper palette:
# - Background: #101010
# - Surface: #161616 / #232323
# - Foreground: #FFFFFF
# - Muted: #A0A0A0 / #7E7E7E
# - Orange: #FFC799 / #FFCFA8
# - Peppermint: #99FFE4
# - Error: #FF8080
# - Selection: #232323
# - Border: #282828

# set -gx FZF_DEFAULT_OPTS "\
#     --style=full:rounded \
#     --color=bg:-1,list-bg:-1,input-bg:-1,preview-bg:-1,header-bg:-1 \
#     --color=fg:#A0A0A0,current-fg:#FFFFFF,query:#FFFFFF,ghost:#7E7E7E \
#     --color=current-bg:-1,selected-bg:-1 \
#     --color=hl:#FFC799,current-hl:#FFC799,selected-hl:#FFC799 \
#     --color=info:#A0A0A0,header:#7E7E7E,prompt:#FFC799,pointer:#FFC799 \
#     --color=marker:#FFC799,spinner:#FFC799,gutter:-1 \
#     --color=border:#282828,list-border:#282828,input-border:#282828,preview-border:#282828,header-border:#282828 \
#     --color=separator:#282828,label:#7E7E7E,list-label:#7E7E7E,input-label:#7E7E7E,preview-label:#7E7E7E,header-label:#7E7E7E \
#     --height 50% \
#     --layout reverse \
#     --info inline \
#     --marker '>' \
#     --pointer '>' \
#     --prompt '> ' \
#     --bind 'ctrl-/:toggle-preview'"

# ╔══════════════════════════════════════╗
# ║           SOLARIZED DARK             ║
# ╚══════════════════════════════════════╝
# Based on the canonical Solarized Dark palette:
# - Foreground: #839496
# - Muted: #586e75
# - Yellow: #B58900
# - Orange: #CB4B16
# - Blue: #268BD2

set -gx FZF_DEFAULT_OPTS "\
    --style=full:rounded \
    --color=bg:-1,list-bg:-1,input-bg:-1,preview-bg:-1,header-bg:-1 \
    --color=fg:#839496,current-fg:#93A1A1,query:#93A1A1,ghost:#586E75 \
    --color=current-bg:-1,selected-bg:-1 \
    --color=hl:#B58900,current-hl:#CB4B16,selected-hl:#CB4B16 \
    --color=info:#268BD2,header:#586E75,prompt:#B58900,pointer:#B58900 \
    --color=marker:#B58900,spinner:#B58900,gutter:-1 \
    --color=border:#586E75,list-border:#586E75,input-border:#586E75,preview-border:#586E75,header-border:#586E75 \
    --color=separator:#586E75,label:#586E75,list-label:#586E75,input-label:#586E75,preview-label:#586E75,header-label:#586E75 \
    --height 50% \
    --layout reverse \
    --info inline \
    --marker '>' \
    --pointer '>' \
    --prompt '> ' \
    --bind 'ctrl-/:toggle-preview'"

# --- fd Integration (if available) ---
if type -q fd
    set -gx FZF_DEFAULT_COMMAND 'fd --type file --strip-cwd-prefix --hidden --follow --exclude .git'
    set -gx FZF_CTRL_T_COMMAND "$FZF_DEFAULT_COMMAND"
    set -gx FZF_ALT_C_COMMAND 'fd --type dir --strip-cwd-prefix --hidden --follow --exclude .git'
end

# --- Preview with bat ---
if type -q bat
    set -gx FZF_CTRL_T_OPTS "--preview 'bat --style=numbers --color=always --line-range :300 {}'"
else if type -q batcat
    set -gx FZF_CTRL_T_OPTS "--preview 'batcat --style=numbers --color=always --line-range :300 {}'"
end

# --- ALT-C preview with eza ---
if type -q eza
    set -gx FZF_ALT_C_OPTS "--preview 'eza --tree --level=2 --icons --color=always {}'"
end
