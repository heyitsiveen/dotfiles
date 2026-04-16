function _tide_palette_heyitsiveen
    # Define palette
    set -l foreground_light "#ECE8D2"
    set -l foreground_dark "#092833"
    set -l background_light "#ECE8D2"
    set -l background_dark "#272b29"
    set -l blue "#278bd2"
    set -l red "#DC322F"
    set -l green "#859901"
    set -l yellow "#B58900"

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
    set -U tide_os_bg_color $background_light
    set -U tide_os_color $foreground_dark

    # ╔══════════════════════════════════════╗
    # ║           CONTEXT (SSH/Root)         ║
    # ╚══════════════════════════════════════╝
    set -U tide_context_always_display true
    set -U tide_context_bg_color $background_light
    set -U tide_context_color_default $foreground_dark
    set -U tide_context_color_root $foreground_dark
    set -U tide_context_color_ssh $foreground_dark
    set -U tide_context_hostname_parts 0

    # ╔══════════════════════════════════════╗
    # ║       Current directory / PWD        ║
    # ╚══════════════════════════════════════╝
    set -U tide_pwd_bg_color $background_dark
    set -U tide_pwd_color_dirs $foreground_light
    set -U tide_pwd_color_anchors $foreground_light

    # ╔══════════════════════════════════════╗
    # ║           GIT                        ║
    # ╚══════════════════════════════════════╝
    set -U tide_git_icon ""

    # Git Background Colors
    set -U tide_git_bg_color $blue
    set -U tide_git_bg_color_unstable $yellow
    set -U tide_git_bg_color_urgent $blue

    # Branch & General Git
    set -U tide_git_color_branch $foreground_dark

    # Git State
    set -U tide_git_color_conflicted $red
    set -U tide_git_color_dirty $foreground_dark
    set -U tide_git_color_operation $foreground_dark
    set -U tide_git_color_staged $foreground_dark
    set -U tide_git_color_stash $foreground_dark
    set -U tide_git_color_untracked $foreground_dark
    set -U tide_git_color_upstream $foreground_dark

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
    set -U tide_node_bg_color $background_dark
    set -U tide_node_color $green
    set -U tide_node_icon ""

    # Bun
    set -U tide_bun_bg_color $background_dark
    set -U tide_bun_color $foreground_light
    set -U tide_bun_icon ""

    # ╔══════════════════════════════════════╗
    # ║           TIME                       ║
    # ╚══════════════════════════════════════╝
    set -U tide_time_bg_color $background_light
    set -U tide_time_color $foreground_dark
    set -U tide_time_format "%T"
end

