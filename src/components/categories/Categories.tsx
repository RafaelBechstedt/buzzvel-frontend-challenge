import { categoriesContent } from "@/data/categories";
import { sectionIds } from "@/data/navigation";

import { CategoryCard } from "./CategoryCard";

export function Categories() {
  const { eyebrow, title, description, categories } = categoriesContent;

  return (
    <section
      id={sectionIds.courses}
      aria-labelledby="categories-title"
      className="bg-white px-5 py-15 md:px-8 md:py-20 xl:py-25"
    >
      <div className="mx-auto max-w-page">
        <div className="max-w-140">
          <p className="text-overline text-primary uppercase">{eyebrow}</p>
          <h2
            id="categories-title"
            className="mt-4 font-display text-h3 text-ink lg:text-h3-desktop"
          >
            {title}
          </h2>
          <p className="mt-4 text-subtitle-1 text-ink-secondary lg:text-subtitle-1-desktop">
            {description}
          </p>
        </div>

        {/* 1 column, 2 from md, 4 from lg (tablet layout in docs/decisions.md). */}
        <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:mt-10 lg:grid-cols-4 lg:gap-5">
          {categories.map(({ slug, ...category }, index) => (
            <li key={slug}>
              <CategoryCard
                {...category}
                slug={slug}
                number={String(index + 1).padStart(2, "0")}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
