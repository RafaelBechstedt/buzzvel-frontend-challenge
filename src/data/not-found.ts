import type { NavLink } from "./navigation";

export type NotFoundContent = {
  eyebrow: string;
  title: string;
  description: string;
  /** Pages the design links to but this challenge does not build. */
  outOfScope: string[];
  homeLink: NavLink;
};

export const notFoundContent: NotFoundContent = {
  eyebrow: "Error 404",
  title: "This page is not part of this challenge",
  description:
    "This challenge covers only the Luma landing page. These pages are linked from it but were not built:",
  outOfScope: [
    "Log in",
    "Sign up",
    "Courses",
    "Community",
    "Careers",
    "Journal",
    "Help Center",
    "Terms",
    "Privacy",
  ],
  homeLink: { label: "Back to home", href: "/" },
};
