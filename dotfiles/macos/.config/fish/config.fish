# ~/.config/fish/config.fish
# ============================================================
# FISH SHELL CONFIGURATION
# ============================================================
# Lean entry point - modular configs live in conf.d/
# Functions are auto-loaded from functions/
# ============================================================

# Interactive shell configurations
if status is-interactive
    # Disable default greeting (custom greeting in functions/fish_greeting.fish)
    set -g fish_greeting
end

# Nodejs
if type -q fnm
    fnm env --use-on-cd | source
end

if not contains -- ~/.local/bin $PATH
    set -gx PATH ~/.local/bin $PATH
end

# Bun
set --export BUN_INSTALL "$HOME/.bun"
if test -d "$BUN_INSTALL/bin"
    if not contains -- "$BUN_INSTALL/bin" $PATH
        set --export PATH $BUN_INSTALL/bin $PATH
    end
end
