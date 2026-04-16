# Modern CLI tool integrations

if not status is-interactive
    return
end

# --- Bat (cat replacement) ---
if type -q bat
    alias cat 'bat --paging=never'
    # set -gx BAT_THEME "Vercel"
    # set -gx BAT_THEME "Vesper"
    set -gx BAT_THEME "Solarized (dark)"
    set -gx MANPAGER "sh -c 'col -bx | bat -l man -p'"
else if type -q batcat
    # Debian/Ubuntu uses batcat
    alias cat 'batcat --paging=never'
    alias bat batcat
    # set -gx BAT_THEME "Vercel"
    # set -gx BAT_THEME "Vesper"
    set -gx BAT_THEME "Solarized (dark)"
    set -gx MANPAGER "sh -c 'col -bx | batcat -l man -p'"
end

# --- Eza (ls replacement) ---
if type -q eza
    alias ls 'eza --icons --group-directories-first'
    alias ll 'eza -l --icons --git --header --group-directories-first'
    alias la 'eza -la --icons --git --header --group-directories-first'
    alias lt 'eza --tree --level=2 --icons'
    alias lta 'eza --tree --level=2 --icons -a'
end

# --- Zoxide (smarter cd) ---
if type -q zoxide
    zoxide init fish | source
end

# --- Ripgrep ---
if type -q rg
    set -l rg_config "$HOME/.config/ripgrep/config"
    if test -f "$rg_config"
        set -gx RIPGREP_CONFIG_PATH "$rg_config"
    else
        set -e RIPGREP_CONFIG_PATH
    end
end

# --- Delta (git diff pager) ---
if type -q delta
    set -gx GIT_PAGER delta
end
