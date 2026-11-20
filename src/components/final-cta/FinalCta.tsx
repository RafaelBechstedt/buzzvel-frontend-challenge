import { AvatarGroup } from "@/components/ui/AvatarGroup";
import { Button } from "@/components/ui/Button";
import { finalCtaContent } from "@/data/final-cta";

import { FinalCtaDecor } from "./FinalCtaDecor";

export function FinalCta() {
  const { title, description, primaryCta, secondaryCta, avatars } =
    finalCtaContent;

  return (
    <section
      aria-labelledby="final-cta-title"
      className="relative overflow-hidden bg-yellow-light px-5 py-15 md:px-8 md:py-20 lg:py-25"
    >
      <FinalCtaDecor />

      {/* Desktop padding from `lg` with the decoration, so the section keeps the Figma height (docs/decisions.md). */}
      <div className="relative mx-auto flex max-w-164 flex-col items-center text-center">
        <AvatarGroup avatars={avatars} variant="yellow" />

        <h2
          id="final-cta-title"
          className="mt-8 font-display text-h2 text-ink lg:text-h2-desktop"
        >
          {title}
        </h2>
        <p className="mt-4 text-subtitle-1 text-ink-secondary lg:text-subtitle-1-desktop">
          {description}
        </p>

        <div className="mt-10 flex flex-col gap-3 self-stretch md:flex-row md:self-center">
          <Button href={primaryCta.href} size="lg">
            {primaryCta.label}
          </Button>
          <Button
            href={secondaryCta.href}
            variant="secondary"
            size="lg"
            prefetch={false}
          >
            {secondaryCta.label}
          </Button>
        </div>
      </div>
    </section>
  );
}
