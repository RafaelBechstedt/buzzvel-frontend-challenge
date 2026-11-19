import Image from "next/image";
import type { CSSProperties } from "react";

import { Button } from "@/components/ui/Button";
import { type MosaicValue, communityContent } from "@/data/community";
import { sectionIds } from "@/data/navigation";

type CSSVars = CSSProperties & Record<`--${string}`, string>;

const { mosaic } = communityContent;

/**
 * Figma px → `cqw` of the mosaic container, so the mosaic keeps the Figma
 * geometry at its design width and scales down when narrower (320px, 1024px).
 */
function cqw(px: number, geometry: keyof MosaicValue) {
  return `${+((px / mosaic.width[geometry]) * 100).toFixed(3)}cqw`;
}

/** `--name` for the mobile geometry and `--name-md` for the desktop one (from md). */
function vars(name: string, value: MosaicValue): CSSVars {
  return {
    [`--${name}`]: cqw(value.sm, "sm"),
    [`--${name}-md`]: cqw(value.md, "md"),
  };
}

export function Community() {
  const { eyebrow, title, description, cta } = communityContent;

  return (
    <section
      id={sectionIds.community}
      aria-labelledby="community-title"
      className="bg-white px-5 py-15 md:px-8 md:py-20 xl:py-25"
    >
      {/* Stacked below lg (560px column on tablet), text and mosaic side by side from lg (docs/decisions.md). */}
      <div className="mx-auto max-w-140 lg:flex lg:max-w-page lg:items-center lg:gap-15">
        <div className="lg:flex-1">
          <p className="text-overline text-primary uppercase">{eyebrow}</p>
          <h2
            id="community-title"
            className="mt-2 font-display text-h3 text-ink lg:text-h3-desktop"
          >
            {title}
          </h2>
          <p className="mt-6 text-subtitle-1 text-ink-secondary lg:mt-8 lg:text-subtitle-1-desktop">
            {description}
          </p>
          <div className="mt-6 lg:mt-8">
            <Button
              href={cta.href}
              prefetch={false}
              variant="secondary"
              size="lg"
            >
              {cta.label}
            </Button>
          </div>
        </div>

        {/* Decorative collage: the photos have an empty alt (docs/decisions.md). */}
        <div className="mt-8 lg:mt-0 lg:flex-1">
          <div className="@container mx-auto w-full max-w-[362px] md:max-w-130 lg:mx-0">
            <div
              style={{
                ...vars("gap", mosaic.columnGap),
                ...vars("row-gap", mosaic.rowGap),
                ...vars("circle", mosaic.circle),
              }}
              className="relative flex items-center gap-(--gap) md:gap-(--gap-md)"
            >
              <div className="absolute top-1/2 left-1/2 size-(--circle) -translate-1/2 rounded-full bg-primary-light md:size-(--circle-md)" />

              {mosaic.columns.map((column) => (
                <div
                  key={column.photos[0].src}
                  style={vars("pt", column.paddingTop)}
                  className={`flex shrink-0 flex-col gap-(--row-gap) pt-(--pt) md:gap-(--row-gap-md) md:pt-(--pt-md) ${column.align === "end" ? "items-end" : "items-start"}`}
                >
                  {column.photos.map((photo) => (
                    <div
                      key={photo.src}
                      style={
                        {
                          "--w": cqw(photo.sm[0], "sm"),
                          "--h": cqw(photo.sm[1], "sm"),
                          "--w-md": cqw(photo.md[0], "md"),
                          "--h-md": cqw(photo.md[1], "md"),
                        } as CSSVars
                      }
                      className="relative h-(--h) w-(--w) overflow-hidden rounded-sm shadow-photo md:h-(--h-md) md:w-(--w-md)"
                    >
                      <Image
                        src={photo.src}
                        alt=""
                        fill
                        sizes={`(min-width: 48rem) ${Math.ceil(photo.md[0])}px, ${photo.sm[0]}px`}
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
