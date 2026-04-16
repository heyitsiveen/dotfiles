# COMPLETE TMUX STATUS BAR REFERENCE

Comprehensive reference guide for tmux status bar configuration, format variables, styling, and advanced techniques.

---

## TABLE OF CONTENTS

1. [Status Bar Core Options](#status-bar-core-options)
2. [Status Bar Sections](#status-bar-sections)
3. [Window Status Options](#window-status-options)
4. [Pane Border Options](#pane-border-options)
5. [Message & Mode Options](#message--mode-options)
6. [Clock Mode Options](#clock-mode-options)
7. [Format Variables Reference](#format-variables-reference)
8. [Style Attributes](#style-attributes)
9. [Format Modifiers & Conditionals](#format-modifiers--conditionals)
10. [Time & Date Formats](#time--date-formats)
11. [Practical Examples](#practical-examples)
12. [Advanced Techniques](#advanced-techniques)

---

## STATUS BAR CORE OPTIONS

### status
Enable or disable the status bar display.

- **Valid Values:** `on`, `off`
- **Default:** `on`
- **Example:** `set -g status on`

### status-position
Position of the status bar on screen.

- **Valid Values:** `top`, `bottom`
- **Default:** `bottom`
- **Example:** `set -g status-position bottom`

### status-interval
How often (in seconds) to update the status bar.

- **Valid Values:** Any positive integer (0 = disable automatic updates)
- **Default:** `15`
- **Recommendation:** `1` for clocks/dynamic content, `5-15` for static content
- **Example:** `set -g status-interval 1`

### status-justify
Alignment of the window list in the status bar.

- **Valid Values:** 
  - `left` - Align to left
  - `centre` or `center` - Center alignment
  - `right` - Align to right
  - `absolute-centre` - Absolute center (ignores left/right sections)
- **Default:** `left`
- **Example:** `set -g status-justify left`

### status-keys
Key binding mode for status line prompts.

- **Valid Values:** `vi`, `emacs`
- **Default:** `emacs`
- **Example:** `set -g status-keys vi`

### status-style
Overall appearance of the status bar (background, foreground, attributes).

- **Valid Values:** Style specifications (see [Style Attributes](#style-attributes))
- **Default:** `default`
- **Transparency:** Use `bg=default` for transparent background
- **Example:** `set -g status-style fg=colour137,bg=colour234,dim`

### status-format[0-4]
Custom status line formats for multi-line status bars.

- **Valid Values:** Format string
- **Default:** Not set (single-line status)
- **Usage:** Allows up to 5 lines of status bar
- **Example:** 
  ```bash
  set -g status-format[0] "#[align=left]Left side"
  set -g status-format[1] "#[align=centre]Center"
  ```

---

## STATUS BAR SECTIONS

### LEFT SECTION

#### status-left
Content displayed on the left side of the status bar.

- **Valid Values:** Format string with variables and styles
- **Default:** `"[#S] "`
- **Common Variables:** `#S` (session), `#H` (hostname), `#h` (short hostname)
- **Example:** `set -g status-left "#[fg=green]Session: #S #[fg=yellow]#I:#P"`

#### status-left-length
Maximum character length for the left section.

- **Valid Values:** 0 to any positive integer (0 = disable left section)
- **Default:** `10`
- **Recommendation:** `20-50` for detailed info
- **Example:** `set -g status-left-length 40`

#### status-left-style
Default style for the left section (if not using inline `#[...]` styles).

- **Valid Values:** Style specifications
- **Default:** `default`
- **Example:** `set -g status-left-style fg=colour233,bg=colour245,bold`

### RIGHT SECTION

#### status-right
Content displayed on the right side of the status bar.

- **Valid Values:** Format string with variables and styles
- **Default:** `"#{?window_bigger,[#{window_offset_x}#,#{window_offset_y}] ,}\"#{=21:pane_title}\" %H:%M %d-%b-%y"`
- **Common Use:** Time, date, system info
- **Example:** `set -g status-right "#[fg=cyan]%H:%M #[fg=magenta]%d-%b-%y"`

#### status-right-length
Maximum character length for the right section.

- **Valid Values:** 0 to any positive integer (0 = disable right section)
- **Default:** `40`
- **Recommendation:** `40-80` for time/date/system info
- **Example:** `set -g status-right-length 50`

#### status-right-style
Default style for the right section.

- **Valid Values:** Style specifications
- **Default:** `default`
- **Example:** `set -g status-right-style fg=colour233,bg=colour241`

---

## WINDOW STATUS OPTIONS

Configuration for how windows appear in the status bar window list.

### window-status-format
Format for inactive (non-current) windows.

- **Valid Values:** Format string
- **Default:** `"#I:#W#F"`
- **Common Variables:** 
  - `#I` - Window index
  - `#W` - Window name
  - `#F` - Window flags
- **Example:** `set -g window-status-format " #I:#W#F "`

### window-status-style
Default style for inactive windows.

- **Valid Values:** Style specifications
- **Default:** `default`
- **Example:** `set -g window-status-style fg=colour138,bg=colour235,none`

### window-status-current-format
Format for the currently active window.

- **Valid Values:** Format string
- **Default:** `"#I:#W#F"`
- **Common Practice:** Make bold or highlighted
- **Example:** `set -g window-status-current-format " #I:#W#F "`

### window-status-current-style
Style for the currently active window.

- **Valid Values:** Style specifications
- **Default:** `default`
- **Example:** `set -g window-status-current-style fg=colour81,bg=colour238,bold`

### window-status-last-style
Style for the last active window (the one you were in before current).

- **Valid Values:** Style specifications
- **Default:** `default`
- **Use Case:** Highlight recently used window
- **Example:** `set -g window-status-last-style fg=colour255,bg=colour237`

### window-status-activity-style
Style when activity is detected in an inactive window.

- **Valid Values:** Style specifications
- **Default:** `reverse`
- **Requires:** `set -g monitor-activity on`
- **Example:** `set -g window-status-activity-style fg=colour154,bg=colour235,none`

### window-status-bell-style
Style when a bell alert occurs in a window.

- **Valid Values:** Style specifications
- **Default:** `reverse`
- **Example:** `set -g window-status-bell-style fg=colour255,bg=colour1,bold`

### window-status-separator
Character(s) between window entries in the status bar.

- **Valid Values:** Any string
- **Default:** `" "` (single space)
- **Common Options:** `" "`, `" | "`, `""` (no separator), `" • "`
- **Example:** `set -g window-status-separator "|"`

---

## PANE BORDER OPTIONS

Configuration for pane borders and their appearance.

### pane-border-style
Style for borders of inactive panes.

- **Valid Values:** Style specifications (typically only `fg` is used)
- **Default:** `default`
- **Transparency:** Use `fg=default` for terminal default color
- **Example:** `set -g pane-border-style fg=colour240`

### pane-active-border-style
Style for the border of the currently active pane.

- **Valid Values:** Style specifications
- **Default:** `fg=green`
- **Common Practice:** Brighter/bolder than inactive borders
- **Example:** `set -g pane-active-border-style fg=colour214,bold`

### pane-border-format
Content displayed in pane borders when `pane-border-status` is enabled.

- **Valid Values:** Format string
- **Default:** `"#{pane_index} #{pane_current_command}"`
- **Available Variables:** `#{pane_index}`, `#{pane_title}`, `#{pane_current_path}`, `#{pane_current_command}`
- **Example:** `set -g pane-border-format " #{pane_index} #{pane_current_command} "`

### pane-border-status
Show a status line on each pane border.

- **Valid Values:** `off`, `top`, `bottom`
- **Default:** `off`
- **Use Case:** Show pane info when working with many panes
- **Example:** `set -g pane-border-status off`

### pane-border-lines
Visual style of the pane border lines.

- **Valid Values:**
  - `single` - Single line borders (default, ASCII-safe): `─│┌┐└┘`
  - `double` - Double line borders: `═║╔╗╚╝`
  - `heavy` - Bold/thick line borders: `━┃┏┓┗┛`
  - `simple` - Plain ASCII characters
  - `number` - Show pane numbers as borders
- **Default:** `single`
- **Example:** `set -g pane-border-lines heavy`

---

## MESSAGE & MODE OPTIONS

### message-style
Style for tmux messages and command prompts.

- **Valid Values:** Style specifications
- **Default:** `bg=yellow,fg=black`
- **When Shown:** Prefix+`:` commands, tmux notifications
- **Example:** `set -g message-style fg=colour232,bg=colour166,bold`

### message-command-style
Style for the command line when typing commands.

- **Valid Values:** Style specifications
- **Default:** `bg=black,fg=yellow`
- **When Shown:** While typing after Prefix+`:`
- **Example:** `set -g message-command-style fg=blue,bg=black`

### mode-style
Style for selection in copy mode and other modes.

- **Valid Values:** Style specifications
- **Default:** `bg=yellow,fg=black`
- **When Shown:** Selected text in copy mode
- **Example:** `set -g mode-style bg=colour214,fg=colour232,bold`

---

## CLOCK MODE OPTIONS

Configuration for the built-in clock display (Prefix+t).

### clock-mode-colour
Color of the clock display.

- **Valid Values:** Any valid color (see [Style Attributes](#style-attributes))
- **Default:** `blue`
- **Example:** `set -g clock-mode-colour colour109`

### clock-mode-style
Time format for the clock display.

- **Valid Values:** 
  - `12` - 12-hour format with AM/PM
  - `24` - 24-hour format
- **Default:** `24`
- **Example:** `set -g clock-mode-style 24`

---

## FORMAT VARIABLES REFERENCE

Variables you can use in status bar formats, prefixed with `#{}` or shorthand `#`.

### SESSION VARIABLES

| Variable | Short | Description |
|----------|-------|-------------|
| `#{session_name}` | `#S` | Session name |
| `#{session_id}` | - | Unique session ID ($0, $1, etc.) |
| `#{session_windows}` | - | Number of windows in session |
| `#{session_attached}` | - | Number of clients attached to session |
| `#{session_many_attached}` | - | 1 if multiple clients attached |
| `#{session_grouped}` | - | 1 if session is part of a group |
| `#{session_group}` | - | Name of session group |
| `#{session_group_size}` | - | Number of sessions in group |
| `#{session_created}` | - | Session creation time (Unix timestamp) |
| `#{session_activity}` | - | Time of last session activity |
| `#{session_last_attached}` | - | Time of last attachment |
| `#{session_alerts}` | - | List of window indexes with alerts |
| `#{session_stack}` | - | Window stack order |
| `#{session_path}` | - | Working directory of session |

### WINDOW VARIABLES

| Variable | Short | Description |
|----------|-------|-------------|
| `#{window_index}` | `#I` | Window index number |
| `#{window_id}` | - | Unique window ID (@0, @1, etc.) |
| `#{window_name}` | `#W` | Window name |
| `#{window_flags}` | `#F` | Window flags (*, -, #, !, ~, M, Z) |
| `#{window_active}` | - | 1 if window is active |
| `#{window_bell_flag}` | - | 1 if bell alert occurred |
| `#{window_activity_flag}` | - | 1 if activity detected |
| `#{window_silence_flag}` | - | 1 if silence detected |
| `#{window_last_flag}` | - | 1 if this was the last active window |
| `#{window_marked_flag}` | - | 1 if window is marked |
| `#{window_zoomed_flag}` | - | 1 if window has a zoomed pane |
| `#{window_panes}` | - | Number of panes in window |
| `#{window_width}` | - | Width of window in cells |
| `#{window_height}` | - | Height of window in cells |
| `#{window_layout}` | - | Window layout description |
| `#{window_linked}` | - | 1 if window is linked to other sessions |
| `#{window_start_flag}` | - | 1 if first window in session |
| `#{window_end_flag}` | - | 1 if last window in session |
| `#{window_stack_index}` | - | Position in window stack |

#### Window Flags (#F)

- `*` - Current window
- `-` - Last window (previously active)
- `#` - Activity detected
- `!` - Bell alert detected
- `~` - Silence detected (monitor-silence)
- `M` - Marked window
- `Z` - Zoomed pane exists

### PANE VARIABLES

| Variable | Short | Description |
|----------|-------|-------------|
| `#{pane_id}` | `#D` | Unique pane ID (%0, %1, etc.) |
| `#{pane_index}` | `#P` | Pane index number |
| `#{pane_title}` | `#T` | Title of pane |
| `#{pane_current_command}` | - | Current command running in pane |
| `#{pane_current_path}` | - | Current working directory |
| `#{pane_pid}` | - | PID of the pane process |
| `#{pane_tty}` | - | Pseudo terminal of pane |
| `#{pane_width}` | - | Width of pane in cells |
| `#{pane_height}` | - | Height of pane in cells |
| `#{pane_top}` | - | Top edge position |
| `#{pane_left}` | - | Left edge position |
| `#{pane_right}` | - | Right edge position |
| `#{pane_bottom}` | - | Bottom edge position |
| `#{pane_at_left}` | - | 1 if pane is at left edge |
| `#{pane_at_right}` | - | 1 if pane is at right edge |
| `#{pane_at_top}` | - | 1 if pane is at top edge |
| `#{pane_at_bottom}` | - | 1 if pane is at bottom edge |
| `#{pane_active}` | - | 1 if pane is active |
| `#{pane_marked}` | - | 1 if pane is marked |
| `#{pane_dead}` | - | 1 if pane has exited |
| `#{pane_dead_status}` | - | Exit status if pane is dead |
| `#{pane_in_mode}` | - | 1 if pane is in a mode (copy, etc.) |
| `#{pane_synchronized}` | - | 1 if pane input is synchronized |
| `#{pane_start_command}` | - | Command pane was started with |

### CLIENT VARIABLES

| Variable | Description |
|----------|-------------|
| `#{client_name}` | Name of client |
| `#{client_session}` | Session client is attached to |
| `#{client_last_session}` | Last session name |
| `#{client_prefix}` | **1 if prefix key has been pressed** ⭐ |
| `#{client_key_table}` | Current key table |
| `#{client_tty}` | Client terminal device |
| `#{client_termname}` | Terminal name |
| `#{client_termtype}` | Terminal type |
| `#{client_width}` | Width of client terminal |
| `#{client_height}` | Height of client terminal |
| `#{client_pid}` | PID of client process |
| `#{client_activity}` | Time of last client activity |
| `#{client_created}` | Time client was created |
| `#{client_readonly}` | 1 if client is read-only |
| `#{client_control_mode}` | 1 if client is in control mode |
| `#{client_utf8}` | 1 if client uses UTF-8 |

**⭐ Important:** `#{client_prefix}` is the key variable for creating prefix indicators!

### HOST VARIABLES

| Variable | Short | Description |
|----------|-------|-------------|
| `#{host}` | `#H` | Hostname (full FQDN) |
| `#{host_short}` | `#h` | Hostname (short, up to first `.`) |

### SERVER & SYSTEM VARIABLES

| Variable | Description |
|----------|-------------|
| `#{pid}` | tmux server PID |
| `#{socket_path}` | Path to tmux socket |
| `#{start_time}` | Server start time |
| `#{version}` | tmux version string |
| `#{uid}` | Server user ID |
| `#{user}` | Username of server user |

### BUFFER VARIABLES

| Variable | Description |
|----------|-------------|
| `#{buffer_name}` | Name of paste buffer |
| `#{buffer_sample}` | Sample content from buffer |
| `#{buffer_size}` | Size of buffer in bytes |
| `#{buffer_created}` | Time buffer was created |

---

## STYLE ATTRIBUTES

### COLORS

#### Named Colors
Basic terminal colors:
```
black, red, green, yellow, blue, magenta, cyan, white
```

Bright variants:
```
brightblack (or grey/gray), brightred, brightgreen, brightyellow, 
brightblue, brightmagenta, brightcyan, brightwhite
```

Special:
```
default - Use terminal's default color (creates transparency)
```

#### Indexed Colors (256-color palette)
```bash
colour0 through colour255  # or color0 through color255
```

**Color Palette Quick Reference:**
- `0-15` - Standard terminal colors
- `16-231` - 216 RGB colors (6×6×6 cube)
- `232-255` - 24 grayscale colors (dark → light)

**Common Colors:**
```
Blacks/Grays: 232 (darkest) → 255 (lightest)
Reds: 88, 124, 160, 196, 203
Greens: 28, 34, 40, 46, 82, 118, 148, 154
Blues: 17, 18, 19, 20, 21, 33, 39, 45, 51, 81, 117
Yellows: 136, 142, 148, 184, 190, 214, 220, 226
Purples: 54, 90, 91, 92, 93, 98, 105, 141, 177
Cyans: 37, 44, 51, 80, 87, 109, 116, 123
Oranges: 130, 166, 172, 202, 208, 214
Pinks: 125, 161, 168, 197, 201, 205, 212, 219
```

#### RGB/Hex Colors
```bash
#RGB        # 4-bit RGB (e.g., #f00 = bright red)
#RRGGBB     # 8-bit RGB (e.g., #ff0000 = red)
```

### TEXT ATTRIBUTES

#### Enabling Attributes
```
none               - No attributes (reset all)
bold (or bright)   - Bold/bright text
dim                - Dimmed text
underscore         - Single underline
double-underscore  - Double underline
blink              - Blinking text
reverse            - Swap foreground/background
hidden             - Invisible text
italics            - Italic text
strikethrough      - Strikethrough text
overline           - Overlined text
```

#### Disabling Attributes
Prefix with `no` to disable:
```
nobold, nodim, nounderscore, nodouble-underscore, noblink,
noreverse, nohidden, noitalics, nostrikethrough, nooverline
```

### COMBINING STYLES

Combine multiple attributes with commas:
```bash
# Foreground + Background + Attributes
set -g status-style fg=colour223,bg=colour237,bold,dim

# Multiple attributes
set -g window-status-current-style fg=white,bg=blue,bold,underscore

# Using default for transparency
set -g status-style fg=colour223,bg=default  # Transparent background
```

### ALIGNMENT & SPECIAL ATTRIBUTES

```
align=left         - Left align text
align=centre       - Center align text (or align=center)
align=right        - Right align text
fill=X             - Fill remaining space with character X
```

---

## FORMAT MODIFIERS & CONDITIONALS

Powerful formatting options for dynamic status bars.

### CONDITIONAL FORMATTING

#### Basic Conditional
```bash
#{?CONDITION,TRUE_VALUE,FALSE_VALUE}
```

**Example:**
```bash
# Show different text based on window zoom state
#{?window_zoomed_flag,ZOOMED,NORMAL}

# Change color when prefix is pressed
#{?client_prefix,#[fg=red],#[fg=green]}
```

### COMPARISON OPERATORS

```bash
#{==:value1,value2}    # Equal
#{!=:value1,value2}    # Not equal
#{<:value1,value2}     # Less than
#{>:value1,value2}     # Greater than
#{<=:value1,value2}    # Less than or equal
#{>=:value1,value2}    # Greater than or equal
```

**Examples:**
```bash
# Check if window has more than 3 panes
#{?#{>:#{window_panes},3},MANY,FEW}

# Check if session name equals "main"
#{?#{==:#{session_name},main},MAIN SESSION,OTHER}
```

### LOGICAL OPERATORS

```bash
#{||:cond1,cond2}      # Logical OR
#{&&:cond1,cond2}      # Logical AND
#{!:condition}         # Logical NOT
```

**Examples:**
```bash
# Check if zoomed OR has many panes
#{?#{||:#{window_zoomed_flag},#{>:#{window_panes},3}},COMPLEX,SIMPLE}

# Check if NOT active
#{?#{!:#{pane_active}},INACTIVE,ACTIVE}
```

### PATTERN MATCHING

```bash
#{m:pattern,value}     # Match glob pattern
#{m/r:regex,value}     # Match regex pattern
```

**Examples:**
```bash
# Check if command contains "vim"
#{?#{m:*vim*,#{pane_current_command}},VIM,OTHER}

# Check if path is in home directory
#{?#{m:$HOME*,#{pane_current_path}},HOME,AWAY}
```

### STRING OPERATIONS

```bash
#{l:variable}          # Literal value (don't expand)
#{q:variable}          # Quote shell special characters
#{E:variable}          # Expand format variables
#{b:variable}          # Basename of path
#{d:variable}          # Directory name of path
#{s/old/new:variable}  # Substitute first occurrence
#{s/old/new/g:variable} # Substitute all occurrences (global)
```

**Examples:**
```bash
# Get basename of current path
#{b:pane_current_path}

# Get directory only
#{d:pane_current_path}

# Replace "bash" with "sh" in command name
#{s/bash/sh:pane_current_command}

# Quote path for shell safety
#{q:pane_current_path}
```

### PADDING & TRUNCATION

```bash
#{=N:variable}         # Limit to N characters, left-aligned
#{=-N:variable}        # Limit to N characters, right-aligned
#{=|N:variable}        # Limit to N characters, center-aligned
#{=/N/fill:variable}   # Limit to N with custom fill character
```

**Examples:**
```bash
# Limit session name to 15 characters
#{=15:session_name}

# Right-align and limit to 20
#{=-20:pane_current_path}

# Center-align window name in 10 chars
#{=|10:window_name}

# Limit with custom fill
#{=/20/.:pane_title}
```

### LOOPS

```bash
#{W:format}            # Loop over windows
#{P:format}            # Loop over panes
#{S:format}            # Loop over sessions
```

**Examples:**
```bash
# List all window indexes
#{W:#{window_index} }

# Show all pane IDs
#{P:#{pane_id} }
```

### TIME FORMATTING

```bash
#{t:variable}          # Format Unix timestamp as time
#{T:variable}          # Format as time string
#{t/f:variable}        # Format with custom strftime format
```

**Examples:**
```bash
# Format session creation time
#{t:session_created}

# Custom time format
#{t/f/%Y-%m-%d:session_created}
```

### ARITHMETIC OPERATIONS

```bash
#{e:expression}        # Evaluate arithmetic expression
```

**Operators:**
- Arithmetic: `+`, `-`, `*`, `/`, `%` (modulo)
- Comparison: `==`, `!=`, `<`, `>`, `<=`, `>=`
- Logical: `||`, `&&`, `!`
- Bitwise: `&`, `|`, `^`, `~`, `<<`, `>>`

**Examples:**
```bash
# Double the number of panes
#{e:#{window_panes}*2}

# Calculate percentage
#{e:#{pane_width}*100/#{window_width}}
```

---

## TIME & DATE FORMATS

Format specifiers for use with `strftime` in status bar (with `%` prefix).

### DATE FORMATS

```
%Y - Year (4-digit)          # 2025
%y - Year (2-digit)          # 25
%C - Century                 # 20
%m - Month (numeric)         # 01-12
%B - Month (full name)       # January, February
%b - Month (abbreviated)     # Jan, Feb
%h - Same as %b              # Jan, Feb
%d - Day of month            # 01-31
%e - Day of month (space)    #  1-31
%j - Day of year             # 001-366
%u - Weekday (1-7, Mon=1)    # 1-7
%w - Weekday (0-6, Sun=0)    # 0-6
%a - Weekday (abbreviated)   # Mon, Tue
%A - Weekday (full)          # Monday, Tuesday
%W - Week number             # 00-53
```

### TIME FORMATS

```
%H - Hour (24-hour)          # 00-23
%I - Hour (12-hour)          # 01-12
%k - Hour (24, space)        #  0-23
%l - Hour (12, space)        #  1-12
%M - Minute                  # 00-59
%S - Second                  # 00-59
%p - AM/PM (uppercase)       # AM, PM
%P - am/pm (lowercase)       # am, pm
%s - Unix timestamp          # 1706198400
%z - Timezone offset         # +0000, -0500
%Z - Timezone name           # UTC, EST
```

### COMBINED FORMATS

```
%F - Date (%Y-%m-%d)         # 2025-01-26
%D - Date (%m/%d/%y)         # 01/26/25
%x - Locale date             # 01/26/2025
%R - Time (%H:%M)            # 14:30
%T - Time (%H:%M:%S)         # 14:30:45
%r - 12-hour time            # 02:30:45 PM
%X - Locale time             # 14:30:45
```

### SPECIAL CHARACTERS

```
%n - Newline
%t - Tab
%% - Literal %
```

### PRACTICAL DATE/TIME EXAMPLES

```bash
# ISO 8601 format
"%Y-%m-%d %H:%M:%S"          # 2025-01-26 14:30:45

# US format with 12-hour time
"%m/%d/%Y %I:%M %p"          # 01/26/2025 02:30 PM

# Short format
"%b %d %H:%M"                # Jan 26 14:30

# Day and time
"%a %H:%M"                   # Mon 14:30

# Full verbose
"%A, %B %d, %Y at %I:%M %p" # Monday, January 26, 2025 at 02:30 PM
```

---

## PRACTICAL EXAMPLES

### BASIC STATUS BARS

#### Minimal Setup
```bash
set -g status on
set -g status-style bg=black,fg=white
set -g status-left "#S "
set -g status-right "%H:%M"
set -g window-status-format "#I:#W"
set -g window-status-current-format "#I:#W*"
```

#### Classic Look
```bash
set -g status-style bg=colour234,fg=colour137
set -g status-left "#[fg=colour233,bg=colour245,bold] #S "
set -g status-right "#[fg=colour233,bg=colour245] %d/%m #[fg=colour233,bg=colour241] %H:%M:%S "
set -g window-status-format " #I:#W "
set -g window-status-current-format "#[fg=colour81,bold] #I:#W "
```

#### Transparent Status Bar
```bash
set -g status-style bg=default,fg=colour250
set -g status-left "#[fg=colour214,bg=default,bold] #S "
set -g status-right "#[fg=colour246,bg=default]%Y-%m-%d #[fg=colour109]%H:%M"
set -g window-status-format "#[fg=colour246,bg=default] #I:#W "
set -g window-status-current-format "#[fg=colour214,bg=default,bold] #I:#W "
```

### PREFIX INDICATOR EXAMPLES

**⭐ Using `#{client_prefix}` for Visual Feedback**

#### Example 1: Change Status-Left Background
```bash
# Session name background turns RED when prefix is pressed
set -g status-left "#{?client_prefix,#[fg=colour232# bg=colour1],#[fg=colour232 bg=colour214 bold]} #S "
```

#### Example 2: Show PREFIX Text
```bash
# Display "PREFIX" text when pressed
set -g status-right "#{?client_prefix,#[fg=colour1 bold]PREFIX}#[fg=colour246]%Y-%m-%d %H:%M"
```

#### Example 3: Change Entire Status Bar Color
```bash
# Whole status bar changes color
set -g status-style "#{?client_prefix,#[fg=colour1 bg=colour237],#[fg=colour223]}"
```

#### Example 4: Add Indicator Symbol
```bash
# Show warning symbol when prefix is active
set -g status-left "#{?client_prefix,#[fg=colour1]⚠  ,#[fg=colour214]●  }#[fg=colour232,bg=colour214,bold]#S "
```

#### Example 5: Blink Session Name
```bash
# Blink the session name when waiting for command
set -g status-left "#{?client_prefix,#[blink],#[noblink]}#[fg=colour232,bg=colour214,bold] #S "
```

#### Example 6: Change Border Color
```bash
# Active pane border changes when prefix pressed
set -g pane-active-border-style "#{?client_prefix,#[fg=colour1],#[fg=colour214]}"
```

#### Example 7: Multiple Visual Cues
```bash
# Combine multiple indicators
set -g status-style "#{?client_prefix,#[bg=colour1],#[bg=colour237]},#[fg=colour223]"
set -g status-left "#{?client_prefix,#[bold],#[blink]}#S#{?client_prefix, WAITING} "
set -g pane-active-border-style "#{?client_prefix,#[fg=colour1],#fg=colour214]}"
```

### WINDOW STATUS EXAMPLES

#### Show Zoomed State
```bash
set -g window-status-current-format "#I:#W#{?window_zoomed_flag, 🔍,}"
```

#### Show Pane Count
```bash
set -g window-status-format "#I:#W(#{window_panes})"
```

#### Conditional Window Styling
```bash
# Different color if window has many panes
set -g window-status-format "#{?#{>:#{window_panes},3},#[fg=colour214],#[fg=colour246]} #I:#W "
```

### SYSTEM INFORMATION

#### Show Current Path
```bash
set -g status-right "#[fg=colour246]#{pane_current_path} | %H:%M"
```

#### Show Username and Hostname
```bash
set -g status-left "#[fg=colour214]#(whoami)@#H #[fg=colour246]| #[fg=colour232,bg=colour214,bold] #S "
```

#### Show Uptime (Linux/macOS)
```bash
set -g status-right "#[fg=colour246]#(uptime | cut -d ',' -f 3-) | %H:%M"
```

#### Show CPU Load
```bash
set -g status-right "#[fg=colour246]Load: #(cut -d ' ' -f 1-3 /proc/loadavg) | %H:%M"
```

#### Show Memory Usage (Linux)
```bash
set -g status-right "#[fg=colour246]Mem: #(free -h | awk 'NR==2{print $3\"/\"$2}') | %H:%M"
```

#### Show Battery (macOS)
```bash
set -g status-right "#[fg=colour246]🔋 #(pmset -g batt | grep -o '[0-9]*%') | %H:%M"
```

#### Show Battery (Linux)
```bash
set -g status-right "#[fg=colour246]🔋 #(cat /sys/class/power_supply/BAT0/capacity)% | %H:%M"
```

#### Show Disk Usage
```bash
set -g status-right "#[fg=colour246]Disk: #(df -h / | awk 'NR==2{print $5}') | %H:%M"
```

---

## ADVANCED TECHNIQUES

### SHELL COMMAND EXECUTION

Execute shell commands in status bar with `#()`:

```bash
#(command)              # Execute and insert output
```

**Important Notes:**
- Commands run every `status-interval` seconds
- Can use pipes, redirects, and full shell syntax
- Keep commands fast to avoid status bar lag
- Output is inserted directly into status bar

**Examples:**
```bash
# Get current Git branch
#(cd #{pane_current_path}; git rev-parse --abbrev-ref HEAD 2>/dev/null)

# Check if VPN is connected
#(ifconfig | grep -q tun0 && echo "VPN" || echo "No VPN")

# Show kubernetes context
#(kubectl config current-context 2>/dev/null)

# Weather information
#(curl -s wttr.in/?format=3)

# Docker container count
#(docker ps -q | wc -l) containers
```

### NESTED CONDITIONALS

Combine multiple conditions for complex logic:

```bash
# Show different text based on multiple conditions
#{?#{&&:#{window_zoomed_flag},#{>:#{window_panes},1}},ZOOMED+MULTI,\
#{?window_zoomed_flag,ZOOMED,\
#{?#{>:#{window_panes},1},MULTI,SINGLE}}}
```

### DYNAMIC COLORS

Change colors based on conditions:

```bash
# Color based on window pane count
set -g window-status-format "\
#{?#{>:#{window_panes},3},#[fg=red],\
#{?#{>:#{window_panes},1},#[fg=yellow],#[fg=green]}} #I:#W "
```

### POWERLINE-STYLE SEPARATORS

Create sleek, connected status bars:

```bash
# Left section with powerline separator
set -g status-left "\
#[fg=colour232,bg=colour214,bold] #S \
#[fg=colour214,bg=colour237,nobold]\
"

# Right section with powerline separator
set -g status-right "\
#[fg=colour246,bg=colour237]\
#[fg=colour237,bg=colour246] %H:%M \
"
```

**Powerline Symbols** (requires powerline font):
- `` - Right arrow
- `` - Left arrow
- `` - Right filled triangle
- `` - Left filled triangle

### MULTI-LINE STATUS BARS

Create status bars with multiple lines:

```bash
set -g status 2
set -g status-format[0] "#[align=left]Line 1 content"
set -g status-format[1] "#[align=centre]Line 2 content"
```

### REAL-TIME INDICATORS

#### Git Branch Indicator
```bash
set -g status-right "#[fg=colour246]#(cd #{pane_current_path}; git branch 2>/dev/null | grep '*' | cut -d ' ' -f2) | %H:%M"
```

#### SSH Connection Indicator
```bash
set -g status-right "#{?#{==:#{pane_current_command},ssh},#[fg=red]SSH ,}%H:%M"
```

#### Docker Status
```bash
set -g status-left "#[fg=colour214]#S #[fg=colour246]#(docker ps -q | wc -l) 🐳 "
```

### PERFORMANCE OPTIMIZATION

**Tips for fast status bars:**

1. **Limit command frequency:**
   ```bash
   set -g status-interval 5  # Don't update too frequently
   ```

2. **Cache expensive operations:**
   ```bash
   # Use shell script that caches results
   #(~/.tmux/scripts/cached_status.sh)
   ```

3. **Avoid heavy commands:**
   ```bash
   # Good: Direct file read
   #(cat /proc/loadavg | cut -d ' ' -f1)
   
   # Bad: Heavy processing
   #(find / -name "*.txt" 2>/dev/null | wc -l)
   ```

### DEBUGGING STATUS BAR

Check what tmux is interpreting:

```bash
# Show current status-left value
tmux show-options -g status-left

# Display all status options
tmux show-options -g | grep status

# Test format string
tmux display-message -p "#{client_prefix}"
```

---

## QUICK REFERENCE CHEATSHEET

### Most Common Variables

```bash
#S - Session name
#I - Window index
#W - Window name
#P - Pane index
#F - Window flags
#H - Hostname (full)
#h - Hostname (short)
#T - Pane title
#{pane_current_path} - Current directory
#{pane_current_command} - Running command
#{client_prefix} - Prefix pressed indicator
```

### Most Common Styles

```bash
bg=colour237,fg=colour223          # Background and foreground
bg=default,fg=colour223            # Transparent background
fg=colour214,bg=colour237,bold     # With attributes
```

### Most Common Conditionals

```bash
#{?client_prefix,TRUE,FALSE}                    # Prefix indicator
#{?window_zoomed_flag,ZOOMED,NORMAL}           # Zoom state
#{?#{>:#{window_panes},1},MANY,ONE}            # Pane count
```

### Most Common Time Formats

```bash
%Y-%m-%d         # 2025-01-26
%H:%M            # 14:30
%H:%M:%S         # 14:30:45
%d-%b-%y         # 26-Jan-25
%I:%M %p         # 02:30 PM
```

---

## ADDITIONAL RESOURCES

### Official Documentation
- Manual page: `man tmux`
- tmux GitHub: https://github.com/tmux/tmux
- tmux Wiki: https://github.com/tmux/tmux/wiki

### Testing Your Configuration
```bash
# Reload configuration
tmux source-file ~/.tmux.conf

# Test a format string
tmux display-message -p "#{your_format_here}"

# Show current option value
tmux show-options -g status-left
```

### Debugging
```bash
# Start tmux with verbose logging
tmux -vv new-session

# Check for errors in config
tmux source-file ~/.tmux.conf
```

---

**Document Version:** 2.0  
**Last Updated:** January 2025  
**tmux Version:** 3.3+

---

*This reference covers tmux 3.0+. Some features may not be available in older versions.*
