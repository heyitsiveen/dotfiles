local wezterm = require 'wezterm'
local config = {}

config.window_close_confirmation = 'NeverPrompt'

--! DEFAULT SHELL
-- Default to PowerShell 7 on Windows.
-- Uncomment the line below to use WSL instead:
-- config.default_domain = wezterm.default_wsl_domains()[1] and wezterm.default_wsl_domains()[1].name
config.default_prog = { 'pwsh.exe', '-NoLogo' }

--! FONT
config.font = wezterm.font 'JetBrains Mono'

--! TAB BAR
-- Enabled (tmux not available natively on Windows; use WezTerm tabs instead)
config.enable_tab_bar = true
config.hide_tab_bar_if_only_one_tab = true
config.use_fancy_tab_bar = false

--! WINDOW
config.window_background_opacity = 0.9
-- Note: macos_window_background_blur is macOS-only and omitted here.

--! CURSOR
config.default_cursor_style = 'BlinkingBar'

--! COLOR SCHEME
config.color_scheme = 'Solarized Dark (Gogh)'
-- Alternates (uncomment to switch):
-- config.color_scheme = 'Vercel'
-- config.color_scheme = 'Vesper'

-- Override background for Solarized to match Ghostty
if config.color_scheme == 'Solarized Dark (Gogh)' then
  config.colors = { background = '#031219' }
end

config.color_schemes = {
  ['Vercel'] = {
    --! The default text color
    foreground = '#fafafa',
    --! The default background color
    background = '#101010',

    cursor_bg     = '#f32882',
    cursor_fg     = '#fafafa',
    cursor_border = '#f32882',

    selection_bg = '#005be7',
    selection_fg = '#fafafa',

    scrollbar_thumb = '#171717',
    split = '#171717',

    ansi = {
      '#000000', '#fc0036', '#29a948', '#ffae00',
      '#006aff', '#f32882', '#00ac96', '#feffff',
    },
    brights = {
      '#a8a8a8', '#ff8080', '#4be15d', '#ffae00',
      '#49aeff', '#f97ea8', '#00e4c4', '#fefefe',
    },
  },
  ['Vesper'] = {
    foreground = '#FFFFFF',
    background = '#101010',

    cursor_bg     = '#FFC799',
    cursor_fg     = '#101010',
    cursor_border = '#FFC799',

    selection_bg = 'rgba(50% 50% 50% 50%)',
    scrollbar_thumb = 'rgba(50% 50% 50% 50%)',
    split = '#505050',

    ansi = {
      '#101010', '#F5A191', '#90B99F', '#E6B99D',
      '#ACA1CF', '#E29ECA', '#EA83A5', '#A0A0A0',
    },
    brights = {
      '#7E7E7E', '#FF8080', '#99FFE4', '#FFC799',
      '#B9AEDA', '#ECAAD6', '#F591B2', '#FFFFFF',
    },
  },
}

return config
