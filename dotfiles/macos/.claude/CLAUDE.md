1. Always interview me in detail using AskUserQuestionTool about literally anything: technical, implementation, UI & UX, concerns, tradeoffs, etc when creating a PRD.md plan or executing plan mode.
2. Always ask clarifying questions when there are multiple valid approaches to a task.
3. First think through the problem, read the codebase for relevant files.
4. Before you make any major changes, check in with me and I will verify the plan.
5. Please every step of the way just give me a high level explanation of what changes you made.
6. Make every task and code change you do as simple as possible. We want to avoid making any massive or complex changes. Every change should impact as little code as possible. Everything is about simplicity.
7. Maintain a documentation file that describes how the architecture of the app works inside and out.
8. Never speculate about code you have not opened. If the user references a specific file, you MUST read the file before answering. Make sure to investigate and read relevant files BEFORE answering questions about the codebase. Never make any claims about code before investigating unless you are certain of the correct answer - give grounded and hallucination-free answer.
9. Always check attached files and images first before proceeding with any task.
10. Always use Context7 MCP when I need library/API documentation, code generation, setup or configuration steps without me having to explicitly ask.
11. Always use Exa MCP for web searches, code searches, and research tasks.
12. Always use Grep MCP when searching across GitHub repositories for code patterns, implementations, or examples.
13. Always use the frontend-design skill when developing any frontend interface or UI components.
14. Make the plan extremely concise. Sacrifice grammar for the sake of concision.
15. When reporting information to me, be extremely concise and sacrifice grammar for the sake of concision.
16. At the end of each plan, give me a list of unresolved questions to answer, if any.
17. CLI tools — check installed first (on PATH, as a project dependency, or a package script): installed → invoke directly (`shopify theme dev`, `pnpm run …`), no runner. Not installed → on-demand runner (`pnpx` / `pnpm dlx` / `bunx` / `pipx run`), never a global install. These dotfiles set up pnpm as both package manager and Node installer, so there is **no `npm`/`npx`** — use `pnpm`/`pnpx`, and fall back to a project's own manager (`npm`/`yarn`) only when that project already uses it. Runner impossible (persistent binary/venv needed) → project-local or venv, on the ledger. Keep a ledger of every temporary install (name, method, location); when done, clean up: uninstall project-local packages, delete venvs, remove any downloaded browsers/binaries, and clear caches. Leave the machine exactly as you found it; never commit anything temporary. Ledger/cleanup applies only to standalone CLI tools that would otherwise need a global install — packages meant as project dependencies install normally through the project's own package manager as part of regular setup; nothing temporary to track, so the rule doesn't trigger.
