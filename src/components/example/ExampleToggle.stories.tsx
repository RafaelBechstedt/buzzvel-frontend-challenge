// Setup example for Storybook and Vitest. Remove when the first real component lands.

import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ExampleToggle } from "./ExampleToggle";

const meta = {
  title: "Example/ExampleToggle",
  component: ExampleToggle,
  args: {
    label: "Notify me",
  },
} satisfies Meta<typeof ExampleToggle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Pressed: Story = {
  args: {
    defaultPressed: true,
  },
};
