import type { ContactField } from "@/lib/contact";

export type ContactCard = {
  title: string;
  value: string;
  /** Makes the value a link (e.g. `mailto:`). */
  href?: string;
  icon: { src: string; width: number; height: number };
};

export type ContactFieldContent = {
  label: string;
  placeholder: string;
};

export type ContactContent = {
  eyebrow: string;
  title: string;
  description: string;
  cards: ContactCard[];
  form: {
    title: string;
    description: string;
    fields: Record<ContactField, ContactFieldContent>;
    submitLabel: string;
    sendingLabel: string;
    successMessage: string;
    failureMessage: string;
  };
};

const email = "contact@luma.com";

// The mobile Figma form is in Portuguese; the page uses the desktop texts (docs/decisions.md).
export const contactContent: ContactContent = {
  eyebrow: "Contact",
  title: "Get in touch",
  description:
    "Have a question? We’re here to help. Whether you’re looking for the right course, learning with your team or interested in teaching with Luma, we’d love to hear from you.",
  cards: [
    {
      title: "Email",
      value: email,
      href: `mailto:${email}`,
      icon: { src: "/icons/chat.svg", width: 24, height: 24 },
    },
    {
      title: "Response Time",
      value: "Up to 24 hours on business days",
      icon: { src: "/icons/clock.svg", width: 20, height: 20 },
    },
  ],
  form: {
    title: "Contact us",
    description: "Fill out the fields and we will get in touch.",
    fields: {
      name: { label: "Full name", placeholder: "Your name" },
      email: { label: "Email", placeholder: "youremail@example.com" },
      message: {
        label: "Your question",
        placeholder: "Tell us how we can help...",
      },
    },
    submitLabel: "Send message",
    sendingLabel: "Sending…",
    successMessage:
      "Thanks! Your message was sent. We’ll reply within 24 hours on business days.",
    failureMessage: "Something went wrong. Please try again.",
  },
};
