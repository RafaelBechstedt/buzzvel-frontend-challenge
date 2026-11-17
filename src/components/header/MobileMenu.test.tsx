import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { DESKTOP_QUERY, MobileMenu } from "./MobileMenu";

// jsdom has no matchMedia: a minimal fake that lets a test fire "change".
type ChangeListener = (event: MediaQueryListEvent) => void;
let breakpointListeners: ChangeListener[] = [];

function crossDesktopBreakpoint() {
  act(() => {
    breakpointListeners.forEach((listener) =>
      listener({ matches: true, media: DESKTOP_QUERY } as MediaQueryListEvent),
    );
  });
}

beforeEach(() => {
  breakpointListeners = [];
  vi.stubGlobal(
    "matchMedia",
    vi.fn((media: string) => ({
      media,
      matches: false,
      addEventListener: (_type: string, listener: ChangeListener) => {
        breakpointListeners.push(listener);
      },
      removeEventListener: (_type: string, listener: ChangeListener) => {
        breakpointListeners = breakpointListeners.filter(
          (item) => item !== listener,
        );
      },
    })),
  );
});

afterEach(() => {
  vi.unstubAllGlobals();
});

function setup() {
  const user = userEvent.setup();
  render(<MobileMenu />);
  const toggle = screen.getByRole("button", { name: "Menu" });
  return { user, toggle };
}

describe("MobileMenu", () => {
  it("starts closed", () => {
    const { toggle } = setup();

    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(
      screen.queryByRole("navigation", { name: "Main" }),
    ).not.toBeInTheDocument();
  });

  it("controls the panel it toggles", () => {
    const { toggle } = setup();
    const panelId = toggle.getAttribute("aria-controls");

    expect(panelId).toBeTruthy();
    expect(document.getElementById(panelId!)).toBeInTheDocument();
  });

  it("opens and closes with the button", async () => {
    const { user, toggle } = setup();

    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("navigation", { name: "Main" })).toBeVisible();
    expect(screen.getByRole("link", { name: "Courses" })).toBeVisible();
    expect(screen.getByRole("link", { name: "Log in" })).toBeVisible();
    expect(screen.getByRole("link", { name: "Start learning" })).toBeVisible();

    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(
      screen.queryByRole("navigation", { name: "Main" }),
    ).not.toBeInTheDocument();
  });

  it("opens with the keyboard", async () => {
    const { user, toggle } = setup();

    await user.tab();
    expect(toggle).toHaveFocus();

    await user.keyboard("{Enter}");
    expect(toggle).toHaveAttribute("aria-expanded", "true");
  });

  it("closes on Escape and returns focus to the button", async () => {
    const { user, toggle } = setup();

    await user.click(toggle);
    await user.tab();
    expect(screen.getByRole("link", { name: "Courses" })).toHaveFocus();

    await user.keyboard("{Escape}");
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(toggle).toHaveFocus();
  });

  it.each(["Community", "Start learning"])(
    "closes when the %s link is clicked",
    async (name) => {
      const { user, toggle } = setup();

      await user.click(toggle);
      await user.click(screen.getByRole("link", { name }));

      expect(toggle).toHaveAttribute("aria-expanded", "false");
    },
  );

  it("closes when the viewport reaches the desktop breakpoint", async () => {
    const { user, toggle } = setup();

    await user.click(toggle);
    crossDesktopBreakpoint();

    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });
});
