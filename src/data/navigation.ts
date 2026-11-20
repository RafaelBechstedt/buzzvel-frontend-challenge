export type NavLink = {
  label: string;
  href: string;
};

/** Section ids used by the header anchors. Each section uses its id here. */
export const sectionIds = {
  courses: "courses",
  howItWorks: "how-it-works",
  community: "community",
  contact: "contact",
} as const;

/**
 * Link to a home page section. `/#id` also works from other routes (the 404
 * page); on the home page it only changes the fragment, so it just scrolls.
 */
export function sectionHref(id: (typeof sectionIds)[keyof typeof sectionIds]) {
  return `/#${id}`;
}

export const navLinks: NavLink[] = [
  { label: "Courses", href: sectionHref(sectionIds.courses) },
  { label: "For Teams", href: sectionHref(sectionIds.contact) },
  { label: "Community", href: sectionHref(sectionIds.community) },
  { label: "About", href: sectionHref(sectionIds.howItWorks) },
];

/** "Log in" has no page in this challenge (see docs/decisions.md). */
export const loginLink: NavLink = { label: "Log in", href: "/login" };

export const startLink: NavLink = {
  label: "Start learning",
  href: sectionHref(sectionIds.courses),
};
