# =============================================================================
# Aliases & Shortcuts
# =============================================================================
# Converted from: dotfiles-macos/.config/fish/conf.d/30-aliases.fish
# Fish abbreviations → PowerShell functions with @args forwarding.
# Note: tmux aliases are omitted (tmux not native on Windows).

# --- Git ---
if (Get-Command git -ErrorAction SilentlyContinue) {
    function g    { git @args }
    function gs   { git status @args }
    function ga   { git add @args }
    function gaa  { git add --all @args }
    function gc   { git commit @args }
    function gcm  { git commit -m @args }
    function gp   { git push @args }
    function gpl  { git pull @args }
    function gd   { git diff @args }
    function gds  { git diff --staged @args }
    function gco  { git checkout @args }
    function gb   { git branch @args }
    function gl   { git log --oneline --graph @args }
    function gst  { git stash @args }
    function gstp { git stash pop @args }
}

# --- Lazygit ---
if (Get-Command lazygit -ErrorAction SilentlyContinue) {
    function lg { lazygit @args }
}

# --- HTTPie ---
if (Get-Command http -ErrorAction SilentlyContinue) {
    function hget { http GET @args }
    function hpost { http POST @args }
    function hput  { http PUT @args }
    function hdel  { http DELETE @args }
}

# --- Btop (system monitor) ---
if (Get-Command btop -ErrorAction SilentlyContinue) {
    function top  { btop @args }
    function htop { btop @args }
}
