import Link from "next/link";

import { ArrowIcon } from "@/components/icons/ArrowIcon";

export type CategoryCardProps = {
  /** Position shown in the badge, e.g. "01". */
  number: string;
  title: string;
  description: string;
  href: string;
  /** Unique on the page; builds the ids for the accessible name and description. */
  slug: string;
};

/**
 * Card with one link: the title. Its `::after` covers the card, so the whole
 * card is clickable and shows the focus ring, while the link's name stays the
 * visible title (see docs/decisions.md). The number and "Explore" are visual only.
 */
export function CategoryCard({
  number,
  title,
  description,
  href,
  slug,
}: CategoryCardProps) {
  const descriptionId = `category-${slug}-description`;

  return (
    <div className="group relative flex h-full flex-col justify-between rounded-2xl border border-line bg-white p-6 hover:border-primary motion-safe:transition-colors lg:min-h-65 lg:p-7">
      <div className="flex flex-col items-start">
        <span
          aria-hidden="true"
          className="mt-0.5 rounded-md bg-primary-light px-2 py-1 text-overline text-primary uppercase"
        >
          {number}
        </span>
        <h3 className="mt-[20.5px] font-display text-h5 text-ink lg:text-h5-desktop">
          {/* The global ring moves from the link text to its ::after (the whole card). */}
          <Link
            href={href}
            prefetch={false}
            aria-describedby={descriptionId}
            className="after:absolute after:-inset-px after:rounded-2xl focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-primary focus-visible:after:outline-solid"
          >
            {title}
          </Link>
        </h3>
        <p id={descriptionId} className="mt-3 text-body text-ink-tertiary">
          {description}
        </p>
      </div>

      <span
        aria-hidden="true"
        className="flex items-center gap-2 pt-5 text-body font-bold text-ink"
      >
        Explore
        <ArrowIcon className="group-hover:translate-x-1 motion-safe:transition-transform" />
      </span>
    </div>
  );
}
