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

## Pending

- **Favicon (metadata task):** replace the create-next-app `favicon.ico` with the luma logo.
