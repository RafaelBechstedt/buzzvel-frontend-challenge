import type { Meta, StoryObj } from "@storybook/nextjs-vite";

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

/** Both icons take the text color. */
export const OnDark: Story = {
  render: (args) => (
    <>
      <MenuIcon {...args} />
      <CloseIcon {...args} />
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
