# OS Detection for cross-platform compatibility
# Sets $OS_TYPE to: macos, linux, wsl, or unknown

switch (uname)
    case Darwin
        set -g OS_TYPE macos
    case Linux
        set -g OS_TYPE linux
        # Check for WSL using both canonical env and kernel markers.
        if set -q WSL_DISTRO_NAME
            set -g OS_TYPE wsl
        else if test -r /proc/version
            if string match -q -r ".*microsoft.*" (string lower -- (cat /proc/version 2>/dev/null))
                set -g OS_TYPE wsl
            end
        end
    case '*'
        set -g OS_TYPE unknown
end
