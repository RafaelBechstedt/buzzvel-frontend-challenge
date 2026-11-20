import type { Avatar } from "@/components/ui/AvatarGroup";

import { type NavLink, sectionHref, sectionIds } from "./navigation";

export type FinalCtaContent = {
  title: string;
  description: string;
  primaryCta: NavLink;
  secondaryCta: NavLink;
  avatars: Avatar[];
};

export const finalCtaContent: FinalCtaContent = {
  title: "What will you learn next?",
  description: "Start with one course. Build from there.",
  primaryCta: {
    label: "Explore all courses",
    href: sectionHref(sectionIds.courses),
  },
  // Sign-up has no page in this challenge (see docs/decisions.md).
  secondaryCta: { label: "Join Luma", href: "/signup" },
  // Decorative: anonymous learners, the heading carries the meaning.
  avatars: [
    { src: "/images/avatars/avatar-1.jpg", alt: "" },
    { src: "/images/avatars/avatar-2.jpg", alt: "" },
    { src: "/images/avatars/avatar-3.jpg", alt: "" },
    { src: "/images/avatars/avatar-4.png", alt: "" },
  ],
};
