import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ArrowIcon } from "./ArrowIcon";
import { CloseIcon } from "./CloseIcon";
import { MenuIcon } from "./MenuIcon";

const meta = {
  title: "Icons",
  component: MenuIcon,
  decorators: [
    (Story) => (
      <div className="flex gap-6 p-6 text-ink">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MenuIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Menu: Story = {};

export const Close: Story = {
  render: (args) => <CloseIcon {...args} />,
};

/** "Explore" in the category cards; "Browse courses" in Featured course. */
export const Arrow: Story = {
  render: (args) => <ArrowIcon {...args} />,
};

/** Every icon takes the text color. */
export const OnDark: Story = {
  render: (args) => (
    <>
      <MenuIcon {...args} />
      <CloseIcon {...args} />
      <ArrowIcon {...args} />
    </>
  ),
  decorators: [
    (Story) => (
      <div className="flex gap-6 bg-navy p-3 text-white">
        <Story />
      </div>
    ),
  ],
};
