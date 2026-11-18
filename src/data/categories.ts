export type Category = {
  /** Used in the link and the element ids. */
  slug: string;
  title: string;
  description: string;
  href: string;
};

export type CategoriesContent = {
  eyebrow: string;
  title: string;
  description: string;
  categories: Category[];
};

// There are no course pages in this challenge (see docs/decisions.md).
function category(slug: string, title: string, description: string): Category {
  return { slug, title, description, href: `/courses/${slug}` };
}

export const categoriesContent: CategoriesContent = {
  eyebrow: "Find your next skill",
  title: "Learn something worth knowing.",
  description:
    "Short, practical courses designed around skills you can put to work immediately.",
  categories: [
    category(
      "product-design",
      "Product Design",
      "Turn complex problems into clear, useful experiences.",
    ),
    category(
      "technology",
      "Technology",
      "Build a stronger understanding of the tools shaping digital products.",
    ),
    category(
      "business",
      "Business",
      "Develop practical skills for better decisions and stronger teams.",
    ),
    category(
      "creative",
      "Creative",
      "Explore new ways to communicate, create and tell stories.",
    ),
  ],
};
