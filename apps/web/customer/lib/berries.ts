export type BerryKey = "strawberry" | "blueberry" | "blackberry" | "raspberry";

export type BerryInfo = {
  name: string;
  short: string;
  image: string;
  description: string;
  benefits: string[];
  nutrition: string[];
  price: string;
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
    ],
    nutrition: ["Vitamin C", "Folate", "Fiber", "Antioxidants"],
    price: "₹299 / 250g",
  },
  blueberry: {
    name: "Blueberry",
    short: "Deep purple, flavor-packed",
    image:
      "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1200&q=80",
    description:
      "Our blueberries are carefully harvested to deliver a burst of flavor, a soft texture, and a rich antioxidant profile.",
    benefits: [
      "Supports brain and heart health",
      "Packed with anthocyanins",
      "Helps protect cells from oxidative stress",
    ],
    nutrition: ["Vitamin K", "Manganese", "Fiber", "Antioxidants"],
    price: "₹399 / 250g",
  },
  blackberry: {
    name: "Blackberry",
    short: "Bold flavor, rich texture",
    image:
      "https://images.unsplash.com/photo-1576941089067-2de3c901e126?auto=format&fit=crop&w=1200&q=80",
    description:
      "Blackberries bring a deep, juicy taste with a naturally rich profile that stands out in desserts, smoothies, and fresh bowls.",
    benefits: [
      "High in fiber for digestion",
      "Supports immune function",
      "Loaded with natural polyphenols",
    ],
    nutrition: ["Fiber", "Vitamin C", "Manganese", "Polyphenols"],
    price: "₹349 / 250g",
  },
  raspberry: {
    name: "Raspberry",
    short: "Tangy, aromatic and vibrant",
    image:
      "https://images.unsplash.com/photo-1563557122714-1a0b8896d8be?auto=format&fit=crop&w=1200&q=80",
    description:
      "Crafted for freshness and aroma, our raspberries offer a bright, tangy flavor with soft texture and a vibrant ruby finish.",
    benefits: [
      "Excellent source of vitamin C",
      "Supports healthy skin and immunity",
      "Naturally uplifting and refreshing",
    ],
    nutrition: ["Vitamin C", "Fiber", "Potassium", "Antioxidants"],
    price: "₹329 / 250g",
  },
};

export const socialLinks = {
  facebook: "https://www.facebook.com/sharer/sharer.php?u=https://plantopiafarms.com",
  twitter: "https://twitter.com/intent/tweet?url=https://plantopiafarms.com&text=Fresh%20berries%20from%20Plantopia%20Farms",
  instagram: "https://www.instagram.com/plantopiafarms/",
};
