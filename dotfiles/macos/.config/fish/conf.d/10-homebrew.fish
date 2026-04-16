# Cross-platform Homebrew detection and initialization.
# Uses $OS_TYPE from 00-platform.fish to prioritize platform-native paths.

set -l os_type unknown
if set -q OS_TYPE
    set os_type $OS_TYPE
end

set -l brew_paths
switch $os_type
    case macos
        set brew_paths \
            /opt/homebrew/bin/brew \
            /usr/local/bin/brew \
            /home/linuxbrew/.linuxbrew/bin/brew
    case linux wsl
        set brew_paths \
            /home/linuxbrew/.linuxbrew/bin/brew \
            /usr/local/bin/brew \
            /opt/homebrew/bin/brew
    case '*'
        set brew_paths \
            /opt/homebrew/bin/brew \
            /usr/local/bin/brew \
            /home/linuxbrew/.linuxbrew/bin/brew
end

for brew_path in $brew_paths
    if test -x $brew_path
        eval ($brew_path shellenv)
        break
    end
end
