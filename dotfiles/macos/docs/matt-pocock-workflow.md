# Matt Pocock's AI Coding Workflow — Deep Reference

Companion to the [Engineering Workflow section of skills.md](skills.md) — that section is the quick table; this doc is the full reference. Everything here is traced to a primary source (his site, repo, videos, or talks), with URL and date. Claims only reachable through mirrors of his X posts are marked *[via secondary source]*.

## Overview

Matt Pocock ([aihero.dev](https://www.aihero.dev), [mattpocock/skills](https://github.com/mattpocock/skills)) publishes a system of small, composable Claude Code skills — deliberately **not** a process-owning framework ("you need to own as much of your planning stack as you possibly can" — AI Engineer workshop, 2026-04-24). The system rests on a few load-bearing ideas:

- **Alignment before code**: a "grilling" interview until human and agent share an understanding, captured as domain vocabulary (`GLOSSARY.md`) and hard-to-reverse decisions (ADRs).
- **Two essential documents**: "something to document the destination \[spec] and something to document the journey \[tickets/kanban]" (workshop, 2026-04-24).
- **Human-in-the-loop planning, AFK implementation**: "planning, this alignment phase has to be human in the loop. Has to be" — implementation can run unattended (Ralph loops, Sandcastle); QA stays human because "QA is how I impose my taste… without that you just end up with slop."
- **Context is a budget**: stay in the ~100–120k-token "smart zone", clear rather than compact for new work, size every task to fit one window.
- **The codebase is the prompt**: "Your codebase, way more than your prompt or your AGENTS.md file, is the biggest influence on AI's output" ([How to make codebases AI agents love](https://www.aihero.dev/how-to-make-codebases-ai-agents-love), 2026-02-26).

**State of the world (2026-10-07):** the main flow runs **`/grill-with-docs` → `/to-spec` → `/to-tickets` → `/implement` (or `/implement-spec`) → `/code-review` → `/retro`** — four numbered steps in the live `ask-matt` router, which now **closes the loop with a retrospective on the agent's _environment_**, not the code. **`/wayfinder`** remains the on-ramp for a foggy effort **too big for one session**; it "hands off, it doesn't build," merging onto the main flow at `/to-spec`. Released state: **v1.3.1** — plugin version and git tag now agree, closing July's version-mapping gap. The repo ships **38 skills** across four live buckets — `engineering/` (20), `productivity/` (7), `in-progress/` (7), `misc/` (4) — plus a `deprecated/` bucket empty **by design** ("a retired skill is deleted, and the changeset that removes it names whatever replaced it"); the old `personal/` bucket is gone. **v1.3.0** graduated `implement-spec`, `pr`, and `retro` into Engineering, **removed `resolving-merge-conflicts`** outright (nothing replaces it — the agent works a conflict without a dedicated skill; its docs page stays up, archived), and renamed the domain-doc convention **`CONTEXT.md`/`CONTEXT-MAP.md` → `GLOSSARY.md`/`GLOSSARY-MAP.md`** everywhere the skills read and write it (`git mv` an existing one — the skills only look for the new name). **v1.2.0** graduated `to-questionnaire` (Productivity) and `wizard` (Engineering, model-invoked), and added **Codex metadata** — an `agents/openai.yaml` beside every `SKILL.md`, with `policy.allow_implicit_invocation: false` as the Codex analog of `disable-model-invocation: true` — so one set works in both harnesses. **v1.2.2** moved `writing-for-agents` from user-invoked to **model-invoked**. **v1.3.1** is a patch: `ask-matt` no longer claims `diagnosing-bugs` hands off to `/improve-codebase-architecture` from a post-mortem — it points at **`/retro`** once the fix is in, and at `/improve-codebase-architecture` only where the finding is a missing seam. Two repo-wide sweeps also landed in v1.3.0: every **em-dash removed** from the prose, and cross-skill invocation standardised on an explicit **"Call the Skill tool with `x`"** instruction instead of `/skill`-style prose — naming the tool directly is the documented fix for `grill-with-docs`'s most-reported problem, a skill naming another in prose not reliably loading it (PR [#878](https://github.com/mattpocock/skills/pull/878)).

## Quick reference — recommended order

The numbered walk through the pipeline as Pocock **recommends** it — **`/grill-with-docs`-led** (the flow he demos; his `ask-matt` router encodes it), with **`/wayfinder`** as the upstream on-ramp when the effort is too big for one session. Model and session notes are sourced; gaps are marked rather than guessed. Model tiers use this doc's vocabulary — **Smartest/Latest** and **Fast/Cheap** (current mapping: Fable 5 / Haiku 4.5, 2026-07-16; see Model strategy).

**Step 1.** `/setup-matt-pocock-skills` — model: any (not specified by Pocock) · session: any, **once per repo**
When to use: before first use in a repo — wires issue tracker, triage labels, and domain-doc paths into `docs/agents/*.md`.

**Step 2.** `/grill-with-docs` — model: Smartest/Latest (his daily driver: Opus 4.8, **medium** effort) · session: **new, held through step 4**
When to use: **the default entry point for a change in a repo** — a relentless one-question-at-a-time interview that sharpens a fuzzy idea and maintains `GLOSSARY.md` + ADRs as decisions land, then goes straight to `/to-spec`. `/grill-me` instead only for plans outside a codebase ("I stopped using /grill-me for coding").
**Step 2 upstream — `/wayfinder`** (on-ramp, big effort) — same model · session: **spans several by design** — when the effort is too big for one session and the route is foggy, chart it first as a shared map of investigation tickets (research / prototype / grilling / task) resolved one at a time, then hand to `/to-spec`. Charting stops itself if no fog surfaces — a well-scoped feature just grills. Pocock's v1.1 video calls this his default front door ("especially… anything that touches the front-end"); the written SKILL.md/`ask-matt` router keep it as the big-effort on-ramp.

**Step 3.** `/to-spec` (was `/to-prd`, renamed in v1.1.0) — model: same as step 2 · session: **same window as the grill** ("Do not clear the context… just to write a spec"; or new, fed by the wayfinder map if you charted one)
When to use: synthesizes the grilled conversation (or the completed `/wayfinder` map) into a **spec** (opens "you may know this document as a PRD") published to the issue tracker. If a grilled idea fits one session, skip steps 3–4 and run `/implement` in place.

**Step 4.** `/to-tickets` (was `/to-plan` + `/to-issues`, merged in v1.1.0) — model: same · session: **same as steps 2–3** (grill → spec → tickets in "one unbroken window")
When to use: break the spec into **tracer-bullet tickets** with blocking edges — as text in a local `tickets.md` (work top-to-bottom by hand) or as native blocking links on a real tracker (any ticket whose blockers are done is on the **frontier**, so several agents can run at once). Handles a **wide refactor** by expand–contract batching so CI stays green.

**Step 5.** `/implement` — model: Fast/Cheap acceptable ("Sonnet for implementation"; the plan + codebase carry it) · session: **new — one per ticket** (or in place, same session, if the work fit the grilling window)
When to use: build from the spec/tickets — drives `/tdd` at pre-agreed seams, typechecks + single test files regularly, full suite once at the end, then hands to `/code-review` and commits. On a local tracker the tickets are one file per ticket under `.scratch/<feature>/issues/`, worked blockers-first by hand; **`/clear` between each ticket** (each is self-contained, so the last one's context is disposable).
**Step 5 alternative — `/implement-spec`** (whole spec, one run) — user-invoked · session: **one orchestrator window; implementers in their own worktrees** — reads the tickets as a **task graph**, runs implementer subagents across the ready **frontier** in parallel, and lands everything on a single **integration branch**, closing out with one `/code-review` over it. Each implementer bases its worktree on the integration branch, builds its ticket with `/tdd`, and merges the integration tip back in before reporting done, so every merge is a fast-forward. The goal is the **integration branch, not a PR** — a draft PR opens only when your tracker closes work through PRs or you ask for one, and only after the first merge. Reach for it when you'd rather orchestrate the build than drive each ticket yourself. Graduated v1.3.0 (PR [#1120](https://github.com/mattpocock/skills/pull/1120)).

**Step 6.** `/code-review` — model: Smartest/Latest ("I need the smarts") · session: **fresh context — never the implementer's window** ("the reviewer will be dumber than the thing that implemented it")
When to use: after every implement — two parallel sub-agents check **Standards** (repo rules + a fixed Fowler-smell baseline) and **Spec** (diff vs the originating ticket/spec).
**Step 6 close-out — `/pr`** — model-invoked — when the work goes up as a pull request, `/pr` shapes the body: a summary as the **smallest visual that makes the change clear** (pseudocode, a call tree, a file tree, Mermaid, a diff), **before/after evidence** that it works, and a **merge-danger call** (one-way or two-way door, plus blast radius). Summary visuals adapted from Dex Horthy's `show-me`, credited in the skill's `CREDITS.md`. Graduated v1.3.0.

**Step 7.** `/retro` — model: not specified by Pocock · session: **the same one it's looking back on**, before you clear (after clearing, point it at that session's log)
When to use: closes the loop after a build, and especially one that went sideways. It suggests changes to the **agent's environment, not the code** — navigation pointers, automated checks, the coding standards `/code-review` enforces, steering files, tool economy, information access. It classifies each coding-standards finding first: a **mechanical** violation becomes a deterministic check (a linter rule, a pre-commit hook, or a CI job), while `CODING_STANDARDS.md` is kept for genuine **judgement calls**. A repo with no guardrail at all is a finding in its own right. Also the post-fix step after `/diagnosing-bugs` (v1.3.1). Graduated v1.3.0.

**Between any steps** — `/handoff`: packages just the relevant context into a markdown file so you can continue in a **new, clean session**. Two triggers: (1) this session is growing toward the ~100–120k-token **dumb zone** (watch the token statusline) — hand off and continue the same work fresh; (2) a side-question needs throwaway code to answer — hand off that one question to a second session, build the `/prototype` there, then `/handoff` the conclusion back while your main session stays clean (his "DIY sub-agent" pattern). Contrast: `/compact` summarizes **in place** and the same session continues — legitimate only for long single-threaded debugging.

**On-ramps (before the chain)** — **`/wayfinder`** when the effort is too big for one session and the route is foggy (Step 2 upstream above) · `/triage` for issues and external PRs you didn't create · `/diagnosing-bugs` when something's broken.

**Support skills (model reaches for them; they feed the chain or wayfinder)** — `/research` (a background agent that investigates against primary sources and leaves a cited note) · `/prototype` (throwaway code that answers a design question). Per the launch tweet, both "help support wayfinder, or can be used independently."

**Codebase health** — `/improve-codebase-architecture`, every few days.

**Standing rules (not steps)** — Docs: spec = destination, tickets = journey, both die at sprint end (close, don't keep); `GLOSSARY.md` = glossary only; ADR only when hard-to-reverse + surprising + real trade-off · CLAUDE.md: nearly empty — undiscoverable AND globally relevant only; hooks over prose; never `/init` · Humans own planning + QA; agents own implementation.

Per-step effort/thinking settings: not specified by Pocock — the only sourced setting is his general daily driver "Opus 4.8 with medium effort" (Ondrej interview, 2026-06-18). Sonnet-implements/Opus-reviews is from the AI Engineer workshop (2026-04-24). The **Smartest/Latest ↔ Fast/Cheap** tiers used above are this doc's vocabulary (current mapping 2026-07-16: Fable 5 / Haiku 4.5); Pocock prescribes skills and session boundaries, never model IDs.

Verified 2026-07-16 — sources: [mattpocock/skills CHANGELOG v1.1.0](https://github.com/mattpocock/skills/blob/main/CHANGELOG.md) + README (2026-07-08) · v1.1 launch tweet (user-supplied) · [things-people-get-wrong](https://www.aihero.dev/things-people-get-wrong-with-grill-me-and-grill-with-docs) (2026-05-25) · [skills-handoff](https://www.aihero.dev/skills-handoff) (2026-05-13) · [skills-domain-model](https://www.aihero.dev/skills-domain-model) (2026-05-05) · [AI Engineer workshop](https://www.youtube.com/watch?v=-QFHIoCo-Ko) (2026-04-24) · [David Ondrej interview](https://www.youtube.com/watch?v=nQwJVHCtDDY) (2026-06-18)

## When to use this workflow

- Feature work on a real codebase where misalignment, context rot, or architectural drift are the failure modes it targets (his "four failure modes": misalignment, verbosity, code that doesn't work, ball of mud — repo README).
- Multi-session or multi-agent builds that need durable artifacts (spec + tickets) instead of chat history.
- **Most changes in a repo** — start with `/grill-with-docs`; escalate to `/wayfinder` when the effort is too big for one session or the route is foggy (greenfield, wide refactor). Pocock's v1.1 video calls wayfinder his default front door, but his written flow keeps grill-with-docs as the spine.
- Teams wanting agent-portable process: skills + handoff docs work across Claude Code, Codex, Copilot CLI ([skills-handoff](https://www.aihero.dev/skills-handoff), 2026-05-13).

## When NOT to use it

- Single-session changes: per `/ask-matt`, if the work fits one session, skip spec/tickets and run `/implement` in place after grilling.
- Plans outside a codebase: use `/grill-me` (stateless) instead of `/grill-with-docs`.
- If you want an agent-driven, process-owning framework (GSD/BMAD/Spec-Kit style) — his skills are explicitly positioned against that; the user stays in control.
- Spec-only development: "specs-to-code… is kind of like vibe coding by another name… I tried this… and it sucks. The code is your battleground" (workshop, 2026-04-24). (Note: his `/to-spec` artifact is a synthesis of a grilled conversation, not a spec fed to an agent to build from blind.)

## The workflow, step by step

### The 7 phases of AI development

His canonical numbered framing — [My 7 Phases Of AI Development](https://www.aihero.dev/my-7-phases-of-ai-development) (2026-03-16):

1. **Idea** — refine with a grilling session.
2. **Research** (optional) — cache external-dependency findings in a sprint-lifetime `research.md`; v1.1.0 gives this a `/research` skill (a background agent).
3. **Prototyping** (optional) — multiple throwaway variations; "impose your taste"; commit the winning design (now the model-invoked `/prototype`).
4. **PRD** — "describes the end state, not the journey" (now produced by `/to-spec`).
5. **Implementation planning** — kanban tickets with blocking relationships (now `/to-tickets`).
6. **Execution** — Ralph loops; AFK is possible once research + prototype + spec + tickets exist.
7. **QA** — agent writes the QA plan, human reviews; "you'll iterate through phases 5–7 multiple times."

> **Note on "five phases":** no primary source describes a "five-phase Claude Code loop" (verified against the aihero.dev index, sitemap, and site search API, 2026-07-02). The five-*step* artifacts that exist: the skill chain below, and the earlier video "5 Claude Code skills I use every single day" ([YouTube](https://www.youtube.com/watch?v=EJyuu6zlQCg), 2026-03-16): `grill-me → write-a-prd → prd-to-issues → tdd → improve-codebase-architecture` — every step of which has since been renamed or rewired.

### The main skill chain (grill-with-docs-led)

```
/setup-matt-pocock-skills   # once per repo
/grill-with-docs → /to-spec → /to-tickets → /implement → /code-review → /retro
   ├ whole spec in one run instead of per-ticket:      /implement-spec (task graph → integration branch)
   ├ when the work goes up as a PR:                    /pr (body shape)
   └ upstream on-ramp (effort too big for one session): /wayfinder → /to-spec
```

- Default entry: `/grill-with-docs` (relentless interview; maintains `GLOSSARY.md` + ADRs as decisions land) goes straight to `/to-spec` — no map needed. `/grill-me` for plans outside a codebase.
- Upstream on-ramp: when the effort is too big for one session and the route is foggy, `/wayfinder` charts it into investigation tickets (research / prototype / grilling / task), resolves them one at a time, then hands to `/to-spec`. Charting stops itself if no fog surfaces.
- Framing (sourced): Pocock's v1.1 video calls `/wayfinder` his default front door ("default to Wayfinder instead" of grill-with-docs, "especially… anything that touches the front-end"), but his written SKILL.md and `ask-matt` router keep grill-with-docs as the spine and `/wayfinder` as the big-effort on-ramp; this diagram follows the written position (see Decision #10).
- `/tdd` runs *inside* `/implement` "at pre-agreed seams"; the chain no longer ends at tdd ([grill-with-docs page](https://www.aihero.dev/grill-with-docs), 2026-05-05; repo docs re-drawn 2026-07-08).
- `/implement + /code-review` "complete the whole lifecycle" (launch tweet).
- Detour when a question needs runnable code: `/handoff` → `/prototype` (now model-invoked) in a fresh session → `/handoff` back.
- On-ramps: `/triage` (issues and external PRs you didn't create), `/diagnosing-bugs` (something's broken).
- Support: `/research` (background-agent reading legwork; `/wayfinder` fires one per research ticket in parallel onto throwaway `research/*` branches), `/prototype` (design questions) — feed the chain or wayfinder.
- Codebase health: `/improve-codebase-architecture` — "run it… once every few days" (repo README).
- `grill-me` is de-emphasized for coding: "I stopped using /grill-me for coding. Now, I use /grill-with-docs" ([skills-domain-model](https://www.aihero.dev/skills-domain-model), 2026-05-05).

### The loops underneath

- **Explore, Build, Clear** — the core session loop taught in his cohort ([teaser](https://www.aihero.dev/my-claude-code-cohort-a-teaser), 2026-03-11).
- **The Plan Loop (four steps)** — Plan → Execute → Test → Commit ([my-agents-md-file…](https://www.aihero.dev/my-agents-md-file-for-building-plans-you-actually-read), 2026-01-13).
- **Ralph loop** — "Run a coding agent with a clean slate, again and again until a stop condition is met" (X thread, 2026-01-04 *[via secondary source: threadreaderapp.com/thread/2007924876548637089]*; [getting-started-with-ralph](https://www.aihero.dev/getting-started-with-ralph), 2026-01-08). One task per iteration, fresh context each iteration, progress file + git history as memory; delete `progress.txt` when the sprint ends.
- **Tracer bullets** — build the smallest end-to-end slice, verify, next slice in a fresh window ([tracer-bullets](https://www.aihero.dev/tracer-bullets), 2026-01-22).

## Model strategy

**Tier mapping (this doc's vocabulary, 2026-07-16):** *Smartest/Latest* = Claude Fable 5, *Fast/Cheap* = Claude Haiku 4.5 ([platform.claude.com models overview](https://platform.claude.com/docs/en/about-claude/models/overview)). Pocock prescribes skills and session boundaries, never model IDs — the quotes below are his; the tier↔model map is this doc's, and shifts as models ship.

| Stage | Choice | Why | Source |
|---|---|---|---|
| Grilling / planning | Big frontier model | Relies on **parametric knowledge** — "A dumb model won't give you good ideas" | [things-people-get-wrong…](https://www.aihero.dev/things-people-get-wrong-with-grill-me-and-grill-with-docs), 2026-05-25 |
| Implementation | Smaller model acceptable (he used Sonnet) | Relies on **contextual knowledge** — the plan and codebase carry it | same post + workshop, 2026-04-24 |
| Review | Opus, always in a **fresh context** | "I need the smarts"; same-window review means "the reviewer will be dumber than the thing that implemented it" | workshop, 2026-04-24 |
| Daily driver (June 2026) | **Opus 4.8, medium effort** | "what I've landed on and it works fine" | [David Ondrej interview](https://www.youtube.com/watch?v=nQwJVHCtDDY), 2026-06-18 |
| New models | Wait ~a month | "weigh that against the cost of the tokens… availability… latency. I prefer to… wait about a month" (on Fable) | same interview |

Meta-position: "Everyone's obsessed with the model and I think they should be more interested in the harness… you have much more control of the harness than you do the model" (Ondrej interview, 2026-06-18). And on cost: "How do you optimize for token spend? Have a code base that's easier to make changes in."

## Session strategy & context hygiene

- **Smart zone ≈ first ~100–120k tokens** — but the figure tracks model capability, not a constant: the live `ask-matt` at v1.3.1 says **~150k "on state-of-the-art models."** His sourced 2026-05 framing: "By around 120,000 tokens, I personally feel like I've entered the dumb zone" ([skills-handoff](https://www.aihero.dev/skills-handoff), 2026-05-13); "~100K at the moment is the smart zone" (workshop, 2026-04-24); framed as first 40% of window in [why-the-anthropic-ralph-plugin-sucks](https://www.aihero.dev/why-the-anthropic-ralph-plugin-sucks) (2026-01-22). A token-count statusline is "essential information on every coding session" (workshop).
- **Clear vs compact vs handoff** (the full rule, not the meme):
  - *Clear* for new work: "I much prefer my AI to behave like the guy from Memento… you clear and you go back to the beginning" (workshop).
  - */compact* is legitimate "for long-running, single-threaded work, especially debugging" — but summaries layer "like sediment" ([skills-handoff](https://www.aihero.dev/skills-handoff), 2026-05-13).
  - */handoff* to split concerns: "take just the slice of context relevant… hand it off to another session, and keep your current session pure." `/ask-matt`'s rule of thumb: **handoff forks, compact continues.**
- **Don't clear between planning and executing** one phase of work — "it's not just about the plan document, it's about priming the agent's context" ([plan-mode-introduction](https://www.aihero.dev/plan-mode-introduction), 2026-01-09). Multi-phase plans clear *between phases*.
- **Don't clear just to write a spec** — "That's throwing away all your design work." If budget remains, implement in the same session; if not, make the spec the handoff artifact ([things-people-get-wrong…](https://www.aihero.dev/things-people-get-wrong-with-grill-me-and-grill-with-docs), 2026-05-25).
- **Size tasks to the window**: decompose features into "context-window-sized chunks"; grill big scopes in separate sessions (or map them with `/wayfinder`); keep chain steps grill→spec→tickets in one unbroken window (`/ask-matt`).
- **Parallelism is bounded**: 2 (max ~3) grilling sessions "like managing two Slack threads" (2026-05-25); he's "mostly not parallelizing" implementation locally ([ways-ai-coding-has-rewired-my-brain](https://www.aihero.dev/ways-ai-coding-has-rewired-my-brain), 2026-03-11) — parallelism lives in Sandcastle/CI instead.
- **Docs are disposable by default**: specs/tickets get closed, not kept as repo markdown — "This is doc rot… I just mark it as closed" (workshop). `research.md` lives for the sprint; handoff docs go to the OS temp dir.

## CLAUDE.md / AGENTS.md philosophy

- **"Never run claude /init. It'll burn tokens, go out of date in days, and bloat your system prompt"** ([never-run-claude-init](https://www.aihero.dev/never-run-claude-init), 2026-02-24 + [video](https://www.youtube.com/watch?v=9tmsq-Gvx6g)). Everything `/init` generates is discoverable, stale-prone, or both: "Your file system is the documentation."
- **Bar for inclusion**: "only include what is both undiscoverable and globally relevant." His entire personal CLAUDE.md is six words: "you are on WSL on Windows."
- **What's literally in his own files** (the complete sourced inventory):
  - *Global CLAUDE.md*: `you are on WSL on Windows` — the whole file ([never-run-claude-init](https://www.aihero.dev/never-run-claude-init), 2026-02-24).
  - *Per-repo CLAUDE.md*: usually nothing hand-written — "Do I have a claude.md? Maybe I don't. I really don't use [it] very much" (workshop, 2026-04-24). Repos set up with his skills carry only the generated `## Agent skills` block: issue-tracker location, triage-label mapping, domain-doc paths, and (v1.1.0) a "Wayfinding operations" section — pointers, progressively disclosed. v1.1.0 also adds a maintenance rule so any skill add/rename/remove triggers an `ask-matt` re-check.
  - *AGENTS.md*: a thin reference to the domain glossary — "I keep a reference to it in agents.md. I'm very nervous about putting too much in" (Latent Space, 2026-05-07).
  - *Dropped*: his once-viral plan-mode rules ("Make the plan extremely concise. Sacrifice grammar for the sake of concision." + "At the end of each plan, give me a list of unresolved questions to answer, if any.", 2026-01-13) — "I've since dropped this idea in preference to a grilling session" (workshop, 2026-04-24).
- **Instruction budget is real**: "LLMs can realistically handle around 300 to 400 instructions" (2026-02-24); HumanLayer's stricter "~150–200 instructions" is quoted in [A Complete Guide to AGENTS.md](https://www.aihero.dev/a-complete-guide-to-agents-md) (2026-01-18). Every CLAUDE.md line loads in every session, relevant or not.
- **Minimal root AGENTS.md**: one-sentence project description; package manager if not npm; non-standard commands. "That's honestly it." Progressive-disclosure pointers ("For TypeScript conventions, see docs/TYPESCRIPT.md" — "no 'always,' no all-caps"); nested AGENTS.md merge in monorepos; symlink `AGENTS.md` ↔ `CLAUDE.md`.
- **Push vs pull**: CLAUDE.md *pushes* (always sent); skills *pull* (loaded on demand). Steering belongs in pull. Exception: an automated reviewer should have standards **pushed** into its prompt (workshop, 2026-04-24).
- **Enforcement belongs in hooks, not prose**: a `PreToolUse` hook (exit code 2 blocks the call and feeds the message back) beats a CLAUDE.md rule the model may ignore ([hooks post](https://www.aihero.dev/how-to-use-claude-code-hooks-to-enforce-the-right-cli), 2026-02-25).
- The only CLAUDE.md content his system ships: `/setup-matt-pocock-skills` writes a minimal `## Agent skills` block pointing at `docs/agents/*.md` — "progressively disclosed — the agent only grabs this configuration when it needs to" ([changelog post](https://www.aihero.dev/skills-changelog-ubiquitous-language-grill-with-docs), 2026-04-30).
- Reset advice for bloated setups: "delete every single skill, every single plugin, every single MCP server… delete your claude.md… go back to absolutely nothing, and then observe the agent… then layer things on top… and make sure those things are procedures, procedure skills, not ability skills" (Ondrej interview, 2026-06-18).

## Skills philosophy & the v1 taxonomy

- **User-invoked vs model-invoked** (v1.0.0, 2026-06-17; `.agents/invocation.md`):
  - *User-invoked* = `disable-model-invocation: true`; orchestrate workflows; run only when you type them. "The user stays in control, not the agent."
  - *Model-invoked* = no flag; focused disciplines the model reaches for; invocable by other skills.
  - Dependency rule: a user-invoked skill may invoke model-invoked skills, **never another user-invoked one**.
  - Setting the flag removes descriptions from always-loaded context — "a 63% reduction in token cost for skill descriptions" ([v1 announcement](https://www.aihero.dev/skills/skills-changelog-v1-announcement), 2026-06-18).
- **Procedures over abilities**: "I tend to prefer my skills as procedures. I like to be the one in control… I don't want to delegate my thinking to the model" — explicit contrast with obra's superpowers (Ondrej interview, 2026-06-18).
- **Invocation must name the tool, not the skill** (v1.3.0, PR [#878](https://github.com/mattpocock/skills/pull/878)): a skill that names another in prose ("run the `/grilling` skill") does **not** reliably cause it to load — the documented rough edge behind `grill-with-docs`'s most-reported problem. Every cross-skill call is now an explicit `Call the Skill tool with "grilling"`, and a step needing two skills says so as two calls, never one call carrying two names. Dropping the leading `/` also makes it harness-neutral rather than Claude-Code-specific. Documented in `.agents/invocation.md`.
- **Composition via shared primitives**: `grilling`, `domain-modeling`, `codebase-design` were extracted so wrappers stay tiny — post-v1 `grill-with-docs` is literally one line of body.
- **Brevity works**: "Skills don't have to be long to be impactful. You've just got to choose the right words for the LLM at the right time" ([5-agent-skills post](https://www.aihero.dev/5-agent-skills-i-use-every-day), 2026-03-16).
- **Craft vocabulary** (from `writing-for-agents`, née `/writing-great-skills`, v1.0.0): *leading words* (compact pretrained concepts — "tight", "red", "tracer bullets" — that anchor behavior), the *no-op test* (delete any sentence that changes nothing), *sediment*, *sprawl*, *premature completion*. v1.1.0 adds two **Steering** failure modes — *negation* (the elephant) and *negative space* (the void), below. Frontmatter: `name`, `description` (front-load the leading word; one trigger phrase per branch), `disable-model-invocation`; some skills use `argument-hint`.
- **Prompt detail worth stealing**: wrap supporting info in XML tags to "reduce its 'loudness' compared to the core instructions" ([May 11 changelog](https://www.aihero.dev/skills/skills-changelog-handoff-prototype-review-and-writing), 2026-05-11).
- **Skill vs doc boundary**: steering/process → skills; domain vocabulary → `GLOSSARY.md` ("a glossary and nothing else"); hard-to-reverse decisions → `docs/adr/` (only when *hard to reverse* + *surprising without context* + *real trade-off*); research → sprint-lifetime `research.md`; session state → disposable handoff docs in the OS temp dir.

## Subagent & delegation patterns

- **Grilling spawns an Explore sub-agent** — "a sub agent… explores a ton of stuff and then just drip feeds the important stuff back up to the orchestrator" (workshop: one spent 93.7K tokens without flooding the parent).
- **`/research` runs a background agent** — v1.1.0's delegable reading legwork: investigates a question against primary sources and returns one cited markdown file, so the parent keeps working while it reads.
- **`/code-review` runs two parallel sub-agents** — Standards axis and Spec axis, "so neither pollutes the other," reported side by side without re-ranking (repo SKILL.md).
- **`/improve-codebase-architecture` spawns parallel design agents** — "three subagents in parallel, each of which must produce a radically different interface" (5-skills video, 2026-03-16; the design-it-twice pattern now lives in `codebase-design`).
- **DIY sub-agent via `/handoff`** — burn a full window on exploration/prototyping in a child session, compress learnings, hand back to the parent. Portable across agents: "pass the handoff document to Codex, Copilot CLI…" enabling "adversarial review — different agents reviewing each other's work" ([skills-handoff](https://www.aihero.dev/skills-handoff), 2026-05-13).
- **Collaborative map via `/wayfinder`** — a shared `wayfinder:map` issue whose child tickets each get claimed (by assignment) and resolved by a session, so a team can drive one plan in parallel off native tracker relationships.
- **Parallel implementers on non-blocking tickets** — "Find all non-blocking tickets and spin up an agent for each one" (7-phases post, 2026-03-16); `/to-tickets` encodes blocking edges for exactly this.
- **Sandcastle** ([github.com/mattpocock/sandcastle](https://github.com/mattpocock/sandcastle), open-sourced 2026-04-29/30): his AFK "software factory" — planner → per-issue Docker-sandboxed worktree implementers in parallel → reviewer → merger agent. Current substrate: Sandcastle on **GitHub Actions** — "extremely unreasonably effective because you just get to parallelize as much as you want"; incoming issues get triaged, labelled, and an "agent implement" label dispatches them (Ondrej interview, 2026-06-18).
- **The dividing line**: delegate implementation ("these modules can become like gray boxes"), own interfaces, planning, and QA.

## The skills — install & per-skill reference

### Install & repair

**Two ways in, two philosophies** (README): the **Claude Code plugin** installs the whole set as a managed, **read-only** bundle — you subscribe rather than fork. **skills.sh** copies **editable** files into your project — you hack on them and make them yours. Pick one: *"installing both leaves you with every skill twice."*

```
# plugin — it's in Claude Code's official marketplace, so there's nothing to add first
/plugin install mattpocock-skills
```

The plugin now ships the repo's **full 38-skill set** (engineering + productivity + in-progress + misc), not a promoted subset, and reports **v1.3.1**. Updates reach you when Anthropic's marketplace moves its pin to a new release, **which can lag the repo by days or weeks**. To track the repo directly instead — and turn on auto-update for it under `/plugin` → Marketplaces, off by default for marketplaces outside Anthropic's:

```bash
claude plugin uninstall mattpocock-skills@claude-plugins-official
claude plugin marketplace add mattpocock/skills
claude plugin install mattpocock-skills@mattpocock
```

Or the editable route — an interactive picker; **make sure `setup-matt-pocock-skills` is one of the ones you select**:

```bash
pnpx skills@latest add mattpocock/skills
# then, once per repo, inside the agent:
/setup-matt-pocock-skills
```

Known trap: `pnpx skills update` only refreshes skills you already have **by name** — it never picks up new upstream skills and can't follow renames. This bites hard across v1.1.0's renames (`to-prd`→`to-spec`, `to-issues`→`to-tickets`, `decision-mapping`→`wayfinder`, `review`→`code-review`, and later `writing-great-skills`→`writing-for-agents`): `update` leaves the old names installed and never adds the new ones. Re-run `add` to pull the current set. Non-interactive repair:

```bash
pnpx skills@latest add mattpocock/skills \
  -s grilling -s domain-modeling -s codebase-design \
  -s diagnosing-bugs -s code-review -s research -s implement \
  -s to-spec -s to-tickets -s wayfinder \
  -s implement-spec -s pr -s retro \
  -g -a claude-code -y
```

Avoid `--all` (would pull the in-progress and misc buckets wholesale). Note the plugin takes the opposite stance — it ships every bucket.

### User-invoked (orchestrators — you type these)

**`/setup-matt-pocock-skills`** — run once per repo. Explores the repo (git remotes, existing AGENTS/CLAUDE.md, GLOSSARY.md, `docs/adr/`), then interviews one section at a time: issue tracker (GitHub via `gh` / GitLab via `glab` / Linear / local markdown / other), triage-label mapping for the canonical roles, domain-doc layout (single- vs multi-context). Writes an `## Agent skills` block into the existing AGENTS/CLAUDE.md (asks which to create if neither exists; never creates both) plus `docs/agents/{issue-tracker,triage-labels,domain}.md`. v1.1.0 adds a **PRs-as-a-request-surface** toggle (GitHub/GitLab) that `/triage` reads, and seeds a **"Wayfinding operations"** section for `/wayfinder`. Edit those files directly rather than re-running.

**`/ask-matt`** — router. Rewritten in v1.1.0 to map the full set: it now covers `tdd` (woven into the main flow as the red-green engine `/implement` drives), `diagnosing-bugs` (a new "Something's broken" on-ramp — there was previously no route for a bug), `domain-modeling` + `codebase-design` (a new "Vocabulary underneath" section), and `grilling` (the shared interview primitive); `prototype` is fleshed out as a standalone. Main flow routes **idea → /to-spec → /to-tickets → /implement**, names `/wayfinder`'s concrete triggers (greenfield or too-big-for-one-session), and carries the context-hygiene rules (smart zone; handoff forks / compact continues). Ask it when unsure what to reach for.

**`/grill-me`** — relentless interview for plans *outside* a codebase. Post-v1 body is one line: "Run a `/grilling` session." De-emphasized for coding in favour of `grill-with-docs`. The launch tweet's "crucial fixes to /grill-me" actually land in the shared `grilling` primitive (confirmation gate + facts-vs-decisions split, below), so they reach both `/grill-me` and `/grill-with-docs`.

**`/grill-with-docs`** — the **main** coding entry point: the interview that starts most changes in a repo (escalate to `/wayfinder` when the effort is too big for one session — the v1.1 video urges "default to Wayfinder instead," but the written flow keeps this as the spine). One-line body: run `/grilling` with `/domain-modeling` — so the interview simultaneously maintains `GLOSSARY.md` and ADRs as decisions land. Signposts **up to `/wayfinder`** for an effort too big to hold in one session. "Might be the single coolest technique in this repo" (README).

**`/to-spec`** — v1.1.0 renamed `/to-prd` → `/to-spec` ("spec" is now the single through-line term; it still opens "you may know this document as a PRD" for discoverability). Synthesizes the current conversation into a spec ("no interview, just synthesis"), published to the issue tracker. Explores the repo using the domain glossary; sketches **testing seams first** ("the ideal number is one") and confirms them with you; template: Problem / Solution / long "As an <actor>…" user stories / Implementation Decisions (no file paths or code, except decision-encoding prototype snippets) / Testing Decisions / Out of Scope.

**`/to-tickets`** — v1.1.0 merged `/to-plan` + `/to-issues` into this one skill (and deleted `/to-issues`). Breaks a plan, spec, or conversation into **tracer-bullet tickets**, each declaring its **blocking edges**. The one artifact reads two ways per what `/setup-matt-pocock-skills` configured: a **local `tickets.md`** writes edges as text and you work it top-to-bottom by hand; a **real tracker** writes them as native blocking links, so any ticket whose blockers are done is on the **frontier** and several agents can run at once — the edges live in the ticket either way, the medium only decides whether anything acts on them in parallel. Publishing prefers the tracker's **native sub-issues** (parent → slice) and **native blocking edges** (`Blocked by`), keeping `## Parent` / `## Blocked by` body sections as fallback. Split into a lean **Process** + a **Reference**; the Reference carries the **Vertical slice rules** and a **Wide refactors** block — a single mechanical change (e.g. renaming a column) whose **blast radius** breaks thousands of call sites at once is sliced by **expand–contract** (expand the new form beside the old → migrate call sites in blast-radius-sized batches → contract the old form away) so CI stays green batch to batch, or only at a final integrate-and-verify ticket when it can't. The "What to build" template points at where a `/prototype`'s code lives rather than inlining a snippet.

**`/triage`** — state machine over issues *and external PRs* ("A PR is an issue with attached code"); v1.1.0 formalized PR triage as an inline flow gated by the per-repo setup toggle. Two category roles (bug/enhancement) + exactly one of five states (needs-triage, needs-info, ready-for-agent, ready-for-human, wontfix). The bug-only "reproduce" step generalized to a single **"verify the claim"** step; a redundancy check resolves already-implemented requests to `wontfix` without polluting the `.out-of-scope/*.md` knowledge base (which auto-closes rejected ideas); writes agent briefs for `ready-for-agent`. Every AI comment self-identifies.

**`/implement`** — the build step. Body is ~5 lines: implement the spec/tickets; "Use /tdd where possible, at pre-agreed seams"; typecheck regularly, single test files regularly, full suite once at the end; finish with `/code-review`; commit to the current branch. With `/code-review` it "complete[s] the whole lifecycle" (launch tweet). Per ticket, `/clear` between each — on a local tracker the tickets are one file each under `.scratch/<feature>/issues/`.

**`/implement-spec`** — **graduated into Engineering in v1.3.0** (PR [#1120](https://github.com/mattpocock/skills/pull/1120)): implements a **whole spec in one run**, as the parallel alternative to driving `/implement` per ticket. Reads the tickets as a **task graph**, dispatches implementer subagents in their own **worktrees** across the ready **frontier**, and lands everything on one **integration branch**, closing out with a single `/code-review` over it. Each implementer confirms its worktree is based on the integration branch, builds its ticket with `/tdd`, and merges the integration tip into its own branch before reporting done, so every merge is a fast-forward. The run's goal is the **integration branch, not a PR** — a draft PR opens only when the tracker closes work through PRs or you ask, and only after the first merge (a branch with no commits ahead of main can't open one). Points at the configured issue tracker like its siblings rather than silently defaulting to `gh`.

**`/wayfinder`** — **graduated from `in-progress/` in v1.1.0** (renamed from `decision-mapping`; "decision map" was inaccurate — only one ticket type is a decision). Plans a chunk of work **too big for one agent session** by charting a route through a foggy problem — leading words **fog of war**, **frontier**, **the map**:
  - **Destination first.** Names a `## Destination` before any ticket — it fixes the scope and shapes every ticket.
  - **Plan, don't do.** Produces **decisions, not deliverables**; done when nothing's left to decide before someone builds it (an effort can override in its Notes).
  - **Index, not store.** Each decision lives in exactly one ticket; the map only gists and links, and graduating fog into a ticket clears the graduated patch so nothing lingers in two places.
  - **Collaborative by default.** The map is a single `wayfinder:map` issue on the tracker whose tickets are child issues (one shared URL; sessions load it low-res and zoom into tickets on demand). Tracker-agnostic (GitHub / GitLab / local-markdown) behind the `docs/agents/issue-tracker.md` pointer — a v1.1.0 patch (#472) fixed it hardcoding that path, restoring the indirection the rest of the suite uses.
  - **Claim by assignment.** A session claims a ticket by assigning it to the driving dev (the assignee *is* the claim), freeing labels to `wayfinder:<type>`.
  - **Native blocking.** Prefers the tracker's native dependency relationship so the frontier renders in its own UI; body-convention fallback otherwise.
  - **Fog vs out-of-scope, split.** `## Not yet specified` (in-scope fog that graduates as the frontier advances) vs `## Out of scope` (ruled beyond the destination, closed, never graduates).
  - **Four ticket types** — Research, Prototype, Grilling, and a new **`task`** (literal manual work that unblocks a decision: provisioning access, moving data, signing up for a service — the one type that *does* rather than decides).
  - **HITL / AFK classification.** Every ticket is **HITL** (grilling, prototype) or **AFK** (research; task either); a HITL ticket resolves only through live exchange, so an agent that answers its own questions has broken HITL — this fixed reports of `/wayfinder` grilling *itself*.
  - **No-fog early exit.** If the opening breadth-first grilling surfaces no fog, the journey fits one session — it stops and asks how you'd like to proceed rather than building a map nobody needs. Ends by recommending `/to-spec`. Pocock's v1.1 launch video calls it his default front door ("default to Wayfinder instead" of grill-with-docs; "get obsessed with Wayfinder," especially for front-end work), but the written SKILL.md and `ask-matt` router keep it as the **big-effort on-ramp** to the grill-with-docs spine (see Decision #10).
  - **Research subagents.** Chart mode fires a `/research` subagent per research ticket in parallel, findings landing on throwaway `research/<name>` branches, so a foggy map's reading legwork burns down concurrently (PRs [#534](https://github.com/mattpocock/skills/pull/534)/[#535](https://github.com/mattpocock/skills/pull/535)/[#538](https://github.com/mattpocock/skills/pull/538), merged 2026-07-13, unreleased). AFK task/implementation tickets can likewise fan out to sub-agents in worktrees; HITL tickets (grilling, prototype) resolve only through the live human.

**`/improve-codebase-architecture`** — reads GLOSSARY.md + ADRs, spawns Explore agents hunting friction (shallow modules, leaky seams, untestables; applies the *deletion test*), then writes a self-contained **HTML report** to `$TMPDIR` (Tailwind + Mermaid, badge per candidate: Strong / Worth exploring / Speculative) and opens it. Pick a candidate → it grills you through the refactor, offering rejection-ADRs "so future architecture reviews don't re-suggest it." Post-AFK habit: agent finishes → `/code-review` the diff → improve the workflow → improve the codebase.

**`/handoff`** (productivity bucket) — writes a handoff doc to the **OS temp dir** (disposable by design; takes an argument: what the next session is for). Won't duplicate what specs/ADRs/tickets/diffs already hold — references them by path. Redacts secrets. The mechanism behind the prototype detour, DIY sub-agents, and cross-agent transfer. "/handoff is my new favourite skill" ([video](https://www.youtube.com/watch?v=dtAJ2dOd3ko), 2026-05-21).

**`/teach`** (productivity bucket) — stateful multi-session tutor for any subject (Rubik's cube to software fundamentals). Builds a workspace: `MISSION.md`, `RESOURCES.md`, `reference/*.html`, numbered `learning-records/` ("loosely equivalent to ADRs"), self-contained HTML `lessons/` ("Think Tufte") with quizzes, reusable `assets/` (v1.0.1: reuse-first). Encodes zone-of-proximal-development, retrieval practice, spacing; "Never trust your parametric knowledge" — cites resources.

**`/retro`** — **graduated into Engineering in v1.3.0**; `ask-matt` routes it as the **last step of the main flow**, after `/code-review`. Looks back over a coding session and suggests changes to the **agent's environment rather than the code**: navigation pointers, automated checks, the coding standards `/code-review` enforces, steering files, tool economy, information access. Classifies each coding-standards finding first — a **mechanical** violation earns a deterministic check (linter rule, pre-commit hook, or CI job); `CODING_STANDARDS.md` is reserved for genuine **judgement calls**. A repo with no guardrail at all is a finding in its own right. Run it in the session it's reviewing, before you clear; afterwards, point it at that session's log.

**`/to-questionnaire`** (productivity bucket) — **graduated in v1.2.0** (PR [#593](https://github.com/mattpocock/skills/pull/593)). Turns a decision you can't answer alone into a Markdown **questionnaire for the one person who can** — filled in async, or worked through together in a meeting. Its defining move: it grills you about the **send**, not the subject. A normal grilling session interrogates the topic, which is exactly what you can't answer here, so the interview asks only who the questionnaire is going to and what you need back, then aims every question at the gap between the two. `ask-matt` frames it as the **inverse of `/grill-me`** — mine someone else, not yourself.

**`/wait-what`** (productivity bucket) — the corrective for a message that didn't land. Fire it mid-conversation, inside any other skill, and the agent **re-pitches what it just said** with the context you were missing, in plain English, using your `GLOSSARY.md` vocabulary. It works after the fact; `/grill-with-docs` is the upfront cure, since a shared language agreed early is what stops the jargon arriving at all.

### Model-invoked (disciplines — the model reaches for these; other skills call them)

**`grilling`** — the shared interview loop. Interview relentlessly until shared understanding; walk each branch of the design tree resolving dependencies one-by-one; **recommend an answer for every question**; **one question at a time** ("Asking multiple questions at once is bewildering"). v1.1.0 **sharpened it on two fronts**:
  - **A confirmation gate.** The agent won't enact the plan until you confirm the shared understanding has been reached — turning the existing "shared understanding" completion criterion into an explicit stop-gate. The `description` recruits the pretrained **`grill`** leading word ("Grill the user relentlessly").
  - **Facts vs. decisions.** The old blanket line — "if a question can be answered by exploring the codebase, explore the codebase instead" — now splits **facts** (look them up; explore the codebase) from **decisions** (put each one to the human and wait). Once another skill runs grilling inside a resolve-the-ticket frame, the old line read as license to answer *decisions* autonomously too; separating them keeps a grilling agent from racing ahead and answering its own questions.

**`domain-modeling`** — maintains the domain model *actively* during conversation: challenges terms against the glossary, sharpens fuzzy words ("'account' — Customer or User?"), stress-tests with edge cases, cross-references claims against code, updates `GLOSSARY.md` inline (never batch). GLOSSARY.md is "a glossary and nothing else"; ADRs only when hard-to-reverse + surprising + real trade-off. Multi-context repos get a `GLOSSARY-MAP.md`. (v1.3.0 renamed both from `CONTEXT.md`/`CONTEXT-MAP.md`; v1.3.0 also widened the trigger to discussing codebase terminology, or writing/editing a GLOSSARY.md or ADR directly.)

**`codebase-design`** — shared vocabulary for deep modules, with mandated terms: Module, Interface, Implementation, Depth, Seam (Feathers), Adapter, Leverage, Locality (and explicit *avoid* lists: component/service/API/boundary). Principles: depth is a property of the interface; the deletion test; "the interface is the test surface"; "one adapter = hypothetical seam, two = real". Includes design-it-twice via parallel sub-agents. Notably rejects Ousterhout's lines-ratio definition of depth.

**`prototype`** — "A prototype is throwaway code that answers a question. The question decides the shape." Logic branch: interactive terminal app driving the state machine through hard cases. UI branch: several radically different variations on one route, switchable by URL param. Rules: throwaway from day one, one command to run, no persistence, surface full state after every action. **Throwaway is a constraint on how the code is written, not a promise to destroy it** — the live `ask-matt` keeps the prototype as a **primary source** on a `prototype/<name>` branch off main, pointed at from the implementation issue, while the answer folds into the real code. v1.1.0 (commit 850873c) **formalized it as model-invoked**, rebuilding the description around the `prototype` leading word with one trigger per branch (state/logic sanity-check, or UI exploration) so the agent (and other skills, e.g. `/wayfinder`) can reach for it autonomously.

**`research`** — **new in v1.1.0.** A small, model-invoked skill that spins up a **background agent** to investigate a question against **primary sources** (official docs, source code, specs, first-party APIs), then leaves a single **cited Markdown file** wherever the repo keeps such notes. Delegable reading legwork: you keep working while it reads, then grill / plan / design against the document it returns. One of `/wayfinder`'s ticket types; also standalone (routed as a Standalone in `ask-matt`).

**`tdd`** — reshaped into a **reference-only** skill in v1.1.0. What makes a test spec-like (survives refactors); **test only at pre-agreed seams** (`seam` is the leading word — confirm with the user before writing any test); anti-patterns (implementation-coupled, horizontal slicing, and the **tautological test** — an assertion recomputed the way the code computes it, which passes by construction and gives zero confidence; expected values must come from an independent source of truth). The step-by-step Workflow and per-cycle checklist were dropped (leading words carry the loop); vertical slices / tracer bullets folded into Anti-patterns + a short Rules-of-the-loop list. The **refactor stage was removed** — TDD is now **red → green**; refactoring belongs to the review stage, so the refactor rule and `refactoring.md` moved to `code-review`.

**`code-review`** — **graduated in v1.1.0** from the in-progress `review` skill into `engineering/` (now ships in the plugin, listed Model-invoked, docs page at `docs/engineering/code-review.md`; `/implement` points at it). Two-axis review since a fixed point (`git diff <fp>...HEAD`): **Standards** (the repo's documented standards **plus** an always-on, inlined **Fowler smell baseline** — ~12 high-signal "Bad Smells in Code": Mysterious Name, Duplicated Code, Feature Envy, Data Clumps, Primitive Obsession, Repeated Switches, Shotgun Surgery, Divergent Change, Speculative Generality, Message Chains, Middle Man, Refused Bequest) and **Spec** (does the diff match the originating ticket/spec — found via commit refs, args, or docs). Two binding rules keep the baseline safe: a documented repo standard **overrides** it, and every smell is reported as a **judgement call, never a hard violation**. Run as two parallel `general-purpose` sub-agents, briefed under 400 words each, reported side by side "without merging or reranking."

**`pr`** — **graduated into Engineering in v1.3.0**. The shape a pull-request body should take: a **summary as the smallest visual that makes the change clear** (pseudocode, a call tree, a file tree, Mermaid, a diff), **before/after evidence** that it works, and a **merge-danger call** — one-way or two-way door, plus blast radius. Model-invoked, so the agent reaches for it whenever it writes a PR body. The Summary visuals are adapted from Dex Horthy's `show-me`, credited in the skill's `CREDITS.md`.

**`diagnosing-bugs`** — the renamed `diagnose` (v1.0.0, breaking). Six phases, and "Phase 1 — build a feedback loop — **is the skill**": ten ordered tactics from failing test to bisection harness to HITL script; "tighten the loop" until fast/sharp/deterministic; hard gate — "No red-capable command, no Phase 2." Then reproduce + minimise (cut until everything is load-bearing), 3–5 falsifiable hypotheses shown before testing, instrument (debugger > logs; tag logs `[DEBUG-xxxx]` for one-grep cleanup), regression-test **before** fixing at a correct seam ("If no correct seam exists, that itself is the finding"), post-mortem → **`/retro`** in the same session, to ask what would have prevented the bug; `/improve-codebase-architecture` only where the real finding is that no good seam exists to lock it down (v1.3.1 corrected the old blanket hand-off). v1.2.3 added a **Redact** section: `<REDACTED>` first, loops built against env vars so credentials stay in the environment, and only the signal-carrying lines of a captured artifact quoted.

**`resolving-merge-conflicts`** — ⚠ **removed in v1.3.0** (PR [#1120](https://github.com/mattpocock/skills/pull/1120)). Nothing replaces it: the agent works through an in-progress merge or rebase conflict without a dedicated skill. It left the plugin, the README and the `ask-matt` router; its docs page at `aihero.dev/skills-resolving-merge-conflicts` stays up, marked archived. Its rules were: see the state; find primary sources per conflict; resolve preserving both intents, never `--abort`; typecheck→tests→format; finish the merge.

**`wizard`** — **graduated out of `in-progress/` into Engineering in v1.2.0** (PR [#680](https://github.com/mattpocock/skills/pull/680)) **and made model-invoked**. Generates an interactive bash script that walks a human through a manual procedure — third-party setup, a one-off migration, an A→B state transition — opening each URL, saying what to click, capturing the values, and writing them into `.env` files and GitHub Actions secrets. The UX is pre-solved by a bundled `template.sh`: everything above the `STAGES` marker is a fixed library never hand-edited, so the skill's only job is to scope the procedure and author its **stages** (v1.2.3 dropped the time-remaining display; progress counts stages). Engineering rather than Productivity because it reads `.env*`, `docker-compose*`, framework config and every `secrets.*`/`vars.*` reference in `.github/workflows/` to scope itself, writes CI secrets, and verifies its output with `bash -n` and `shellcheck`. Model-invoked so the agent reaches for it the moment it hits a step only a human can perform, with an explicit **non-trigger**: don't invoke it for steps the agent can do itself.

**`setup-pre-commit`** — scaffolds commit-time quality gates in the current repo: detects the package manager, installs husky + lint-staged + prettier, runs `husky init`, writes `.husky/pre-commit` (lint-staged formatting → typecheck → tests) and a `.lintstagedrc`. The commit-side half of his feedback-loop doctrine ("green CI is non-negotiable" — cohort curriculum). Upstream `misc/` bucket, not in the promoted set — documented here because it's installed locally.

**`git-guardrails-claude-code`** — installs a Claude Code `PreToolUse` hook from its bundled `scripts/block-dangerous-git.sh` that blocks dangerous git before it executes — `git push`, `reset --hard`, `clean -f`, `branch -D`, `checkout .` / `restore .` — asking project-vs-global scope, then writing the settings JSON. The concrete working example of his "enforcement belongs in hooks, not CLAUDE.md prose" rule. Upstream `misc/` bucket, not in the promoted set — documented here because it's installed locally.

**`writing-for-agents`** (productivity bucket) — his skill-authoring reference (replaced `write-a-skill` in v1.0.0; renamed from `writing-great-skills`, and **moved from user-invoked to model-invoked in v1.2.2** so Codex stops filtering it out of the model-visible list). "A skill exists to wrangle determinism out of a stochastic system." Covers invocation choice as a context-load vs cognitive-load trade, description writing, information hierarchy, when to split skills, pruning via the no-op test, leading words, and the failure modes. v1.1.0 adds two adjacent **Steering** failure modes (each a full `GLOSSARY.md` entry + a `SKILL.md` bullet): **Negation** (the *elephant*) — steering by prohibition; naming what *not* to do drags the forbidden behaviour into context and makes it *more* available, so prompt the **positive** instead — and **Negative Space** (the *void*) — blindness to the steering done by what you leave *out*; every decision a skill declines is delegated to the model's priors, so read a draft for its silences and decide each omission (fill it, or leave it open as a real **branch**). Ships a GLOSSARY.md.

### Not promoted / drafts (⚠ unannounced, repo evidence only — expect churn)

| Skill | Bucket | One-liner |
|---|---|---|
| `chief-of-staff` | in-progress | Pursue a long-running goal inside one session by co-ordinating subagents |
| `loop-me` | in-progress | Stateful grilling that produces workflow specs in `workflows/*.md`; done when an implementer agent could build it without one question |
| `claude-handoff` | in-progress | User-invoked auto-spawn sibling of `handoff`: instead of saving the summary it launches a fresh background agent (`claude --bg`); deferred here until it graduates out of `in-progress/` |
| `writing-fragments`, `writing-beats`, `writing-shape` | in-progress | Explore/exploit writing pipeline: mine heterogeneous fragments → pick beats (choose-your-own-adventure of 2–3 candidates) → shape paragraph-by-paragraph with a grounding discipline |
| `setup-ts-deep-modules` | in-progress | Wire dependency-cruiser so each TS package is a deep module (entry-points only, tests through them); added 2026-07-10 |
| `scaffold-exercises`, `migrate-to-shoehorn` | misc | Course-tooling and test-cast migration utilities |

Graduated in v1.1.0 (so no longer drafts): `wayfinder` (← `decision-mapping`), `code-review` (← `review`), `research` (new), `prototype` (formalized model-invoked) — all now in `engineering/` and documented above.

Graduated since: **v1.2.0** — `to-questionnaire` → Productivity (user-invoked), `wizard` → Engineering (made model-invoked). **v1.3.0** — `implement-spec`, `pr`, and `retro` → Engineering. All five are documented above and ship in the plugin. The `personal/` bucket (`edit-article`, `obsidian-vault`) no longer exists in the repo tree.

Deprecated / removed upstream: **v1.3.0** — `resolving-merge-conflicts` **deleted outright** (nothing replaces it; docs page archived); the `CONTEXT.md`/`CONTEXT-MAP.md` domain-doc convention renamed to **`GLOSSARY.md`/`GLOSSARY-MAP.md`** everywhere (`git mv` an existing one); the `personal/` bucket dropped. **v1.2.2** — `writing-great-skills`→`writing-for-agents`, moved from user-invoked to model-invoked. **v1.1.0** — `to-prd`→`to-spec`, `to-plan`+`to-issues`→`to-tickets` (`to-issues` **deleted**), `review`→`code-review`, `decision-mapping`→`wayfinder`. Earlier — `design-an-interface` (lives on as codebase-design's design-it-twice), `qa`, `request-refactor-plan`, `ubiquitous-language` (superseded by domain-modeling); removed in v1.0.0: `caveman`, `zoom-out`, `write-a-skill` (→ `writing-great-skills`), `diagnose` (→ `diagnosing-bugs`). skills.sh still lists removed names with install counts — don't treat its listings as current.

## Decisions (this doc's ADRs)

Recorded during the grilling sessions that produced this doc:

1. **Core workflow stays in `skills.md`** §Engineering Workflow (intro + table convention); this file carries the depth. The task's assumed `matt-pocock-skill-pipeline.md` never existed.
2. **One deep-dive doc, not per-topic files** — split later only if it becomes unwieldy.
3. **"Five-phase loop" treated as a claim, not a fact** — refuted at source; the five-step skill chain and 7-phase framework are what's real.
4. **Full census over promoted-only** — including the shared model-invoked layer and clearly-marked drafts; drafts get one line each because they rename weekly.
5. **X claims allowed via mirrors, always marked** *[via secondary source]*; unverifiable claims excluded.
6. **Local install repaired** (2026-07-02): added `grilling`, `domain-modeling`, `codebase-design`, `diagnosing-bugs`, `code-review`, `implement` — an install predating v1.0.0 had wrappers pointing at skills that were never installed (`pnpx skills update` can't add new upstream skills).
7. **One quick-ref only** (2026-07-02): the numbered "Quick reference — official order" replaced "The system on one page" rather than stacking beside it — never add a second summary view; extend this one. `/handoff` is documented as a between-steps tool, not a numbered step, because no primary source sequences it.
8. **v1.1.0 sync (2026-07-09):** promoted `wayfinder` out of the drafts table into a full user-invoked entry now that it graduated to `engineering/`; added `research` (new) and reframed `code-review`/`prototype` as graduated; renamed `to-prd`→`to-spec` and `to-issues`→`to-tickets` throughout, keeping the quick-ref at the same six numbered steps and documenting `/wayfinder` as a situational on-ramp (per Pocock's explicit "not the main spine", changelog #464). Sourced from the GitHub v1.1.0 CHANGELOG + README (2026-07-08) and the launch tweet; the aihero.dev v1.1 article itself was unreachable (404/402), so no quotes are drawn from it. *(Superseded on 2026-07-10 by #9 on the wayfinder-vs-grill framing.)*
9. **Wayfinder crowned the default entry (2026-07-10):** flipped the whole doc so `/wayfinder` is the main-spine front door and `/grill-with-docs` is the single-session shortcut. Driver: the [v1.1 launch video](https://www.youtube.com/watch?v=A8mokin_YOs) (2026-07-08), where Pocock says to "default to Wayfinder instead" of grill-with-docs and to "get obsessed with Wayfinder," especially for front-end work — a **spoken** position that runs ahead of his **written** docs (the live `ask-matt` router still lists grill as main-flow step 1 and files wayfinder under on-ramps; the v1.1.0 CHANGELOG still calls crowning wayfinder "a v2-sized move, not a 1.1"). Decision: follow his latest stated position (the video) but keep the written-docs lag visible as a sourced caveat, so the doc neither hides the flip nor pretends the repo text has caught up. No newer version (no v1.2) and no dedicated wayfinder post existed at 2026-07-10. *(Superseded on 2026-07-16 by #10.)*
10. **Reverted to grill-with-docs-led; mapped plugin v1.2.0 (2026-07-16):** walked back #9 — `/grill-with-docs → /to-spec → /to-tickets → /implement → /code-review` is the main spine again, `/wayfinder` the on-ramp for foggy efforts too big for one session. Driver: a live re-read of the written `wayfinder`/`ask-matt` SKILL.md at HEAD [`e9fcdf9`](https://github.com/mattpocock/skills/commit/e9fcdf9) (2026-07-14), which encode grill-with-docs as the flow and wayfinder as the big-effort on-ramp; the v1.1-video "default to Wayfinder" is kept as a sourced *spoken* caveat, not the spine. Also mapped the **Claude Code plugin v1.2.0** (native plugin on `main` since 2026-07-13, PR #536; newest tag/CHANGELOG still v1.1.0 — plugin 1.2.0 = today's `main`, not a release); adopted **tier vocabulary** (Smartest/Latest = Fable 5, Fast/Cheap = Haiku 4.5, as of 2026-07-16) since Pocock names skills, never models; added the two new in-progress skills (`setup-ts-deep-modules`, `to-questionnaire`) and wayfinder's research-subagent parallelism (PRs #534/#535/#538). Synced from the user's `agent-hero` reference repo.
11. **v1.3.1 sync (2026-10-07):** rebuilt the version picture from the **local plugin checkout at v1.3.1** — a full repo tree carrying `CHANGELOG.md`, `README.md`, `GLOSSARY.md` and every `SKILL.md` — so this pass is sourced from primary repo text rather than the web, and runs offline. Absorbed: the main flow gained **`/retro`** as its closing step and **`/implement-spec`** as the parallel alternative to per-ticket `/implement`; **`/pr`** graduated as the PR-body close-out; **`resolving-merge-conflicts` was removed** with nothing replacing it; the domain-doc convention renamed **`CONTEXT.md` → `GLOSSARY.md`** repo-wide; `to-questionnaire`, `wizard` and `wait-what` moved out of the drafts table into full entries; `writing-great-skills` became **`writing-for-agents`** and **moved to model-invoked** (v1.2.2), so its entry moved sections here too. Also recorded: the plugin now ships **all 38 skills** rather than a promoted subset, the `personal/` bucket is gone, the README's *pick one installer* warning ("installing both leaves you with every skill twice"), the "Call the Skill tool" invocation convention, and `ask-matt`'s **~150k** smart-zone figure superseding the ~100–120k of 2026-05. The July version-mapping caveat (plugin v1.2.0 vs tag v1.1.0) is **closed** — plugin and tag both read v1.3.1. Decision #10's grill-with-docs-led spine is **unchanged** and now matches the written router exactly.

## Glossary

- **Grilling** — relentless one-question-at-a-time interview until shared understanding; the model recommends an answer per question.
- **Confirmation gate** — v1.1.0 grilling won't enact the plan until you confirm shared understanding is reached.
- **Facts vs. decisions** — v1.1.0 grilling looks up *facts* (explore the codebase) but puts *decisions* to the human and waits.
- **Design tree** — the branching space of decisions a plan implies; grilling walks it dependency-first.
- **Smart zone / dumb zone** — first ~100–120k tokens where the model is sharp / everything after.
- **Clearing** — ending the session and starting fresh rather than compacting.
- **Handoff (artifact)** — disposable markdown carrying just the relevant slice of context to a new session; *handoff forks, compact continues*.
- **Spec** — the destination document (renamed from PRD in v1.1.0; still "you may know this as a PRD"); produced by `/to-spec`.
- **Ticket** — a tracer-bullet vertical slice with blocking edges; the journey unit produced by `/to-tickets`.
- **Vertical slice / tracer bullet** — an issue cut end-to-end through the stack, demoable alone.
- **Wide refactor / expand–contract / blast radius** — a mechanical change whose blast radius breaks many call sites at once; sliced by expand-contract (add the new form beside the old, migrate in batches, drop the old form) to keep CI green.
- **Prefactoring** — "make the change easy, then make the easy change."
- **Seam** — a pre-agreed place where behavior can be tested/changed; "the interface is the test surface."
- **Tautological test** — a test whose expected value is recomputed the way the code computes it; passes by construction, proves nothing (v1.1.0 tdd anti-pattern).
- **Deep module** — small interface, big implementation; depth is a property of the interface.
- **Deletion test** — if deleting a module barely ripples, it wasn't pulling its weight.
- **Leading word** — a compact concept the model already knows ("tight", "red", "grill", "prototype", "fog of war") used to anchor behavior.
- **No-op test** — delete any skill sentence that changes nothing about behavior.
- **Negation (the elephant)** — steering by prohibition backfires: naming the forbidden behaviour makes it more available; prompt the positive.
- **Negative space (the void)** — steering by omission: what a skill leaves out is silently delegated to the model's priors; read a draft for its silences.
- **Sediment** — layered summaries/instructions accreting until they mislead.
- **Push vs pull** — always-sent context (CLAUDE.md) vs on-demand context (skills, pointers).
- **User-invoked / model-invoked** — orchestrators you type vs disciplines the model reaches for.
- **Wayfinding — fog of war / frontier / the map / destination** — charting a route through a foggy problem: the map indexes investigation tickets, the frontier is what's takeable now, the destination fixes scope; plan, don't do. The **on-ramp** for efforts too big for one session (Pocock's v1.1 video calls it his front door; the written flow keeps it as the big-effort on-ramp — Decision #10).
- **HITL / AFK (ticket type)** — a wayfinder ticket resolved through live human exchange (grilling, prototype) vs by an agent alone (research; task either).
- **Ralph loop** — clean-slate agent iterations until a stop condition; one task per iteration.
- **Agent brief / ready-for-agent** — a triaged issue carrying enough context for unaided execution.
- **Doc rot** — planning artifacts kept past their lifetime; close issues, delete progress files.
- **GLOSSARY.md** — the domain glossary ("a glossary and nothing else"); renamed from `CONTEXT.md` in v1.3.0, with `GLOSSARY-MAP.md` for multi-context repos. **ADR** — recorded only when hard-to-reverse + surprising + real trade-off.
- **Integration branch** — the single branch `/implement-spec` lands every subagent's ticket on; the run's goal, ahead of any PR.
- **Task graph / frontier (implementation)** — tickets read as a dependency graph; the frontier is every ticket whose blockers are done, which `/implement-spec` runs in parallel in separate worktrees.
- **One-way / two-way door** — `/pr`'s merge-danger call: is this reversible, and what is the blast radius?
- **Retro (environment, not code)** — `/retro` looks back at a session and changes the agent's *environment*; mechanical violations become deterministic checks, judgement calls become coding standards.
- **Progressive disclosure** — pointers over payloads; the agent pulls detail when needed.

## Sources

Primary — local plugin checkout at **v1.3.1** (read 2026-10-07, `~/.claude/plugins/cache/mattpocock/mattpocock-skills/1.3.1`): a complete repo tree — `CHANGELOG.md` (entries 1.3.1, 1.3.0, 1.2.3, 1.2.2, 1.2.0, 1.1.0, 1.0.1, 1.0.0), `README.md` (Installation + Reference tables), `GLOSSARY.md`, `.claude-plugin/plugin.json` (reports 1.3.1), and all 38 `SKILL.md` files across `engineering/`, `productivity/`, `in-progress/`, `misc/` and the empty `deprecated/`. PRs cited inline: [#593](https://github.com/mattpocock/skills/pull/593) (to-questionnaire), [#680](https://github.com/mattpocock/skills/pull/680) (wizard), [#878](https://github.com/mattpocock/skills/pull/878) (Skill-tool invocation), [#1120](https://github.com/mattpocock/skills/pull/1120) (implement-spec / pr / retro / resolving-merge-conflicts removal / GLOSSARY rename), [#1121](https://github.com/mattpocock/skills/pull/1121) (ask-matt post-mortem fix).

Primary — repo (re-checked live 2026-07-16 against HEAD `e9fcdf9`): [mattpocock/skills](https://github.com/mattpocock/skills) — README, **CHANGELOG.md** (newest entry still v1.1.0), **`.claude-plugin/plugin.json`** (native plugin, reports v1.2.0), and the `ask-matt` + `wayfinder` **SKILL.md** files on `main` (grill-with-docs the flow, wayfinder the big-effort on-ramp), engineering/productivity/in-progress/misc/personal skill directories, PRs [#534](https://github.com/mattpocock/skills/pull/534)/[#535](https://github.com/mattpocock/skills/pull/535)/[#536](https://github.com/mattpocock/skills/pull/536)/[#538](https://github.com/mattpocock/skills/pull/538) (merged 2026-07-13), releases `v1.0.0`/`v1.0.1` (2026-06-17) and **`v1.1.0` (2026-07-08)** · [mattpocock/sandcastle](https://github.com/mattpocock/sandcastle). v1.1 announced via the **[launch video](https://www.youtube.com/watch?v=A8mokin_YOs)** (2026-07-08 — the source for the "default to Wayfinder instead" / "get obsessed with Wayfinder" spoken framing), the launch tweet ("mattpocock/skills v1.1 is out!", user-supplied), and the aihero.dev v1.1 changelog post (page unreachable to automated fetch, 404/402 — not quoted).

Primary — aihero.dev (fetched 2026-07-02, still current): [7 Phases](https://www.aihero.dev/my-7-phases-of-ai-development) (2026-03-16) · [v1 announcement](https://www.aihero.dev/skills/skills-changelog-v1-announcement) (2026-06-18) · [grill-with-docs](https://www.aihero.dev/grill-with-docs) (2026-05-05) · [things people get wrong](https://www.aihero.dev/things-people-get-wrong-with-grill-me-and-grill-with-docs) (2026-05-25) · [skills-handoff](https://www.aihero.dev/skills-handoff) (2026-05-13) · [never-run-claude-init](https://www.aihero.dev/never-run-claude-init) (2026-02-24) · [AGENTS.md guide](https://www.aihero.dev/a-complete-guide-to-agents-md) (2026-01-18) · [hooks](https://www.aihero.dev/how-to-use-claude-code-hooks-to-enforce-the-right-cli) (2026-02-25) · [triage](https://www.aihero.dev/burn-through-your-backlog-with-my-triage-skill) (2026-05-05) · [Ralph](https://www.aihero.dev/getting-started-with-ralph) + [tips](https://www.aihero.dev/tips-for-ai-coding-with-ralph-wiggum) (2026-01-08) · [plan mode](https://www.aihero.dev/plan-mode-introduction) (2026-01-09) · [tracer bullets](https://www.aihero.dev/tracer-bullets) (2026-01-22) · [May 11 changelog](https://www.aihero.dev/skills/skills-changelog-handoff-prototype-review-and-writing) · [Apr 30 changelog](https://www.aihero.dev/skills-changelog-ubiquitous-language-grill-with-docs) · [rewired my brain](https://www.aihero.dev/ways-ai-coding-has-rewired-my-brain) (2026-03-11) · [codebases agents love](https://www.aihero.dev/how-to-make-codebases-ai-agents-love) (2026-02-26) · [teach](https://www.aihero.dev/learn-anything-with-my-teach-skill) (2026-06-08).

Primary — video/talks: [5 Claude Code skills](https://www.youtube.com/watch?v=EJyuu6zlQCg) (2026-03-16) · [AI Engineer workshop](https://www.youtube.com/watch?v=-QFHIoCo-Ko) (2026-04-24; transcript via mirror) · [David Ondrej interview](https://www.youtube.com/watch?v=nQwJVHCtDDY) (2026-06-18) · [Latent Space](https://www.youtube.com/watch?v=rlM_fAKxB3Q) (2026-05-07) · [/handoff video](https://www.youtube.com/watch?v=dtAJ2dOd3ko) (2026-05-21) · [Sandcastle video](https://www.youtube.com/watch?v=E5-QK3CDVQM) (2026-04-30) · [never run /init video](https://www.youtube.com/watch?v=9tmsq-Gvx6g) (2026-02-24).

Secondary (marked in text where used): tweet mirrors via threadreaderapp/bittide/zamantika/techtwitter for the Ralph thread and earlier announcements.

---
Last updated: 2026-10-07 — synced to **v1.3.1** from the local plugin checkout (Decision #11). Main flow gained `/retro` as its closing step and `/implement-spec` as the parallel alternative to per-ticket `/implement`; `/pr` graduated as the PR-body close-out; `resolving-merge-conflicts` was removed outright; the domain-doc convention renamed `CONTEXT.md` → `GLOSSARY.md` repo-wide; `to-questionnaire`, `wizard` and `wait-what` promoted into full entries; `writing-great-skills` → `writing-for-agents`, now model-invoked. Plugin and git tag agree at v1.3.1, closing July's version-mapping gap; the plugin now ships all **38 skills** across engineering (20), productivity (7), in-progress (7) and misc (4). The grill-with-docs-led spine of Decision #10 is unchanged and now matches the written router exactly.
