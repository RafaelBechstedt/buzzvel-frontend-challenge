# Decisions

## Figma file duplicated to drafts (2026-11-13)

The original Buzzvel file (`G0zSf6gyynwzEusOCgm2CM`) is shared as view-only, and the Figma MCP server requires edit access to read a file. The file was duplicated to my own drafts (`AsVGgDn3TbpwcML4CK9DE3`) so the MCP can read it. Frame IDs are unchanged: `2:7` (FE - Desktop) and `2:4195` (FE - Mobile). The copy is used only as a read-only reference; the original remains the source of truth.

## Mobile menu panel (2026-11-13)

The mobile header only shows a closed "Toggle menu" button; the open state is not designed in any frame. Proposed behavior:

- **Pattern:** disclosure, not a modal. The button has `aria-expanded` and `aria-controls` and toggles a panel that drops down right below the header, full width, on the page background with the `line-1` border.
- **Content:** the same items as the desktop header — Courses, For Teams, Community, About as a stacked list, then "Log in" (secondary) and "Start learning" (primary) as full-width buttons, reusing the button styles from the Hero.
- **Closing:** the button again, `Escape` (focus returns to the button), clicking a link, or resizing past the desktop breakpoint.
- **Icon:** the hamburger swaps to a close (X) icon while open. The Figma file has no close icon, so it is drawn to match the menu icon's size and stroke.
- **Motion:** short fade/slide on open; no animation under `prefers-reduced-motion`.
- No focus trap and no scroll lock, since the panel does not cover the page as a dialog.

## Figma inconsistencies (2026-11-13)

- **How it works step labels:** all three desktop steps read "Step 01". Implemented as Step 01 / 02 / 03, which matches the sequence and the mobile text widths.
- **"The people" paragraph:** the design uses lorem ipsum. Kept as in the design.
- **Container widths:** FeaturedCourse, Testimonial and Footer use a 1136px inner container; every other section uses 1120px. All sections use the same 1120px container.
- **Category cards:** only the first card pins "Explore" to the bottom (`justify-between`). All four cards pin it to the bottom, as the screenshot shows.
- **"Contact us" on mobile:** the mobile form title uses the `Desktop/H5` style (20/32). Implemented with `Mobile/H5` (20/28), like the other mobile card titles.
- **Mobile styles that break the "same style name" pattern** (confirmed in Figma): the contact description uses `Mobile/body 1` (14/24) while desktop uses subtitle 1; the testimonial name uses `Mobile/subtitle 1` bold (16/26) while desktop uses subtitle 2 bold. Implemented as in the design.
- **Footer copyright:** has no text style in Figma (Inter Regular 13px / 19.5px, same on desktop and mobile). Implemented as a one-off value, not a token.
- **Mobile contact form language:** the mobile form is in Portuguese ("Nome completo", "Seu nome", "Sua dúvida", …) while the desktop form and the rest of the page are in English. The whole page is in English, and the mobile form uses the desktop form texts.
- **Heading levels vs. Figma style names:** section titles use the "Desktop/H3" style (48/56) but are semantic `h2`; card and step titles use "Desktop/H5" but are `h3`. Tokens are named by size/role, not by the Figma style name.

## Design tokens (2026-11-16)

Figma variable names have typos (`backgrounnd-*`) and read awkwardly as Tailwind classes (`text-text-primary`), so the code uses short role names. Correspondence:

| Token (`--color-*`) | Value   | Figma variable                        |
| ------------------- | ------- | ------------------------------------- |
| `ink`               | #171b2c | text-primary                          |
| `ink-secondary`     | #656770 | text-secondary                        |
| `ink-tertiary`      | #6d7384 | text-tertiary                         |
| `navy`              | #171b2c | background-darkblue                   |
| `white`             | #ffffff | backgrounnd-white, text-white-primary |
| `on-dark-secondary` | #e7e7ec | text-white-secondary                  |
| `on-dark-tertiary`  | #9e9faa | text-white-tertiary                   |
| `primary`           | #3157f6 | primary-blue                          |
| `primary-light`     | #e2e8ff | primary-blue-light                    |
| `orange`            | #ff704d | primary-orange                        |
| `orange-light`      | #ffcb9f | background-orange                     |
| `yellow`            | #ffee7e | secondary-yellow                      |
| `yellow-light`      | #fff1c2 | backgrounnd-yellow                    |
| `cream`             | #f9f8f3 | backgrounnd-light-yellow              |
| `line`              | #dbdfeb | line-1                                |

- **Palette is closed:** Tailwind's default colors are removed (`--color-*: initial`), so only these tokens can be used.
- **Text styles:** each Figma text style is a `--text-*` token (size, line-height, letter-spacing, weight). The base token is the `Mobile/*` value and the `-desktop` token is the `Desktop/*` value, switched at `lg` (1024px): e.g. `text-h3 lg:text-h3-desktop`. Tablet (768–1023px) uses the mobile type scale. `body` and `overline` are the same on both. `Mobile/H4` / `Desktop/H4` are not used by any text, so there is no `h4` token.
- **Light theme only:** the design has no dark mode, so the starter's `prefers-color-scheme: dark` styles were removed.

## Storybook and Vitest (2026-11-16)

- **Storybook framework:** `@storybook/nextjs-vite`, the one the Storybook docs recommend for Next.js 14.1+. The project has no Webpack or Babel config to keep, and it mocks `next/image`, `next/link`, `next/navigation` and `next/font`. App Router mode is on (`nextjs.appDirectory`).
- **Tailwind in Storybook:** Next compiles Tailwind through the Turbopack loader and there is no PostCSS config, so Storybook adds `@tailwindcss/vite` in `viteFinal` and imports `globals.css`. `@tailwindcss/vite` is pinned to the same version as `tailwindcss`.
- **Fonts in Storybook:** the `next/font` setup lives in `src/app/fonts.ts`, shared by the root layout and the preview. The preview adds the font variable classes to `<html>`, like the layout, because `--font-sans` and `--font-display` resolve on `:root`. In Storybook the font files load from Google Fonts with `display: block`, while the app self-hosts them; this does not affect the app.
- **Viewports:** mobile 402px and desktop 1280px (Figma frames), tablet 768px.
- **Tests:** Vitest + Testing Library + `user-event` in jsdom, as in the Next.js guide. Tests and stories live next to their component. `vite-tsconfig-paths` is not used: Vite 8 resolves the `@/*` alias natively (`resolve.tsconfigPaths`).
- **Not added:** `@storybook/addon-vitest` (runs stories in a real browser through Playwright; heavier than needed now), `@storybook/addon-docs` and Chromatic. Storybook telemetry is disabled.
- **Checks:** `npm run test` runs before each commit (seconds). `npm run build-storybook` runs before each PR (slower, fetches Google Fonts; broken stories already show in `storybook dev`).
- **Node version:** jsdom 31 requires Node 24.15+, so `package.json` has `engines.node >=24.15` and `.nvmrc` pins Node 24. `@types/node` moved from `^20` to `^24` to match (Vitest 5 rejects `@types/node` 20 as a peer). To be noted in the README.
- **Example component:** `src/components/example/ExampleToggle` (component, story and test) only proved the setup. It was removed in the Header task, after the menu tests landed (Vitest fails with no test files).

## Button (2026-11-16)

`src/components/ui/Button.tsx`, shared by the Header, the mobile menu and the Hero. Only what the design uses:

- **Variants:** `primary` (blue, "Start learning", "Explore courses"), `secondary` (white with a `line` stroke, "See how it works", "Log in" in the mobile menu) and `ghost` (no background, regular weight, `ink-secondary`, "Log in" in the desktop header) and `accent` (yellow, `ink`, "View course" in Featured course; added 2026-11-18). `primary`, `secondary` and `accent` are Inter Bold 14/24.
- **Sizes:** `md` is 44px high (header, px 20; `ghost` px 16) and `lg` is 52px high (hero and mobile menu, px 28). Radius 8px.
- **Secondary stroke:** the Figma stroke is _Inside_, so it is an inset ring (`inset-ring`), not a border. The button is 52px like `primary`, with the same padding. The exported metadata reports 54px; the stroke setting was checked in Figma (2026-11-16).
- **Element:** with `href` it renders `next/link`, otherwise `<button type="button">`. The props are a typed union, so a link cannot get `disabled` and a button cannot get `href`.
- **Hover states are not in the design:** `primary` goes to 90% opacity, `secondary` to the `cream` background and `ghost` to `ink`. Color transitions only run with `prefers-reduced-motion: no-preference`.
- **Disabled** (`<button>` only, for the contact form): 50% opacity, no pointer events.
- **Focus:** one global `:focus-visible` rule (2px `primary` outline, 2px offset) for every control, instead of per-component classes. The color is `var(--focus-ring, var(--color-primary))`: a section on a blue background sets `--focus-ring` to white (Featured course), since a blue ring would not show there.

## Header (2026-11-16)

- **Desktop navigation from `lg` (1024px).** At 768px the centered navigation (x 184–520 in 704px of content) would overlap the actions (215px, from x 489). The type scale also switches at `lg`. Below `lg` the header shows the logo and the menu button.
- **Tablet (768–1023px):** same header as mobile, with 32px side margins (`md:px-8`); mobile keeps the Figma 20px. From `lg` the content is at most 1120px (`max-w-page`), so the logo sits at x 80 at 1280px.
- **Sticky, not fixed:** the header stays in the flow, so the content needs no top offset. `scroll-padding-top` keeps anchored sections below it. The header height is a token, `--spacing-header` (69px) and `--spacing-header-desktop` (70px from `lg`), shared by the header, the menu panel's max height and the scroll padding. Smooth scrolling only with `prefers-reduced-motion: no-preference`; `data-scroll-behavior="smooth"` on `<html>` keeps route changes instant (Next 16 no longer does it by default).
- **Link targets** (`src/data/navigation.ts`; each section uses the id from `sectionIds`):

  | Link           | Target                      | Why                                    |
  | -------------- | --------------------------- | -------------------------------------- |
  | Courses        | `#courses` (Categories)     | the course catalog                     |
  | For Teams      | `#contact`                  | there is no teams section; B2B contact |
  | Community      | `#community` ("The people") | "Explore teachers and students"        |
  | About          | `#how-it-works`             | "How Luma works"                       |
  | Start learning | `#courses`                  | same as "Explore courses" in the Hero  |
  | Log in         | `/login`                    | see below                              |

- **"Log in" is out of scope:** the challenge is a single landing page, so `/login` has no page and shows the Next 404. The link has `prefetch={false}` so production does not request it. A custom not-found page is planned in the Metadata task.
- **Logo link:** `href="#top"` (the HTML spec scrolls to the top of the document), `aria-label="Luma home"` on the link and `aria-hidden="true"` on the SVG. The logo, menu and close icons are inline SVG components with `currentColor`; the footer reuses the logo in white. The close (X) icon is drawn on the menu icon's grid (24px box, 1.5 stroke, round caps).
- **Skip link:** "Skip to content" is the first focusable element, visible only on focus, and targets `<main id="main">`. Not in the design.
- **Mobile menu, implementation details** (behavior in "Mobile menu panel" above):
  - The toggle has a fixed name, "Menu"; the state is in `aria-expanded` (the Figma layer is "Button - Toggle menu").
  - The panel is always in the DOM with `hidden` while closed, so `aria-controls` always points to an element.
  - The entry fade/slide uses `@starting-style` (Tailwind `starting:`) inside `motion-safe:`; there is no exit animation.
  - The panel has its own top border: it starts at the header's padding box and would otherwise cover the header's bottom line.
  - The panel is at most `100dvh` minus the header height (`--spacing-header`) and scrolls, for short landscape screens.
  - **On tablet (`md`) the two buttons sit side by side**, each half the width; below `md` they are stacked and full width.
  - `MobileMenu` is the only client component in the header.

## Hero (2026-11-18)

- **Two columns only from `xl` (1280px), one centered column below.** The rating badge sticks out 56px past the photo and the orange bar 39px. With the 32px gutter from `md`, at 1024–1279px the badge would be clipped, and the text column would be about 350px wide (the 64px H1 breaking almost word by word).
- **Order:** below 768 we follow Figma (image first); from 768 to 1279 the text comes first, so the h1 and CTAs are above the fold on small laptops.
- **Tablet (768–1279px):** text, then the photo, in one centered column of 560px (the Figma desktop text column). The photo keeps the desktop geometry (500×520, radius 24, desktop offsets for the shapes and badges); the CTAs sit side by side at their own width and the social proof is left-aligned. From `lg` the text uses the desktop type scale (same switch as the rest of the page).
- **Mobile shapes and badges** are placed from the right and bottom of the photo box, so they follow screens narrower than 402px. `overflow-x-clip` on the section stops horizontal scroll.
- **Reading order:** the text comes first in the DOM and the photo block is moved above it with CSS `order` below `md` only. The photo block has no focusable elements, so focus order is not affected, and screen readers reach the h1 before the badges.
- **LCP image:** `preload` on the photo (Next 16 deprecated `priority` for `preload`; the docs recommend it when one image is the LCP above the fold on every viewport). It adds a `<link rel="preload">` with the same `sizes` in `<head>`: `(min-width: 48rem) 500px, calc(100vw - 56px)`.
- **Badges are read by screen readers:** "120+ expert-led courses" and "4.9 avg rating" are not elsewhere on the page. The stars are decorative (`aria-hidden`); the orange bar and blue circle are empty `aria-hidden` elements.
- **Avatars have empty `alt`:** the photos are anonymous learners and "Trusted by 24,000+ learners" next to them already says what they mean. `AvatarGroup` (`src/components/ui`) draws the cream border in CSS; FinalCTA adds its yellow, larger variant.
- **CTAs:** "Explore courses" → `#courses`, "See how it works" → `#how-it-works`.

## Categories (2026-11-18)

- **Grid:** one column below `md`, **two columns on tablet (768–1023px)**. At 768 two cards are about 344px wide, close to the mobile card (362px). 4 columns from lg; at 1024 cards are 225px wide and grow to ~290px tall, which is tighter but keeps the section short. "Product Design" still fits on one line. Padding Y follows the Hero (60 / 80 from `md` / 100 from `xl`); card padding and gaps switch to the desktop values at `lg`, with the type scale.
- **Whole-card links:** each card is one link (the Figma layer is "Link") with the `h3` inside. `aria-labelledby` points to the title and `aria-describedby` to the description; the number badge and "Explore →" are `aria-hidden`. A screen reader says "Product Design, link" and then the description, instead of "01 Product Design … Explore". The `ul` gives the position, so the number is not needed.
- **Link targets:** `/courses/<slug>` (`product-design`, `technology`, `business`, `creative`), with `prefetch={false}`. Like "Log in", these pages are out of scope and show the 404 until the custom not-found page (Metadata task) explains it. An anchor does not fit: `#courses` is this section, and Featured course shows a single course.
- **Hover and focus are not in the design:** on hover the border goes from `line` to `primary` and the arrow moves 4px right. Transitions only run with `prefers-reduced-motion: no-preference`. Focus uses the global `:focus-visible` ring, which follows the card radius.
- **`ArrowIcon`** (`src/components/icons`) is a `currentColor` component drawn from the Figma `Arrow` (20px, stroke 1.5). Featured course reuses it in white.
- **Card numbers** (01–04) come from the list order, not from the data.

## Featured course (2026-11-18)

- **Container:** 1120px (`max-w-page`) like every section, not the Figma 1136px (see "Container widths"). At 1280 the text column starts at x 670 instead of 678.
- **Side by side from `lg` (1024px), stacked below.** At 1024 each column is 450px; "Designing products" (48px) still fits on one line, and the badge sticks out only 12px into the 32px gutter. Image first on every viewport, as in Figma, so DOM order is visual order.
- **Tablet (768–1023px):** one centered 560px column (`max-w-140`, like the Hero tablet). The photo is 560×408, close to the 700×500 source ratio, so little is cropped. The buttons sit side by side at their own width; below `md` they are stacked and full width.
- **Image:** not the LCP, so no `preload`. `sizes` follows the column width: `(min-width: 74rem) 530px, (min-width: 64rem) calc(50vw - 62px), (min-width: 48rem) 560px, calc(100vw - 40px)` (74rem is where the 1120px cap starts with the 32px gutters).
- **Accessible name:** the section is labelled by the badge and the h2 ("Featured Course Designing products people understand."), so the region says what it is. The badge is real text (uppercase only in CSS).
- **Chips are read:** they are course info, in a `ul` named "Course details". The "·" in the instructor line is `aria-hidden`, with an `sr-only` comma.
- **Link targets** (same rule as Categories): "View course" → `/courses/designing-products-people-understand` with `prefetch={false}` (out of scope, 404 until the custom not-found page) and `aria-describedby` on the h2, so it keeps its visible name and gets context. "Browse all courses" → `#courses`, the catalog on this page, like the Hero's "Explore courses".
- **"Browse all courses" is white, not `on-dark-secondary`:** #e7e7ec on the blue #3157f6 is 4.45:1, below the WCAG AA 4.5:1 for 14px bold text; white is 5.5:1. Hover (not in the design) moves the arrow 4px, as in the category cards.
- **"Browse all courses" height:** 52px everywhere, like the desktop link; the mobile Figma link is 50px.
- **No new component:** the chips and the badge are only used here. The yellow button is a `Button` variant (`accent`).

## Pending

- **Favicon (metadata task):** replace the create-next-app `favicon.ico` with the luma logo.
