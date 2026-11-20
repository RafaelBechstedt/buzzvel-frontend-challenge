import Image from "next/image";

export type Avatar = {
  src: string;
  /** Empty when nearby text already says who the people are. */
  alt: string;
};

export type AvatarGroupVariant = "cream" | "yellow";

type AvatarGroupProps = {
  avatars: Avatar[];
  /** `cream`: 32px, cream border (Hero). `yellow`: 40px, yellow border (Final CTA). */
  variant?: AvatarGroupVariant;
  /** For layout (margins, alignment). */
  className?: string;
};

const variants: Record<AvatarGroupVariant, { size: number; classes: string }> =
  {
    cream: { size: 32, classes: "size-8 border-cream" },
    yellow: { size: 40, classes: "size-10 border-yellow" },
  };

/** Overlapping round photos (8px overlap) with a 2px border. */
export function AvatarGroup({
  avatars,
  variant = "cream",
  className,
}: AvatarGroupProps) {
  const { size, classes } = variants[variant];

  return (
    <div className={["flex shrink-0", className].filter(Boolean).join(" ")}>
      {avatars.map((avatar) => (
        <Image
          key={avatar.src}
          src={avatar.src}
          alt={avatar.alt}
          width={size}
          height={size}
          className={`${classes} rounded-full border-2 bg-primary-light object-cover not-first:-ml-2`}
        />
      ))}
    </div>
  );
}
