import type { Decorator, Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";

import { categoriesContent } from "@/data/categories";

import { CategoryCard } from "./CategoryCard";

/** One desktop card: 265px wide. */
const cardWidth: Decorator = (Story) => (
  <div className="w-66.25">
    <Story />
  </div>
);

const meta = {
  title: "Categories/CategoryCard",
  component: CategoryCard,
  args: {
    number: "01",
    slug: "product-design",
    title: "Product Design",
    description: "Turn complex problems into clear, useful experiences.",
    href: "/courses/product-design",
  },
  decorators: [
    (Story) => (
      <div className="p-6">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CategoryCard>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Desktop card (265px wide, 260px minimum height). */
export const Default: Story = { decorators: [cardWidth] };

/**
 * Hover: the border turns `primary` and the arrow moves 4px right (no motion
 * with reduced motion). Move the mouse over the card; no pseudo-state addon.
 */
export const Hover: Story = { decorators: [cardWidth] };

/** Keyboard focus shows the global focus ring around the whole card. */
export const FocusVisible: Story = {
  decorators: [cardWidth],
  play: async ({ canvasElement }) => {
    await userEvent.tab();
    const link = within(canvasElement).getByRole("link", {
      name: "Product Design",
    });
    await expect(link).toHaveFocus();
    await expect(link).toHaveAccessibleDescription(
      "Turn complex problems into clear, useful experiences.",
    );
    await expect(link).toHaveAttribute("href", "/courses/product-design");
  },
};

/** A three-line description; "Explore" stays at the bottom. */
export const LongText: Story = {
  decorators: [cardWidth],
  args: {
    number: "02",
    slug: "technology",
    title: "Technology",
    description:
      "Build a stronger understanding of the tools shaping digital products.",
    href: "/courses/technology",
  },
};

/** The four cards as in the section; "Explore" lines up at the bottom. */
export const Grid: Story = {
  render: () => (
    <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-5">
      {categoriesContent.categories.map(({ slug, ...category }, index) => (
        <li key={slug}>
          <CategoryCard
            {...category}
            slug={slug}
            number={String(index + 1).padStart(2, "0")}
          />
        </li>
      ))}
    </ul>
  ),
  decorators: [
    (Story) => (
      <div className="max-w-page">
        <Story />
      </div>
    ),
  ],
};
