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

# Node + pnpm
# pnpm owns both the package manager and the Node runtime.
# Node lives under $PNPM_HOME (`pnpm runtime set node lts -g`) and ships
# WITHOUT npm/npx/corepack by design — use `pnpm` and `pnpx` instead.
# See docs/node-pnpm-setup.md.
set --export PNPM_HOME "$HOME/.local/share/pnpm"
if test -d "$PNPM_HOME/bin"
    if not contains -- "$PNPM_HOME/bin" $PATH
        set --export PATH $PNPM_HOME/bin $PATH
    end
end

# Previously: Node was managed by fnm (Homebrew), which auto-switched versions
# on `cd` via .nvmrc/.node-version. Replaced by pnpm — kept for reference.
# if type -q fnm
#     fnm env --use-on-cd | source
# end
