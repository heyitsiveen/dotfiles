function brew -d "Homebrew wrapper: warn when tmux is upgraded while its server is still running"
    # Run the real Homebrew first, preserving its exit status.
    command brew $argv
    set -l brew_status $status

    # Only `upgrade`/`update` can replace the tmux binary out from under a
    # running server. When that happens the in-memory server keeps the OLD
    # version while the binary on disk is NEW, and TUIs (Claude Code, lazygit,
    # Neovim) start drawing with missing/blank text until the server restarts.
    if set -q TMUX; and type -q tmux
        if contains -- upgrade $argv; or contains -- update $argv
            set -l binary_version (tmux -V | string replace 'tmux ' '')
            set -l server_version (tmux display-message -p '#{version}' 2>/dev/null)
            if test -n "$server_version"; and test "$binary_version" != "$server_version"
                echo ''
                echo "⚠  tmux upgraded ($server_version running → $binary_version on disk) — restart the server."
                echo "   Quick redraw : detach + reattach  (Ctrl-b d, then: tmux attach)"
                echo "   Clean restart: tmux kill-server   (closes all tmux windows), then relaunch"
            end
        end
    end

    return $brew_status
end
