"use client";

// Setup example for Storybook and Vitest. Remove when the first real component lands.

import { useState } from "react";

type ExampleToggleProps = {
  label: string;
  defaultPressed?: boolean;
};

export function ExampleToggle({
  label,
  defaultPressed = false,
}: ExampleToggleProps) {
  const [pressed, setPressed] = useState(defaultPressed);

  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={() => setPressed((value) => !value)}
      className="rounded-lg bg-primary-light px-6 py-3 font-display text-h5 text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary aria-pressed:bg-primary aria-pressed:text-white"
    >
      {label}
    </button>
  );
}
