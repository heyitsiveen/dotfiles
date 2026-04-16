# Environment variables
# Editor configuration with fallback chain

if type -q nvim
    set -gx EDITOR nvim
else if type -q vim
    set -gx EDITOR vim
else
    set -gx EDITOR nano
end

set -gx VISUAL $EDITOR
