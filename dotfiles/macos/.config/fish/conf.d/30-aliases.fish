# Abbreviations and aliases
# Only set in interactive shells

if not status is-interactive
    return
end

# --- Git Abbreviations ---
if type -q git
    abbr -a g git
    abbr -a gs 'git status'
    abbr -a ga 'git add'
    abbr -a gaa 'git add --all'
    abbr -a gc 'git commit'
    abbr -a gcm 'git commit -m'
    abbr -a gp 'git push'
    abbr -a gpl 'git pull'
    abbr -a gd 'git diff'
    abbr -a gds 'git diff --staged'
    abbr -a gco 'git checkout'
    abbr -a gb 'git branch'
    abbr -a gl 'git log --oneline --graph'
    abbr -a gst 'git stash'
    abbr -a gstp 'git stash pop'
end

# --- Lazygit ---
if type -q lazygit
    abbr -a lg lazygit
end

# --- Tmux Abbreviations ---
if type -q tmux
    abbr -a ta 'tmux attach -t'
    abbr -a tl 'tmux list-sessions'
    abbr -a tn 'tmux new-session -s'
    abbr -a tk 'tmux kill-session -t'
end

# --- HTTPie Abbreviations ---
if type -q http
    abbr -a hget 'http GET'
    abbr -a hpost 'http POST'
    abbr -a hput 'http PUT'
    abbr -a hdel 'http DELETE'
end

# --- Btop Abbreviations ---
if type -q btop
    abbr -a top btop
    abbr -a htop btop
end
