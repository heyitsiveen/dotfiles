# Skills

Skills from [skills.sh](https://skills.sh) extend Claude Code with domain-specific knowledge and best practices.

> Commands use `pnpx` (pnpm's one-off runner). This setup has no `npm`/`npx` — see [node-pnpm-setup.md](node-pnpm-setup.md). Upstream docs write these as `npx skills add …`.

## Anthropic — [anthropics/skills](https://github.com/anthropics/skills)

```bash
pnpx skills add anthropics/skills
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
pnpx skills add vercel-labs/agent-skills vercel-labs/next-skills vercel/ai vercel/turborepo
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

| Skill                                      | Description                                                           |
| ------------------------------------------ | --------------------------------------------------------------------- |
| `better-auth-best-practices`               | Full server + client setup — DB adapters, sessions, plugins, security |
| `create-auth-skill`                        | Scaffold auth end to end — framework/DB detection, handlers, OAuth, UI |
| `email-and-password-best-practices`        | Email verification, password-reset flows, policy & custom hashing     |
| `organization-best-practices`              | Multi-tenant orgs — members, invitations, roles/permissions, teams    |
| `two-factor-authentication-best-practices` | 2FA — TOTP, email/SMS OTP, backup codes, trusted-device handling      |

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

| Skill     | Description                                                              |
| --------- | ------------------------------------------------------------------------ |
| `shadcn`  | Complete shadcn/ui component management — add, search, fix, and compose  |

## Figma — [figma/mcp-server-guide](https://github.com/figma/mcp-server-guide)

_Skills for Figma's official Dev Mode MCP server — design → code, Code Connect, design-system rules, and writing to the canvas. Formerly `figma/dev-mode-mcp-server-guide`, which now redirects here._

```bash
pnpx skills add figma/mcp-server-guide
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
pnpx skills add emilkowalski/skills
```

| Skill                          | Description                                                                            |
| ------------------------------ | -------------------------------------------------------------------------------------- |
| `emil-design-eng`              | Craft-focused design engineering — animation framework, component patterns, gestures   |
| `apple-design`                 | Apple's fluid, physical motion & interface design — springs, gestures, materials, type |
| `review-animations`            | Review animation & motion code against a high craft bar — ten non-negotiable standards |
| `improve-animations`           | Audit a codebase's motion, then produce prioritized findings & fix plans (read-only)   |
| `find-animation-opportunities` | Sweep an interface for moments that genuinely benefit from motion — restraint-first    |
| `animation-vocabulary`         | Turn a loose description of a motion effect into the precise term                      |

## CSS Transitions — [jakubantalik/transitions.dev](https://github.com/jakubantalik/transitions.dev)

```bash
pnpx skills add https://github.com/jakubantalik/transitions.dev --skill transitions-dev
```

| Skill             | Description                                                               |
| ----------------- | ------------------------------------------------------------------------- |
| `transitions-dev` | Twelve drop-in, framework-free CSS transitions with reduced-motion guards |

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

_Small, composable skills for real engineering — deliberately not a process-owning framework. Main chain: `grill-with-docs → to-spec → to-tickets → implement → code-review` (the flow Pocock demos; his `ask-matt` router encodes it), with `grill-me` for plans outside a codebase. `wayfinder` is the upstream on-ramp when work is too big for one session — it maps the effort as a shared tracker map of investigation tickets; Pocock's [v1.1 video](https://www.youtube.com/watch?v=A8mokin_YOs) calls it his front door ("default to Wayfinder instead"), but the written flow keeps grill-with-docs as the spine. On-ramps: `triage` turns raw issues and external PRs into agent-ready briefs; `diagnosing-bugs` for anything broken. Support: `research` (background-agent reading legwork) and `prototype` (design questions). `improve-codebase-architecture` fights entropy; `handoff` carries context across sessions; `ask-matt` routes you when unsure. Since v1.0.0 (2026-06-17), skills split into **user-invoked** orchestrators (you type them) and **model-invoked** disciplines the model reaches for — `grilling`, `domain-modeling`, and `codebase-design` are the shared layer other skills call. **v1.1.0 (2026-07-08)** renamed `to-prd`→`to-spec`, merged `to-issues`→`to-tickets`, graduated `wayfinder`/`code-review`/`research`/`prototype`, and sharpened `grilling`; the repo now also ships a **Claude Code plugin** (reports v1.2.0 — `/plugin install mattpocock-skills@mattpocock` — a read-only, always-current bundle of the 22 promoted skills). **40 skills** total (22 promoted + 18 experimental). Full **recommended-order walkthrough** (per-step model/session/effort notes), per-skill cards, install & repair, session/CLAUDE.md strategy, and sources: [matt-pocock-workflow.md](matt-pocock-workflow.md)._

```bash
pnpx skills add mattpocock/skills
# or install as a Claude Code plugin (read-only, always-current, 22 promoted skills, reports v1.2.0):
#   /plugin marketplace add mattpocock/skills
#   /plugin install mattpocock-skills@mattpocock
```

| Skill                           | Invocation | Description                                                                   |
| ------------------------------- | ---------- | ----------------------------------------------------------------------------- |
| `setup-matt-pocock-skills`      | user       | Run once per repo — sets up issue tracker, triage labels, and doc layout      |
| `ask-matt`                      | user       | Router that points you to the right skill or flow for your situation          |
| `wayfinder`                     | user       | On-ramp for work too big for one session — maps it as a shared tracker map    |
| `grill-me`                      | user       | Interview you relentlessly about a plan — for plans outside a codebase        |
| `grill-with-docs`               | user       | Grill a plan against the domain model, updating CONTEXT.md and ADRs inline    |
| `grilling`                      | model      | Shared interview loop — one question at a time; v1.1.0 confirmation gate      |
| `domain-modeling`               | model      | Maintain the domain glossary (CONTEXT.md) and ADRs as decisions land          |
| `codebase-design`               | model      | Deep-module vocabulary — interfaces, seams, depth, the deletion test          |
| `prototype`                     | model      | Throwaway code to answer a design question — model-invoked in v1.1.0          |
| `research`                      | model      | Background agent → one cited primary-source note (new in v1.1.0)              |
| `to-spec`                       | user       | Synthesize the conversation into a spec on the tracker (was `to-prd`)         |
| `to-tickets`                    | user       | Break a spec/plan into tracer-bullet tickets with blocking edges              |
| `triage`                        | user       | Move issues and external PRs through triage roles into agent-ready briefs     |
| `implement`                     | user       | Build from a spec/tickets — tdd at pre-agreed seams, then code-review         |
| `tdd`                           | model      | Test-driven development — spec-like tests at pre-agreed seams (red→green)     |
| `code-review`                   | model      | Two-axis review (Standards + Fowler baseline, Spec) — graduated v1.1.0        |
| `diagnosing-bugs`               | model      | Disciplined loop for hard bugs — feedback loop first, falsifiable hypotheses  |
| `improve-codebase-architecture` | user       | Scan for deepening opportunities, visual HTML report, grill through your pick |
| `resolving-merge-conflicts`     | model      | Resolve in-progress merge/rebase conflicts from primary sources — never abort |
| `setup-pre-commit`              | model      | Husky + lint-staged pre-commit scaffold — format, typecheck, test on commit   |
| `git-guardrails-claude-code`    | model      | PreToolUse hook blocking dangerous git — push, reset --hard, clean -f, -D     |
| `handoff`                       | user       | Compact a conversation into a handoff doc so a fresh agent can continue       |
| `writing-great-skills`          | user       | Reference for authoring predictable skills (v1.1.0 adds 2 failure modes)      |
| `teach`                         | user       | Learn a concept over multiple sessions in a stateful workspace                |
