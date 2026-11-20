import Image from "next/image";

type DecorIcon = {
  src: string;
  size: number;
  /** Position from the Figma desktop frame (1280 × 469.5). */
  className: string;
};

// Left items are anchored to the left edge and right items to the right edge,
// so wider screens keep them at the edges (docs/decisions.md).
const icons: DecorIcon[] = [
  {
    src: "/images/final-cta/decor-speech-bubble.svg",
    size: 32,
    className: "top-[214px] left-[141px]",
  },
  {
    src: "/images/final-cta/decor-b.svg",
    size: 101,
    // At 1024–1279px it would touch the buttons.
    className: "top-[360px] left-[293px] hidden xl:block",
  },
  {
    src: "/images/final-cta/decor-lamp.svg",
    size: 61,
    className: "top-[82px] right-[203px]",
  },
  {
    src: "/images/final-cta/decor-cube.svg",
    size: 80,
    className: "top-[220px] right-[80px]",
  },
  {
    src: "/images/final-cta/decor-box.svg",
    size: 48,
    className: "top-[381px] right-[269px]",
  },
];

/** Shapes and icons around the Final CTA, from `lg`. Purely decorative. */
export function FinalCtaDecor() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 hidden lg:block"
    >
      {/* Circles */}
      <div className="absolute top-4 left-[22px] size-27 rounded-full border-2 border-orange-light" />
      <div className="absolute top-[373px] left-14 size-30 rounded-full bg-orange-light" />
      <div className="absolute top-[43px] right-[371px] size-8 rounded-full border-2 border-orange-light" />
      <div className="absolute top-[429px] right-10 size-8 rounded-full border-2 border-orange-light" />
      <div className="absolute top-[468px] right-[176px] size-10 rounded-full border-2 border-orange-light" />

      {/* Rotated squares: Figma gives the bounding box; side and angle match the screen. */}
      <div className="absolute top-[-13px] right-[-14px] size-[115px] rotate-12 rounded-xl bg-orange-light" />
      <div className="absolute top-[235px] left-[-16px] size-14 rotate-12 rounded-lg bg-orange-light" />
      <div className="absolute top-[48px] left-[334px] size-14 rotate-12 rounded-lg border-2 border-orange-light" />

      {icons.map((icon) => (
        <Image
          key={icon.src}
          src={icon.src}
          alt=""
          width={icon.size}
          height={icon.size}
          className={`absolute ${icon.className}`}
        />
      ))}
    </div>
  );
}
