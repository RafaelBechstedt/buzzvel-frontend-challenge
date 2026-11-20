import { type NavLink, sectionHref, sectionIds } from "./navigation";

export type FooterColumn = {
  title: string;
  links: NavLink[];
};

export type FooterContent = {
  tagline: string;
  columns: FooterColumn[];
  copyrightHolder: string;
};

// Section links ("/#id") work from any route; the other routes are out of scope
// (custom not-found page, see docs/decisions.md).
export const footerContent: FooterContent = {
  tagline: "Practical learning for curious people.",
  columns: [
    {
      title: "Explore",
      links: [
        { label: "Courses", href: sectionHref(sectionIds.courses) },
        { label: "Categories", href: sectionHref(sectionIds.courses) },
        { label: "Instructors", href: sectionHref(sectionIds.community) },
        { label: "For Teams", href: sectionHref(sectionIds.contact) },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: sectionHref(sectionIds.howItWorks) },
        { label: "Careers", href: "/careers" },
        { label: "Journal", href: "/journal" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Help Center", href: "/help" },
        { label: "Contact", href: sectionHref(sectionIds.contact) },
        { label: "Terms", href: "/terms" },
        { label: "Privacy", href: "/privacy" },
      ],
    },
  ],
  copyrightHolder: "Luma Learning",
};
