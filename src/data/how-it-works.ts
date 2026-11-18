/** Each step has its own decorative CSS shape. */
export type StepIconKind = "focus" | "experience" | "practice";

export type Step = {
  title: string;
  description: string;
  icon: StepIconKind;
};

export type HowItWorksContent = {
  eyebrow: string;
  title: string;
  steps: Step[];
};

export const howItWorksContent: HowItWorksContent = {
  eyebrow: "How Luma works",
  title: "Less browsing. More learning.",
  steps: [
    {
      title: "Choose your focus",
      description:
        "Find courses based on the skill you want to build, not endless content categories.",
      icon: "focus",
    },
    {
      // Desktop copy; the mobile frame adds "actually" (docs/decisions.md).
      title: "Learn from experience",
      description:
        "Follow concise lessons created by professionals who use these skills.",
      icon: "experience",
    },
    {
      title: "Put it into practice",
      description:
        "Every course includes practical exercises designed to turn knowledge into action.",
      icon: "practice",
    },
  ],
};
