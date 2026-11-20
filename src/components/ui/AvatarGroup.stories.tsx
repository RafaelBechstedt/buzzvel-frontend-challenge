import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { AvatarGroup } from "./AvatarGroup";

const meta = {
  title: "UI/AvatarGroup",
  component: AvatarGroup,
  args: {
    avatars: [
      { src: "/images/avatars/avatar-1.jpg", alt: "" },
      { src: "/images/avatars/avatar-2.jpg", alt: "" },
      { src: "/images/avatars/avatar-3.jpg", alt: "" },
    ],
  },
  decorators: [
    (Story) => (
      <div className="bg-cream p-6">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AvatarGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Hero social proof: decorative photos next to "Trusted by 24,000+ learners". */
export const Default: Story = {};

export const Single: Story = {
  args: {
    avatars: [{ src: "/images/avatars/avatar-1.jpg", alt: "" }],
  },
};

/** Final CTA: 40px photos with a yellow border, on the yellow section. */
export const Yellow: Story = {
  args: {
    variant: "yellow",
    avatars: [
      { src: "/images/avatars/avatar-1.jpg", alt: "" },
      { src: "/images/avatars/avatar-2.jpg", alt: "" },
      { src: "/images/avatars/avatar-3.jpg", alt: "" },
      { src: "/images/avatars/avatar-4.png", alt: "" },
    ],
  },
  decorators: [
    (Story) => (
      <div className="bg-yellow-light p-6">
        <Story />
      </div>
    ),
  ],
};

/** With names, when no text next to the group says who they are. */
export const Labelled: Story = {
  args: {
    avatars: [
      { src: "/images/avatars/avatar-1.jpg", alt: "Learner 1" },
      { src: "/images/avatars/avatar-2.jpg", alt: "Learner 2" },
    ],
  },
};
