export type Stat = {
  /** Visible value, e.g. "24K+". */
  value: string;
  label: string;
  /** Read by screen readers instead of `value` when the short form is unclear. */
  srValue?: string;
};

export type TestimonialContent = {
  title: string;
  quote: string;
  author: {
    name: string;
    role: string;
    imageSrc: string;
  };
  statsLabel: string;
  stats: Stat[];
};

export const testimonialContent: TestimonialContent = {
  // Not visible; names the section for screen readers (docs/decisions.md).
  title: "What our learners say",
  quote:
    "The lessons are short enough to fit into my week, but detailed enough that I actually leave with something I can use.",
  author: {
    name: "Alex Morgan",
    role: "Product Manager",
    imageSrc: "/images/testimonial/alex-morgan.jpg",
  },
  statsLabel: "Luma in numbers",
  stats: [
    { value: "24K+", srValue: "24,000+", label: "active learners" },
    { value: "120+", label: "expert-led courses" },
    { value: "92%", label: "complete their first course" },
  ],
};
