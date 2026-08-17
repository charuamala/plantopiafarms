export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
  body: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "health-benefits-of-fresh-berries",
    title: "5 Health Benefits of Eating Fresh Berries Every Day",
    excerpt:
      "From antioxidants to heart health, here's why a daily handful of berries does more for you than you'd think.",
    image:
      "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=1200&q=80",
    date: "2026-06-02",
    category: "Nutrition",
    body: [
      "Berries are some of the most nutrient-dense fruits you can eat, and the best part is you don't need much to feel the benefit — a small bowl a day goes a long way.",
      "Strawberries and raspberries are packed with vitamin C, which supports your immune system and helps your skin stay firm and healthy. Blueberries bring a strong dose of vitamin K and manganese, both important for bone health.",
      "Blackberries are especially high in fiber, which helps digestion and keeps you feeling full for longer. Across all four berries, you're getting a rich supply of antioxidants that help protect your cells from everyday oxidative stress.",
      "Our advice: rotate through a mix rather than sticking to one variety. Toss them into breakfast bowls, blend them into smoothies, or just eat them fresh — the way we do straight off the farm in Kotagiri.",
    ],
  },
  {
    slug: "sustainable-growing-in-the-nilgiris",
    title: "Behind the Scenes: Sustainable Growing in the Nilgiris",
    excerpt:
      "A look at how the cool climate and careful soil practices around Kotagiri shape the way we grow our berries.",
    image:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=1200&q=80",
    date: "2026-05-18",
    category: "Farm Life",
    body: [
      "Plantopia Farms sits in the Nilgiris, where the cool, misty climate is naturally suited to growing berries. Instead of fighting the environment, we work with it.",
      "We build up our soil with composted organic matter between seasons, which keeps the plants healthy without leaning on synthetic fertilizers. Healthier soil means better-tasting fruit and stronger plants season after season.",
      "Harvesting is still done by hand, picking each berry at peak ripeness rather than early for shelf life. That's a big part of why our berries taste noticeably different from what you'd find sitting in a supermarket cooler.",
      "It's slower than industrial farming, but it's the only way we know to keep the quality consistent from one harvest to the next.",
    ],
  },
  {
    slug: "farm-to-doorstep-delivery-journey",
    title: "From Farm to Doorstep: Our Harvest-to-Delivery Journey",
    excerpt:
      "What actually happens between picking a berry in Kotagiri and it landing in your fridge.",
    image:
      "https://images.unsplash.com/photo-1543168256-418811576931?auto=format&fit=crop&w=1200&q=80",
    date: "2026-04-27",
    category: "Behind the Scenes",
    body: [
      "Freshness is a timing problem as much as a growing problem. Once a berry is picked, the clock starts running, so our whole process is built around minimizing the gap between harvest and your hands.",
      "Berries are picked in the early morning while it's still cool, then sorted and packed the same day — nothing sits in cold storage for days waiting for an order.",
      "From there, orders move straight into delivery instead of sitting in a regional warehouse. It's a shorter, simpler chain than most produce takes, and it's the reason we can promise fruit that still tastes farm-fresh when it arrives.",
      "If you've ever wondered why our berries hold their flavor better than store-bought, this is most of the answer.",
    ],
  },
  {
    slug: "seasonal-growing-raised-beds",
    title: "Seasonal Growing: What Thrives in Raised Beds at Our Farm",
    excerpt:
      "Why we use raised beds for part of our berry growing, and how the seasons change what's ready to pick.",
    image:
      "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?auto=format&fit=crop&w=1200&q=80",
    date: "2026-03-09",
    category: "Farm Life",
    body: [
      "Raised beds give us tighter control over drainage and soil quality, which matters a lot for berries — too much standing water and the roots suffer fast.",
      "They also let us rotate plantings more deliberately, resting sections of the farm between growing cycles so the soil doesn't get worn down.",
      "Different berries have slightly different peak seasons in our climate, so what you see in the shop shifts throughout the year. We'd rather tell you honestly when something is in season than pretend everything is available year-round.",
      "It's a bit more planning on our end, but it's what keeps the fruit tasting the way it should.",
    ],
  },
];
