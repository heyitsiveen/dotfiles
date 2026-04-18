# Plugins

Plugins extend Claude Code with specialized skills, agents, output styles, and tool integrations. Configuration lives in `.claude/settings.json`.

## Claude Plugins Official — [anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official)

If the Anthropic marketplace is not yet added, run this inside Claude Code:

```
/plugin marketplace add anthropics/claude-plugins-official
```

### Frontend-Design

[Plugin Page](https://claude.com/plugins/frontend-design)

```
/plugin install frontend-design@claude-plugins-official
```

**What it does:** Generates polished, production-grade frontend UI that avoids generic AI aesthetics. Establishes purpose, audience, and aesthetic direction (brutalist, maximalist, retro-futuristic, luxury, playful, etc.) before coding. Focuses on thoughtful typography, orchestrated motion, spatial composition, and visual depth.

**How to use:** Activates automatically when you ask Claude to build UI. Example prompts: "Create a dashboard for a music streaming app", "Build a landing page for an AI security startup", "Design a settings panel with dark mode support".

---

### Superpowers

[Plugin Page](https://claude.com/plugins/superpowers)

```
/plugin install superpowers@claude-plugins-official
```

**What it does:** Composable skills for structured software development — test-driven development (red-green-refactor cycles), systematic debugging (4-phase root cause investigation), brainstorming (Socratic requirement refinement), subagent-driven development with built-in code review, and skill authoring. After three failed debug attempts, triggers architectural review.

**How to use:** Skills trigger by context or via slash commands: `/brainstorming`, `/writing-plans`, `/executing-plans`, `/systematic-debugging`, `/test-driven-development`, `/requesting-code-review`, `/verification-before-completion`.

---

### Skill Creator

[Plugin Page](https://claude.com/plugins/skill-creator)

```
/plugin install skill-creator@claude-plugins-official
```

**What it does:** Meta-plugin for authoring, evaluating, and improving skills. Provides four specialized agents — Executor (runs skills against evaluation prompts), Grader (scores outputs against expectations), Comparator (blind A/B comparisons between skill versions), and Analyzer (suggests targeted improvements based on results). Four workflow modes structure the process: Create, Eval, Improve, and Benchmark. Includes utility scripts for skill initialization, configuration validation, evaluation preparation, and results aggregation with variance analysis.

**How to use:** Run `/skill-creator` and select a mode. Example prompts: "Create a new skill that reviews PRs for security issues", "Run evals on my code-review skill", "Improve my deploy skill based on these test cases", "Benchmark my skill across 10 runs and show variance".

---

### Context7

[Plugin Page](https://claude.com/plugins/context7)

```
/plugin install context7@claude-plugins-official
```

**What it does:** MCP server delivering current, version-specific library documentation and code examples directly into context. Pulls docs straight from source repositories instead of relying on potentially stale training data. Provides two tools: `resolve-library-id` and `query-docs`.

**How to use:** Add "use context7" to prompts requiring current documentation. Specify a particular library with "use library /[name]". Examples: "Create a Next.js middleware that checks for a valid JWT in cookies. use context7".

---

### Code Review

[Plugin Page](https://claude.com/plugins/code-review)

```
/plugin install code-review@claude-plugins-official
```

**What it does:** Automates PR review using 5 parallel agents analyzing changes from different perspectives: compliance verification, bug identification, git history analysis, previous comment review, and code comment validation. Confidence-based filtering (0-100 score, threshold 80) reduces false positives. Comments include direct GitHub links with full SHA and line ranges.

**How to use:** Run `/code-review` on any PR branch. Auto-skips closed, draft, automated, or already-reviewed PRs. Customize the confidence threshold or focus areas (security, performance, accessibility).

---

### Security Guidance

[Plugin Page](https://claude.com/plugins/security-guidance)

```
/plugin install security-guidance@claude-plugins-official
```

**What it does:** Pre-tool hook that intercepts Write, Edit, and MultiEdit operations and scans code for dangerous patterns before changes are applied. Detects eight major vulnerability categories including command injection in GitHub Actions workflows, unsafe `child_process.exec()` calls, `eval()` and `new Function()` usage, XSS vectors like `dangerouslySetInnerHTML` and `innerHTML`, Python pickle deserialization risks, and `os.system()` command injection. Warnings include specific remediation advice — e.g., using `execFileNoThrow()` instead of `child_process.exec()` to prevent shell injection.

**How to use:** Activates automatically once installed — no commands needed. When Claude attempts to write code containing unsafe patterns, a warning with remediation advice appears before the edit proceeds. Warnings are session-scoped so each one surfaces only once.

---

### Feature Dev

[Plugin Page](https://claude.com/plugins/feature-dev)

```
/plugin install feature-dev@claude-plugins-official
```

**What it does:** Guided 7-phase feature development: discovery, requirements, architecture, implementation, review, and summary. Deploys three specialized agents — code-explorer (traces execution paths and maps architecture), code-architect (proposes approaches with documented trade-offs), and code-reviewer (confidence-scored findings for bugs, security, and conventions).

**How to use:** Run `/feature-dev` with a description or alone for the guided workflow. Example: `/feature-dev Add user authentication with OAuth`.

---

### Commit Commands

[Plugin Page](https://claude.com/plugins/commit-commands)

```
/plugin install commit-commands@claude-plugins-official
```

**What it does:** Git workflow slash commands with AI-generated commit messages that match the repository's existing style. Handles automatic staging, sensitive-file protection (blocks `.env` and similar), comprehensive PR description generation with summaries and test checklists, and stale-branch cleanup.

**How to use:** Three slash commands: `/commit` (stage changes and create a commit with an AI-generated message), `/commit-push-pr` (commit, push to a feature branch, and open a pull request in one step), `/clean_gone` (remove local branches that have been deleted from the remote). Requires git installed, GitHub CLI authentication for the PR command, and a configured remote origin.

---

### Figma

[Plugin Page](https://claude.com/plugins/figma)

```
/plugin install figma@claude-plugins-official
```

**What it does:** Connects Claude Code to Figma design files. Extracts structured design data (layout, typography, colors), retrieves design variables and tokens, maps Figma components to codebases via Code Connect, and captures visual references for validation.

**How to use:** Share a Figma URL and ask Claude to implement the design. Key commands: `/implement-design` (translate frames to code), `/create-design-system-rules` (generate project conventions), `/code-connect-components` (map Figma components to code).

---

### Explanatory Output Style

[Plugin Page](https://claude.com/plugins/explanatory-output-style)

```
/plugin install explanatory-output-style@claude-plugins-official
```

**What it does:** Adds educational context alongside code work — 2-3 key points about implementation choices, pattern conventions, and design trade-offs specific to your codebase. Formatted in distinct star-icon insight boxes.

**How to use:** Activates automatically on new sessions once installed. Set as output style in `.claude/settings.json`. Note: increases token usage due to additional instructional output.

---

### Learning Output Style

[Plugin Page](https://claude.com/plugins/learning-output-style)

```
/plugin install learning-output-style@claude-plugins-official
```

**What it does:** Interactive learning mode that pauses at meaningful decision points to request 5-10 lines of code from you. Distinguishes code worth writing yourself (algorithms, design patterns, data structures) from boilerplate Claude should handle (config, CRUD, obvious implementations). Includes insight blocks about codebase patterns.

**How to use:** Activates automatically on new sessions. Work on tasks normally — Claude pauses at strategic points for your input, providing function signatures and trade-offs to guide your implementation.

---

### Chrome DevTools

[Plugin Page](https://claude.com/plugins/chrome-devtools-mcp)

```
/plugin install chrome-devtools-mcp@claude-plugins-official
```

**What it does:** 29 developer tools via Puppeteer and Chrome DevTools Protocol. Browser automation (click, type, forms, navigation, dialog handling), performance analysis (traces, memory snapshots, Lighthouse audits with CrUX field data), network inspection, console debugging with source-mapped stack traces, screenshots, and mobile device emulation. Made by Google.

**How to use:** Use prompts like "run a Lighthouse audit on this page", "take a mobile screenshot", "check console errors", "list network requests during page load". Slim mode available for lighter, basic browser tasks.

---

## Shopify Plugins — [Shopify/shopify-ai-toolkit](https://shopify.dev/docs/apps/build/ai-toolkit)

### Shopify AI Toolkit

```
/plugin marketplace add Shopify/shopify-ai-toolkit
/plugin install shopify-plugin@shopify-plugin
```

**What it does:** Connects Claude Code to Shopify's documentation, API schemas, code validation, and store management via CLI. Prevents AI from guessing at Shopify implementations by providing verified resources. Auto-updates via the plugin method.

**How to use:** Triggers on Shopify-related tasks. Provides domain-specific skills: Liquid templating, Admin API, Storefront API, Polaris UI, Hydrogen storefronts, Shopify Functions, POS, checkout extensions, and more. Requires Node.js 18+.
