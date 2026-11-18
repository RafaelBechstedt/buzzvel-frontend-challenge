type ArrowIconProps = {
  className?: string;
};

/** Right arrow (Figma `Arrow`, 20px). Decorative; takes the text color. */
export function ArrowIcon({ className }: ArrowIconProps) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M4 10H16M11 15L16 10L11 5" />
    </svg>
  );
}
