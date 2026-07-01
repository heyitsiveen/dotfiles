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

_Small, composable skills for real engineering — deliberately not a process-owning framework. Official order: run `setup-matt-pocock-skills` once per repo (it wires up your issue tracker, triage labels, and doc layout), then follow the main flow (idea → ship) — align with `grill-me` / `grill-with-docs` → `to-prd` → `to-issues` → build with `tdd`, reaching for `improve-codebase-architecture` to fight entropy and `handoff` to carry context across sessions. Not sure which to use? Run `ask-matt`. Off the main flow, `teach` is standalone — a stateful, multi-session workspace for learning a concept._

```bash
npx skills add mattpocock/skills
```

| Skill                           | Description                                                                |
| ------------------------------- | -------------------------------------------------------------------------- |
| `setup-matt-pocock-skills`      | Run once per repo — sets up issue tracker, triage labels, and doc layout   |
| `ask-matt`                      | Router that points you to the right skill or flow for your situation       |
| `grill-me`                      | Interview you relentlessly about a plan until every decision is resolved   |
| `grill-with-docs`               | Grill a plan against the domain model, updating CONTEXT.md and ADRs inline |
| `to-prd`                        | Turn the current conversation into a PRD on the issue tracker              |
| `to-issues`                     | Break a plan or PRD into independent, vertically-sliced issues             |
| `tdd`                           | Test-driven development with a red-green-refactor loop                     |
| `improve-codebase-architecture` | Find refactors that make a codebase more testable and AI-navigable         |
| `handoff`                       | Compact a conversation into a handoff doc so a fresh agent can continue    |
| `writing-great-skills`          | Reference for authoring predictable, well-scoped skills                    |
| `teach`                         | Learn a concept over multiple sessions in a stateful workspace             |
