# Command Reference

CLI-first reference for shell functions, abbreviations, and terminal UI keybindings.

## Custom Functions

### `backup <file> [destination]`

Create a timestamped backup of a file.

```fish
backup important.txt           # Creates important.txt.20240115-143000.bak
backup config.yaml ~/backups/  # Backup to specific directory
```

### `reload-fish`

Restart Fish into a fresh shell using the current config.

```fish
reload-fish      # Exec into a fresh Fish shell
```

### `tide_palette <palette|list>`

Switch Tide palette presets and persist the choice for future Fish sessions.

```fish
tide_palette list
tide_palette heyitsiveen
tide_palette vercel
tide_palette vesper
```

Palette choice is persisted in the `dotfiles_tide_palette` universal variable and re-applied on shell startup by `conf.d/70-tide.fish`. Tide itself, Fisher, and the three palettes are all committed to the repo under `.config/fish/` — a fresh `stow .` gives you a working Tide prompt with no `fisher install` or `tide configure` step. If the prompt ever breaks, see the fallback in `README.md` step 6 or `docs/manual-setup.md` section 3.

---

## Shell Abbreviations

### Git Commands

| Abbreviation | Expansion                   | Description              |
| ------------ | --------------------------- | ------------------------ |
| `g`          | `git`                       | Git shortcut             |
| `gs`         | `git status`                | Show working tree status |
| `ga`         | `git add`                   | Stage files              |
| `gaa`        | `git add --all`             | Stage all changes        |
| `gc`         | `git commit`                | Commit changes           |
| `gcm`        | `git commit -m`             | Commit with message      |
| `gp`         | `git push`                  | Push to remote           |
| `gpl`        | `git pull`                  | Pull from remote         |
| `gd`         | `git diff`                  | Show unstaged changes    |
| `gds`        | `git diff --staged`         | Show staged changes      |
| `gco`        | `git checkout`              | Switch branches          |
| `gb`         | `git branch`                | List/create branches     |
| `gl`         | `git log --oneline --graph` | Compact log with graph   |
| `gst`        | `git stash`                 | Stash changes            |
| `gstp`       | `git stash pop`             | Pop stashed changes      |
| `lg`         | `lazygit`                   | Open lazygit TUI         |

### Tmux Commands

| Abbreviation | Expansion              | Description       |
| ------------ | ---------------------- | ----------------- |
| `ta`         | `tmux attach -t`       | Attach to session |
| `tl`         | `tmux list-sessions`   | List sessions     |
| `tn`         | `tmux new-session -s`  | New named session |
| `tk`         | `tmux kill-session -t` | Kill session      |

### HTTPie Commands

| Abbreviation | Expansion     | Description         |
| ------------ | ------------- | ------------------- |
| `hget`       | `http GET`    | HTTP GET request    |
| `hpost`      | `http POST`   | HTTP POST request   |
| `hput`       | `http PUT`    | HTTP PUT request    |
| `hdel`       | `http DELETE` | HTTP DELETE request |

### System Commands

| Abbreviation | Expansion | Description    |
| ------------ | --------- | -------------- |
| `top`        | `btop`    | System monitor |
| `htop`       | `btop`    | System monitor |

### File Listing (eza)

| Abbreviation | Expansion                                                  | Description                  |
| ------------ | ---------------------------------------------------------- | ---------------------------- |
| `ls`         | `eza --icons --group-directories-first`                    | List with icons              |
| `ll`         | `eza -l --icons --git --header --group-directories-first`  | Long format with git status  |
| `la`         | `eza -la --icons --git --header --group-directories-first` | Long format including hidden |
| `lt`         | `eza --tree --level=2 --icons`                             | Tree view (2 levels)         |
| `lta`        | `eza --tree --level=2 --icons -a`                          | Tree view including hidden   |

---

## Tmux Keybindings

**Prefix Key**: `Ctrl+A`

### Pane Management

| Keybinding            | Action                        |
| --------------------- | ----------------------------- |
| `Prefix + \|`         | Split pane vertically         |
| `Prefix + -`          | Split pane horizontally       |
| `Alt + ←↑↓→`          | Navigate panes (no prefix)    |
| `Prefix + h/j/k/l`    | Navigate panes (vim-style)    |
| `Prefix + H/J/K/L`    | Resize panes by 5             |
| `Prefix + Ctrl+Arrow` | Resize pane by 5 (repeatable) |
| `Prefix + z`          | Toggle pane zoom              |
| `Prefix + x`          | Close pane                    |

### Window Management

| Keybinding     | Action                     |
| -------------- | -------------------------- |
| `Shift + ←→`   | Switch windows (no prefix) |
| `Prefix + c`   | Create window              |
| `Prefix + ,`   | Rename window              |
| `Prefix + &`   | Close window               |
| `Prefix + 1-9` | Jump to window by number   |

### General

| Keybinding   | Action        |
| ------------ | ------------- |
| `Prefix + r` | Reload config |
| `Prefix + p` | Paste buffer  |

### Copy Mode (vi-style)

| Keybinding   | Action                     |
| ------------ | -------------------------- |
| `Prefix + [` | Enter copy mode            |
| `v`          | Begin selection            |
| `y`          | Copy selection             |
| `r`          | Toggle rectangle selection |
| `/`          | Search forward             |
| `?`          | Search backward            |
| `q`          | Exit copy mode             |

**Clipboard Integration:**

- **macOS**: `pbcopy`
- **WSL**: `clip.exe`
- **Linux (Wayland)**: `wl-copy`
- **Linux (X11)**: `xclip`
- **Linux fallback**: if no clipboard tool is installed, copy still goes to tmux's internal buffer

> **Note:** In tmux copy mode, mouse drag selection auto-copies on mouse release via `MouseDragEnd1Pane` bindings in `.config/tmux/keybinds.conf`.
> **Policy:** Cross-platform defaults are macOS-first, then Linux, then WSL.

### Sessions

| Keybinding   | Action              |
| ------------ | ------------------- |
| `Prefix + d` | Detach from session |
| `Prefix + s` | List sessions       |
| `Prefix + $` | Rename session      |

### Popup Windows

| Keybinding   | Action                                                    |
| ------------ | --------------------------------------------------------- |
| `Prefix + g` | Open lazygit in a centered popup (80% width/height)       |
| `Prefix + y` | Open Claude Code in a persistent popup (80% width/height) |

> **Note:** The Claude Code popup uses a persistent tmux session per project directory. Closing the popup only detaches. Reopening reattaches to the same session, preserving context and history.

---

## FZF Keybindings

| Keybinding | Action                                |
| ---------- | ------------------------------------- |
| `Ctrl+T`   | File search with bat preview          |
| `Ctrl+R`   | Command history search                |
| `Alt+C`    | Directory navigation with eza preview |
| `Ctrl+/`   | Toggle preview panel                  |

**Inside FZF:**

| Keybinding | Action         |
| ---------- | -------------- |
| `Ctrl+J/K` | Move up/down   |
| `Enter`    | Select item    |
| `Tab`      | Multi-select   |
| `Ctrl+C`   | Cancel         |

---

## Lazygit Keybindings

> Default keybindings — lazygit uses no custom config in this dotfiles setup. Press `?` inside any panel for the full list.

### Global

| Keybinding | Action                                                |
| ---------- | ----------------------------------------------------- |
| `q`        | Quit                                                  |
| `Esc`      | Cancel / Go back                                      |
| `z`        | Undo (via reflog)                                     |
| `Ctrl+z`   | Redo (via reflog)                                     |
| `P`        | Push                                                  |
| `p`        | Pull                                                  |
| `R`        | Refresh                                               |
| `+` / `_`  | Next / previous screen mode (normal/half/full)        |
| `1`–`5`    | Switch to panel (Status/Files/Branches/Commits/Stash) |
| `[` / `]`  | Previous / next tab within panel                      |
| `@`        | Open command log                                      |
| `:`        | Execute custom command                                |
| `?`        | Open keybindings menu                                 |

### Navigation

| Keybinding        | Action                        |
| ----------------- | ----------------------------- |
| `↑` / `k`         | Move up                       |
| `↓` / `j`         | Move down                     |
| `PgUp` / `Ctrl+u` | Page up                       |
| `PgDn` / `Ctrl+d` | Page down                     |
| `<` / `>`         | Scroll to top / bottom        |
| `/`               | Search                        |
| `n` / `N`         | Next / previous search result |
| `Enter`           | Focus selected item           |

### Files

| Keybinding | Action                         |
| ---------- | ------------------------------ |
| `Space`    | Toggle staged                  |
| `a`        | Stage / unstage all            |
| `c`        | Commit changes                 |
| `C`        | Commit with editor             |
| `A`        | Amend last commit              |
| `d`        | Discard changes (view options) |
| `e`        | Edit file                      |
| `o`        | Open file                      |
| `S`        | Stash options                  |
| `i`        | Ignore / exclude file          |
| `f`        | Fetch                          |
| `Enter`    | Stage individual lines / hunks |

### Local Branches

| Keybinding | Action                              |
| ---------- | ----------------------------------- |
| `Space`    | Checkout                            |
| `n`        | New branch                          |
| `d`        | Delete branch                       |
| `r`        | Rebase checked-out branch onto this |
| `R`        | Rename                              |
| `M`        | Merge into checked-out branch       |
| `f`        | Fast-forward this branch            |
| `u`        | Set / unset upstream                |
| `Enter`    | View commits                        |

### Commits

| Keybinding | Action                          |
| ---------- | ------------------------------- |
| `r`        | Reword commit message           |
| `R`        | Reword with editor              |
| `s`        | Squash down                     |
| `f`        | Fixup commit                    |
| `d`        | Drop commit                     |
| `e`        | Edit (start interactive rebase) |
| `p`        | Pick (during rebase)            |
| `c`        | Copy commit (cherry-pick)       |
| `C`        | Copy commit range               |
| `v`        | Paste (cherry-pick)             |
| `A`        | Amend with staged changes       |
| `t`        | Create tag                      |
| `T`        | Revert commit                   |
| `g`        | Reset to this commit            |
| `Enter`    | View commit files               |

### Stash

| Keybinding | Action                |
| ---------- | --------------------- |
| `Space`    | Apply                 |
| `g`        | Pop                   |
| `d`        | Drop                  |
| `n`        | New branch from stash |
| `r`        | Rename                |
| `Enter`    | View stash files      |

### Remotes

| Keybinding | Action               |
| ---------- | -------------------- |
| `n`        | Add new remote       |
| `d`        | Remove remote        |
| `e`        | Edit remote          |
| `Enter`    | View remote branches |

### Remote Branches

| Keybinding | Action                        |
| ---------- | ----------------------------- |
| `Space`    | Checkout                      |
| `M`        | Merge into checked-out branch |
| `r`        | Rebase onto                   |
| `d`        | Delete remote branch          |
| `n`        | New branch from this          |
| `Enter`    | View commits                  |

### Tags

| Keybinding | Action       |
| ---------- | ------------ |
| `n`        | Create tag   |
| `Space`    | Checkout     |
| `d`        | Delete tag   |
| `P`        | Push tag     |
| `Enter`    | View commits |

### Merge Conflicts

| Keybinding | Action                      |
| ---------- | --------------------------- |
| `↑` / `↓`  | Navigate between conflicts  |
| `←` / `→`  | Select hunk within conflict |
| `Space`    | Pick hunk                   |
| `b`        | Pick both hunks             |
| `z`        | Undo last pick              |

### Staging Panel (Line-Level)

| Keybinding | Action                        |
| ---------- | ----------------------------- |
| `Space`    | Toggle line staged / unstaged |
| `a`        | Toggle hunk staged / unstaged |
| `v`        | Toggle range select           |
| `↑` / `↓`  | Navigate lines                |
| `Esc`      | Return to files panel         |

### Status

| Keybinding | Action                |
| ---------- | --------------------- |
| `o`        | Open config file      |
| `e`        | Edit config file      |
| `u`        | Check for update      |
| `Enter`    | Switch to recent repo |
