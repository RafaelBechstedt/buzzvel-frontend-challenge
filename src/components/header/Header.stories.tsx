import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";

import { Header } from "./Header";

const meta = {
  title: "Layout/Header",
  component: Header,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div className="min-h-[600px] bg-white">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

const openMenu: Story["play"] = async ({ canvasElement }) => {
  const toggle = within(canvasElement).getByRole("button", { name: "Menu" });
  await userEvent.click(toggle);
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
};

export const Mobile: Story = {
  globals: { viewport: { value: "mobile", isRotated: false } },
};

export const MobileOpen: Story = {
  globals: { viewport: { value: "mobile", isRotated: false } },
  play: openMenu,
};

export const Tablet: Story = {
  globals: { viewport: { value: "tablet", isRotated: false } },
};

export const TabletOpen: Story = {
  globals: { viewport: { value: "tablet", isRotated: false } },
  play: openMenu,
};

/** The menu button is hidden from `lg` up, so there is no open state. */
export const Desktop: Story = {
  globals: { viewport: { value: "desktop", isRotated: false } },
};
