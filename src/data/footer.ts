import { type NavLink, sectionIds } from "./navigation";

export type FooterColumn = {
  title: string;
  links: NavLink[];
};

export type FooterContent = {
  tagline: string;
  columns: FooterColumn[];
  copyrightHolder: string;
};

// Anchors point to sections on this page; the other routes are out of scope
// (404 until the custom not-found page, see docs/decisions.md).
export const footerContent: FooterContent = {
  tagline: "Practical learning for curious people.",
  columns: [
    {
      title: "Explore",
      links: [
        { label: "Courses", href: `#${sectionIds.courses}` },
        { label: "Categories", href: `#${sectionIds.courses}` },
        { label: "Instructors", href: `#${sectionIds.community}` },
        { label: "For Teams", href: `#${sectionIds.contact}` },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: `#${sectionIds.howItWorks}` },
        { label: "Careers", href: "/careers" },
        { label: "Journal", href: "/journal" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Help Center", href: "/help" },
        { label: "Contact", href: `#${sectionIds.contact}` },
        { label: "Terms", href: "/terms" },
        { label: "Privacy", href: "/privacy" },
      ],
    },
  ],
  copyrightHolder: "Luma Learning",
};
