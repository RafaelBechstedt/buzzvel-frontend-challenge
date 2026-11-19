import Image from "next/image";

import { contactContent } from "@/data/contact";
import { sectionIds } from "@/data/navigation";

import { ContactForm } from "./ContactForm";

export function Contact() {
  const { eyebrow, title, description, cards } = contactContent;

  return (
    <section
      id={sectionIds.contact}
      aria-labelledby="contact-title"
      className="bg-white px-5 py-15 md:px-8 md:py-20 xl:py-25"
    >
      {/* Stacked below lg (560px column on tablet), info and form side by side from lg (docs/decisions.md). */}
      <div className="mx-auto flex max-w-140 flex-col gap-10 lg:max-w-page lg:flex-row lg:items-center lg:justify-between lg:gap-15">
        <div className="flex flex-col gap-8 lg:flex-1 lg:gap-10 xl:max-w-120">
          <div className="flex flex-col gap-4">
            <p className="text-overline text-primary uppercase">{eyebrow}</p>
            <h2
              id="contact-title"
              className="font-display text-h3 text-ink lg:text-h3-desktop"
            >
              {title}
            </h2>
            <p className="text-body text-ink-secondary lg:text-subtitle-1-desktop">
              {description}
            </p>
          </div>

          <dl className="flex flex-col gap-4">
            {cards.map((card) => (
              <div
                key={card.title}
                className="flex items-center gap-4 rounded-xl bg-cream p-4 lg:p-5"
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary-light">
                  <Image
                    src={card.icon.src}
                    alt=""
                    width={card.icon.width}
                    height={card.icon.height}
                  />
                </div>
                <div className="flex min-w-0 flex-col gap-0.5 text-body lg:gap-1">
                  <dt className="text-ink">{card.title}</dt>
                  <dd className="text-ink-tertiary">
                    {card.href ? (
                      <a
                        href={card.href}
                        className="break-words text-primary underline-offset-4 hover:underline"
                      >
                        {card.value}
                      </a>
                    ) : (
                      card.value
                    )}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </div>

        <div className="lg:flex-1 xl:max-w-135">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
