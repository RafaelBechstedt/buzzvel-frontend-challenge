import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost";
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

const base =
  "inline-flex items-center justify-center rounded-lg text-body whitespace-nowrap motion-safe:transition-colors disabled:pointer-events-none disabled:opacity-50";

// Hover states are not in the design (see docs/decisions.md).
const variants: Record<ButtonVariant, string> = {
  primary: "bg-primary font-bold text-white hover:bg-primary/90",
  // Figma stroke is "Inside": an inset ring keeps the same size as primary.
  secondary:
    "bg-white font-bold text-ink inset-ring inset-ring-line hover:bg-cream",
  ghost: "text-ink-secondary hover:text-ink",
};

function padding(variant: ButtonVariant, size: ButtonSize) {
  if (size === "lg") return "px-7 py-3.5";
  // "Log in" in the header has less horizontal padding than the others.
  return variant === "ghost" ? "px-4 py-2.5" : "px-5 py-2.5";
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
