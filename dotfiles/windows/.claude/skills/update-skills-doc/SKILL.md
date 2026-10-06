---
name: update-skills-doc
description: Maintain docs/skills.md across the dotfiles repos — audit the tables against what's installed on this machine (skills-sh skills and plugin skills) to catch what's new, or document a skill or provider the user names. Use after installing or removing a skill or plugin, or when skills.md looks stale.
---

# Update skills.md

`docs/skills.md` is the provider-grouped catalogue of skills-sh skills — one section per source repo, each with an install command and a table of skills. This skill keeps it true.

Two branches, both ending in the same **Sync** and **Verify** steps:

- **Audit** — reconcile every section against reality. Default when the user names no specific skill.
- **Add** — document a skill or provider the user supplies.

## Files

Three tracked copies. The dotfiles repo holds the canonical one; the other two are mirrors inside the sibling `heyitsiveen-dotfiles` repo:

| Copy      | Path                                                   |
| --------- | ------------------------------------------------------ |
| canonical | `dotfiles/docs/skills.md`                              |
| macos     | `heyitsiveen-dotfiles/dotfiles/macos/docs/skills.md`   |
| windows   | `heyitsiveen-dotfiles/dotfiles/windows/docs/skills.md` |

Resolve the sibling repo relative to the one you are in (`../heyitsiveen-dotfiles`, `../dotfiles`); if it is missing, ask where it lives. Edit the canonical copy, then Sync.

Canonical and macos are byte-identical. Windows differs on **line 5 only** — `This setup has no npm/npx` where macos says `This machine has no npm/npx`. That single delta is the whole difference; preserve it.

Scope is exactly these three files. Other `skills.md` copies on the machine belong to other repos and stay untouched.

## Audit

The machine is the source of truth — everything comes from local manifests, so the audit runs offline. Take both inventories, then reconcile section by section, top to bottom. Done when every installed skill has been matched to a row or deliberately routed elsewhere — no section skipped, and skipping for cost is a fail.

### 1. Installed skills-sh skills

`~/.agents/.skill-lock.json` maps every installed skill to its source: `skills.<name>.source` is the `owner/repo` that owns the section it belongs in.

```bash
python3 -c "import json;d=json.load(open('$HOME/.agents/.skill-lock.json'))['skills'];[print(v['source'],k) for k,v in sorted(d.items(),key=lambda i:i[1]['source'])]"
```

### 2. Installed plugin skills

`~/.claude/plugins/installed_plugins.json` is the installed set; the cache holds stale versions too, so read the manifest and glob each `installPath` (skills sit at varying depths, not always under `skills/`).

```bash
python3 -c "
import json,os,glob
p=json.load(open(os.path.expanduser('~/.claude/plugins/installed_plugins.json')))['plugins']
for name,insts in sorted(p.items()):
    for i in insts:
        sk=sorted({os.path.basename(os.path.dirname(f)) for f in glob.glob(i['installPath']+'/**/SKILL.md',recursive=True)})
        print(f\"{name} v{i['version']}: {', '.join(sk) or '-'}\")
"
```

### 3. Reconcile

Three outcomes, one per kind of gap:

- **Installed, undocumented** — add the row. Its description comes from the skill's own `SKILL.md` frontmatter (`~/.agents/skills/<name>/` or the plugin's `installPath`), compressed to the table voice.
- **New provider** — a skills-sh `source` with no section in the doc: build one per **House style**.
- **Documented, uninstalled** — the doc lists a provider's catalogue, so a row for a skill you never installed is legitimate. Report those rows and let the user call it; drop one only when the user says to.

Plugin skills belong in `docs/plugins.md`, with one exception: a provider shipping **both** a skills-sh repo and a plugin (Matt Pocock today) has a section here whose prose and install block mention the plugin — version bumps, renames, and changed skill counts land in that section. Every other plugin gap goes into your report, named, for `docs/plugins.md` to absorb.

## Add

The user names a skill, or a provider repo.

- **Provider section exists** — append the row to its table, keeping that table's ordering (the mattpocock table is flow order, so place the row where the flow puts it).
- **No section** — create one per **House style**, placed to keep the file's rough grouping (vendors, then design/craft, then workflow).

The install form comes from the lock file, not a guess: the entry's `skillPath` of `skills/<name>/SKILL.md` means the bare `pnpx skills add owner/repo`; any other path means the `--skill` form. For a skill the user names but has not installed, ask which form applies.

## House style

Section anatomy, in order:

````markdown
## Provider Name — [owner/repo](https://github.com/owner/repo)

_Optional one-line italic blurb — what the provider is about. Only when the name doesn't carry it._

```bash
pnpx skills add owner/repo
```

| Skill        | Description                    |
| ------------ | ------------------------------ |
| `skill-name` | What it does, no trailing stop |
````

Rules that keep the file consistent:

- **`pnpx`, always** — this machine has no `npm`/`npx`. Upstream docs write `npx skills add …`; translate.
- **Slug in backticks**, description in sentence case, no trailing period, em dashes (—) for asides.
- **Realign the whole table** when a new row's cell is wider than the current column — every pipe in that table moves. Tables here are padded to the widest cell.
- **`Invocation` column** only where the provider mixes user-invoked and model-invoked skills (mattpocock). Values: `user`, `model`.
- **`> [!NOTE]`** after a table for a real gotcha — a name collision, a `disable-model-invocation` surprise. Facts the tables cannot hold.
- One meaning, one place: a fact already in the prose blurb stays out of the description.

## Sync

Copy canonical over both mirrors, then restore the windows wording:

```bash
cp <dotfiles>/docs/skills.md <hd>/dotfiles/macos/docs/skills.md
cp <dotfiles>/docs/skills.md <hd>/dotfiles/windows/docs/skills.md
```

Then edit line 5 of the windows copy back to `This setup has no npm/npx`.

## Verify

Both checks pass before you report:

```bash
diff <dotfiles>/docs/skills.md <hd>/dotfiles/macos/docs/skills.md            # silent
diff <dotfiles>/docs/skills.md <hd>/dotfiles/windows/docs/skills.md          # line 5 only
```

Then report: rows added, descriptions rewritten, documented-but-uninstalled rows for the user to rule on, and anything routed to `docs/plugins.md`. Leave the three files staged-but-uncommitted unless the user asks for a commit.
