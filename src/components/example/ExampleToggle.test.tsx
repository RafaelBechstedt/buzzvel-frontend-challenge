// Setup example for Storybook and Vitest. Remove when the first real component lands.

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { ExampleToggle } from "./ExampleToggle";

describe("ExampleToggle", () => {
  it("starts unpressed by default", () => {
    render(<ExampleToggle label="Notify me" />);

    expect(screen.getByRole("button", { name: "Notify me" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
  });

  it("toggles on click", async () => {
    const user = userEvent.setup();
    render(<ExampleToggle label="Notify me" />);
    const button = screen.getByRole("button", { name: "Notify me" });

    await user.click(button);
    expect(button).toHaveAttribute("aria-pressed", "true");

    await user.click(button);
    expect(button).toHaveAttribute("aria-pressed", "false");
  });

  it("is reachable and toggles with the keyboard", async () => {
    const user = userEvent.setup();
    render(<ExampleToggle label="Notify me" defaultPressed />);
    const button = screen.getByRole("button", { name: "Notify me" });

    await user.tab();
    expect(button).toHaveFocus();

    await user.keyboard(" ");
    expect(button).toHaveAttribute("aria-pressed", "false");

    await user.keyboard("{Enter}");
    expect(button).toHaveAttribute("aria-pressed", "true");
  });
});
