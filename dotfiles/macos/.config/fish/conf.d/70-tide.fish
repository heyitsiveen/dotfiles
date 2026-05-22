# Tide Prompt Configuration
# Tide settings are managed via `tide configure`
# This file just ensures tide is available

if not status is-interactive
    return
end

# Tide is managed by Fisher and configures itself
# Run `tide configure` to customize your prompt
# Settings are stored as universal variables and persist automatically

# Apply the configured palette on startup.
# Default to heyitsiveen on first load and recover from invalid saved values.
set -l tide_default_palette heyitsiveen
set -l tide_selected_palette $tide_default_palette

if set -q dotfiles_tide_palette
    switch $dotfiles_tide_palette
        case heyitsiveen vercel vesper
            set tide_selected_palette $dotfiles_tide_palette
        case '*'
            set -U dotfiles_tide_palette $tide_default_palette
    end
else
    set -U dotfiles_tide_palette $tide_default_palette
end

if functions -q tide_palette
    tide_palette $tide_selected_palette
end

# Palettes hardcode the Linux Tux glyph for tide_os_icon. Override per host
# so macOS shows an Apple logo; other platforms fall through to the palette default.
switch (uname)
    case Darwin
        set -U tide_os_icon (printf '\uf302')
end
