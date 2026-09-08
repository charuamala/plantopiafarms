export type Recipe = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  berry: string;
  prepTime: string;
  difficulty: "Easy" | "Medium";
  servings: string;
  ingredients: string[];
  steps: string[];
};

export const recipes: Recipe[] = [
  {
    slug: "strawberry-lassi",
    title: "Strawberry Lassi",
    excerpt:
      "A cooling, Punjabi-style yogurt drink with fresh strawberries — ready in 5 minutes.",
    image: "/images/farm-strawberry-field.jpg",
    category: "Drinks",
    berry: "Strawberry",
    prepTime: "5 mins",
    difficulty: "Easy",
    servings: "2 glasses",
    ingredients: [
      "1 cup fresh strawberries, hulled",
      "1 cup thick curd (yogurt)",
      "1/2 cup chilled water or milk",
      "2 tbsp sugar or jaggery, to taste",
      "A pinch of cardamom powder",
      "Ice cubes",
    ],
    steps: [
      "Blend the strawberries, curd, water, sweetener, and cardamom until completely smooth.",
      "Taste and adjust sweetness — strawberries vary in tartness.",
      "Pour over ice and serve immediately, garnished with a halved strawberry on the rim.",
    ],
  },
  {
    slug: "blueberry-besan-chilla",
    title: "Blueberry Besan Chilla",
    excerpt:
      "A savoury-sweet twist on the classic gram flour chilla, studded with juicy blueberries.",
    image: "/images/farm-growing-care.jpg",
    category: "Breakfast",
    berry: "Blueberry",
    prepTime: "20 mins",
    difficulty: "Medium",
    servings: "4 chillas",
    ingredients: [
      "1 cup besan (gram flour)",
      "3/4 cup water",
      "1/2 cup fresh blueberries",
      "1/2 tsp ajwain (carom seeds)",
      "1/4 tsp turmeric",
      "Salt to taste",
      "Ghee or oil for cooking",
    ],
    steps: [
      "Whisk besan, water, ajwain, turmeric, and salt into a smooth, lump-free batter.",
      "Gently fold in the blueberries, taking care not to crush them.",
      "Heat a griddle, pour a ladle of batter, spread thin, and drizzle ghee around the edges.",
      "Cook until golden on both sides. Serve hot with mint chutney or plain yogurt.",
    ],
  },
  {
    slug: "mixed-berry-kheer",
    title: "Mixed Berry Kheer",
    excerpt:
      "Classic rice kheer finished with a vibrant blackberry and raspberry compote.",
    image: "/images/farm-harvest.jpg",
    category: "Dessert",
    berry: "Mixed Berry",
    prepTime: "40 mins",
    difficulty: "Medium",
    servings: "4 servings",
    ingredients: [
      "1/4 cup basmati rice, rinsed",
      "1 litre full-fat milk",
      "1/3 cup sugar",
      "4-5 green cardamom pods, crushed",
      "1 cup blackberries and raspberries, mixed",
      "2 tbsp chopped pistachios",
    ],
    steps: [
      "Simmer rice in milk on low heat, stirring often, until thick and creamy — about 30 minutes.",
      "Stir in sugar and cardamom, and cook 5 more minutes.",
      "Meanwhile, gently mash half the berries with a spoon of sugar to make a quick compote; keep the rest whole.",
      "Swirl the berry compote through the warm kheer, top with whole berries and pistachios, and serve warm or chilled.",
    ],
  },
  {
    slug: "raspberry-chia-smoothie-bowl",
    title: "Raspberry Chia Smoothie Bowl",
    excerpt: "A bright, protein-packed breakfast bowl ready before your chai cools down.",
    image: "/images/farm-jam.jpg",
    category: "Breakfast",
    berry: "Raspberry",
    prepTime: "10 mins",
    difficulty: "Easy",
    servings: "1 bowl",
    ingredients: [
      "1 cup frozen raspberries",
      "1 frozen banana",
      "1/2 cup curd or plant milk",
      "1 tbsp chia seeds",
      "Toppings: granola, sliced almonds, fresh raspberries, coconut flakes",
    ],
    steps: [
      "Blend raspberries, banana, and curd until thick — closer to soft-serve than a drink.",
      "Pour into a bowl and sprinkle chia seeds over the top.",
      "Arrange granola, almonds, fresh raspberries, and coconut flakes in rows and serve immediately.",
    ],
  },
  {
    slug: "blackberry-jamun-shrikhand",
    title: "Blackberry Shrikhand",
    excerpt: "Strained-yogurt shrikhand swirled with fresh blackberry pulp — a five-minute festive sweet.",
    image: "/images/farm-strawberry-field.jpg",
    category: "Dessert",
    berry: "Blackberry",
    prepTime: "15 mins (plus straining time)",
    difficulty: "Easy",
    servings: "4 servings",
    ingredients: [
      "2 cups thick hung curd (yogurt strained overnight)",
      "1/2 cup fresh blackberries",
      "1/4 cup powdered sugar",
      "A pinch of saffron, soaked in 1 tbsp warm milk",
      "Chopped pistachios, to garnish",
    ],
    steps: [
      "Mash the blackberries through a sieve to get a smooth pulp, discarding the seeds if preferred.",
      "Whisk the hung curd, powdered sugar, and saffron milk until smooth and glossy.",
      "Swirl in the blackberry pulp — don't overmix, so you get a marbled effect.",
      "Chill for at least 30 minutes and garnish with pistachios before serving.",
    ],
  },
  {
    slug: "berry-falooda",
    title: "Mixed Berry Falooda",
    excerpt: "A layered, festival-worthy dessert drink with berries standing in for the classic rose syrup.",
    image: "/images/farm-growing-care.jpg",
    category: "Dessert",
    berry: "Mixed Berry",
    prepTime: "25 mins",
    difficulty: "Medium",
    servings: "2 tall glasses",
    ingredients: [
      "2 tbsp falooda sabja (basil) seeds, soaked in water for 15 minutes",
      "1/2 cup cooked falooda vermicelli, cooled",
      "1 cup mixed berry puree (strawberry, raspberry, blackberry)",
      "2 cups chilled milk",
      "2 scoops vanilla ice cream",
      "Fresh berries and chopped nuts, to garnish",
    ],
    steps: [
      "In each tall glass, layer soaked sabja seeds, then falooda vermicelli.",
      "Spoon in the berry puree, then slowly pour in chilled milk.",
      "Top with a scoop of vanilla ice cream and garnish with fresh berries and nuts.",
      "Serve immediately with a long spoon and straw.",
    ],
  },
];

export function getRecipeBySlug(slug: string): Recipe | undefined {
  return recipes.find((recipe) => recipe.slug === slug);
}
