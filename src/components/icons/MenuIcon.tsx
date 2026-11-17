type MenuIconProps = {
  className?: string;
};

/** Hamburger icon (Figma `MenuIcon`). Decorative; takes the text color. */
export function MenuIcon({ className }: MenuIconProps) {
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
      <path d="M3 7H21M3 12H21M3 17H21" />
    </svg>
  );
}
