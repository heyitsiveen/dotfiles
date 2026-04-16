function _tide_palette_vesper
  # Define palette
  set -l black "#101010"
  set -l surface "#161616"
  set -l green "#99FFE4"
  set -l red "#FF8080"
  set -l white "#FFFFFF"
  set -l orange "#FFC799"
  set -l orange_soft "#FFCFA8"
  set -l muted "#A0A0A0"

  # ╔══════════════════════════════════════╗
  # ║           LEFT PROMPT                ║
  # ╚══════════════════════════════════════╝
  set -U tide_left_prompt_items os context pwd git newline character
  set -U tide_left_prompt_item_separator_diff_color ""
  set -U tide_left_prompt_item_separator_same_color ""
  set -U tide_left_prompt_separator_diff_color ""
  set -U tide_left_prompt_separator_same_color ""
  set -U tide_left_prompt_prefix ""
  set -U tide_left_prompt_suffix ""

  # ╔══════════════════════════════════════╗
  # ║           OS                         ║
  # ╚══════════════════════════════════════╝
  set -U tide_os_icon ""
  set -U tide_os_bg_color $orange
  set -U tide_os_color $black

  # ╔══════════════════════════════════════╗
  # ║           CONTEXT (SSH/Root)         ║
  # ╚══════════════════════════════════════╝
  set -U tide_context_always_display true
  set -U tide_context_bg_color $orange
  set -U tide_context_color_default $black
  set -U tide_context_color_root $black
  set -U tide_context_color_ssh $black
  set -U tide_context_hostname_parts 0

  # ╔══════════════════════════════════════╗
  # ║       Current directory / PWD        ║
  # ╚══════════════════════════════════════╝
  set -U tide_pwd_bg_color $surface
  set -U tide_pwd_color_dirs $white
  set -U tide_pwd_color_anchors $white

  # ╔══════════════════════════════════════╗
  # ║           GIT                        ║
  # ╚══════════════════════════════════════╝
  set -U tide_git_icon ""

  # Git Background Colors
  set -U tide_git_bg_color $surface
  set -U tide_git_bg_color_unstable $surface
  set -U tide_git_bg_color_urgent $red

  # Branch & General Git
  set -U tide_git_color_branch $white

  # Git State
  set -U tide_git_color_conflicted $red
  set -U tide_git_color_dirty $orange
  set -U tide_git_color_operation $orange
  set -U tide_git_color_staged $green
  set -U tide_git_color_stash $green
  set -U tide_git_color_untracked $orange
  set -U tide_git_color_upstream $muted

  # ╔══════════════════════════════════════╗
  # ║           CHARACTER                  ║
  # ╚══════════════════════════════════════╝
  set -U tide_character_color $green
  set -U tide_character_color_failure $red  

  # ╔══════════════════════════════════════╗
  # ║           RIGHT PROMPT               ║
  # ╚══════════════════════════════════════╝
  set -U tide_right_prompt_items node bun time

  # ╔══════════════════════════════════════╗
  # ║           LANGUAGES & RUNTIMES       ║
  # ╚══════════════════════════════════════╝

  # Node
  set -U tide_node_bg_color $green
  set -U tide_node_color $black
  set -U tide_node_icon ""

  # Bun
  set -U tide_bun_bg_color $orange_soft
  set -U tide_bun_color $black
  set -U tide_bun_icon ""

  # ╔══════════════════════════════════════╗
  # ║           TIME                       ║
  # ╚══════════════════════════════════════╝
  set -U tide_time_bg_color $orange
  set -U tide_time_color $black
  set -U tide_time_format "%T"
end
