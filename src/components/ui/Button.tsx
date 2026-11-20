import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "accent";
export type ButtonSize = "md" | "lg";

type BaseProps = {
  variant?: ButtonVariant;
  /** `md`: 44px (header). `lg`: 52px (hero, mobile menu). Same for every variant. */
  size?: ButtonSize;
  fullWidth?: boolean;
  /** For layout (margins, alignment). Do not override the variant styles. */
  className?: string;
  children: ReactNode;
};

type ButtonAsLink = BaseProps &
  Omit<ComponentProps<typeof Link>, keyof BaseProps | "href"> & {
    href: string;
  };

type ButtonAsButton = BaseProps &
  Omit<ComponentProps<"button">, keyof BaseProps> & {
    href?: never;
  };

export type ButtonProps = ButtonAsLink | ButtonAsButton;

// Every variant has a 1px border (transparent unless set below) and 1px less
// padding: same size as in Figma, and forced colors mode shows the border
// while it drops backgrounds and box-shadows (docs/decisions.md).
const base =
  "inline-flex items-center justify-center rounded-lg border border-transparent text-body whitespace-nowrap motion-safe:transition-colors disabled:pointer-events-none disabled:opacity-50";

// Hover states are not in the design (see docs/decisions.md).
const variants: Record<ButtonVariant, string> = {
  primary: "bg-primary font-bold text-white hover:bg-primary/90",
  // Figma stroke is "Inside": the border is inside the box, like primary's.
  secondary: "border-line bg-white font-bold text-ink hover:bg-cream",
  ghost: "text-ink-secondary hover:text-ink",
  // Yellow, for the blue Featured course section.
  accent: "bg-yellow font-bold text-ink hover:bg-yellow-light",
};

function padding(variant: ButtonVariant, size: ButtonSize) {
  // Figma padding minus the 1px border: lg 28/14, md 20/10 (ghost 16/10).
  if (size === "lg") return "px-6.75 py-3.25";
  // "Log in" in the header has less horizontal padding than the others.
  return variant === "ghost" ? "px-3.75 py-2.25" : "px-4.75 py-2.25";
}

/** Renders a `next/link` when `href` is set, otherwise a `<button>`. */
export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    fullWidth = false,
    className,
    ...rest
  } = props;

  const classes = [
    base,
    variants[variant],
    padding(variant, size),
    fullWidth && "w-full",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (rest.href !== undefined) {
    return <Link {...rest} className={classes} />;
  }

  const { type = "button", ...buttonProps } = rest;

  return <button {...buttonProps} type={type} className={classes} />;
}
