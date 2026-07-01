---
trigger: always_on
---

# Agent Rules

1. **Design System**: Adhere strictly to `DESIGN_SYSTEM.md` layout rules, color tokens, and content taxonomy.

2. **Mobile-First**: Target single-screen vertical stack by default; use `md:` modifier exclusively for desktop split-pane layouts.

3. **Production Quality**: Remove all sandboxed indicators (e.g., "banana"), lazy stubs. Use real paths and professional copywriting (Section 7).

4. **Build Optimization**: Skip full `pnpm build` / `tsc --noEmit` for incremental style changes, single-component edits, or when modifying non-code files (such as `.md` documentation, images, configuration files, or pure CSS). Running type-checking or build commands is strictly prohibited for non-TypeScript/JavaScript changes. Use static analysis instead. Full build only for major layout milestones or explicit deployment checks (Section 6).

5. **Commits**: Generate Conventional Commit recommendation at end of reply after code/structural changes.