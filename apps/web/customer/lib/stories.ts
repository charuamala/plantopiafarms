// Placeholder story content. Replace with real farm/customer/grower stories —
// see notes inline. Each entry is intentionally written without invented
// names, dates, or figures that would need to be fabricated.

export type Story = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  image: string;
  body: string[];
};

export const stories: Story[] = [
  {
    slug: "from-seed-to-harvest",
    title: "From Seed to Harvest",
    category: "Farm Stories",
    excerpt:
      "A look at how a berry goes from a cutting in the nursery to a punnet on your table.",
    image: "/images/farm-growing-care.jpg",
    body: [
      "[Placeholder — replace with your real farm story.] Every berry starts months before it's ripe: a cutting is rooted in the nursery, transplanted into the field, and tended row by row through the growing season.",
      "Add real details here — what makes your growing process distinctive, how long it takes, what care goes into it season to season.",
    ],
  },
  {
    slug: "meet-our-growers",
    title: "Meet the People Behind Your Berries",
    category: "Grower Stories",
    excerpt:
      "Introduce the growers and farm team who bring Plantopia berries to harvest.",
    image: "/images/farm-harvest.jpg",
    body: [
      "[Placeholder — replace with real grower profiles, names, and quotes with their permission.] Behind every punnet of berries is a team that starts work before sunrise, picking at the coolest part of the day to lock in freshness.",
      "This is a good place for a short interview or quote from an actual grower once you're ready to share it.",
    ],
  },
  {
    slug: "a-season-in-kotagiri",
    title: "A Season in Kotagiri",
    category: "Behind the Farm",
    excerpt: "What a growing season looks like in the highlands where Plantopia berries are grown.",
    image: "/images/farm-strawberry-field.jpg",
    body: [
      "[Placeholder — replace with a real seasonal account.] The cool highland climate shapes everything about how and when berries are grown here — from planting windows to harvest timing.",
      "Swap this in for real, specific detail about your growing calendar, weather, and what changes through the year.",
    ],
  },
];

export function getStoryBySlug(slug: string): Story | undefined {
  return stories.find((story) => story.slug === slug);
}
