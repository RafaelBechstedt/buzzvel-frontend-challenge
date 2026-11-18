import type { Avatar } from "@/components/ui/AvatarGroup";

import { type NavLink, sectionIds } from "./navigation";

type Stat = {
  value: string;
  label: string;
};

export type HeroContent = {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: NavLink;
  secondaryCta: NavLink;
  /** "Trusted by 24,000+" in bold, then " learners". */
  socialProof: { highlight: string; rest: string };
  avatars: Avatar[];
  image: { src: string; alt: string };
  badges: { courses: Stat; rating: Stat };
};

export const heroContent: HeroContent = {
  eyebrow: "Learn at your own pace",
  title: "Build skills that actually move you forward.",
  description:
    "Practical courses taught by people who do the work every day. Learn design, technology, business and more — one focused lesson at a time.",
  primaryCta: { label: "Explore courses", href: `#${sectionIds.courses}` },
  secondaryCta: {
    label: "See how it works",
    href: `#${sectionIds.howItWorks}`,
  },
  socialProof: { highlight: "Trusted by 24,000+", rest: "learners" },
  // Decorative: the social proof text next to them carries the meaning.
  avatars: [
    { src: "/images/avatars/avatar-1.jpg", alt: "" },
    { src: "/images/avatars/avatar-2.jpg", alt: "" },
    { src: "/images/avatars/avatar-3.jpg", alt: "" },
  ],
  image: {
    src: "/images/hero/hero-learner.jpg",
    alt: "Person smiling while studying at a laptop",
  },
  badges: {
    courses: { value: "120+", label: "expert-led courses" },
    rating: { value: "4.9", label: "avg rating" },
  },
};
