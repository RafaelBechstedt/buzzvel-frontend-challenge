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

export const navLinks: NavLink[] = [
  { label: "Courses", href: `#${sectionIds.courses}` },
  { label: "For Teams", href: `#${sectionIds.contact}` },
  { label: "Community", href: `#${sectionIds.community}` },
  { label: "About", href: `#${sectionIds.howItWorks}` },
];

/** "Log in" has no page in this challenge (see docs/decisions.md). */
export const loginLink: NavLink = { label: "Log in", href: "/login" };

export const startLink: NavLink = {
  label: "Start learning",
  href: `#${sectionIds.courses}`,
};
