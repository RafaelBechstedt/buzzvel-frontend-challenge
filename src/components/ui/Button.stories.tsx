import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";

import { Button, type ButtonSize, type ButtonVariant } from "./Button";

// Button props are a union (link or button), so the stories use flat args.
type StoryArgs = {
  children: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  href?: string;
  disabled?: boolean;
};

const meta = {
  title: "UI/Button",
  args: {
    children: "Start learning",
    variant: "primary",
    size: "md",
  },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["primary", "secondary", "ghost"],
    },
    size: { control: "inline-radio", options: ["md", "lg"] },
  },
  render: ({ href, disabled, ...args }) =>
    href !== undefined ? (
      <Button {...args} href={href} />
    ) : (
      <Button {...args} disabled={disabled} />
    ),
  decorators: [
    (Story) => (
      <div className="bg-cream p-6">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<StoryArgs>;

export default meta;

type Story = StoryObj<typeof meta>;

// Hover styles show on mouse over (no pseudo-state addon installed).

/** "Start learning" in the header. */
export const Primary: Story = {};

/** "Explore courses" in the hero. */
export const PrimaryLarge: Story = {
  args: { children: "Explore courses", size: "lg" },
};

/** "Log in" in the mobile menu. */
export const Secondary: Story = {
  args: { children: "Log in", variant: "secondary" },
};

/** "See how it works" in the hero. */
export const SecondaryLarge: Story = {
  args: { children: "See how it works", variant: "secondary", size: "lg" },
};

/** "Log in" in the desktop header. */
export const Ghost: Story = {
  args: { children: "Log in", variant: "ghost" },
};

export const GhostLarge: Story = {
  args: { children: "Log in", variant: "ghost", size: "lg" },
};

/** Mobile menu and mobile hero. */
export const FullWidth: Story = {
  args: { size: "lg", fullWidth: true },
  decorators: [
    (Story) => (
      <div className="w-90.5">
        <Story />
      </div>
    ),
  ],
};

/** With `href` it renders a link, not a button. */
export const AsLink: Story = {
  args: { href: "#courses" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole("link", { name: "Start learning" }),
    ).toHaveAttribute("href", "#courses");
  },
};

export const Disabled: Story = {
  args: { disabled: true },
};

/** Keyboard focus shows the global focus ring. */
export const FocusVisible: Story = {
  play: async ({ canvasElement }) => {
    await userEvent.tab();
    await expect(
      within(canvasElement).getByRole("button", { name: "Start learning" }),
    ).toHaveFocus();
  },
};

/** Every variant and size side by side. */
export const AllVariants: Story = {
  render: () => (
    <div className="grid gap-4">
      {(["md", "lg"] as const).map((size) => (
        <div key={size} className="flex items-center gap-2">
          <Button size={size}>Start learning</Button>
          <Button size={size} variant="secondary">
            See how it works
          </Button>
          <Button size={size} variant="ghost">
            Log in
          </Button>
        </div>
      ))}
    </div>
  ),
};
