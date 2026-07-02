# Skills

Skills from [skills.sh](https://skills.sh) extend Claude Code with domain-specific knowledge and best practices.

## Anthropic — [anthropics/skills](https://github.com/anthropics/skills)

```bash
npx skills add anthropics/skills
```

| Skill              | Description                                                   |
| ------------------ | ------------------------------------------------------------- |
| `frontend-design`  | Production-grade frontend interfaces with high design quality |
| `skill-creator`    | Build new skills that extend agent capabilities               |
| `pdf`              | PDF extraction, creation, merging, splitting, and forms       |
| `docx`             | Document creation, editing, tracked changes, and analysis     |
| `xlsx`             | Spreadsheet creation, formulas, and data analysis             |
| `mcp-builder`      | Guide for creating MCP servers                                |
| `canvas-design`    | Visual art creation in PNG and PDF formats                    |
| `doc-coauthoring`  | Collaborative documentation and iterative refinement          |
| `theme-factory`    | Styling toolkit with 10 preset themes and custom generation   |
| `brand-guidelines` | Brand colors and typography standards                         |

## Vercel — [vercel-labs](https://github.com/vercel-labs) / [vercel](https://github.com/vercel)

```bash
npx skills add vercel-labs/agent-skills vercel-labs/next-skills vercel/ai vercel/turborepo
```

| Skill                         | Description                                            |
| ----------------------------- | ------------------------------------------------------ |
| `vercel-react-best-practices` | React/Next.js performance optimization (45 rules)      |
| `web-design-guidelines`       | UI code compliance with Web Interface Guidelines       |
| `vercel-react-native-skills`  | React Native and Expo mobile best practices            |
| `next-best-practices`         | Next.js file conventions, RSC, data patterns, metadata |
| `ai-sdk`                      | Build AI features with Vercel AI SDK                   |
| `turborepo`                   | Monorepo best practices with Turborepo                 |

## Expo — [expo/skills](https://github.com/expo/skills)

```bash
npx skills add expo/skills
```

| Skill                  | Description                                         |
| ---------------------- | --------------------------------------------------- |
| `building-native-ui`   | Building apps with Expo Router, styling, navigation |
| `native-data-fetching` | Networking, API requests, caching, offline support  |
| `expo-deployment`      | Deploy to iOS App Store and Android Play Store      |
| `expo-tailwind-setup`  | Tailwind CSS v4 with NativeWind v5 setup            |
| `expo-api-routes`      | API routes in Expo Router with EAS Hosting          |

## Better Auth — [better-auth/skills](https://github.com/better-auth/skills)

```bash
npx skills add better-auth/skills
```

| Skill                                      | Description                                                           |
| ------------------------------------------ | --------------------------------------------------------------------- |
| `better-auth-best-practices`               | Full server + client setup — DB adapters, sessions, plugins, security |
| `create-auth-skill`                        | Scaffold auth end to end — framework/DB detection, handlers, OAuth, UI |
| `email-and-password-best-practices`        | Email verification, password-reset flows, policy & custom hashing     |
| `organization-best-practices`              | Multi-tenant orgs — members, invitations, roles/permissions, teams    |
| `two-factor-authentication-best-practices` | 2FA — TOTP, email/SMS OTP, backup codes, trusted-device handling      |

## Remotion — [remotion-dev/skills](https://github.com/remotion-dev/skills)

```bash
npx skills add remotion-dev/skills
```

| Skill                     | Description                           |
| ------------------------- | ------------------------------------- |
| `remotion-best-practices` | Video creation in React with Remotion |

## Shadcn — [shadcn/ui](https://github.com/shadcn/ui)

```bash
npx skills add https://github.com/shadcn/ui --skill shadcn
```

| Skill     | Description                                                              |
| --------- | ------------------------------------------------------------------------ |
| `shadcn`  | Complete shadcn/ui component management — add, search, fix, and compose  |

## Figma — [figma/mcp-server-guide](https://github.com/figma/mcp-server-guide)

_Skills for Figma's official Dev Mode MCP server — design → code, Code Connect, design-system rules, and writing to the canvas. Formerly `figma/dev-mode-mcp-server-guide`, which now redirects here._

```bash
npx skills add figma/mcp-server-guide
```

| Skill                              | Description                                                              |
| ---------------------------------- | ------------------------------------------------------------------------ |
| `figma-use`                        | Create/edit Figma nodes, variables, and components via the Plugin API    |
| `figma-generate-design`            | Build a full page, screen, or layout in Figma from code or a description |
| `figma-implement-design`           | Implement a Figma design as production code                              |
| `figma-code-connect`               | Map Figma components to code components (Code Connect)                   |
| `figma-create-design-system-rules` | Create design-system rules so generated code matches your system        |
| `figma-create-new-file`            | Create a new blank Figma, FigJam, or Slides file                         |
| `figma-generate-diagram`           | Generate a flowchart or diagram in FigJam                                |

## Emil Kowalski — [emilkowalski/skills](https://github.com/emilkowalski/skills)

_Craft-focused design engineering and motion from Emil Kowalski (animations.dev)._

```bash
npx skills add emilkowalski/skills
```

| Skill                  | Description                                                                            |
| ---------------------- | -------------------------------------------------------------------------------------- |
| `emil-design-eng`      | Craft-focused design engineering — animation framework, component patterns, gestures   |
| `review-animations`    | Review animation & motion code against a high craft bar — ten non-negotiable standards |
| `animation-vocabulary` | Turn a loose description of a motion effect into the precise term                      |

## CSS Transitions — [jakubantalik/transitions.dev](https://github.com/jakubantalik/transitions.dev)

```bash
npx skills add https://github.com/jakubantalik/transitions.dev --skill transitions-dev
```

| Skill             | Description                                                               |
| ----------------- | ------------------------------------------------------------------------- |
| `transitions-dev` | Twelve drop-in, framework-free CSS transitions with reduced-motion guards |

## Marketing Skills — [coreyhaines31/marketingskills](https://skills.sh/coreyhaines31/marketingskills/seo-audit)

```bash
npx skills add coreyhaines31/marketingskills
```

| Skill       | Description                                                                                                   |
| ----------- | ------------------------------------------------------------------------------------------------------------- |
| `seo-audit` | Audit, review, and diagnose SEO issues including technical SEO, on-page SEO, meta tags, and SEO health checks |

## Engineering Workflow — [mattpocock/skills](https://github.com/mattpocock/skills)

### Quick reference — official order

The numbered walk through the current official pipeline (2026-07-01). Model and session notes are sourced; gaps are marked rather than guessed.

**Step 1.** `/setup-matt-pocock-skills` — model: any (not specified by Pocock) · session: any, **once per repo**
When to use: before first use in a repo — wires issue tracker, triage labels, and domain-doc paths into `docs/agents/*.md`.

**Step 2.** `/grill-with-docs` — model: big frontier model (his daily driver: Opus 4.8, **medium** effort) · session: **new**
When to use: every coding task in a repo — relentless interview that maintains `CONTEXT.md` + ADRs as decisions land. `/grill-me` instead only for plans outside a codebase ("I stopped using /grill-me for coding").

**Step 3.** `/to-prd` — model: same as step 2 · session: **same as step 2** ("Do not clear the context… just to write a PRD")
When to use: multi-session work only — synthesizes the grilled conversation into a PRD on the issue tracker. If the work fits one session, skip steps 3–4 and run `/implement` in place.

**Step 4.** `/to-issues` — model: same · session: **same as steps 2–3** (grill → prd → issues in "one unbroken window")
When to use: break the PRD into tracer-bullet vertical slices with Blocked-by edges, published blockers-first.

**Step 5.** `/implement` — model: smaller is fine here ("Sonnet for implementation"; the plan + codebase carry it) · session: **new — one per issue** (or in place, same session, if the work fit the grilling window)
When to use: build from the PRD/issues — drives `/tdd` at pre-agreed seams, typechecks + single test files regularly, full suite once at the end, then hands to `/code-review` and commits.

**Step 6.** `/code-review` — model: Opus ("I need the smarts") · session: **fresh context — never the implementer's window** ("the reviewer will be dumber than the thing that implemented it")
When to use: after every implement — two parallel sub-agents check **Standards** (repo rules + Fowler-smell baseline) and **Spec** (diff vs the originating issue/PRD).

**Between any steps** — `/handoff`: packages just the relevant context into a markdown file so you can continue in a **new, clean session**. Two triggers: (1) this session is growing toward the ~100–120k-token **dumb zone** (watch the token statusline) — hand off and continue the same work fresh; (2) a side-question needs throwaway code to answer — hand off that one question to a second session, build the `/prototype` there, then `/handoff` the conclusion back while your main session stays clean (his "DIY sub-agent" pattern). Contrast: `/compact` summarizes **in place** and the same session continues — legitimate only for long single-threaded debugging.

**Off the chain** — `/triage` (issues/PRs you didn't create) · `/diagnosing-bugs` (something's broken) · `/improve-codebase-architecture` (every few days).

**Standing rules (not steps)** — Docs: PRD = destination, issues = journey, both die at sprint end (close, don't keep); `CONTEXT.md` = glossary only; ADR only when hard-to-reverse + surprising + real trade-off · CLAUDE.md: nearly empty — undiscoverable AND globally relevant only; hooks over prose; never `/init` · Humans own planning + QA; agents own implementation.

Per-step effort/thinking settings: not specified by Pocock — the only sourced setting is his general daily driver "Opus 4.8 with medium effort" (Ondrej interview, 2026-06-18). Sonnet-implements/Opus-reviews is from the AI Engineer workshop (2026-04-24).

Verified 2026-07-02 — sources: [things-people-get-wrong](https://www.aihero.dev/things-people-get-wrong-with-grill-me-and-grill-with-docs) (2026-05-25) · [skills-handoff](https://www.aihero.dev/skills-handoff) (2026-05-13) · [skills-domain-model](https://www.aihero.dev/skills-domain-model) (2026-05-05) · [mattpocock/skills](https://github.com/mattpocock/skills) ask-matt/implement/code-review SKILL.md (2026-07-01) · [AI Engineer workshop](https://www.youtube.com/watch?v=-QFHIoCo-Ko) (2026-04-24) · [David Ondrej interview](https://www.youtube.com/watch?v=nQwJVHCtDDY) (2026-06-18)

_Small, composable skills for real engineering — deliberately not a process-owning framework. On-ramps: `triage` turns raw issues and external PRs into agent-ready briefs; `diagnosing-bugs` (renamed from `diagnose` in v1.0.0) for anything broken. `improve-codebase-architecture` fights entropy; `handoff` carries context across sessions; `ask-matt` routes you when unsure. Standalone: `teach` (multi-session learning) and `writing-great-skills`. Since v1.0.0 (2026-06-17), skills split into **user-invoked** orchestrators (you type them) and **model-invoked** disciplines the model reaches for — `grilling`, `domain-modeling`, and `codebase-design` are the shared layer other skills call. Deep reference with per-skill walkthroughs, model/session strategy, and sources: [matt-pocock-workflow.md](matt-pocock-workflow.md)._

```bash
npx skills add mattpocock/skills
```

| Skill                           | Invocation | Description                                                                   |
| ------------------------------- | ---------- | ----------------------------------------------------------------------------- |
| `setup-matt-pocock-skills`      | user       | Run once per repo — sets up issue tracker, triage labels, and doc layout      |
| `ask-matt`                      | user       | Router that points you to the right skill or flow for your situation          |
| `grill-me`                      | user       | Interview you relentlessly about a plan — for plans outside a codebase        |
| `grill-with-docs`               | user       | Grill a plan against the domain model, updating CONTEXT.md and ADRs inline    |
| `grilling`                      | model      | The shared interview loop behind grill-me/grill-with-docs — one question at a time |
| `domain-modeling`               | model      | Maintain the domain glossary (CONTEXT.md) and ADRs as decisions land          |
| `codebase-design`               | model      | Deep-module vocabulary — interfaces, seams, depth, the deletion test          |
| `prototype`                     | model      | Build throwaway code to answer a design question (state/logic or UI)          |
| `to-prd`                        | user       | Turn the current conversation into a PRD on the issue tracker                 |
| `to-issues`                     | user       | Break a plan or PRD into tracer-bullet vertical-slice issues                  |
| `triage`                        | user       | Move issues and external PRs through triage roles into agent-ready briefs     |
| `implement`                     | user       | Build from a PRD/issues — tdd at pre-agreed seams, then code-review, commit   |
| `tdd`                           | model      | Test-driven development — spec-like tests only at pre-agreed seams            |
| `code-review`                   | model      | Two-axis review (Standards + Spec) in parallel sub-agents since a fixed point |
| `diagnosing-bugs`               | model      | Disciplined loop for hard bugs — feedback loop first, falsifiable hypotheses  |
| `improve-codebase-architecture` | user       | Scan for deepening opportunities, visual HTML report, grill through your pick |
| `resolving-merge-conflicts`     | model      | Resolve in-progress merge/rebase conflicts from primary sources — never abort |
| `setup-pre-commit`              | model      | Husky + lint-staged pre-commit scaffold — format, typecheck, test on commit   |
| `git-guardrails-claude-code`    | model      | PreToolUse hook blocking dangerous git — push, reset --hard, clean -f, -D     |
| `handoff`                       | user       | Compact a conversation into a handoff doc so a fresh agent can continue       |
| `writing-great-skills`          | user       | Reference for authoring predictable, well-scoped skills                       |
| `teach`                         | user       | Learn a concept over multiple sessions in a stateful workspace                |
