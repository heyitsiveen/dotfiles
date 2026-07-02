# Matt Pocock's AI Coding Workflow — Deep Reference

Companion to the [Engineering Workflow section of skills.md](skills.md) — that section is the quick table; this doc is the full reference. Everything here is traced to a primary source (his site, repo, videos, or talks), with URL and date. Claims only reachable through mirrors of his X posts are marked *[via secondary source]*.

## Overview

Matt Pocock ([aihero.dev](https://www.aihero.dev), [mattpocock/skills](https://github.com/mattpocock/skills)) publishes a system of small, composable Claude Code skills — deliberately **not** a process-owning framework ("you need to own as much of your planning stack as you possibly can" — AI Engineer workshop, 2026-04-24). The system rests on a few load-bearing ideas:

- **Alignment before code**: a "grilling" interview until human and agent share an understanding, captured as domain vocabulary (`CONTEXT.md`) and hard-to-reverse decisions (ADRs).
- **Two essential documents**: "something to document the destination \[PRD] and something to document the journey \[issues/kanban]" (workshop, 2026-04-24).
- **Human-in-the-loop planning, AFK implementation**: "planning, this alignment phase has to be human in the loop. Has to be" — implementation can run unattended (Ralph loops, Sandcastle); QA stays human because "QA is how I impose my taste… without that you just end up with slop."
- **Context is a budget**: stay in the ~100–120k-token "smart zone", clear rather than compact for new work, size every task to fit one window.
- **The codebase is the prompt**: "Your codebase, way more than your prompt or your AGENTS.md file, is the biggest influence on AI's output" ([How to make codebases AI agents love](https://www.aihero.dev/how-to-make-codebases-ai-agents-love), 2026-02-26).

**State of the world (2026-07-02):** skills repo v1.0.1 (v1.0.0 shipped 2026-06-17 with breaking renames and a new shared-skill layer); a major docs/promotion wave landed 2026-07-01. ~153K GitHub stars, 5M+ installs reported via skills.sh.

## The system on one page

Read only this table and you have the current official pattern (as of 2026-07-01). Everything below it is depth.

| Layer | The rule |
|---|---|
| **Setup** | `/setup-matt-pocock-skills` once per repo (issue tracker, triage labels, domain-doc paths) |
| **Main chain** | `/grill-with-docs` → `/to-prd` → `/to-issues` → `/implement` (runs `/tdd` at pre-agreed seams) → `/code-review` |
| **Branches** | Question needs runnable code? `/handoff` → `/prototype` → `/handoff` back. Single-session work? Skip PRD/issues — `/implement` in place after grilling |
| **On-ramps** | `/triage` for issues/PRs you didn't create; `/diagnosing-bugs` when something's broken; `/improve-codebase-architecture` every few days |
| **Models** | Smart frontier model for grilling/planning (needs parametric knowledge); implementation can run smaller (he used Sonnet — the plan + codebase carry it); review on Opus in a **fresh session**; daily driver: Opus 4.8, medium effort; wait ~a month before adopting brand-new models |
| **Session** | Stay in the smart zone (~100–120k tokens; keep a token statusline visible). Clear > compact for new work; `/compact` only for long single-threaded debugging; `/handoff` to fork a concern. Don't clear between plan→execute. One task per cleared window. Max 2–3 parallel grilling sessions |
| **Docs** | PRD = destination, issues = journey — both die at sprint end (close, don't keep). `CONTEXT.md` = glossary only. ADR only when hard-to-reverse + surprising + real trade-off |
| **CLAUDE.md** | Nearly empty — only what's undiscoverable AND globally relevant; never `/init`; enforcement via hooks, not prose; steering lives in skills (pull, not push) |
| **Humans vs agents** | Humans own planning and QA ("QA is how I impose my taste"); agents own implementation (AFK: Ralph loops / Sandcastle) |

## When to use this workflow

- Feature work on a real codebase where misalignment, context rot, or architectural drift are the failure modes it targets (his "four failure modes": misalignment, verbosity, code that doesn't work, ball of mud — repo README).
- Multi-session or multi-agent builds that need durable artifacts (PRD + issues) instead of chat history.
- Teams wanting agent-portable process: skills + handoff docs work across Claude Code, Codex, Copilot CLI ([skills-handoff](https://www.aihero.dev/skills-handoff), 2026-05-13).

## When NOT to use it

- Single-session changes: per `/ask-matt`, if the work fits one session, skip PRD/issues and run `/implement` in place after grilling.
- Plans outside a codebase: use `/grill-me` (stateless) instead of `/grill-with-docs`.
- If you want an agent-driven, process-owning framework (GSD/BMAD/Spec-Kit style) — his skills are explicitly positioned against that; the user stays in control.
- Spec-only development: "specs-to-code… is kind of like vibe coding by another name… I tried this… and it sucks. The code is your battleground" (workshop, 2026-04-24).

## The workflow, step by step

### The 7 phases of AI development

His canonical numbered framing — [My 7 Phases Of AI Development](https://www.aihero.dev/my-7-phases-of-ai-development) (2026-03-16):

1. **Idea** — refine with a grilling session.
2. **Research** (optional) — cache external-dependency findings in a sprint-lifetime `research.md`.
3. **Prototyping** (optional) — multiple throwaway variations; "impose your taste"; commit the winning design.
4. **PRD** — "describes the end state, not the journey."
5. **Implementation planning** — kanban tickets with blocking relationships.
6. **Execution** — Ralph loops; AFK is possible once research + prototype + PRD + tickets exist.
7. **QA** — agent writes the QA plan, human reviews; "you'll iterate through phases 5–7 multiple times."

> **Note on "five phases":** no primary source describes a "five-phase Claude Code loop" (verified against the aihero.dev index, sitemap, and site search API, 2026-07-02). The five-*step* artifacts that exist: the skill chain below, and the earlier video "5 Claude Code skills I use every single day" ([YouTube](https://www.youtube.com/watch?v=EJyuu6zlQCg), 2026-03-16): `grill-me → write-a-prd → prd-to-issues → tdd → improve-codebase-architecture` — every step of which has since been renamed or rewired.

### The main skill chain (current, 2026-07-01)

```
/setup-matt-pocock-skills   # once per repo
/grill-with-docs → /to-prd → /to-issues → /implement → /code-review
```

- `/tdd` runs *inside* `/implement` "at pre-agreed seams"; the chain no longer ends at tdd ([grill-with-docs page](https://www.aihero.dev/grill-with-docs), 2026-05-05; repo docs re-drawn 2026-07-01).
- Detour when a question needs runnable code: `/handoff` → `/prototype` in a fresh session → `/handoff` back.
- On-ramps: `/triage` (issues and external PRs you didn't create), `/diagnosing-bugs` (something's broken).
- Codebase health: `/improve-codebase-architecture` — "run it… once every few days" (repo README).
- `grill-me` is de-emphasized for coding: "I stopped using /grill-me for coding. Now, I use /grill-with-docs" ([skills-domain-model](https://www.aihero.dev/skills-domain-model), 2026-05-05).

### The loops underneath

- **Explore, Build, Clear** — the core session loop taught in his cohort ([teaser](https://www.aihero.dev/my-claude-code-cohort-a-teaser), 2026-03-11).
- **The Plan Loop (four steps)** — Plan → Execute → Test → Commit ([my-agents-md-file…](https://www.aihero.dev/my-agents-md-file-for-building-plans-you-actually-read), 2026-01-13).
- **Ralph loop** — "Run a coding agent with a clean slate, again and again until a stop condition is met" (X thread, 2026-01-04 *[via secondary source: threadreaderapp.com/thread/2007924876548637089]*; [getting-started-with-ralph](https://www.aihero.dev/getting-started-with-ralph), 2026-01-08). One task per iteration, fresh context each iteration, progress file + git history as memory; delete `progress.txt` when the sprint ends.
- **Tracer bullets** — build the smallest end-to-end slice, verify, next slice in a fresh window ([tracer-bullets](https://www.aihero.dev/tracer-bullets), 2026-01-22).

## Model strategy

| Stage | Choice | Why | Source |
|---|---|---|---|
| Grilling / planning | Big frontier model | Relies on **parametric knowledge** — "A dumb model won't give you good ideas" | [things-people-get-wrong…](https://www.aihero.dev/things-people-get-wrong-with-grill-me-and-grill-with-docs), 2026-05-25 |
| Implementation | Smaller model acceptable (he used Sonnet) | Relies on **contextual knowledge** — the plan and codebase carry it | same post + workshop, 2026-04-24 |
| Review | Opus, always in a **fresh context** | "I need the smarts"; same-window review means "the reviewer will be dumber than the thing that implemented it" | workshop, 2026-04-24 |
| Daily driver (June 2026) | **Opus 4.8, medium effort** | "what I've landed on and it works fine" | [David Ondrej interview](https://www.youtube.com/watch?v=nQwJVHCtDDY), 2026-06-18 |
| New models | Wait ~a month | "weigh that against the cost of the tokens… availability… latency. I prefer to… wait about a month" (on Fable) | same interview |

Meta-position: "Everyone's obsessed with the model and I think they should be more interested in the harness… you have much more control of the harness than you do the model" (Ondrej interview, 2026-06-18). And on cost: "How do you optimize for token spend? Have a code base that's easier to make changes in."

## Session strategy & context hygiene

- **Smart zone ≈ first ~100–120k tokens.** "By around 120,000 tokens, I personally feel like I've entered the dumb zone" ([skills-handoff](https://www.aihero.dev/skills-handoff), 2026-05-13); "~100K at the moment is the smart zone" (workshop, 2026-04-24); framed as first 40% of window in [why-the-anthropic-ralph-plugin-sucks](https://www.aihero.dev/why-the-anthropic-ralph-plugin-sucks) (2026-01-22). A token-count statusline is "essential information on every coding session" (workshop).
- **Clear vs compact vs handoff** (the full rule, not the meme):
  - *Clear* for new work: "I much prefer my AI to behave like the guy from Memento… you clear and you go back to the beginning" (workshop).
  - */compact* is legitimate "for long-running, single-threaded work, especially debugging" — but summaries layer "like sediment" ([skills-handoff](https://www.aihero.dev/skills-handoff), 2026-05-13).
  - */handoff* to split concerns: "take just the slice of context relevant… hand it off to another session, and keep your current session pure." `/ask-matt`'s rule of thumb: **handoff forks, compact continues.**
- **Don't clear between planning and executing** one phase of work — "it's not just about the plan document, it's about priming the agent's context" ([plan-mode-introduction](https://www.aihero.dev/plan-mode-introduction), 2026-01-09). Multi-phase plans clear *between phases*.
- **Don't clear just to write a PRD** — "That's throwing away all your design work." If budget remains, implement in the same session; if not, make the PRD the handoff artifact ([things-people-get-wrong…](https://www.aihero.dev/things-people-get-wrong-with-grill-me-and-grill-with-docs), 2026-05-25).
- **Size tasks to the window**: decompose features into "context-window-sized chunks"; grill big scopes in separate sessions; keep chain steps grill→prd→issues in one unbroken window (`/ask-matt`).
- **Parallelism is bounded**: 2 (max ~3) grilling sessions "like managing two Slack threads" (2026-05-25); he's "mostly not parallelizing" implementation locally ([ways-ai-coding-has-rewired-my-brain](https://www.aihero.dev/ways-ai-coding-has-rewired-my-brain), 2026-03-11) — parallelism lives in Sandcastle/CI instead.
- **Docs are disposable by default**: PRDs/issues get closed, not kept as repo markdown — "This is doc rot… I just mark it as closed" (workshop). `research.md` lives for the sprint; handoff docs go to the OS temp dir.

## CLAUDE.md / AGENTS.md philosophy

- **"Never run claude /init. It'll burn tokens, go out of date in days, and bloat your system prompt"** ([never-run-claude-init](https://www.aihero.dev/never-run-claude-init), 2026-02-24 + [video](https://www.youtube.com/watch?v=9tmsq-Gvx6g)). Everything `/init` generates is discoverable, stale-prone, or both: "Your file system is the documentation."
- **Bar for inclusion**: "only include what is both undiscoverable and globally relevant." His entire personal CLAUDE.md is six words: "you are on WSL on Windows."
- **What's literally in his own files** (the complete sourced inventory):
  - *Global CLAUDE.md*: `you are on WSL on Windows` — the whole file ([never-run-claude-init](https://www.aihero.dev/never-run-claude-init), 2026-02-24).
  - *Per-repo CLAUDE.md*: usually nothing hand-written — "Do I have a claude.md? Maybe I don't. I really don't use [it] very much" (workshop, 2026-04-24). Repos set up with his skills carry only the generated `## Agent skills` block: issue-tracker location, triage-label mapping, domain-doc paths — pointers, progressively disclosed.
  - *AGENTS.md*: a thin reference to the domain glossary — "I keep a reference to it in agents.md. I'm very nervous about putting too much in" (Latent Space, 2026-05-07).
  - *Dropped*: his once-viral plan-mode rules ("Make the plan extremely concise. Sacrifice grammar for the sake of concision." + "At the end of each plan, give me a list of unresolved questions to answer, if any.", 2026-01-13) — "I've since dropped this idea in preference to a grilling session" (workshop, 2026-04-24).
- **Instruction budget is real**: "LLMs can realistically handle around 300 to 400 instructions" (2026-02-24); HumanLayer's stricter "~150–200 instructions" is quoted in [A Complete Guide to AGENTS.md](https://www.aihero.dev/a-complete-guide-to-agents-md) (2026-01-18). Every CLAUDE.md line loads in every session, relevant or not.
- **Minimal root AGENTS.md**: one-sentence project description; package manager if not npm; non-standard commands. "That's honestly it." Progressive-disclosure pointers ("For TypeScript conventions, see docs/TYPESCRIPT.md" — "no 'always,' no all-caps"); nested AGENTS.md merge in monorepos; symlink `AGENTS.md` ↔ `CLAUDE.md`.
- **Push vs pull**: CLAUDE.md *pushes* (always sent); skills *pull* (loaded on demand). Steering belongs in pull. Exception: an automated reviewer should have standards **pushed** into its prompt (workshop, 2026-04-24).
- **Enforcement belongs in hooks, not prose**: a `PreToolUse` hook (exit code 2 blocks the call and feeds the message back) beats a CLAUDE.md rule the model may ignore ([hooks post](https://www.aihero.dev/how-to-use-claude-code-hooks-to-enforce-the-right-cli), 2026-02-25).
- The only CLAUDE.md content his system ships: `/setup-matt-pocock-skills` writes a minimal `## Agent skills` block pointing at `docs/agents/*.md` — "progressively disclosed — the agent only grabs this configuration when it needs to" ([changelog post](https://www.aihero.dev/skills-changelog-ubiquitous-language-grill-with-docs), 2026-04-30).
- He **dropped his own famous plan-mode tip** ("Make the plan extremely concise. Sacrifice grammar…", 2026-01-13): "I've since dropped this idea in preference to a grilling session… when I stopped reading the plans, I stopped needing them to be concise" (workshop, 2026-04-24).
- Reset advice for bloated setups: "delete every single skill, every single plugin, every single MCP server… delete your claude.md… go back to absolutely nothing, and then observe the agent… then layer things on top… and make sure those things are procedures, procedure skills, not ability skills" (Ondrej interview, 2026-06-18).

## Skills philosophy & the v1 taxonomy

- **User-invoked vs model-invoked** (v1.0.0, 2026-06-17; `.agents/invocation.md`):
  - *User-invoked* = `disable-model-invocation: true`; orchestrate workflows; run only when you type them. "The user stays in control, not the agent."
  - *Model-invoked* = no flag; focused disciplines the model reaches for; invocable by other skills.
  - Dependency rule: a user-invoked skill may invoke model-invoked skills, **never another user-invoked one**.
  - Setting the flag removes descriptions from always-loaded context — "a 63% reduction in token cost for skill descriptions" ([v1 announcement](https://www.aihero.dev/skills/skills-changelog-v1-announcement), 2026-06-18).
- **Procedures over abilities**: "I tend to prefer my skills as procedures. I like to be the one in control… I don't want to delegate my thinking to the model" — explicit contrast with obra's superpowers (Ondrej interview, 2026-06-18).
- **Composition via shared primitives**: `grilling`, `domain-modeling`, `codebase-design` were extracted so wrappers stay tiny — post-v1 `grill-with-docs` is literally one line of body.
- **Brevity works**: "Skills don't have to be long to be impactful. You've just got to choose the right words for the LLM at the right time" ([5-agent-skills post](https://www.aihero.dev/5-agent-skills-i-use-every-day), 2026-03-16).
- **Craft vocabulary** (from `/writing-great-skills`, v1.0.0): *leading words* (compact pretrained concepts — "tight", "red", "tracer bullets" — that anchor behavior), the *no-op test* (delete any sentence that changes nothing), *sediment*, *sprawl*, *premature completion*. Frontmatter: `name`, `description` (front-load the leading word; one trigger phrase per branch), `disable-model-invocation`; some skills use `argument-hint`.
- **Prompt detail worth stealing**: wrap supporting info in XML tags to "reduce its 'loudness' compared to the core instructions" ([May 11 changelog](https://www.aihero.dev/skills/skills-changelog-handoff-prototype-review-and-writing), 2026-05-11).
- **Skill vs doc boundary**: steering/process → skills; domain vocabulary → `CONTEXT.md` ("a glossary and nothing else"); hard-to-reverse decisions → `docs/adr/` (only when *hard to reverse* + *surprising without context* + *real trade-off*); research → sprint-lifetime `research.md`; session state → disposable handoff docs in the OS temp dir.

## Subagent & delegation patterns

- **Grilling spawns an Explore sub-agent** — "a sub agent… explores a ton of stuff and then just drip feeds the important stuff back up to the orchestrator" (workshop: one spent 93.7K tokens without flooding the parent).
- **`/code-review` runs two parallel sub-agents** — Standards axis and Spec axis, "so neither pollutes the other," reported side by side without re-ranking (repo SKILL.md, 2026-07-01).
- **`/improve-codebase-architecture` spawns parallel design agents** — "three subagents in parallel, each of which must produce a radically different interface" (5-skills video, 2026-03-16; the design-it-twice pattern now lives in `codebase-design`).
- **DIY sub-agent via `/handoff`** — burn a full window on exploration/prototyping in a child session, compress learnings, hand back to the parent. Portable across agents: "pass the handoff document to Codex, Copilot CLI…" enabling "adversarial review — different agents reviewing each other's work" ([skills-handoff](https://www.aihero.dev/skills-handoff), 2026-05-13).
- **Parallel implementers on non-blocking tickets** — "Find all non-blocking tickets and spin up an agent for each one" (7-phases post, 2026-03-16); `/to-issues` encodes blocking edges for exactly this.
- **Sandcastle** ([github.com/mattpocock/sandcastle](https://github.com/mattpocock/sandcastle), open-sourced 2026-04-29/30): his AFK "software factory" — planner → per-issue Docker-sandboxed worktree implementers in parallel → reviewer → merger agent. Current substrate: Sandcastle on **GitHub Actions** — "extremely unreasonably effective because you just get to parallelize as much as you want"; incoming issues get triaged, labelled, and an "agent implement" label dispatches them (Ondrej interview, 2026-06-18).
- **The dividing line**: delegate implementation ("these modules can become like gray boxes"), own interfaces, planning, and QA.

## The skills — install & per-skill reference

### Install & repair

```bash
# fresh install — interactive picker; make sure to select setup-matt-pocock-skills
npx skills@latest add mattpocock/skills
# then, once per repo, inside the agent:
/setup-matt-pocock-skills
```

Known trap: `npx skills update` only refreshes skills you already have **by name** — it never picks up new upstream skills and can't follow renames. Installs that predate v1.0.0 (2026-06-17) end up with wrappers whose dependencies are missing and a `diagnose` that no longer resolves. Non-interactive repair:

```bash
npx skills@latest add mattpocock/skills \
  -s grilling -s domain-modeling -s codebase-design \
  -s diagnosing-bugs -s code-review -s implement \
  -g -a claude-code -y
```

`resolving-merge-conflicts` is installable the same way but is absent from the repo's plugin manifest (upstream inconsistency as of 2026-07-02). Avoid `--all` (would pull in-progress and deprecated buckets).

### User-invoked (orchestrators — you type these)

**`/setup-matt-pocock-skills`** — run once per repo. Explores the repo (git remotes, existing AGENTS/CLAUDE.md, CONTEXT.md, `docs/adr/`), then interviews one section at a time: issue tracker (GitHub via `gh` / GitLab via `glab` / local markdown under `.scratch/` / other), triage-label mapping for the five canonical roles, domain-doc layout (single- vs multi-context). Writes an `## Agent skills` block into the existing AGENTS/CLAUDE.md (asks which to create if neither exists; never creates both) plus `docs/agents/{issue-tracker,triage-labels,domain}.md`. Edit those files directly rather than re-running.

**`/ask-matt`** — router. Names every skill, maps the main flow with its two branch points (prototype detour needed? multi-session or not?), the on-ramps, and context-hygiene rules (smart zone; handoff forks / compact continues). Rewritten 2026-07-01 to cover the full current set. Ask it when unsure what to reach for.

**`/grill-me`** — relentless interview for plans *outside* a codebase. Post-v1 body is one line: "Run a `/grilling` session." De-emphasized for coding in favour of `grill-with-docs`.

**`/grill-with-docs`** — the coding entry point. One-line body: run `/grilling` with `/domain-modeling` — so the interview simultaneously maintains `CONTEXT.md` and ADRs as decisions land. "Might be the single coolest technique in this repo" (README).

**`/to-prd`** — synthesizes the current conversation into a PRD ("no interview, just synthesis"), published to the issue tracker with the `ready-for-agent` label. Explores the repo using the domain glossary; sketches **testing seams first** ("the ideal number is one") and confirms them with you; PRD template: Problem / Solution / long "As an <actor>…" user stories / Implementation Decisions (no file paths or code, except decision-encoding prototype snippets) / Testing Decisions / Out of Scope.

**`/to-issues`** — breaks a PRD into **tracer-bullet vertical slices** (schema→API→UI→tests, each demoable alone). Hunts *prefactoring* opportunities ("Make the change easy, then make the easy change"), quizzes you on granularity and dependencies, publishes blockers-first so "Blocked by" edges use real issue ids.

**`/triage`** — state machine over issues *and external PRs* ("A PR is an issue with attached code"). Two category roles (bug/enhancement) + exactly one of five states (needs-triage, needs-info, ready-for-agent, ready-for-human, wontfix). Verifies claims before grilling (reproduces bugs, runs PR diffs), checks for already-implemented work and prior rejections (`.out-of-scope/*.md` knowledge base auto-closes rejected ideas), writes agent briefs for `ready-for-agent`. Every AI comment self-identifies.

**`/implement`** — the build step (public 2026-07-01). Body is ~5 lines: implement the PRD/issues; "Use /tdd where possible, at pre-agreed seams"; typecheck regularly, single test files regularly, full suite once at the end; finish with `/code-review`; commit to the current branch.

**`/improve-codebase-architecture`** — reads CONTEXT.md + ADRs, spawns Explore agents hunting friction (shallow modules, leaky seams, untestables; applies the *deletion test*), then writes a self-contained **HTML report** to `$TMPDIR` (Tailwind + Mermaid, badge per candidate: Strong / Worth exploring / Speculative) and opens it. Pick a candidate → it grills you through the refactor, offering rejection-ADRs "so future architecture reviews don't re-suggest it." Post-AFK habit: agent finishes → `/code-review` the diff → improve the workflow → improve the codebase.

**`/handoff`** — writes a handoff doc to the **OS temp dir** (disposable by design; takes an argument: what the next session is for). Won't duplicate what PRDs/ADRs/issues/diffs already hold — references them by path. Redacts secrets. The mechanism behind the prototype detour, DIY sub-agents, and cross-agent transfer. "/handoff is my new favourite skill" ([video](https://www.youtube.com/watch?v=dtAJ2dOd3ko), 2026-05-21).

**`/teach`** — stateful multi-session tutor for any subject (Rubik's cube to software fundamentals). Builds a workspace: `MISSION.md`, `RESOURCES.md`, `reference/*.html`, numbered `learning-records/` ("loosely equivalent to ADRs"), self-contained HTML `lessons/` ("Think Tufte") with quizzes, reusable `assets/` (v1.0.1: reuse-first). Encodes zone-of-proximal-development, retrieval practice, spacing; "Never trust your parametric knowledge" — cites resources.

**`/writing-great-skills`** — his skill-authoring reference (replaced `write-a-skill` in v1.0.0). "A skill exists to wrangle determinism out of a stochastic system." Covers invocation choice as a context-load vs cognitive-load trade, description writing, information hierarchy, when to split skills, pruning via the no-op test, leading words, and the failure modes (premature completion, duplication, sediment, sprawl). Ships a GLOSSARY.md.

### Model-invoked (disciplines — the model reaches for these; other skills call them)

**`grilling`** — the shared interview loop. Ten lines that carry the whole system: interview relentlessly until shared understanding; walk each branch of the design tree resolving dependencies one-by-one; **recommend an answer for every question**; **one question at a time** ("Asking multiple questions at once is bewildering"); if the codebase can answer it, **explore instead of asking**.

**`domain-modeling`** — maintains the domain model *actively* during conversation: challenges terms against the glossary, sharpens fuzzy words ("'account' — Customer or User?"), stress-tests with edge cases, cross-references claims against code, updates `CONTEXT.md` inline (never batch). CONTEXT.md is "a glossary and nothing else"; ADRs only when hard-to-reverse + surprising + real trade-off. Multi-context repos get a `CONTEXT-MAP.md`.

**`codebase-design`** — shared vocabulary for deep modules, with mandated terms: Module, Interface, Implementation, Depth, Seam (Feathers), Adapter, Leverage, Locality (and explicit *avoid* lists: component/service/API/boundary). Principles: depth is a property of the interface; the deletion test; "the interface is the test surface"; "one adapter = hypothetical seam, two = real". Includes design-it-twice via parallel sub-agents. Notably rejects Ousterhout's lines-ratio definition of depth.

**`prototype`** — "A prototype is throwaway code that answers a question. The question decides the shape." Logic branch: interactive terminal app driving the state machine through hard cases. UI branch: several radically different variations on one route, switchable by URL param. Rules: throwaway from day one, one command to run, no persistence, surface full state after every action, delete-or-absorb when done — "The answer is the only thing worth keeping." Model-invoked since 2026-06-25.

**`tdd`** — reshaped 2026-06-30 into a reference: what makes a test spec-like (survives refactors), **test only at pre-agreed seams** (confirm with the user before writing any test), anti-patterns (implementation-coupled, *tautological* tests that recompute the expected value the way the code does, horizontal slicing), rules of the loop (red before green, one slice at a time, refactoring belongs to review).

**`code-review`** — two-axis review since a fixed point (`git diff <fp>...HEAD`): **Standards** (repo's documented standards + an always-on baseline of 12 Fowler smells, each "what it is → how to fix"; repo standards override; skip anything tooling enforces) and **Spec** (does the diff match the originating issue/PRD — found via commit refs, args, or docs). Two parallel `general-purpose` sub-agents, briefed under 400 words each, reported side by side "without merging or reranking." Was `review` (~2026-05-12); renamed + promoted 2026-07-01.

**`diagnosing-bugs`** — the renamed `diagnose` (v1.0.0, breaking). Six phases, and "Phase 1 — build a feedback loop — **is the skill**": ten ordered tactics from failing test to bisection harness to HITL script; "tighten the loop" until fast/sharp/deterministic; hard gate — "No red-capable command, no Phase 2." Then reproduce + minimise (cut until everything is load-bearing), 3–5 falsifiable hypotheses shown before testing, instrument (debugger > logs; tag logs `[DEBUG-xxxx]` for one-grep cleanup), regression-test **before** fixing at a correct seam ("If no correct seam exists, that itself is the finding"), post-mortem → hands off to `/improve-codebase-architecture`.

**`resolving-merge-conflicts`** — five steps: see the state; find primary sources per conflict (commit messages, PRs, issues); resolve preserving both intents — "Do **not** invent new behaviour. Always resolve; never `--abort`"; run typecheck→tests→format; finish the merge/rebase.

### Not promoted / drafts (⚠ unannounced, repo evidence only — expect churn)

| Skill | Bucket | One-liner |
|---|---|---|
| `wayfinder` | in-progress | Chart a route through a foggy problem: one git-tracked markdown map of tickets (Research / Prototype / Grilling / Task, with Blocked-by edges), each sized to one ~100K session; "fog of war" — chart only to the frontier; ends by recommending `/to-prd`. Renamed twice in two weeks (decision-mapping → wayfinding → wayfinder) |
| `loop-me` | in-progress | Stateful grilling that produces workflow specs in `workflows/*.md`; done when an implementer agent could build it without one question |
| `wizard` | in-progress | Generates an interactive bash setup wizard from a bundled template; scope from `.env*`/CI secrets; verified statically, never run end-to-end |
| `writing-fragments` / `-beats` / `-shape` | in-progress | Explore/exploit writing pipeline: mine heterogeneous fragments → pick beats (choose-your-own-adventure of 2–3 candidates) → shape paragraph-by-paragraph with a grounding discipline |
| `git-guardrails-claude-code` | misc | Installs a PreToolUse hook blocking dangerous git (`push`, `reset --hard`, `clean -f`, `branch -D`, `checkout .`) |
| `setup-pre-commit` | misc | husky + lint-staged + prettier pre-commit scaffold |
| `scaffold-exercises`, `migrate-to-shoehorn` | misc | Course-tooling and test-cast migration utilities |
| `edit-article`, `obsidian-vault` | personal | His own writing/vault tooling (vault path hardcoded) |

Deprecated upstream: `design-an-interface` (lives on as codebase-design's design-it-twice), `qa`, `request-refactor-plan`, `ubiquitous-language` (superseded by domain-modeling). Removed in v1.0.0: `caveman`, `zoom-out`, `write-a-skill` (→ `writing-great-skills`), `diagnose` (→ `diagnosing-bugs`). skills.sh still lists removed names with install counts — don't treat its listings as current.

## Decisions (this doc's ADRs)

Recorded during the 2026-07-02 grilling session that produced this doc:

1. **Core workflow stays in `skills.md`** §Engineering Workflow (intro + table convention); this file carries the depth. The task's assumed `matt-pocock-skill-pipeline.md` never existed.
2. **One deep-dive doc, not per-topic files** — split later only if it becomes unwieldy.
3. **"Five-phase loop" treated as a claim, not a fact** — refuted at source; the five-step skill chain and 7-phase framework are what's real.
4. **Full census over promoted-only** — including the shared model-invoked layer and clearly-marked drafts; drafts get one line each because they rename weekly.
5. **X claims allowed via mirrors, always marked** *[via secondary source]*; unverifiable claims excluded.
6. **Local install repaired** (2026-07-02): added `grilling`, `domain-modeling`, `codebase-design`, `diagnosing-bugs`, `code-review`, `implement` — an install predating v1.0.0 had wrappers pointing at skills that were never installed (`npx skills update` can't add new upstream skills).

## Glossary

- **Grilling** — relentless one-question-at-a-time interview until shared understanding; the model recommends an answer per question.
- **Design tree** — the branching space of decisions a plan implies; grilling walks it dependency-first.
- **Smart zone / dumb zone** — first ~100–120k tokens where the model is sharp / everything after.
- **Clearing** — ending the session and starting fresh rather than compacting.
- **Handoff (artifact)** — disposable markdown carrying just the relevant slice of context to a new session; *handoff forks, compact continues*.
- **Vertical slice / tracer bullet** — an issue cut end-to-end through the stack, demoable alone.
- **Prefactoring** — "make the change easy, then make the easy change."
- **Seam** — a pre-agreed place where behavior can be tested/changed; "the interface is the test surface."
- **Deep module** — small interface, big implementation; depth is a property of the interface.
- **Deletion test** — if deleting a module barely ripples, it wasn't pulling its weight.
- **Leading word** — a compact concept the model already knows ("tight", "red") used to anchor behavior.
- **No-op test** — delete any skill sentence that changes nothing about behavior.
- **Sediment** — layered summaries/instructions accreting until they mislead.
- **Push vs pull** — always-sent context (CLAUDE.md) vs on-demand context (skills, pointers).
- **User-invoked / model-invoked** — orchestrators you type vs disciplines the model reaches for.
- **Ralph loop** — clean-slate agent iterations until a stop condition; one task per iteration.
- **AFK vs HITL** — unattended implementation vs human-in-the-loop planning/QA.
- **Agent brief / ready-for-agent** — a triaged issue carrying enough context for unaided execution.
- **Doc rot** — planning artifacts kept past their lifetime; close issues, delete progress files.
- **CONTEXT.md** — the domain glossary ("a glossary and nothing else"); **ADR** — recorded only when hard-to-reverse + surprising + real trade-off.
- **Progressive disclosure** — pointers over payloads; the agent pulls detail when needed.

## Sources

Primary — aihero.dev (fetched 2026-07-02): [7 Phases](https://www.aihero.dev/my-7-phases-of-ai-development) (2026-03-16) · [v1 announcement](https://www.aihero.dev/skills/skills-changelog-v1-announcement) (2026-06-18) · [grill-with-docs](https://www.aihero.dev/grill-with-docs) (2026-05-05) · [things people get wrong](https://www.aihero.dev/things-people-get-wrong-with-grill-me-and-grill-with-docs) (2026-05-25) · [skills-handoff](https://www.aihero.dev/skills-handoff) (2026-05-13) · [never-run-claude-init](https://www.aihero.dev/never-run-claude-init) (2026-02-24) · [AGENTS.md guide](https://www.aihero.dev/a-complete-guide-to-agents-md) (2026-01-18) · [hooks](https://www.aihero.dev/how-to-use-claude-code-hooks-to-enforce-the-right-cli) (2026-02-25) · [triage](https://www.aihero.dev/burn-through-your-backlog-with-my-triage-skill) (2026-05-05) · [Ralph](https://www.aihero.dev/getting-started-with-ralph) + [tips](https://www.aihero.dev/tips-for-ai-coding-with-ralph-wiggum) (2026-01-08) · [plan mode](https://www.aihero.dev/plan-mode-introduction) (2026-01-09) · [tracer bullets](https://www.aihero.dev/tracer-bullets) (2026-01-22) · [May 11 changelog](https://www.aihero.dev/skills/skills-changelog-handoff-prototype-review-and-writing) · [Apr 30 changelog](https://www.aihero.dev/skills-changelog-ubiquitous-language-grill-with-docs) · [rewired my brain](https://www.aihero.dev/ways-ai-coding-has-rewired-my-brain) (2026-03-11) · [codebases agents love](https://www.aihero.dev/how-to-make-codebases-ai-agents-love) (2026-02-26) · [teach](https://www.aihero.dev/learn-anything-with-my-teach-skill) (2026-06-08).

Primary — repo (fetched 2026-07-02): [mattpocock/skills](https://github.com/mattpocock/skills) — all 36 SKILL.md files, README, CHANGELOG, `.agents/invocation.md`, plugin.json, releases v1.0.0/v1.0.1 (2026-06-17), commits through 2026-07-01 · [mattpocock/sandcastle](https://github.com/mattpocock/sandcastle).

Primary — video/talks: [5 Claude Code skills](https://www.youtube.com/watch?v=EJyuu6zlQCg) (2026-03-16) · [AI Engineer workshop](https://www.youtube.com/watch?v=-QFHIoCo-Ko) (2026-04-24; transcript via mirror) · [David Ondrej interview](https://www.youtube.com/watch?v=nQwJVHCtDDY) (2026-06-18) · [Latent Space](https://www.youtube.com/watch?v=rlM_fAKxB3Q) (2026-05-07) · [/handoff video](https://www.youtube.com/watch?v=dtAJ2dOd3ko) (2026-05-21) · [Sandcastle video](https://www.youtube.com/watch?v=E5-QK3CDVQM) (2026-04-30) · [never run /init video](https://www.youtube.com/watch?v=9tmsq-Gvx6g) (2026-02-24).

Secondary (marked in text where used): tweet mirrors via threadreaderapp/bittide/zamantika/techtwitter for the Ralph thread, /handoff+/prototype and /teach announcements, v1 announcement tweet, Sandcastle launch.

---
Last updated: 2026-07-02 — sources: [aihero.dev](https://www.aihero.dev) · [github.com/mattpocock/skills](https://github.com/mattpocock/skills) (v1.0.1, docs of 2026-07-01) · talks/interviews of 2026-03→06 as linked above
