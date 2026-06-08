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

| Skill                        | Description                                  |
| ---------------------------- | -------------------------------------------- |
| `better-auth-best-practices`                | Better Auth TypeScript framework integration  |
| `create-auth-skill`                         | Create auth layers using Better Auth          |
| `email-and-password-best-practices`         | Email & password authentication patterns      |
| `organization-best-practices`               | Multi-org and team management auth patterns   |
| `two-factor-authentication-best-practices`  | 2FA setup and best practices with Better Auth |

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

```bash
npx skills add figma/mcp-server-guide
```

| Skill                      | Description                                        |
| -------------------------- | -------------------------------------------------- |
| `figma-implement-design`   | Implement designs from Figma into code             |

## Design Engineering & Animation

```bash
npx skills add https://github.com/emilkowalski/skill --skill emil-design-eng
npx skills add https://github.com/pproenca/dot-skills --skill emilkowal-animations
npx skills add https://github.com/jakubantalik/transitions.dev --skill transitions-dev
```

| Skill                  | Source                                                                          | Description                                                                          |
| ---------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| `emil-design-eng`      | [emilkowalski/skill](https://github.com/emilkowalski/skill)                     | Craft-focused design engineering — animation framework, component patterns, gestures |
| `emilkowal-animations` | [pproenca/dot-skills](https://github.com/pproenca/dot-skills)                   | 43 animation rules across easing, timing, transforms, gestures, and accessibility    |
| `transitions-dev`      | [jakubantalik/transitions.dev](https://github.com/jakubantalik/transitions.dev) | Twelve drop-in, framework-free CSS transitions with reduced-motion guards            |

## Marketing Skills — [coreyhaines31/marketingskills](https://skills.sh/coreyhaines31/marketingskills/seo-audit)

```bash
npx skills add coreyhaines31/marketingskills
```

| Skill       | Description                                                                                                   |
| ----------- | ------------------------------------------------------------------------------------------------------------- |
| `seo-audit` | Audit, review, and diagnose SEO issues including technical SEO, on-page SEO, meta tags, and SEO health checks |

## Spec-Driven Workflow — [mattpocock/skills](https://github.com/mattpocock/skills)

_A connected flow: `grill-me` (or `grill-with-docs`) → `to-prd` → `to-issues` → `tdd`, with `improve-codebase-architecture` for ongoing refactors._

```bash
npx skills add mattpocock/skills
```

| Skill                           | Description                                                                |
| ------------------------------- | -------------------------------------------------------------------------- |
| `grill-me`                      | Interview you relentlessly about a plan until every decision is resolved   |
| `grill-with-docs`               | Grill a plan against the domain model, updating CONTEXT.md and ADRs inline |
| `to-prd`                        | Turn the current conversation into a PRD on the issue tracker              |
| `to-issues`                     | Break a plan or PRD into independent, vertically-sliced issues             |
| `tdd`                           | Test-driven development with a red-green-refactor loop                     |
| `improve-codebase-architecture` | Find refactors that make a codebase more testable and AI-navigable         |
