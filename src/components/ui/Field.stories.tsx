import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";

import { TextField, TextareaField } from "./Field";

type StoryArgs = {
  /** Which control to render. */
  control: "input" | "textarea";
  label: string;
  placeholder?: string;
  defaultValue?: string;
  error?: string;
  disabled?: boolean;
};

const meta = {
  title: "UI/Field",
  args: {
    control: "input",
    label: "Full name",
    placeholder: "Your name",
  },
  argTypes: {
    control: { control: "inline-radio", options: ["input", "textarea"] },
  },
  render: ({ control, ...args }) =>
    control === "textarea" ? (
      <TextareaField name="message" {...args} />
    ) : (
      <TextField name="name" {...args} />
    ),
  decorators: [
    (Story) => (
      <div className="max-w-115 bg-white p-6">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<StoryArgs>;

export default meta;

type Story = StoryObj<typeof meta>;

const textarea = {
  control: "textarea",
  label: "Your question",
  placeholder: "Tell us how we can help...",
} satisfies Partial<StoryArgs>;

export const Default: Story = {};

/** Keyboard focus shows the global focus ring. */
export const Focus: Story = {
  play: async ({ canvasElement }) => {
    await userEvent.tab();
    await expect(
      within(canvasElement).getByRole("textbox", { name: "Full name" }),
    ).toHaveFocus();
  },
};

export const WithValue: Story = {
  args: { defaultValue: "Alex Morgan" },
};

/** The error is linked to the control (`aria-invalid`, `aria-describedby`). */
export const WithError: Story = {
  args: {
    label: "Email",
    placeholder: "youremail@example.com",
    defaultValue: "alex@",
    error: "Enter a valid email, like name@example.com.",
  },
  play: async ({ canvasElement }) => {
    const input = within(canvasElement).getByRole("textbox", { name: "Email" });
    await expect(input).toBeInvalid();
    await expect(input).toHaveAccessibleDescription(
      "Enter a valid email, like name@example.com.",
    );
  },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Textarea: Story = {
  args: textarea,
};

export const TextareaFocus: Story = {
  args: textarea,
  play: async ({ canvasElement }) => {
    await userEvent.tab();
    await expect(
      within(canvasElement).getByRole("textbox", { name: "Your question" }),
    ).toHaveFocus();
  },
};

export const TextareaWithError: Story = {
  args: { ...textarea, error: "Enter your question." },
};

export const TextareaDisabled: Story = {
  args: { ...textarea, disabled: true },
};
