import { type NavLink, sectionIds } from "./navigation";

export type FeaturedCourseContent = {
  /** Yellow label on the photo; also part of the section's accessible name. */
  badge: string;
  eyebrow: string;
  title: string;
  description: string;
  instructor: { name: string; role: string };
  /** Chips: lessons, duration, level. */
  details: string[];
  image: { src: string; alt: string };
  primaryCta: NavLink;
  secondaryCta: NavLink;
};

export const featuredCourseContent: FeaturedCourseContent = {
  badge: "Featured Course",
  eyebrow: "Most popular this month",
  title: "Designing products people understand.",
  description:
    "Learn how to turn complex workflows into simple, intentional product experiences through research, structure and thoughtful interaction design.",
  instructor: { name: "Maya Chen", role: "Senior Product Designer" },
  details: ["8 lessons", "2h 40min", "Intermediate"],
  image: {
    src: "/images/featured-course/featured-course.jpg",
    alt: "Student working on interface designs at a desk with material samples and paper prototypes",
  },
  // There are no course pages in this challenge (see docs/decisions.md).
  primaryCta: {
    label: "View course",
    href: "/courses/designing-products-people-understand",
  },
  secondaryCta: {
    label: "Browse all courses",
    href: `#${sectionIds.courses}`,
  },
};
