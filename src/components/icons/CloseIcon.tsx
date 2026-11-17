type CloseIconProps = {
  className?: string;
};

/**
 * Close (X) icon. Not in Figma: drawn to match `MenuIcon` (24px box,
 * 1.5 stroke, round caps). Decorative; takes the text color.
 */
export function CloseIcon({ className }: CloseIconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M6 6L18 18M18 6L6 18" />
    </svg>
  );
}
