import Image from "next/image";

import { AvatarGroup } from "@/components/ui/AvatarGroup";
import { Button } from "@/components/ui/Button";
import { heroContent } from "@/data/hero";

// In forced colors the background and shadow are dropped: an outline keeps the badge edge.
const badge =
  "absolute flex w-max items-center rounded-xl bg-white px-4 py-3 text-body whitespace-nowrap text-ink shadow-badge forced-colors:outline";

export function Hero() {
  const {
    eyebrow,
    title,
    description,
    primaryCta,
    secondaryCta,
    socialProof,
    avatars,
    image,
    badges,
  } = heroContent;

  return (
    <section
      aria-labelledby="hero-title"
      className="overflow-x-clip bg-cream px-5 py-15 md:px-8 md:py-20 xl:py-25"
    >
      {/* Mobile: photo on top (Figma). md: text first, one column. xl: two columns (docs/decisions.md). */}
      <div className="mx-auto flex max-w-page flex-col gap-10 xl:flex-row xl:items-start xl:gap-15">
        <div className="flex flex-col md:mx-auto md:w-full md:max-w-140 xl:mx-0 xl:max-w-none xl:flex-1">
          <p className="text-overline text-primary uppercase">{eyebrow}</p>
          <h1
            id="hero-title"
            className="mt-4 font-display text-h1 text-ink lg:text-h1-desktop"
          >
            {title}
          </h1>
          <p className="mt-6 max-w-120 text-subtitle-1 text-ink-secondary lg:text-subtitle-1-desktop">
            {description}
          </p>

          <div className="mt-8 flex flex-col gap-3 md:flex-row">
            <Button href={primaryCta.href} size="lg">
              {primaryCta.label}
            </Button>
            <Button href={secondaryCta.href} variant="secondary" size="lg">
              {secondaryCta.label}
            </Button>
          </div>

          <div className="mt-8 flex items-center justify-center gap-3 md:justify-start">
            <AvatarGroup avatars={avatars} />
            <p className="text-body text-ink-secondary">
              <strong className="font-bold text-ink">
                {socialProof.highlight}
              </strong>{" "}
              {socialProof.rest}
            </p>
          </div>
        </div>

        {/* Mobile offsets are from the right/bottom so the shapes follow narrower screens. */}
        <div className="relative order-first h-95 w-full md:order-none md:mx-auto md:h-130 md:w-125 md:shrink-0 xl:mx-0">
          <div
            aria-hidden="true"
            className="absolute top-6 -right-2.5 bottom-3.5 left-[100.5px] rounded-2xl bg-orange-light md:-right-[39px] md:bottom-7 md:left-auto md:w-[89px]"
          />
          <div
            aria-hidden="true"
            className="absolute bottom-3 -left-2.5 size-16 rounded-full bg-primary-light md:bottom-[11px] md:-left-[44.8px] md:size-[106px]"
          />

          <div className="absolute inset-x-2 inset-y-0 overflow-hidden rounded-2xl bg-primary-light md:inset-x-0 md:rounded-3xl">
            {/* LCP image: eager + high priority instead of `preload` (docs/decisions.md). */}
            <Image
              src={image.src}
              alt={image.alt}
              fill
              loading="eager"
              fetchPriority="high"
              sizes="(min-width: 48rem) 500px, calc(100vw - 56px)"
              className="object-cover"
            />
          </div>

          <p
            className={`${badge} top-1.5 left-0 gap-3 md:top-4 md:-left-[22px]`}
          >
            <span className="flex h-8 items-center rounded-lg bg-primary-light px-1 font-bold text-primary">
              {badges.courses.value}
            </span>{" "}
            {badges.courses.label}
          </p>

          <p
            className={`${badge} top-[296.5px] -right-2.5 gap-2 md:top-[436.5px] md:right-auto md:left-[348.2px]`}
          >
            <span aria-hidden="true" className="flex gap-0.5">
              {Array.from({ length: 5 }, (_, i) => (
                <Image
                  key={i}
                  src="/icons/star.svg"
                  alt=""
                  width={14}
                  height={14}
                />
              ))}
            </span>
            {badges.rating.value} {badges.rating.label}
          </p>
        </div>
      </div>
    </section>
  );
}
