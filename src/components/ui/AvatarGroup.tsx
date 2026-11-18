import Image from "next/image";

export type Avatar = {
  src: string;
  /** Empty when nearby text already says who the people are. */
  alt: string;
};

type AvatarGroupProps = {
  avatars: Avatar[];
  /** For layout (margins, alignment). */
  className?: string;
};

/** Overlapping round photos (32px, 8px overlap) with a cream border. */
export function AvatarGroup({ avatars, className }: AvatarGroupProps) {
  return (
    <div className={["flex shrink-0", className].filter(Boolean).join(" ")}>
      {avatars.map((avatar) => (
        <Image
          key={avatar.src}
          src={avatar.src}
          alt={avatar.alt}
          width={32}
          height={32}
          className="size-8 rounded-full border-2 border-cream bg-primary-light object-cover not-first:-ml-2"
        />
      ))}
    </div>
  );
}
