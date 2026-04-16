# Command Reference

CLI-first reference for shell functions, aliases, and terminal UI keybindings.

## Custom Functions

### `backup <file> [destination]`

Create a timestamped backup of a file.

```powershell
backup important.txt           # Creates important.txt.20240115-143000.bak
backup config.yaml ~/backups/  # Backup to specific directory
```

### `reload-shell`

Restart PowerShell into a fresh shell using the current profile.

```powershell
reload-shell      # Exec into a fresh pwsh session
```

### `Switch-PromptPalette <palette|list>`

Switch oh-my-posh palette presets and persist the choice for future sessions.

```powershell
Switch-PromptPalette list
Switch-PromptPalette solarized-dark
Switch-PromptPalette vercel
Switch-PromptPalette vesper
```

---

## Shell Aliases

### Git Commands

| Alias  | Expansion                   | Description              |
| ------ | --------------------------- | ------------------------ |
| `g`    | `git`                       | Git shortcut             |
| `gs`   | `git status`                | Show working tree status |
| `ga`   | `git add`                   | Stage files              |
| `gaa`  | `git add --all`             | Stage all changes        |
| `gc`   | `git commit`                | Commit changes           |
| `gcm`  | `git commit -m`             | Commit with message      |
| `gp`   | `git push`                  | Push to remote           |
| `gpl`  | `git pull`                  | Pull from remote         |
| `gd`   | `git diff`                  | Show unstaged changes    |
| `gds`  | `git diff --staged`         | Show staged changes      |
| `gco`  | `git checkout`              | Switch branches          |
| `gb`   | `git branch`                | List/create branches     |
| `gl`   | `git log --oneline --graph` | Compact log with graph   |
| `gst`  | `git stash`                 | Stash changes            |
| `gstp` | `git stash pop`             | Pop stashed changes      |
| `lg`   | `lazygit`                   | Open lazygit TUI         |

### HTTPie Commands

| Alias  | Expansion     | Description         |
| ------ | ------------- | ------------------- |
| `hget` | `http GET`    | HTTP GET request    |
| `hpost`| `http POST`   | HTTP POST request   |
| `hput` | `http PUT`    | HTTP PUT request    |
| `hdel` | `http DELETE`  | HTTP DELETE request |

### System Commands

| Alias  | Expansion           | Description            |
| ------ | ------------------- | ---------------------- |
| `top`  | `btop`              | System monitor         |
| `htop` | `btop`              | System monitor         |
| `cat`  | `bat --paging=never` | Syntax-highlighted cat |

### File Listing (eza)

| Alias | Expansion                                                  | Description                  |
| ----- | ---------------------------------------------------------- | ---------------------------- |
| `ls`  | `eza --icons --group-directories-first`                    | List with icons              |
| `ll`  | `eza -l --icons --git --header --group-directories-first`  | Long format with git status  |
| `la`  | `eza -la --icons --git --header --group-directories-first` | Long format including hidden |
| `lt`  | `eza --tree --level=2 --icons`                             | Tree view (2 levels)         |
| `lta` | `eza --tree --level=2 --icons -a`                          | Tree view including hidden   |

---

## FZF Keybindings

| Keybinding | Action                                |
| ---------- | ------------------------------------- |
| `Ctrl+F`   | File search with bat preview (PSFzf)  |
| `Ctrl+R`   | Command history search (PSFzf)        |
| `Ctrl+/`   | Toggle preview panel                  |

**Inside FZF:**

| Keybinding | Action         |
| ---------- | -------------- |
| `Ctrl+J/K` | Move up/down   |
| `Enter`    | Select item    |
| `Tab`      | Multi-select   |
| `Ctrl+C`   | Cancel         |

---

## WezTerm Keybindings

WezTerm is configured in `.config/wezterm/wezterm.lua`. Default keybindings apply.

| Keybinding        | Action     |
| ----------------- | ---------- |
| `Ctrl+Shift+T`    | New tab    |
| `Ctrl+Shift+W`    | Close tab  |
| `Ctrl+Shift+N`    | New window |
| `Ctrl+Tab`        | Next tab   |
| `Ctrl+Shift+Tab`  | Prev tab   |

> **Note:** tmux is not available natively on Windows. For multiplexing, use WezTerm tabs or Windows Terminal panes (`Alt+Shift+D`). See [`SKIPPED.md`](../SKIPPED.md) for the mapping of tmux shortcuts to Windows Terminal equivalents.

---

## Prompt Palettes (oh-my-posh)

Switch themes at any time:

```powershell
Switch-PromptPalette solarized-dark   # default (Solarized Dark)
Switch-PromptPalette vercel           # Vercel dark
Switch-PromptPalette vesper           # Vesper dark
Switch-PromptPalette list             # show all options
```

The selection persists across sessions in `~/.config/dotfiles/prompt-theme.txt`.

---

## Zoxide

| Command    | Description                              |
| ---------- | ---------------------------------------- |
| `z <dir>`  | Jump to most frecent matching directory  |
| `zi`       | Interactive directory picker (fzf)       |
| `z -`      | Jump to previous directory               |

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
| `1`-`5`    | Switch to panel (Status/Files/Branches/Commits/Stash) |
| `[` / `]`  | Previous / next tab within panel                      |
| `@`        | Open command log                                      |
| `:`        | Execute custom command                                |
| `?`        | Open keybindings menu                                 |

### Navigation

| Keybinding         | Action                        |
| ------------------ | ----------------------------- |
| `Up` / `k`         | Move up                       |
| `Down` / `j`       | Move down                     |
| `PgUp` / `Ctrl+u`  | Page up                       |
| `PgDn` / `Ctrl+d`  | Page down                     |
| `<` / `>`          | Scroll to top / bottom        |
| `/`                | Search                        |
| `n` / `N`          | Next / previous search result |
| `Enter`            | Focus selected item           |

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

| Keybinding          | Action                      |
| ------------------- | --------------------------- |
| `Up` / `Down`       | Navigate between conflicts  |
| `Left` / `Right`    | Select hunk within conflict |
| `Space`             | Pick hunk                   |
| `b`                 | Pick both hunks             |
| `z`                 | Undo last pick              |

### Staging Panel (Line-Level)

| Keybinding    | Action                        |
| ------------- | ----------------------------- |
| `Space`       | Toggle line staged / unstaged |
| `a`           | Toggle hunk staged / unstaged |
| `v`           | Toggle range select           |
| `Up` / `Down` | Navigate lines                |
| `Esc`         | Return to files panel         |

### Status

| Keybinding | Action                |
| ---------- | --------------------- |
| `o`        | Open config file      |
| `e`        | Edit config file      |
| `u`        | Check for update      |
| `Enter`    | Switch to recent repo |
