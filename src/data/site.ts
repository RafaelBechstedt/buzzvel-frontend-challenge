export type SiteConfig = {
  /** Brand name, as in the logo. */
  name: string;
  /** Company name, as in the footer copyright. */
  organization: string;
  /** Production URL (Vercel). Base for absolute metadata URLs. */
  url: string;
  title: string;
  description: string;
};

// Texts come from the Hero (src/data/hero.ts).
export const siteConfig: SiteConfig = {
  name: "Luma",
  organization: "Luma Learning",
  url: "https://buzzvel-frontend-challenge.vercel.app",
  title: "Luma — Build skills that actually move you forward",
  description:
    "Practical courses taught by people who do the work every day. Learn design, technology, business and more, one focused lesson at a time.",
};
