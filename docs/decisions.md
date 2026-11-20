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

- **How it works step labels:** all three desktop steps read "Step 01". Implemented as Step 01 / 02 / 03, which matches the sequence and the mobile text widths (screen reader treatment in "How it works").
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

## How it works (2026-11-18)

- **Vertical timeline below `lg` (1024px), three columns from `lg`.** At 768 three columns would be 181px wide with the 80px gap, and "Learn from experience" would wrap. At 1024 the columns are about 267px: the titles fit on one line and the descriptions take 3 lines (`text-pretty` avoids a one-word last line).
- **Tablet (768–1023px):** the mobile timeline in a centered 560px column (`max-w-140`), like the Hero and Featured course on tablet. The heading stays centered on the full width.
- **Connecting line:** each step except the last draws its line with an `::after` (no content, so screen readers skip it). Below `lg` it is vertical, 1px × 50px at x 28, and ends at the next icon (Figma mobile). From `lg` it is horizontal, from the step's icon center to the next one's, which gives the Figma line (x 52–813) without a fixed width. The icons are `z-1`, so the line passes behind them.
- **Step labels:** the visible "Step 01" is `aria-hidden` and the `h3` starts with an `sr-only` "Step 1: ". The heading list reads "Step 1: Choose your focus", and the number is not read twice. The `ol` alone is not enough: NVDA does not announce the item position, and Safari drops list semantics with `list-style: none`.
- **Icons:** CSS shapes in an `aria-hidden` box, not images. The step 3 dot (#e9d659) is not in the palette, so it is a one-off value.
- **Mobile copy:** the mobile frame says "professionals who _actually_ use these skills"; the desktop says "who use these skills". The page uses the desktop text (one copy for every viewport, as with the contact form).
- **Mobile step 2 shape:** in the mobile frame the rotated square is orange at about 15% (sampled #fae4db); on desktop it is `orange-light` (#ffcb9f). `orange-light` is used everywhere.
- **Small height differences:** the section is 1px taller at 1280 and 9px shorter at 402 than in Figma. Figma's text frames are 1–2px taller than the line height (heading 69px, label 41px, mobile h3 38px); the code uses the text-style line heights.
- **No story or test:** the section is not reusable and has no interaction (same as Featured course).

## Testimonial (2026-11-19)

- **Stacked below `lg` (1024px), stats column on the right from `lg`.** Tablet (768–1023px) is the mobile layout in a centered 560px column (`max-w-140`), like the other sections on tablet. The stats keep the mobile 3-column row; at 768 each column is 187px.
- **Stats column width:** 401px (Figma, one-off value) from `xl`; at `lg` it takes its content width (~223px). At 1024 the quote keeps its 600px column and 3 lines, as in Figma; with a fixed 401px it would shrink to ~520px and 4 lines.
- **Container:** 1120px like every section, not the Figma 1136px (see "Container widths"). At 1280 the divider sits at x 799 instead of 815; the quote column is unchanged.
- **Section name:** the section has no visible heading in Figma. An `sr-only` h2 ("What our learners say") keeps the heading outline and names the region.
- **Quote:** `figure` with `blockquote` and `figcaption` (photo, name, role). The name is a `p`, not `cite`, which the HTML spec reserves for the title of a work. The quote mark has an empty `alt` (the `blockquote` already says it is a quote), like the Hero star.
- **Photo has an empty `alt`:** the name is right next to it, so "Alex Morgan" would be read twice.
- **Stats are a `ul` named "Luma in numbers"**, not a `dl`: each item reads as one phrase ("120+ expert-led courses"). A `dl` puts the term (the label) before the value, so it would read "active learners, 24K+" and need a reversed visual order. "24K+" is `aria-hidden` and an `sr-only` "24,000+" is read instead (screen readers say "24 K plus"); the Hero says "24,000+ learners".
- **Small height difference:** the stats column is 334px at 1280, 9px taller than in Figma (325px). Each Figma label frame is 25px with a 4px top padding and a 24px line, so the text overflows by 3px; the code uses the full line height. Mobile matches Figma (524px).
- **No story or test:** the section is not reusable and has no interaction.

## Community (2026-11-19)

- **Stacked below `lg` (1024px), text and mosaic side by side from `lg`**, both columns `flex-1` as in Figma. Tablet (768–1023px) is the mobile layout in a centered 560px column (`max-w-140`), like the other sections, with the desktop mosaic (520px) centered. At 1024 each column is ~450px: the title wraps to 3 lines and the mosaic scales down.
- **Mosaic scales with its width:** the photo sizes, gaps, column offsets and circle come from Figma (mobile frame: 362px wide; desktop: 520px), in `src/data/community.ts`. They are converted to `cqw` of the mosaic container (`@container`, max 362px below `md`, 520px from `md`). The mosaic matches Figma at 402 and from 768, and shrinks without horizontal scroll at 320–375 and at 1024. The mobile geometry is not the desktop one scaled (the mobile photos are shorter), so both are kept.
- **The photos are decorative (`alt=""`):** they are a generic collage that illustrates the heading and add no information the heading and paragraph do not give. Ten stock-photo descriptions would only be noise for screen readers. The circle is an empty `div`.
- **Images:** `next/image` with `fill`, lazy (default; the section is far below the fold) and `sizes` with each photo's Figma width (72–138px), so the browser loads the 128w or 256w variant. Radius 4.013px → `rounded-sm` (4px); shadow `shadow-photo` (`Shadow/Dark/M`).
- **Link target:** "Explore teachers and students" → `/community` with `prefetch={false}`, out of scope like the course pages (404 until the custom not-found page). `#community` would point to the section itself. No arrow, as in the design.
- **Container:** 1120px like every section. At 1280 the mosaic starts at x 670, as in Figma.
- **No story or test:** the section is not reusable and has no interaction (the Button has its own).

## Contact (2026-11-19)

- **Stacked below `lg` (1024px), info and form side by side from `lg`.** Tablet (768–1023px) is the mobile layout in a centered 560px column (`max-w-140`), like the other sections. From `lg` both columns are `flex-1` (~450px at 1024: the description takes 4 lines, the fields are 368px wide); from `xl` they are capped at the Figma widths (info 480px, form 540px) and `justify-between` gives the 100px gap at 1280.
- **Submit goes to a simulated route handler**, `POST /api/contact` (`src/app/api/contact/route.ts`). The brief accepts mock data, so the route waits 800ms (so the sending state is real), validates again on the server (the client cannot be trusted) and answers `{ ok: true }`, or 400 with one message per field. It does not store or log anything. Validation lives in `src/lib/contact.ts`, shared by the form and the route; no schema library for three fields.
- **When it validates:** on submit (every field) and on blur, never on each key. On blur, an empty field the user never typed in shows no error, so tabbing through the form does not fill it with errors; a field with an error is checked again on its next blur. Required fields and a simple email pattern (`something@something.tld`, no spaces). The form has `noValidate` (our messages instead of the browser bubbles) but keeps `required` and `type="email"` for their semantics.
- **Errors:** the message is below the field, linked with `aria-describedby`, and the control gets `aria-invalid`. On submit, focus moves to the first invalid field; `flushSync` renders the error first, so screen readers read it with the field. Server field errors are shown the same way.
- **Error color `#d92d20` (`--color-error`), not in Figma:** the design has no error state and no red. It is 4.8:1 on white (AA); the palette orange (#ff704d) is about 2.9:1. The border turns red too, but the text message is what carries the error, not the color.
- **Sending:** the button says "Sending…" and is `disabled`. A ref ignores a second submit before the re-render disables the button (double click, Enter twice). A disabled button loses focus to `<body>`, so focus goes back to the button when the request ends.
- **Success and failure messages:** "Thanks! Your message was sent…" in a `role="status"` region and "Something went wrong. Please try again." in a `role="alert"` region, below the button. Both regions are always in the DOM, so the message is announced when it appears. On success the fields are cleared; editing the form again hides the message. No icon, as nothing in the design shows one.
- **Without JavaScript** the form has `method="post" action="/api/contact"`: the browser posts to the route (which answers 400, as it expects JSON) instead of a GET that would put the name, email and question in the URL.
- **Contact cards:** a `dl`, one `div` per item, so each reads as "Email, contact@luma.com". The icons have an empty `alt` (the label is next to them). The email is a `mailto:` link. Mobile padding 16px and a 2px text gap, desktop 20px and 4px (Figma).
- **Fields:** `TextField` and `TextareaField` (`src/components/ui/Field.tsx`) with a visible label, `useId` for the label/error links, `autoComplete` `name` and `email`, `spellCheck={false}` on the email. Inputs are 48px (Figma); the textarea is 100px on mobile and 120px from `lg`, and can be resized vertically. Focus uses the global ring. Disabled (50% opacity) is in the stories; the form does not disable its fields while sending.
- **No spam protection** (honeypot, rate limit): there is no real backend to protect. To be noted in the README.
- **Small height differences:** at 402 the form is 2px shorter (Mobile/H5 "Contact us", see "Figma inconsistencies"), and at 1280 the section is 2px taller (the 1px form border is outside the Figma content).

## Final CTA (2026-11-19)

Built from the metadata, the screens and the typography map (no `get_design_context` for this section).

- **Link targets** (same rule as the other sections): "Explore all courses" → `#courses`, like "Explore courses" and "Browse all courses". "Join Luma" → `/signup` with `prefetch={false}`: creating an account is out of scope, like "Log in" → `/login` (404 until the custom not-found page).
- **Avatars have empty `alt`:** anonymous learners, as in the Hero; the heading carries the meaning. `AvatarGroup` gets `variant="yellow"`: 40px photos with a yellow border (Hero keeps the default `cream`, 32px). Same 8px overlap.
- **Decoration only from `lg` (1024px).** Mobile has none in Figma. Tablet (768–1023px) is the mobile layout without decoration and with the buttons side by side at their own width: at 768 there are less than 170px on each side of the text, so the shapes would crowd the heading.
- **Decoration:** an `aria-hidden` layer with `pointer-events-none`; the section has `overflow-hidden`, so shapes cut at the edges never cause horizontal scroll. Five icons are the SVG files in `public/images/final-cta/` (`next/image`, empty `alt`); the circles and rounded squares are CSS in `orange-light`. Positions come from the 1280 frame: left items are anchored to the left edge, right items to the right edge (`1280 − x − width`), so wider screens keep them at the edges. No animation: the design is static.
- **Rotated squares:** the metadata only gives their bounding box (136.5 and 66.4px). Measured on the screen: 12° rotation, 115px and 56px sides, centered on the Figma bounding box.
- **Omitted:** the 160px ellipse behind the cube icon (`Ellipse 28`) is not visible in the screen, so it is not drawn.
- **At 1024–1279px the "B" icon is hidden:** with the right items moving in, nothing covers the text, but the B would sit about 10px from the "Explore all courses" button. The cube stays about 30px from the heading.
- **Padding Y:** 60px, 80px from `md`, 100px from `lg` (not `xl` as in the other sections), so the decoration has the Figma section height. The section is 2–3px taller than Figma at 402 and 1280 (Figma text boxes are 1–2px taller than their frames).

## Footer (2026-11-19)

Built from the metadata, the screens and the typography map (no `get_design_context` for this section). Colors were sampled from the desktop screen.

- **One `<nav aria-label="Footer">`** with three groups, each an `h2` (Explore, Company, Support; uppercase in CSS) and a `ul`. Three `nav`s would make four navigation landmarks on the page, and Terms and Privacy are not really navigation. The headings let screen reader users jump between columns.
- **Logo link:** `#top` with `aria-label="Luma home"`, as in the Header; the `Logo` is white (`currentColor`).
- **Link targets** (same rule as the other sections: an anchor when the section exists, otherwise an out-of-scope route with `prefetch={false}`, 404 until the custom not-found page):

  | Link                                          | Target                                                | Why                                                           |
  | --------------------------------------------- | ----------------------------------------------------- | ------------------------------------------------------------- |
  | Courses, Categories                           | `#courses`                                            | as in the Header; Categories is the `#courses` section itself |
  | Instructors                                   | `#community`                                          | "The people" shows the teachers                               |
  | For Teams, Contact                            | `#contact`                                            | as in the Header; the section exists                          |
  | About                                         | `#how-it-works`                                       | as in the Header                                              |
  | Careers, Journal, Help Center, Terms, Privacy | `/careers`, `/journal`, `/help`, `/terms`, `/privacy` | out of scope                                                  |

- **Copyright year is computed:** an async function with `"use cache"` and `cacheLife("days")` returns `new Date().getFullYear()`. Next allows `new Date()` inside `use cache`, and a one-day cache stays in the static shell: the page is still prerendered (revalidated once a day), with no `Suspense` and no client JavaScript, and the year rolls over by itself. Because the Footer is an async Server Component, it has no Storybook story (it is not reusable and has no interaction, so no test either).
- **Colors:** column titles `on-dark-secondary`, tagline and links `on-dark-tertiary`, logo `white`. The copyright is `on-dark-secondary` (#e7e7ec in the screen; the typography map says white). The 1px line is `ink-secondary` (#656770, same pixel as the screen). Link hover (not in the design) goes to `white`. Focus uses the white ring (`--focus-ring`), as in Featured course.
- **Contrast on navy (#171b2c):** `on-dark-tertiary` 6.5:1, `on-dark-secondary` 13.7:1, white 17:1. All pass WCAG AA.
- **Layout:** mobile has the brand on top, then Explore and Company side by side (161px each at 402) with Support below, and a centered copyright. **Tablet (768–1023px):** brand on top with the tagline on one line, the three columns side by side (208px each at 768), and the copyright on the left as on desktop; padding as on desktop. **From `lg`:** brand on the left (tagline 240px, two lines) and three 208px columns on the right. At 1024 the brand has 272px for its 240px tagline.
- **Spacing:** padding 60/20px (mobile), 80/40px from `md`. The gap from the last link to the line is measured on the screens (36px mobile, 66px desktop): the Figma column frames are shorter than their content. The footer is 621.5px at 402 (Figma 622) and 394.5px at 1280 (Figma 395).
- **At 1280 the columns start 16px left of Figma**, because of the 1120px container (see "Figma inconsistencies").

## Metadata (2026-11-19)

- **One source for site texts:** `src/data/site.ts` (name, organization, Vercel URL, title, description) feeds the layout metadata, the Open Graph image, the JSON-LD, `robots.ts` and `sitemap.ts`. Title "Luma — Build skills that actually move you forward" (template `%s | Luma`); the description is the Hero paragraph (136 characters).
- **Metadata API in the root layout:** `metadataBase` (Vercel URL), title, description, `openGraph` (`website`, `en_US`) and `twitter.card: summary_large_image`. Next copies the Open Graph title, description and image to the Twitter tags, so they are not repeated. The canonical (`/`) is in `page.tsx`, not in the layout, so the 404 page has no canonical to home.
- **Open Graph image generated with `opengraph-image.tsx`** (`ImageResponse` from `next/og`, no dependency), 1200×630, static at build: logo, Hero eyebrow and headline on cream, and the Hero photo on the right. The Hero photo alone is 900×1100 portrait: cropped to 1.91:1 it loses the subject and carries no brand. The files are read at module level (as in the Next docs); read inside the function, the route was dynamic.
- **OG font:** Plus Jakarta Sans 800, a 15 KB static `.woff` (Latin subset, OFL) from `@fontsource/plus-jakarta-sans@5.3.0` on jsDelivr, in `src/assets/`. Satori reads neither woff2 nor variable fonts, and `next/font` gives no font file. The eyebrow uses the `next/og` default font.
- **`Logo` gets an optional `height`** (default 17, width keeps 54:17): Satori rasterizes CSS transforms, so a scaled 17px logo was blurry in the OG image.
- **Favicon: an "l." monogram** made from the logo's own `l` and `.` paths, white on `ink`, rounded square. The "luma." wordmark is 54×17 and unreadable at 16–32px. Files as recommended by the Next docs: `app/icon.svg` (modern browsers), `app/favicon.ico` (16, 32, 48) and `app/apple-icon.png` (180, square: iOS rounds it). No web manifest (not a PWA). The PNG and ICO were made once from the SVG with ImageMagick (not a project dependency):

  ```sh
  convert -background none -density 1200 src/app/icon.svg -resize 32x32 PNG32:fav-32.png  # also 16 and 48
  convert fav-16.png fav-32.png fav-48.png src/app/favicon.ico
  # apple-icon: the same SVG with rx="0"
  convert -density 1200 apple.svg -resize 180x180 -background '#171b2c' -flatten -strip PNG24:src/app/apple-icon.png
  ```

- **JSON-LD (`src/lib/structured-data.ts`)**, rendered in `page.tsx` as a native `<script type="application/ld+json">` with `<` escaped (Next JSON-LD guide): one `@graph` with `Organization` ("Luma Learning", URL, logo) and `WebSite` (name, URL, description, language, publisher). Valid on validator.schema.org (0 errors, 0 warnings). **Left out on purpose:** `AggregateRating` (the 4.9 rating is mock data, and self-serving ratings break Google's rules), `Course` (the courses do not exist), contact details and `sameAs` (no real profiles). For GEO, that is all: clear text, semantic HTML and true structured data. No `llms.txt` for one page.
- **`robots.ts` and `sitemap.ts`:** allow everything and point to the sitemap, which has the home page only, without `lastModified` (a build date is not an edit date).
- **Custom 404 (`app/not-found.tsx`):** the root not-found page also answers unmatched URLs, so every out-of-scope route (`/login`, `/signup`, `/courses/<slug>`, `/community`, `/careers`, `/journal`, `/help`, `/terms`, `/privacy`) shows it with status 404. Header, cream `main`, "Error 404" overline, an `h1` saying the page is not part of this challenge, the out-of-scope pages as a list, "Back to home" (primary button, `/`) and the Footer. Title "Page not found | Luma". Next adds `<meta name="robots" content="noindex">` to 404 responses by itself, so it is not set again. Texts in `src/data/not-found.ts`. No story or test: the page is static and its parts already have them.
- **Section links are now `/#id`** (`sectionHref()` in `src/data/navigation.ts`), and the logo links `/#top`. A bare `#courses` on `/login` pointed to nothing. On the home page `/#id` only changes the fragment, so it still just scrolls (checked: no reload). The logo links stay plain `<a>` with an ESLint disable: the rule reads `/#top` as a page navigation, but it is a fragment link that scrolls to the top (HTML spec).
