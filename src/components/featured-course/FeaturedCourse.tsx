import Image from "next/image";
import Link from "next/link";

import { ArrowIcon } from "@/components/icons/ArrowIcon";
import { Button } from "@/components/ui/Button";
import { featuredCourseContent } from "@/data/featured-course";

export function FeaturedCourse() {
  const {
    badge,
    eyebrow,
    title,
    description,
    instructor,
    details,
    image,
    primaryCta,
    secondaryCta,
  } = featuredCourseContent;

  return (
    <section
      aria-labelledby="featured-badge featured-title"
      className="bg-primary px-5 py-15 [--focus-ring:var(--color-white)] md:px-8 md:py-20 xl:py-25"
    >
      {/* Stacked below lg (560px column on tablet), side by side from lg (docs/decisions.md). */}
      <div className="mx-auto flex max-w-page flex-col gap-10 md:max-w-140 lg:max-w-page lg:flex-row lg:items-center lg:gap-15">
        <div className="relative lg:flex-1">
          <div className="relative h-70 overflow-hidden rounded-2xl md:h-102">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 74rem) 530px, (min-width: 64rem) calc(50vw - 62px), (min-width: 48rem) 560px, calc(100vw - 40px)"
              className="object-cover"
            />
          </div>
          <p
            id="featured-badge"
            className="absolute -top-3 -left-3 rounded-md bg-yellow px-3 py-1.5 text-overline text-ink uppercase forced-colors:outline"
          >
            {badge}
          </p>
        </div>

        <div className="flex flex-col lg:flex-1">
          <p className="text-overline text-white uppercase">{eyebrow}</p>
          <h2
            id="featured-title"
            className="mt-4 font-display text-h3 text-white lg:text-h3-desktop"
          >
            {title}
          </h2>
          <p className="mt-5 text-subtitle-2 text-white lg:text-subtitle-2-desktop">
            {description}
          </p>
          <p className="mt-6 text-subtitle-2 text-white lg:text-subtitle-2-desktop">
            with {instructor.name}
            <span aria-hidden="true"> · </span>
            <span className="sr-only">, </span>
            {instructor.role}
          </p>

          <ul aria-label="Course details" className="mt-6 flex flex-wrap gap-3">
            {details.map((detail) => (
              <li
                key={detail}
                className="rounded-lg border border-line px-3.5 py-1.5 text-body text-white"
              >
                {detail}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 md:flex-row">
            <Button
              href={primaryCta.href}
              variant="accent"
              size="lg"
              prefetch={false}
              aria-describedby="featured-title"
            >
              {primaryCta.label}
            </Button>
            {/* White, not the Figma #e7e7ec: that is 4.45:1 on blue (docs/decisions.md). */}
            <Link
              href={secondaryCta.href}
              className="group inline-flex items-center justify-center gap-2 px-4 py-3.5 text-body font-bold text-white"
            >
              {secondaryCta.label}
              <ArrowIcon className="group-hover:translate-x-1 motion-safe:transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
