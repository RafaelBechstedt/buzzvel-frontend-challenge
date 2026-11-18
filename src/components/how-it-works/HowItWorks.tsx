import { type StepIconKind, howItWorksContent } from "@/data/how-it-works";
import { sectionIds } from "@/data/navigation";

/** Decorative shapes from the Figma step icons (56×56), above the step line. */
function StepIcon({ kind }: { kind: StepIconKind }) {
  if (kind === "focus") {
    return (
      <div
        aria-hidden="true"
        className="relative z-1 size-14 rounded-full bg-primary-light"
      >
        <div className="absolute top-2 left-2 size-6 rounded-md bg-primary" />
      </div>
    );
  }

  if (kind === "experience") {
    return (
      <div aria-hidden="true" className="relative z-1 size-14">
        <div className="absolute inset-0 rotate-12 rounded-lg bg-orange-light" />
        <div className="absolute top-6 left-6 size-7 rounded-full bg-orange" />
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className="relative z-1 size-14 rounded-xl bg-yellow-light"
    >
      {/* #e9d659 is not in the palette; one-off value from Figma. */}
      <div className="absolute top-7 left-2 size-5 rounded-full bg-[#e9d659]" />
    </div>
  );
}

/*
 * Line to the next step (decorative ::after, ignored by screen readers):
 * vertical below lg, ending at the next icon; horizontal from lg, from this
 * icon's center to the next one's (80px gap).
 */
const stepLine =
  "not-last:pb-19 not-last:after:absolute not-last:after:bottom-0 not-last:after:left-7 not-last:after:h-12.5 not-last:after:w-px not-last:after:bg-line lg:not-last:pb-0 lg:not-last:after:top-7 lg:not-last:after:bottom-auto lg:not-last:after:h-px lg:not-last:after:w-[calc(100%+5rem)]";

export function HowItWorks() {
  const { eyebrow, title, steps } = howItWorksContent;

  return (
    <section
      id={sectionIds.howItWorks}
      aria-labelledby="how-it-works-title"
      className="bg-cream px-5 py-15 md:px-8 md:py-20 xl:py-25"
    >
      <div className="mx-auto max-w-page">
        <div className="text-center">
          <p className="text-overline text-primary uppercase">{eyebrow}</p>
          <h2
            id="how-it-works-title"
            className="mt-4 font-display text-h3 text-ink lg:text-h3-desktop"
          >
            {title}
          </h2>
        </div>

        {/* Vertical timeline below lg (560px column on tablet), 3 columns from lg (docs/decisions.md). */}
        <ol className="mt-10 md:mx-auto md:max-w-140 lg:mt-20 lg:flex lg:max-w-none lg:gap-20 lg:py-7">
          {steps.map((step, index) => {
            const number = index + 1;

            return (
              <li key={step.title} className={`relative lg:flex-1 ${stepLine}`}>
                <StepIcon kind={step.icon} />
                {/* Visual label only; the h3 carries "Step N" for screen readers. */}
                <p
                  aria-hidden="true"
                  className="mt-6 text-overline text-ink-tertiary uppercase"
                >
                  Step {String(number).padStart(2, "0")}
                </p>
                <h3 className="mt-2 font-display text-h5 text-ink lg:text-h5-desktop">
                  <span className="sr-only">Step {number}: </span>
                  {step.title}
                </h3>
                <p className="mt-3 text-subtitle-2 text-pretty text-ink-secondary lg:text-subtitle-2-desktop">
                  {step.description}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
