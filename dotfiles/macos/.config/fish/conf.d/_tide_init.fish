function _tide_init_install --on-event _tide_init_install
    set -U VIRTUAL_ENV_DISABLE_PROMPT true

    tide configure --auto \
        --style=Rainbow \
        --prompt_colors='True color' \
        --show_time='24-hour format' \
        --rainbow_prompt_separators=Angled \
        --powerline_prompt_heads=Sharp \
        --powerline_prompt_tails=Sharp \
        --powerline_prompt_style='Two lines, character and frame' \
        --prompt_connection=Disconnected \
        --powerline_right_prompt_frame=Yes \
        --prompt_connection_andor_frame_color=Lightest \
        --prompt_spacing=Sparse \
        --icons='Many icons' \
        --transient=No
end

function _tide_init_update --on-event _tide_init_update
    # Warn users who install from main branch
    if contains ilancosman/tide (string lower $_fisher_plugins)
        set_color bryellow
        echo "ilancosman/tide is a development branch. Please install from a release tag:"
        _tide_fish_colorize "fisher install ilancosman/tide@v6"
        sleep 3
    end

    # Set (disable) the new jobs variable
    set -q tide_jobs_number_threshold || set -U tide_jobs_number_threshold 1000
end

function _tide_init_uninstall --on-event _tide_init_uninstall
    set -e VIRTUAL_ENV_DISABLE_PROMPT
    set -e (set -U --names | string match --entire -r '^_?tide')
    functions --erase (functions --all | string match --entire -r '^_?tide')
end
