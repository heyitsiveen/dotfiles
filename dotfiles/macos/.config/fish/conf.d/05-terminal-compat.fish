# Terminal compatibility
#
# fish 4.1+ probes the terminal with a Primary Device Attribute query (\e[0c)
# to enable optional features. Terminals that never answer — the Claude Code
# desktop terminal among them — make fish stall 10s on startup and print:
#
#   warning: fish could not read response to Primary Device Attribute query
#
# Feature flags are read before config is sourced, so this set takes effect
# from the NEXT shell onward. It is universal, hence the idempotence guard —
# fish_variables is not versioned, so this keeps the flag reproducible on a
# fresh machine.
#
# See: man fish-terminal-compatibility, `status features`

if not contains -- no-query-term $fish_features
    set -Ua fish_features no-query-term
end
