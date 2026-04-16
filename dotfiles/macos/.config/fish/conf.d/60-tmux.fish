# Tmux Configuration - Auto-attach to 'main' session

if not status is-interactive
    return
end

if not type -q tmux
    return
end

# Auto-attach to tmux session 'main'
# Skip if already in tmux, in VS Code terminal, or SSH session
if not set -q TMUX
    if not set -q VSCODE_INJECTION
        if not set -q SSH_CONNECTION
            exec tmux new-session -A -s main
        end
    end
end
