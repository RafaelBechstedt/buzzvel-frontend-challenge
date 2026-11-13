@AGENTS.md

# Project rules

## Context

Buzzvel Front-End technical challenge: build one responsive page (mobile, tablet, desktop) from a Figma design. Deadline: Nov 20. Evaluated on design fidelity, responsiveness, code quality, interactions, accessibility and performance. The brief is in `private/`.

## Figma (critical)

- Limit: 20 Figma MCP calls per month (`whoami` does not count).
- Never call a Figma tool without asking me first.
- Always read `private/figma-cache/` first.
- Save every Figma response there.
- Download images to `public/` right after the call.

## Workflow

- Show a plan before coding. One task at a time; wait for my approval.
- Never edit files outside this repository.
- Do not install new dependencies without asking.

## Code

- Code and comments in English.
- Components in `src/components` with typed props. Mock data in `src/data`, typed.
- Semantic HTML. Keyboard-accessible controls with visible focus.
- `next/image` with descriptive `alt`. `next/font` for fonts.
- Design tokens in Tailwind `@theme`. Use tokens for repeated values. One-off values from Figma are fine as arbitrary values.
- Mobile-first. Animations respect `prefers-reduced-motion`.
- `"use client"` only where there is interaction.
- Keep Next 16.4 defaults (`cacheComponents`, `partialPrefetching`).
- Use npm.

## Git

- Never commit to `main`. One branch per task from an up-to-date `main` (`feat/`, `fix/`, `chore/`, `docs/`).
- Never commit `private/` or `.env` files.
- Conventional Commits in English, simple descriptive messages. Group related changes per commit; nothing huge.
- Before each commit: `npm run lint`, `npm run typecheck`, `npm run build`, `npm run format:check`.
- Show me the commit message and wait for approval. No push or PR unless I ask.
- PR descriptions: short, in English, only what changed.

## Verification

After finishing each section, compare it with the Figma screenshot at the mobile and desktop frame widths, and at 768px, using claude-in-chrome.

## Decisions

- Log decisions and ambiguous points in `docs/decisions.md`.
- Tablet is not in Figma: propose a layout and log the decision.
