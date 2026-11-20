import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Logo } from "./Logo";

const meta = {
  title: "UI/Logo",
  component: Logo,
  decorators: [
    (Story) => (
      <div className="p-6 text-ink">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Logo>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Header usage: the link has the name, the logo is decorative. */
export const InLink: Story = {
  render: (args) => (
    <a href="#top" aria-label="Luma home" className="inline-flex">
      <Logo {...args} />
    </a>
  ),
};

/** Outside a link the logo needs its own accessible name. */
export const Labelled: Story = {
  args: {
    label: "Luma",
  },
};

/** Takes the text color: white on the navy footer. */
export const OnDark: Story = {
  args: {
    label: "Luma",
  },
  decorators: [
    (Story) => (
      <div className="bg-navy p-6 text-white">
        <Story />
      </div>
    ),
  ],
};

/** Larger sizes keep the ratio (the Open Graph image uses 51px). */
export const Large: Story = {
  args: {
    label: "Luma",
    height: 51,
  },
};
