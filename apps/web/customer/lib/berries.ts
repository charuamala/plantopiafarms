export type BerryKey = "strawberry" | "blueberry" | "blackberry" | "raspberry";

export type BerryInfo = {
  name: string;
  short: string;
  image: string;
  description: string;
  benefits: string[];
  nutrition: string[];
  price: string;
  priceValue: number;
};

export const berryCatalog: Record<BerryKey, BerryInfo> = {
  strawberry: {
    name: "Strawberry",
    short: "Sweet, juicy and bright",
    image:
      "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=1200&q=80",
    description:
      "Plantopia strawberries are hand-picked at peak ripeness for a naturally sweet, juicy finish and vibrant red color.",
    benefits: [
      "Rich in vitamin C and antioxidants",
      "Supports skin health and immunity",
      "Naturally hydrating and low in calories",
      "Helps reduce oxidative stress after workouts",
      "Great for smoothies, desserts and refreshing breakfasts",
    ],
    nutrition: ["Vitamin C", "Folate", "Fiber", "Antioxidants"],
    price: "₹299 / 250g",
    priceValue: 299,
  },
  blueberry: {
    name: "Blueberry",
    short: "Deep purple, flavor-packed",
    image: "/images/blueberry.jpg",
    description:
      "Our blueberries are carefully harvested to deliver a burst of flavor, a soft texture, and a rich antioxidant profile.",
    benefits: [
      "Supports brain and heart health",
      "Packed with anthocyanins",
      "Helps protect cells from oxidative stress",
      "Aids eye health and sharper focus during busy days",
      "Perfect for yogurt bowls, oats, and post-workout snacks",
    ],
    nutrition: ["Vitamin K", "Manganese", "Fiber", "Antioxidants"],
    price: "₹399 / 250g",
    priceValue: 399,
  },
  blackberry: {
    name: "Blackberry",
    short: "Bold flavor, rich texture",
    image: "/images/blackberry.jpg",
    description:
      "Blackberries bring a deep, juicy taste with a naturally rich profile that stands out in desserts, smoothies, and fresh bowls.",
    benefits: [
      "High in fiber for digestion",
      "Supports immune function",
      "Loaded with natural polyphenols",
      "Helps keep energy levels steady throughout the day",
      "Adds a rich, fruity boost to smoothies and fruit bowls",
    ],
    nutrition: ["Fiber", "Vitamin C", "Manganese", "Polyphenols"],
    price: "₹349 / 250g",
    priceValue: 349,
  },
  raspberry: {
    name: "Raspberry",
    short: "Tangy, aromatic and vibrant",
    image: "/images/raspberry.jpg",
    description:
      "Crafted for freshness and aroma, our raspberries offer a bright, tangy flavor with soft texture and a vibrant ruby finish.",
    benefits: [
      "Excellent source of vitamin C",
      "Supports healthy skin and immunity",
      "Naturally uplifting and refreshing",
      "Helps maintain hydration with a light, clean finish",
      "Ideal for fruit plates, chia bowls, and summer cooling blends",
    ],
    nutrition: ["Vitamin C", "Fiber", "Potassium", "Antioxidants"],
    price: "₹329 / 250g",
    priceValue: 329,
  },
};

export const socialLinks = {
  facebook: "https://www.facebook.com/sharer/sharer.php?u=https://plantopiafarms.com",
  twitter: "https://twitter.com/intent/tweet?url=https://plantopiafarms.com&text=Fresh%20berries%20from%20Plantopia%20Farms",
  instagram: "https://www.instagram.com/plantopiafarms/",
};
