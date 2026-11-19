import Image from "next/image";

import { testimonialContent } from "@/data/testimonial";

export function Testimonial() {
  const { title, quote, author, statsLabel, stats } = testimonialContent;

  return (
    <section
      aria-labelledby="testimonial-title"
      className="bg-white px-5 py-15 md:px-8 md:py-20 xl:py-25"
    >
      <h2 id="testimonial-title" className="sr-only">
        {title}
      </h2>

      {/* Stacked below lg (560px column on tablet), stats column on the right from lg (docs/decisions.md). */}
      <div className="mx-auto max-w-140 lg:flex lg:max-w-page lg:items-center lg:justify-between lg:gap-10">
        <figure className="lg:max-w-150 lg:flex-1">
          <Image src="/icons/quote.svg" alt="" width={24} height={22} />
          <blockquote className="mt-4">
            <p className="font-display text-quote text-ink lg:text-quote-desktop">
              {quote}
            </p>
          </blockquote>
          {/* The photo has an empty alt: the name is right next to it. */}
          <figcaption className="mt-8 flex items-center gap-4">
            <Image
              src={author.imageSrc}
              alt=""
              width={48}
              height={48}
              className="size-12 rounded-full bg-primary-light object-cover"
            />
            <div>
              <p className="text-subtitle-1 font-bold text-ink lg:text-subtitle-2-desktop">
                {author.name}
              </p>
              <p className="text-body text-ink-secondary">{author.role}</p>
            </div>
          </figcaption>
        </figure>

        <ul
          aria-label={statsLabel}
          className="mt-15 grid grid-cols-3 lg:mt-0 lg:flex lg:shrink-0 lg:flex-col lg:gap-5 lg:border-l lg:border-line lg:pl-12 xl:w-[401px]"
        >
          {stats.map((stat) => (
            <li key={stat.label} className="pr-4 lg:pr-0">
              <p className="font-display text-h1 text-primary lg:text-h1-desktop">
                {stat.srValue ? (
                  <>
                    <span aria-hidden="true">{stat.value}</span>
                    <span className="sr-only">{stat.srValue}</span>
                  </>
                ) : (
                  stat.value
                )}
              </p>
              <p className="mt-1 text-body text-ink-tertiary">{stat.label}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
