import { Product, Recipe, Testimonial, FAQItem } from "./types";

export const PRODUCT_DATA: Product = {
  id: "dulce-de-coco-original",
  name: "Dulce de Coco Coconut Sweetened Condensed Milk",
  tagline: "The velvety, 100% plant-based replacement for traditional sweetened condensed milk.",
  price: 8.99,
  rating: 4.9,
  reviewsCount: 148,
  description: "Dulce de Coco is crafted for those who believe dietary choices or restrictions shouldn't mean compromising on life's sweetest moments. Made with organic coconuts, our sweetened condensed milk alternative delivers the exact same rich, luscious, and velvety texture as dairy condensed milk—without a single drop of lactose, gluten, or animal products. Perfect for direct baking, morning lattes, rich custards, or straight from the spoon.",
  ingredients: [
    "Organic Coconut Milk (Coconut Cream, Water)",
    "Organic Coconut Sugar",
    "Natural Vanilla Extract",
    "Sea Salt"
  ],
  nutritionalHighlights: [
    { label: "Calories", value: "60 (per tbsp)" },
    { label: "Total Fat", value: "2.5g" },
    { label: "Sodium", value: "15mg" },
    { label: "Total Carbs", value: "9g" },
    { label: "Sugars", value: "8g" },
    { label: "Cholesterol", value: "0mg" }
  ],
  uses: [
    "Drizzle over cakes, waffles, and pancakes",
    "Stir into hot coffee, cold brew, or lattes",
    "Bake into vegan cookies, pies, and bars",
    "Blend into tropical smoothies and milkshakes",
    "Create perfect vegan flan, fudge, or brigadeiros",
    "Substitute 1:1 in any recipe calling for dairy sweetened condensed milk"
  ],
  image: "/src/assets/images/product_jar_1783719731487.jpg"
};

export const FEATURES_DATA = [
  {
    title: "100% Vegan",
    desc: "Entirely plant-based and made without any animal-derived ingredients.",
    icon: "Leaf"
  },
  {
    title: "Gluten-Free",
    desc: "Celiac-safe and crafted in a dedicated wheat-free environment.",
    icon: "Sparkles"
  },
  {
    title: "Dairy-Free",
    desc: "Perfect for lactose intolerance and dairy allergies. Pure coconut cream base.",
    icon: "ShieldAlert"
  },
  {
    title: "Allergy-Friendly",
    desc: "Free from common allergens including soy, nuts, peanuts, and dairy.",
    icon: "Heart"
  },
  {
    title: "Creamy Texture",
    desc: "Thick, slow-pouring, and perfectly smooth consistency for authentic cooking.",
    icon: "Droplets"
  },
  {
    title: "Rich Flavor",
    desc: "Deep, natural caramel-like sweetness enhanced by hints of real vanilla.",
    icon: "Star"
  },
  {
    title: "Perfect for Baking",
    desc: "Caramelizes, sets, and binds just like standard dairy-based recipes.",
    icon: "Flame"
  },
  {
    title: "Great for Coffee",
    desc: "Dissolves beautifully in hot or iced drinks, adding instant creamy sweetness.",
    icon: "Coffee"
  },
  {
    title: "Naturally Delicious",
    desc: "No artificial flavorings, high-fructose corn syrups, or palm oils.",
    icon: "Apple"
  }
];

export const RECIPES_DATA: Recipe[] = [
  {
    id: "vegan-flan",
    title: "Vegan Coconut Flan",
    difficulty: "Medium",
    prepTime: "40 mins (+ chill)",
    description: "A silky-smooth, melt-in-your-mouth tropical flan that uses Dulce de Coco to achieve a flawless custard structure without eggs or dairy.",
    ingredients: [
      "1 jar (11.5 oz) Dulce de Coco Sweetened Condensed Milk",
      "1.5 cups Organic Coconut Cream (unsweetened)",
      "1 cup Almond or Oat Milk",
      "2 tsp Agar-Agar powder (for setting)",
      "1 tsp Vanilla extract",
      "1/2 cup Organic Cane Sugar (for caramel topping)",
      "3 tbsp Water"
    ],
    instructions: [
      "Caramelize the Sugar: In a small saucepan over medium heat, combine the cane sugar and water. Swirl gently (do not stir) until it dissolves and turns a rich golden-amber color. Immediately pour into the bottom of your ramekins or flan mold, tilting to coat the bottom. Let it cool and harden.",
      "Prepare the Custard: In another saucepan, whisk together the coconut cream, oat milk, and agar-agar powder. Bring to a gentle boil, stirring constantly, and simmer for 2 minutes to activate the agar-agar.",
      "Blend & Cook: Stir in the entire jar of Dulce de Coco and vanilla extract. Whisk thoroughly over low heat for 3 more minutes until fully integrated and smooth.",
      "Pour & Chill: Carefully pour the warm mixture over the hardened caramel in the molds. Let cool to room temperature, then cover and refrigerate for at least 3-4 hours until completely set.",
      "Serve: Run a thin knife around the edges of the mold. Invert a serving plate over the mold, flip quickly, and lift the mold gently to let the golden caramel cascade over the flan."
    ],
    image: "/src/assets/images/vegan_flan_1783719745283.jpg"
  },
  {
    id: "coconut-latte",
    title: "Signature Coconut Latte",
    difficulty: "Easy",
    prepTime: "5 mins",
    description: "Upgrade your morning brew with a rich, caramel-noted tropical latte sweetened naturally with coconut condensed milk.",
    ingredients: [
      "2 tbsp Dulce de Coco Sweetened Condensed Milk",
      "2 shots of hot Espresso (or 1/2 cup strong brewed coffee)",
      "3/4 cup Oat Milk or Almond Milk",
      "Toasted coconut flakes (for garnish)"
    ],
    instructions: [
      "Sweeten the Cup: Spoon 2 tablespoons of Dulce de Coco into the bottom of your favorite coffee mug.",
      "Brew Espresso: Extract 2 fresh shots of hot espresso directly over the coconut condensed milk. Stir immediately until dissolved into a rich, sweet syrup.",
      "Steam & Froth: Heat and froth your choice of plant-based milk to around 140°F until silky foam forms.",
      "Combine & Garnish: Gently pour the frothed milk over the sweetened espresso. Top with a sprinkle of toasted coconut flakes and enjoy warm."
    ],
    image: "/src/assets/images/coconut_latte_1783719755344.jpg"
  },
  {
    id: "tres-leches-alt",
    title: "Plant-Based Tres Leches",
    difficulty: "Advanced",
    prepTime: "1 hour (+ soak)",
    description: "An incredibly moist sponge cake soaked in a delicious vegan 'three milks' mixture made with Dulce de Coco.",
    ingredients: [
      "1.5 cups Gluten-free all-purpose baking flour",
      "1 cup Organic sugar & 1 tbsp Baking powder",
      "1/2 cup Applesauce & 1/2 cup Almond milk (for cake batter)",
      "Soak liquid: 3/4 cup Dulce de Coco",
      "Soak liquid: 1 cup Light coconut milk",
      "Soak liquid: 1/2 cup Unsweetened oat milk",
      "Topping: Whipped coconut cream & Ground cinnamon"
    ],
    instructions: [
      "Bake the Sponge: Whisk flour, sugar, baking powder. Fold in applesauce, almond milk, and vanilla. Pour into a greased 8x8 baking pan. Bake at 350°F for 25-30 minutes until golden.",
      "Whisk the Soak: In a bowl, whisk together the soak liquids: Dulce de Coco, light coconut milk, and oat milk until silky.",
      "Soak Cake: Once the sponge cools slightly, poke holes all over with a fork. Slowly pour the soak mixture over the cake. Cover and chill in the fridge overnight to absorb.",
      "Decorate: Top with whipped coconut cream and a dusting of fragrant ground cinnamon before slicing."
    ],
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "coconut-cheesecake",
    title: "Raw Coconut Cream Cheesecake",
    difficulty: "Medium",
    prepTime: "30 mins (+ freeze)",
    description: "A velvety raw dessert featuring a gluten-free pecan-date crust and a decadent, creamy filling sweetened with Dulce de Coco.",
    ingredients: [
      "1 cup Raw pecans & 1 cup Medjool dates (for crust)",
      "2 cups Raw cashews (soaked in boiling water for 1 hour)",
      "1/2 cup Unsweetened coconut cream",
      "1/2 cup Dulce de Coco",
      "3 tbsp Melted coconut oil",
      "1 tbsp Fresh lemon juice",
      "1 tsp Vanilla bean paste"
    ],
    instructions: [
      "Press the Crust: Pulse pecans and pitted dates in a food processor until a sticky crumb forms. Press firmly into a 7-inch springform pan. Set in freezer.",
      "Blend the Filling: Drain cashews. Blend Cashews, coconut cream, Dulce de Coco, coconut oil, lemon juice, and vanilla bean paste in a high-speed blender until absolutely smooth and glossy.",
      "Set: Pour filling over the crust. Smooth the top with a spatula. Freeze for at least 4 hours until firm.",
      "Garnish: Let thaw for 15 minutes before serving. Garnish with coconut curls and fresh raspberries."
    ],
    image: "/src/assets/images/coconut_cheesecake_1783719767180.jpg"
  },
  {
    id: "vegan-brigadeiros",
    title: "Vegan Coconut Fudge Truffles",
    difficulty: "Medium",
    prepTime: "25 mins (+ chill)",
    description: "A vegan, dairy-free twist on the traditional Brazilian chocolate fudge truffle, cooked to caramelized perfection.",
    ingredients: [
      "1 jar (11.5 oz) Dulce de Coco Sweetened Condensed Milk",
      "1/4 cup Cocoa powder (unsweetened, high quality)",
      "2 tbsp Vegan butter or Coconut oil",
      "Chocolate sprinkles or shredded coconut for rolling"
    ],
    instructions: [
      "Cook the Fudge: In a small saucepan over medium-low heat, combine Dulce de Coco, sifted cocoa powder, and vegan butter.",
      "Thicken: Whisk and cook constantly for about 12-15 minutes. The mixture is ready when it thickens significantly and pulls away cleanly from the bottom of the pan.",
      "Cool: Pour the warm mixture onto a buttered plate and spread. Refrigerate for 1 hour until chilled and solid.",
      "Roll: Grease your hands with a bit of coconut oil. Scoop small portions and roll into 1-inch balls. Roll in sprinkles or shredded coconut to coat fully."
    ],
    image: "https://images.unsplash.com/photo-1541795795328-f073b763494e?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "tropical-smoothie",
    title: "Dulce Tropical Green Smoothie",
    difficulty: "Easy",
    prepTime: "5 mins",
    description: "A supercharged tropical smoothie featuring mango, pineapple, spinach, and a healthy splash of coconut sweet condensed milk.",
    ingredients: [
      "1.5 tbsp Dulce de Coco Sweetened Condensed Milk",
      "1 cup Frozen mango chunks",
      "1/2 cup Frozen pineapple chunks",
      "1 cup Fresh baby spinach",
      "1 cup Unsweetened coconut water or almond milk"
    ],
    instructions: [
      "Assemble: Put all ingredients in a high-speed blender, starting with liquid, then spinach, frozen fruit, and finally Dulce de Coco.",
      "Blend: Process on high speed until completely smooth, vibrant green, and creamy.",
      "Serve: Pour into a tall glass, garnish with a lime wheel or a sprinkle of chia seeds, and enjoy cold."
    ],
    image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&q=80&w=600"
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: "test-1",
    name: "Sarah Jenkins",
    location: "Orlando, FL",
    quote: "I haven't had a proper Tres Leches cake in 7 years due to severe dairy allergies. Finding Dulce de Coco has completely changed my life! The texture and sweetness are absolutely indistinguishable from real condensed milk.",
    rating: 5,
    avatarLetter: "S"
  },
  {
    id: "test-2",
    name: "Marcus Ramirez",
    location: "Davenport, FL",
    quote: "I use this in my espresso bar every single morning. It dissolves seamlessly and creates a coconut latte that customers drive from miles around to order. It's incredibly creamy and not overly heavy.",
    rating: 5,
    avatarLetter: "M"
  },
  {
    id: "test-3",
    name: "Clara Mendoza",
    location: "Tampa, FL",
    quote: "Baking vegan flan is notoriously tricky, but Dulce de Coco carmelaizes perfectly and holds the structure. The subtle coconut-vanilla aroma adds a whole new dimension of gourmet flavor. Highly, highly recommend!",
    rating: 5,
    avatarLetter: "C"
  },
  {
    id: "test-4",
    name: "Elena Thompson",
    location: "Kissimmee, FL",
    quote: "As a mom of three boys with multiple food allergies (dairy, nuts, gluten), dessert time used to be a headache. This single product has brought chocolate brigadeiros and coconut cakes back to our dinner table. Safe, delicious, and trusted.",
    rating: 5,
    avatarLetter: "E"
  }
];

export const FAQ_DATA: FAQItem[] = [
  {
    id: "faq-1",
    question: "Is Dulce de Coco 100% vegan?",
    answer: "Yes, absolutely! Our sweetened coconut condensed milk alternative is made entirely from organic plants and contains zero dairy, lactose, or animal byproducts."
  },
  {
    id: "faq-2",
    question: "Is it gluten-free and celiac-safe?",
    answer: "Yes! Dulce de Coco is naturally gluten-free and processed in a dedicated wheat-free and gluten-free environment to prevent any cross-contamination."
  },
  {
    id: "faq-3",
    question: "Does it contain dairy or lactose?",
    answer: "No, it is 100% dairy-free, casein-free, and lactose-free. We use organic coconut cream as our rich base, making it perfectly safe for lactose intolerance and milk allergies."
  },
  {
    id: "faq-4",
    question: "Is it allergy-friendly?",
    answer: "Yes, our formula is free from common top allergens: dairy, gluten, soy, eggs, peanuts, and tree nuts (except coconut itself, which is technically a fruit but classified by the FDA as a tree nut). We maintain high allergy safety standards."
  },
  {
    id: "faq-5",
    question: "How should I store Dulce de Coco?",
    answer: "Unopened cans or jars can be stored in a cool, dry pantry for up to 12 months. Once opened, please transfer any unused portion to a clean airtight container, keep refrigerated, and consume within 7 to 10 days."
  },
  {
    id: "faq-6",
    question: "Can I use it for baking just like traditional condensed milk?",
    answer: "Yes, beautifully! It substitutes at a 1:1 ratio in cookies, fudge, pies, flans, cakes, and candy. Because it contains natural sugars from coconut, it caramelizes brilliantly under heat."
  },
  {
    id: "faq-7",
    question: "Can I use it in coffee or lattes?",
    answer: "Absolutely! It acts as both a premium sweetener and creamer. It dissolves beautifully in hot espresso, iced lattes, matcha, tea, or cold brews, leaving a smooth, rich flavor profile."
  }
];
