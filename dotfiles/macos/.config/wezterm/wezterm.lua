local wezterm = require 'wezterm'
local config = {}

config.window_close_confirmation = 'NeverPrompt'

--! DEFAULT SHELL
-- WezTerm runs your login shell from the password database by default (it ignores
-- $SHELL), so once Fish is your login shell (`chsh -s $(which fish)`) it starts
-- automatically. Uncomment below ONLY if Fish is NOT your login shell:
-- config.default_prog = { '/opt/homebrew/bin/fish', '-l' }
-- config.default_prog = {"pwsh"}
-- config.default_prog = { 'nu.exe' }
local target = wezterm.target_triple or ''
local is_windows = target:find('windows') ~= nil

if is_windows then
  local wsl_domains = wezterm.default_wsl_domains()
  if #wsl_domains > 0 then
    config.default_domain = wsl_domains[1].name
  else
    -- Use Windows PowerShell when WSL domains are unavailable.
    config.default_prog = { 'powershell.exe', '-NoLogo' }
  end
end

--! FONT
config.font = wezterm.font 'JetBrains Mono'

--! TAB
config.enable_tab_bar = false

--! WINDOW
config.window_background_opacity = 0.9
config.macos_window_background_blur = 20

--! CURSOR
config.default_cursor_style = 'BlinkingBar'

--! COLOR SCHEME
config.color_scheme = 'Solarized Dark (Gogh)'

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

    --! Overrides the cell background color when the current cell is occupied by the
    --! cursor and the cursor style is set to Block
    cursor_bg = '#f32882',
    -- Overrides the text color when the current cell is occupied by the cursor
    cursor_fg = '#fafafa',
    --! Specifies the border color of the cursor when the cursor style is set to Block,
    --! or the color of the vertical or horizontal bar when the cursor style is set to
    --! Bar or Underline.
    cursor_border = '#f32882',

    -- The foreground color of selected text
    -- selection_fg = '#000000',
    -- The background color of selected text
    selection_bg = '#005be7',
    selection_fg = '#fafafa',

    -- The color of the scrollbar "thumb"; the portion that represents the current viewport
    scrollbar_thumb = '#171717',

    -- The color of the split lines between panes
    split = '#171717',
    
    ansi = {
      '#000000',
      '#fc0036',
      '#29a948',
      '#ffae00',
      '#006aff',
      '#f32882',
      '#00ac96',
      '#feffff',
    },
    brights = {
      '#a8a8a8',
      '#ff8080',
      '#4be15d',
      '#ffae00',
      '#49aeff',
      '#f97ea8',
      '#00e4c4',
      '#fefefe',
    },
  },
  ['Vesper'] = {
    --! The default text color
    foreground = '#FFFFFF',
    --! The default background color
    background = '#101010',

    --! Overrides the cell background color when the current cell is occupied by the
    --! cursor and the cursor style is set to Block
    cursor_bg = '#FFC799',
    -- Overrides the text color when the current cell is occupied by the cursor
    cursor_fg = '#101010',
    --! Specifies the border color of the cursor when the cursor style is set to Block,
    --! or the color of the vertical or horizontal bar when the cursor style is set to
    --! Bar or Underline.
    cursor_border = '#FFC799',

    -- The foreground color of selected text
    -- selection_fg = '#000000',
    -- The background color of selected text
    selection_bg =  'rgba(50% 50% 50% 50%)',

    -- The color of the scrollbar "thumb"; the portion that represents the current viewport
    scrollbar_thumb =  'rgba(50% 50% 50% 50%)',

    -- The color of the split lines between panes
    split = '#505050',

    ansi = {
      '#101010',
      '#F5A191',
      '#90B99F',
      '#E6B99D',
      '#ACA1CF',
      '#E29ECA',
      '#EA83A5',
      '#A0A0A0',
    },
    brights = {
      '#7E7E7E',
      '#FF8080',
      '#99FFE4',
      '#FFC799',
      '#B9AEDA',
      '#ECAAD6',
      '#F591B2',
      '#FFFFFF',
    },
  },
}

return config
