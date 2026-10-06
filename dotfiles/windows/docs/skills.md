# Skills

Skills from [skills.sh](https://skills.sh) extend Claude Code with domain-specific knowledge and best practices.

> Commands use `pnpx` (pnpm's one-off runner). This setup has no `npm`/`npx` — see [node-pnpm-setup.md](node-pnpm-setup.md). Upstream docs write these as `npx skills add …`.

## Anthropic — [anthropics/skills](https://github.com/anthropics/skills)

```bash
pnpx skills add anthropics/skills
```

| Skill                   | Description                                                      |
| ----------------------- | ---------------------------------------------------------------- |
| `frontend-design`       | Production-grade frontend interfaces with high design quality    |
| `pdf`                   | PDF extraction, creation, merging, splitting, and forms          |
| `docx`                  | Document creation, editing, tracked changes, and analysis        |
| `xlsx`                  | Spreadsheet creation, formulas, and data analysis                |
| `mcp-builder`           | Guide for creating MCP servers                                   |
| `canvas-design`         | Visual art creation in PNG and PDF formats                       |
| `doc-coauthoring`       | Collaborative documentation and iterative refinement             |
| `theme-factory`         | Styling toolkit with 10 preset themes and custom generation      |
| `brand-guidelines`      | Brand colors and typography standards                            |
| `web-artifacts-builder` | Multi-component claude.ai artifacts — React, Tailwind, shadcn/ui |

## Vercel — [vercel-labs](https://github.com/vercel-labs) / [vercel](https://github.com/vercel)

```bash
pnpx skills add vercel-labs/agent-skills vercel-labs/next-skills vercel-labs/agent-browser vercel/ai vercel/turborepo
```

| Skill                         | Description                                                             |
| ----------------------------- | ----------------------------------------------------------------------- |
| `vercel-react-best-practices` | React/Next.js performance optimization (45 rules)                       |
| `web-design-guidelines`       | UI code compliance with Web Interface Guidelines                        |
| `vercel-react-native-skills`  | React Native and Expo mobile best practices                             |
| `next-best-practices`         | Next.js file conventions, RSC, data patterns, metadata                  |
| `ai-sdk`                      | Build AI features with Vercel AI SDK                                    |
| `turborepo`                   | Monorepo best practices with Turborepo                                  |
| `agent-browser`               | Browser & Electron automation CLI for agents — CDP, a11y-tree snapshots |

## Expo — [expo/skills](https://github.com/expo/skills)

```bash
pnpx skills add expo/skills
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
pnpx skills add better-auth/skills
```

| Skill                                      | Description                                                                                                 |
| ------------------------------------------ | ----------------------------------------------------------------------------------------------------------- |
| `better-auth-best-practices`               | Full server + client setup — DB adapters, sessions, plugins, security                                       |
| `create-auth`                              | Scaffold auth end to end — framework/DB detection, handlers, OAuth, UI                                      |
| `better-auth-security-best-practices`      | Harden a deployment — rate limits, secrets, CSRF, trusted origins, cookie & token encryption, audit logging |
| `email-and-password-best-practices`        | Email verification, password-reset flows, policy & custom hashing                                           |
| `organization-best-practices`              | Multi-tenant orgs — members, invitations, roles/permissions, teams                                          |
| `two-factor-authentication-best-practices` | 2FA — TOTP, email/SMS OTP, backup codes, trusted-device handling                                            |

## Remotion — [remotion-dev/skills](https://github.com/remotion-dev/skills)

```bash
pnpx skills add remotion-dev/skills
```

| Skill                     | Description                           |
| ------------------------- | ------------------------------------- |
| `remotion-best-practices` | Video creation in React with Remotion |

## Shadcn — [shadcn/ui](https://github.com/shadcn/ui)

```bash
pnpx skills add https://github.com/shadcn/ui --skill shadcn
```

| Skill    | Description                                                             |
| -------- | ----------------------------------------------------------------------- |
| `shadcn` | Complete shadcn/ui component management — add, search, fix, and compose |

## Figma — [figma/mcp-server-guide](https://github.com/figma/mcp-server-guide)

_Skills for Figma's official Dev Mode MCP server — design → code, Code Connect, design-system rules, and writing to the canvas. Formerly `figma/dev-mode-mcp-server-guide`, which now redirects here. Figma also ships a **Claude Code plugin** (reports v2.2.120 — a read-only, always-current bundle, now **16 skills**) that has moved past this repo: it ships `figma-design-to-code` in place of `figma-implement-design`, drops `figma-create-design-system-rules`, and adds design-system, shader, SwiftUI, motion, FigJam, and Slides skills. Prefer the plugin — the rows below are the skills-sh catalogue. Plugin entry: [plugins.md](plugins.md)._

```bash
pnpx skills add figma/mcp-server-guide
# or install as a Claude Code plugin (read-only, always-current, 16 skills, reports v2.2.120):
#   /plugin install figma@claude-plugins-official
```

| Skill                              | Description                                                              |
| ---------------------------------- | ------------------------------------------------------------------------ |
| `figma-use`                        | Create/edit Figma nodes, variables, and components via the Plugin API    |
| `figma-generate-design`            | Build a full page, screen, or layout in Figma from code or a description |
| `figma-implement-design`           | Implement a Figma design as production code                              |
| `figma-code-connect`               | Map Figma components to code components (Code Connect)                   |
| `figma-create-design-system-rules` | Create design-system rules so generated code matches your system         |
| `figma-create-new-file`            | Create a new blank Figma, FigJam, or Slides file                         |
| `figma-generate-diagram`           | Generate a flowchart or diagram in FigJam                                |

## Emil Kowalski — [emilkowalski/skills](https://github.com/emilkowalski/skills)

_Craft-focused design engineering and motion from Emil Kowalski (animations.dev)._

```bash
pnpx skills add emilkowalski/skills
```

| Skill                          | Description                                                                                      |
| ------------------------------ | ------------------------------------------------------------------------------------------------ |
| `emil-design-eng`              | Craft-focused design engineering — animation framework, component patterns, gestures             |
| `animate`                      | Build an animation from scratch and write it — purpose, tool, properties, curve, interrupt, exit |
| `apple-design`                 | Apple's fluid, physical motion & interface design — springs, gestures, materials, type           |
| `review-animations`            | Review animation & motion code against a high craft bar — ten non-negotiable standards           |
| `improve-animations`           | Audit a codebase's motion, then produce prioritized findings & fix plans (read-only)             |
| `find-animation-opportunities` | Sweep an interface for moments that genuinely benefit from motion — restraint-first              |
| `animation-vocabulary`         | Turn a loose description of a motion effect into the precise term                                |
| `pick-ui-library`              | Curated, opinionated library picks per frontend task — charts, OTP, DnD, toasts, state           |
| `prototype`                    | Build several genuinely different versions of a UI piece behind a live visual picker             |

> [!NOTE]
> `pick-ui-library` and `prototype` are **user-invoked only** (`disable-model-invocation: true`) — the model never reaches for them; type the skill name. Emil's `prototype` shares its name with Matt Pocock's model-invoked `prototype` (throwaway code to answer a design question); they coexist because Pocock's arrives namespaced via the plugin (`mattpocock-skills:prototype`) while Emil's owns the bare `prototype` slug in `~/.agents/skills`.

## CSS Transitions — [jakubantalik/transitions.dev](https://github.com/jakubantalik/transitions.dev)

```bash
pnpx skills add https://github.com/jakubantalik/transitions.dev --skill transitions-dev
```

| Skill             | Description                                                               |
| ----------------- | ------------------------------------------------------------------------- |
| `transitions-dev` | Twelve drop-in, framework-free CSS transitions with reduced-motion guards |

## UI/UX Pro Max — [nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill)

_Searchable local design database — styles, palettes, font pairings, product types, UX guidelines, icons, GSAP presets, and chart types across 22 stacks._

```bash
pnpx skills add https://github.com/nextlevelbuilder/ui-ux-pro-max-skill --skill ui-ux-pro-max
```

| Skill           | Description                                                                               |
| --------------- | ----------------------------------------------------------------------------------------- |
| `ui-ux-pro-max` | Priority-ranked UI/UX recommendations for layout, color, type, a11y, motion, and data viz |

## Shopify — [jeffallan/claude-skills](https://github.com/jeffallan/claude-skills)

```bash
pnpx skills add jeffallan/claude-skills
```

| Skill            | Description                                                                             |
| ---------------- | --------------------------------------------------------------------------------------- |
| `shopify-expert` | Themes, Liquid, apps, Hydrogen, checkout extensions, Functions, and Storefront API work |

> [!NOTE]
> Overlaps the official `shopify-plugin` in [plugins.md](plugins.md), which ships per-API skills (`shopify-liquid`, `shopify-admin`, `shopify-hydrogen`, …) sourced from Shopify's own docs. Prefer the plugin for API specifics; this one is a single generalist skill.

## Marketing Skills — [coreyhaines31/marketingskills](https://skills.sh/coreyhaines31/marketingskills/seo-audit)

```bash
pnpx skills add coreyhaines31/marketingskills
```

| Skill       | Description                                                                                                   |
| ----------- | ------------------------------------------------------------------------------------------------------------- |
| `seo-audit` | Audit, review, and diagnose SEO issues including technical SEO, on-page SEO, meta tags, and SEO health checks |

## Engineering Workflow — [mattpocock/skills](https://github.com/mattpocock/skills)

> [!TIP]
> 1. **Always start at `/ask-matt`** — whenever you have an idea, a change, or you're unsure what to run next, describe the situation and follow the flow it names before invoking anything else. It's the router: it picks the skill or flow and does no work itself ([ask-matt SKILL.md](https://github.com/mattpocock/skills/blob/main/skills/engineering/ask-matt/SKILL.md)).
>
> 2. **Parallelize a wayfinder map's sub-issues with Claude Code sub-agents — AFK tickets only.** Chart mode already fires a `/research` subagent per research ticket, and unblocked AFK task and implementation tickets can each go to a sub-agent in its own git worktree — the sub-agent equivalent of Matt's parallel sessions (inferred). HITL tickets (grilling, prototype — the default type) only resolve through the live human, so never delegate those ([wayfinder SKILL.md](https://github.com/mattpocock/skills/blob/main/skills/engineering/wayfinder/SKILL.md)).

_Small, composable skills for real engineering — deliberately not a process-owning framework. Main chain: `grill-with-docs → to-spec → to-tickets → implement → code-review → retro` (the flow Pocock demos; his `ask-matt` router encodes it, with `implement-spec` as the whole-spec alternative to per-ticket `implement`), with `grill-me` for plans outside a codebase. `wayfinder` is the upstream on-ramp when work is too big for one session — it maps the effort as a shared tracker map of decision tickets; Pocock's [v1.1 video](https://www.youtube.com/watch?v=A8mokin_YOs) calls it his front door ("default to Wayfinder instead"), but the written flow keeps grill-with-docs as the spine. On-ramps: `triage` turns raw issues and external PRs into agent-ready briefs; `diagnosing-bugs` for anything broken. Support: `research` (background-agent reading legwork) and `prototype` (design questions). `improve-codebase-architecture` fights entropy; `handoff` and `claude-handoff` carry context across sessions; `ask-matt` routes you when unsure. Since v1.0.0 (2026-06-17), skills split into **user-invoked** orchestrators (you type them) and **model-invoked** disciplines the model reaches for — `grilling`, `domain-modeling`, and `codebase-design` are the shared layer other skills call. The domain glossary has moved from `CONTEXT.md` to **`GLOSSARY.md`** repo-wide. **v1.3.0** graduated `implement-spec`, `pr`, and `retro` into Engineering and retired `resolving-merge-conflicts` outright — nothing replaces it, the agent works a conflict without a skill; **v1.3.1** is the patch that repoints `ask-matt` at `/retro` once a fix lands. The table below also catches up eleven skills that shipped earlier and this doc had never listed — `chief-of-staff` among them, never named in any changelog — plus the `writing-great-skills`→`writing-for-agents` rename. **38 skills** across four trays — engineering (20), in-progress (7), productivity (7), misc (4); `deprecated/` is empty by design, since a retired skill is deleted and the changeset that removes it names its replacement. Full **recommended-order walkthrough** (per-step model/session/effort notes), per-skill cards, install & repair, session/CLAUDE.md strategy, and sources: [matt-pocock-workflow.md](matt-pocock-workflow.md)._

```bash
pnpx skills add mattpocock/skills
# or install as a Claude Code plugin (read-only, always-current, 38 skills, reports v1.3.1):
#   /plugin marketplace add mattpocock/skills
#   /plugin install mattpocock-skills@mattpocock
```

| Skill                           | Invocation | Description                                                                   |
| ------------------------------- | ---------- | ----------------------------------------------------------------------------- |
| `setup-matt-pocock-skills`      | user       | Run once per repo — sets up issue tracker, triage labels, and doc layout      |
| `ask-matt`                      | user       | Router that points you to the right skill or flow for your situation          |
| `wayfinder`                     | user       | On-ramp for work too big for one session — maps it as a shared tracker map    |
| `grill-me`                      | user       | Interview you relentlessly about a plan — for plans outside a codebase        |
| `grill-with-docs`               | user       | Grill a plan against the domain model, updating GLOSSARY.md and ADRs inline   |
| `grilling`                      | model      | Shared interview loop — one question at a time, with a confirmation gate      |
| `domain-modeling`               | model      | Maintain the domain glossary (GLOSSARY.md) and ADRs as decisions land         |
| `codebase-design`               | model      | Deep-module vocabulary — interfaces, seams, depth, the deletion test          |
| `prototype`                     | model      | Throwaway code to answer a design question                                    |
| `research`                      | model      | Background agent → one cited primary-source note                              |
| `to-spec`                       | user       | Synthesize the conversation into a spec on the tracker — no interview         |
| `to-questionnaire`              | user       | Turn a decision you can't answer into a questionnaire for someone else        |
| `to-tickets`                    | user       | Break a spec/plan into tracer-bullet tickets with blocking edges              |
| `triage`                        | user       | Move issues and external PRs through triage roles into agent-ready briefs     |
| `implement`                     | user       | Build a piece of work from a spec or set of tickets                           |
| `implement-spec`                | user       | Build the output of `to-spec` and `to-tickets` in code                        |
| `tdd`                           | model      | Test-driven development — spec-like tests at pre-agreed seams (red→green)     |
| `code-review`                   | model      | Two-axis review (Standards, Spec) run as parallel sub-agents                  |
| `pr`                            | model      | Write a PR body                                                               |
| `diagnosing-bugs`               | model      | Diagnosis loop for hard bugs and performance regressions                      |
| `improve-codebase-architecture` | user       | Scan for deepening opportunities, visual HTML report, grill through your pick |
| `migrate-to-shoehorn`           | model      | Replace `as` assertions in tests with @total-typescript/shoehorn              |
| `retro`                         | user       | Run a retrospective on a coding session                                       |
| `setup-pre-commit`              | model      | Husky + lint-staged pre-commit scaffold — format, typecheck, test on commit   |
| `setup-ts-deep-modules`         | user       | Wire dependency-cruiser in so each TypeScript package is a deep module        |
| `git-guardrails-claude-code`    | model      | PreToolUse hook blocking dangerous git — push, reset --hard, clean -f, -D     |
| `wizard`                        | model      | Generate an interactive bash wizard for steps only a human can perform        |
| `scaffold-exercises`            | model      | Scaffold exercise dirs — sections, problems, solutions, explainers            |
| `handoff`                       | user       | Compact a conversation into a handoff doc so a fresh agent can continue       |
| `claude-handoff`                | user       | Hand off to a fresh background agent that picks up the work immediately       |
| `chief-of-staff`                | user       | Pursue a long-running goal in one session by coordinating subagents           |
| `loop-me`                       | user       | Grill you about specs for the workflows you want to build                     |
| `wait-what`                     | user       | Stop — that last message did not land, so re-pitch it                         |
| `writing-for-agents`            | model      | Writing docs for agents — skills, AGENTS.md, CLAUDE.md                        |
| `writing-fragments`             | user       | Writing, explore — mine raw fragments, no structure yet                       |
| `writing-beats`                 | user       | Writing, exploit — assemble fragments into a journey of beats                 |
| `writing-shape`                 | user       | Writing, exploit — shape raw material into an article, paragraph by paragraph |
| `teach`                         | user       | Learn a concept over multiple sessions in a stateful workspace                |
