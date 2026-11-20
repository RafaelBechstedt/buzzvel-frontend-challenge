@AGENTS.md

# Project rules

## Context

Buzzvel Front-End technical challenge: build one responsive page (mobile, tablet, desktop) from a Figma design. Deadline: Nov 20. Target: deliver Nov 19 in the evening (Nov 20 is buffer). Evaluated on design fidelity, responsiveness, code quality, interactions, accessibility and performance. The brief is in `private/`.

## Figma (critical)

- Limit: 20 Figma MCP calls per month (`whoami` does not count).
- Never call a Figma tool without asking me first.
- Always read `private/figma-cache/` first.
- Save every Figma response there.
- Download images to `public/` right after the call.

## Workflow

- Read `docs/roadmap.md` at the start. Update it when a task is done.
- When a task starts, record the start time with date. When it is merged, tell me its time so I can adjust for breaks. Record its status and time in the roadmap in the first commit of the next task's branch (e.g. after the Hero is merged, the first commit of `feat/categories` is `docs: record hero time`). No separate PR for it.
- Show a plan before coding. One task at a time; wait for my approval.
- Never edit project files or settings outside this repository. Your own memory is fine, but the repository (roadmap, decisions, CLAUDE.md) is the source of truth.
- Do not install new dependencies without asking.

## Code

- Code and comments in English.
- Components in `src/components` with typed props. Mock data in `src/data`, typed.
- Semantic HTML. Keyboard-accessible controls with visible focus.
- `next/image` for images; `next/font` for fonts.
- `alt`: descriptive for content images; empty (`alt=""`) for decorative images and for images whose meaning the adjacent text already gives (e.g. the avatars next to "Trusted by 24,000+ learners").
- Design tokens in Tailwind `@theme`. Use tokens for repeated values. One-off values from Figma are fine as arbitrary values.
- Mobile-first. Animations respect `prefers-reduced-motion`.
- `"use client"` only where there is interaction.
- Keep Next 16.4 defaults (`cacheComponents`, `partialPrefetching`).
- Use npm.
- Every reusable component gets a Storybook story with its variants and states. Every interaction gets a test (Vitest + Testing Library).

## Git

- Never commit to `main`. One branch per task from an up-to-date `main` (`feat/`, `fix/`, `chore/`, `docs/`).
- Never commit `private/` or `.env` files.
- Conventional Commits in English, simple descriptive messages. Group related changes per commit; nothing huge.
- Before each commit: `npm run lint`, `npm run typecheck`, `npm run build`, `npm run format:check`, `npm run test`.
- Before each PR: also `npm run build-storybook`.
- Show me the commit message and wait for approval. No push or PR unless I ask.
- PR descriptions: short, in English, only what changed.

## Verification

After finishing each section, compare it with the Figma screenshot at the mobile and desktop frame widths, and at 768px, using claude-in-chrome.

Before each PR, check the changes against the Code rules in this file and list anything that does not follow them.

## Decisions

- Log decisions and ambiguous points in `docs/decisions.md`.
- Tablet is not in Figma: propose a layout and log the decision.
