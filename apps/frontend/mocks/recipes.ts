import { Recipe } from "@/types";

export const recipes: Recipe[] = [
    {
        id: 1,
        title: "Spaghetti Carbonara",
        description: "Classic Italian pasta dish with creamy sauce.",
        prepTime: 10, // minutes 
        cookTime: 15, // minutes 
        servings: 2, // number of servings
        difficulty: "Medium", // Easy, Medium, Hard
        category: "MainDish", // MainDish, SideDish, Dessert, Soup, Salad,...
        image: "https://picsum.photos/400/250?random=1",
        ingredients: [
            { name: "Spaghetti", quantity: 200, unit: "g" },
            { name: "Eggs", quantity: 2, unit: "pcs" },
            { name: "Parmesan Cheese", quantity: 50, unit: "g" },
            { name: "Bacon", quantity: 100, unit: "g" },
            { name: "Salt", quantity: 1, unit: "tsp" },
            { name: "Black Pepper", quantity: 1, unit: "tsp" }
        ],
        steps: [
            { title: "Boil pasta", description: "Cook spaghetti in salted boiling water until al dente (8–10 mins)." },
            { title: "Cook bacon", description: "Fry bacon in a pan over medium heat until crispy." },
            { title: "Prepare sauce", description: "Whisk eggs with grated Parmesan until smooth and creamy." },
            { title: "Combine pasta & bacon", description: "Drain pasta and mix with crispy bacon in the pan." },
            { title: "Finish with sauce", description: "Remove pan from heat and stir in egg mixture. Season with salt & pepper." }
        ],
        authorId: 1,
        createdAt: "2025-08-30T10:00:00Z",
        updatedAt: "2025-08-30T10:00:00Z"
    },
    {
        id: 2,
        title: "Chocolate Cake",
        description: "Moist and rich chocolate sponge cake.",
        prepTime: 20,
        cookTime: 30,
        servings: 6,
        difficulty: "Hard",
        category: "Dessert",
        image: "https://picsum.photos/400/250?random=2",
        ingredients: [
            { name: "Flour", quantity: 200, unit: "g" },
            { name: "Cocoa Powder", quantity: 50, unit: "g" },
            { name: "Sugar", quantity: 150, unit: "g" },
            { name: "Butter", quantity: 100, unit: "g" },
            { name: "Eggs", quantity: 3, unit: "pcs" },
            { name: "Milk", quantity: 100, unit: "ml" }
        ],
        steps: [
            { title: "Mix dry ingredients", description: "Combine flour, cocoa powder, and sugar." },
            { title: "Add wet ingredients", description: "Stir in butter, eggs, and milk until smooth." },
            { title: "Bake", description: "Pour batter into a cake tin and bake at 180°C for 30 minutes." },
            { title: "Cool & serve", description: "Allow cake to cool before slicing and serving." }
        ],
        authorId: 2,
        createdAt: "2025-08-29T14:00:00Z",
        updatedAt: "2025-08-29T14:00:00Z"
    },
    {
        id: 3,
        title: "Caesar Salad",
        description: "Fresh romaine lettuce with creamy dressing and croutons.",
        prepTime: 15,
        cookTime: 0,
        servings: 2,
        difficulty: "Easy",
        category: "Salad",
        image: "https://picsum.photos/400/250?random=3",
        ingredients: [
            { name: "Romaine Lettuce", quantity: 200, unit: "g" },
            { name: "Croutons", quantity: 50, unit: "g" },
            { name: "Parmesan", quantity: 30, unit: "g" },
            { name: "Caesar Dressing", quantity: 50, unit: "ml" },
            { name: "Chicken Breast", quantity: 150, unit: "g" }
        ],
        steps: [
            { title: "Prepare lettuce", description: "Wash and chop romaine lettuce." },
            { title: "Cook chicken", description: "Grill chicken breast until fully cooked, then slice." },
            { title: "Assemble salad", description: "Toss lettuce with Caesar dressing." },
            { title: "Add toppings", description: "Top salad with croutons, Parmesan, and sliced chicken." }
        ],
        authorId: 3,
        createdAt: "2025-08-28T11:00:00Z",
        updatedAt: "2025-08-28T11:00:00Z"
    },
    {
        id: 4,
        title: "Tomato Soup",
        description: "Comforting soup made from fresh tomatoes and herbs.",
        prepTime: 10,
        cookTime: 25,
        servings: 3,
        difficulty: "Easy",
        category: "Soup",
        image: "https://picsum.photos/400/250?random=4",
        ingredients: [
            { name: "Tomatoes", quantity: 500, unit: "g" },
            { name: "Onion", quantity: 1, unit: "pcs" },
            { name: "Garlic", quantity: 2, unit: "cloves" },
            { name: "Vegetable Stock", quantity: 500, unit: "ml" },
            { name: "Olive Oil", quantity: 1, unit: "tbsp" },
            { name: "Salt", quantity: 1, unit: "tsp" }
        ],
        steps: [
            { title: "Prepare vegetables", description: "Chop tomatoes, onion, and garlic." },
            { title: "Sauté", description: "Cook onion and garlic in olive oil until fragrant." },
            { title: "Simmer", description: "Add tomatoes and vegetable stock. Simmer for 20 minutes." },
            { title: "Blend & season", description: "Blend until smooth and adjust seasoning to taste." }
        ],
        authorId: 2,
        createdAt: "2025-08-27T16:00:00Z",
        updatedAt: "2025-08-27T16:00:00Z"
    },
    {
        id: 5,
        title: "Fried Rice",
        description: "Quick stir-fried rice with vegetables and soy sauce.",
        prepTime: 10,
        cookTime: 15,
        servings: 2,
        difficulty: "Easy",
        category: "MainDish",
        image: "https://picsum.photos/400/250?random=5",
        ingredients: [
            { name: "Cooked Rice", quantity: 300, unit: "g" },
            { name: "Eggs", quantity: 2, unit: "pcs" },
            { name: "Carrot", quantity: 1, unit: "pcs" },
            { name: "Peas", quantity: 50, unit: "g" },
            { name: "Soy Sauce", quantity: 2, unit: "tbsp" },
            { name: "Spring Onion", quantity: 2, unit: "stalks" }
        ],
        steps: [
            { title: "Prepare vegetables", description: "Dice carrot and chop spring onions." },
            { title: "Scramble eggs", description: "Cook eggs in a hot wok until just set, then set aside." },
            { title: "Stir-fry rice", description: "Add rice, peas, carrot, and soy sauce. Stir-fry for 5 minutes." },
            { title: "Combine ingredients", description: "Add scrambled eggs and spring onion. Mix well and serve hot." }
        ],
        authorId: 1,
        createdAt: "2025-08-26T12:00:00Z",
        updatedAt: "2025-08-26T12:00:00Z"
    },
    {
        id: 6,
        title: "Pancakes",
        description: "Fluffy pancakes perfect for breakfast.",
        prepTime: 10,
        cookTime: 15,
        servings: 4,
        difficulty: "Easy",
        category: "Dessert",
        image: "https://picsum.photos/400/250?random=6",
        ingredients: [
            { name: "Flour", quantity: 200, unit: "g" },
            { name: "Milk", quantity: 300, unit: "ml" },
            { name: "Eggs", quantity: 2, unit: "pcs" }, 
            { name: "Baking Powder", quantity: 1, unit: "tsp" },
            { name: "Sugar", quantity: 2, unit: "tbsp" },
            { name: "Butter", quantity: 50, unit: "g" }
        ],
        steps: [
            { title: "Mix dry ingredients", description: "Combine flour, baking powder, and sugar." },
            { title: "Add wet ingredients", description: "Whisk in milk and eggs until smooth." },
            { title: "Cook pancakes", description: "Heat a pan and cook batter in small rounds until bubbles form, then flip." },
            { title: "Serve", description: "Serve pancakes warm with syrup or toppings of choice." }
        ],
        authorId: 3,
        createdAt: "2025-08-25T09:00:00Z",
        updatedAt: "2025-08-25T09:00:00Z"
    },    
      {
    id: 7,
    title: "Grilled Chicken",
    description: "Juicy grilled chicken marinated with herbs.",
    prepTime: 15,
    cookTime: 20,
    servings: 2,
    difficulty: "Medium",
    category: "MainDish",
    image: "https://picsum.photos/400/250?random=7",
    ingredients: [
      { name: "Chicken Thighs", quantity: 400, unit: "g" },
      { name: "Olive Oil", quantity: 2, unit: "tbsp" },
      { name: "Garlic", quantity: 2, unit: "cloves" },
      { name: "Lemon Juice", quantity: 1, unit: "tbsp" },
      { name: "Salt", quantity: 1, unit: "tsp" },
      { name: "Black Pepper", quantity: 1, unit: "tsp" }
    ],
    steps: [
      { title: "Marinate chicken", description: "Mix olive oil, garlic, lemon, salt, pepper; coat chicken." },
      { title: "Grill chicken", description: "Cook on medium heat for 8–10 minutes each side until done." },
      { title: "Rest & serve", description: "Let rest for 5 minutes before serving." }
    ],
    authorId: 2,
    createdAt: "2025-08-24T10:00:00Z",
    updatedAt: "2025-08-24T10:00:00Z"
  },
  {
    id: 8,
    title: "Mushroom Risotto",
    description: "Creamy rice dish with mushrooms and Parmesan.",
    prepTime: 15,
    cookTime: 30,
    servings: 3,
    difficulty: "Hard",
    category: "MainDish",
    image: "https://picsum.photos/400/250?random=8",
    ingredients: [
      { name: "Arborio Rice", quantity: 200, unit: "g" },
      { name: "Mushrooms", quantity: 150, unit: "g" },
      { name: "Vegetable Stock", quantity: 600, unit: "ml" },
      { name: "Onion", quantity: 1, unit: "pcs" },
      { name: "Parmesan", quantity: 50, unit: "g" },
      { name: "Butter", quantity: 30, unit: "g" }
    ],
    steps: [
      { title: "Cook onion & mushroom", description: "Sauté onion and mushroom in butter until soft." },
      { title: "Add rice", description: "Stir in Arborio rice and cook 2 minutes." },
      { title: "Add stock gradually", description: "Pour stock a ladle at a time, stirring until absorbed." },
      { title: "Finish with Parmesan", description: "Stir in Parmesan and adjust seasoning." }
    ],
    authorId: 1,
    createdAt: "2025-08-23T10:00:00Z",
    updatedAt: "2025-08-23T10:00:00Z"
  },
  {
    id: 9,
    title: "Fruit Smoothie",
    description: "Refreshing blended drink with fruits and yogurt.",
    prepTime: 5,
    cookTime: 0,
    servings: 2,
    difficulty: "Easy",
    category: "Dessert",
    image: "https://picsum.photos/400/250?random=9",
    ingredients: [
      { name: "Banana", quantity: 1, unit: "pcs" },
      { name: "Strawberries", quantity: 100, unit: "g" },
      { name: "Yogurt", quantity: 150, unit: "ml" },
      { name: "Honey", quantity: 1, unit: "tbsp" },
      { name: "Ice Cubes", quantity: 4, unit: "pcs" }
    ],
    steps: [
      { title: "Blend ingredients", description: "Combine all in a blender and blend until smooth." },
      { title: "Serve", description: "Pour into glasses and serve cold." }
    ],
    authorId: 3,
    createdAt: "2025-08-22T09:00:00Z",
    updatedAt: "2025-08-22T09:00:00Z"
  },
  {
    id: 10,
    title: "Beef Tacos",
    description: "Crispy tacos filled with seasoned beef and toppings.",
    prepTime: 15,
    cookTime: 10,
    servings: 3,
    difficulty: "Easy",
    category: "MainDish",
    image: "https://picsum.photos/400/250?random=10",
    ingredients: [
      { name: "Ground Beef", quantity: 250, unit: "g" },
      { name: "Taco Shells", quantity: 6, unit: "pcs" },
      { name: "Onion", quantity: 1, unit: "pcs" },
      { name: "Tomato", quantity: 1, unit: "pcs" },
      { name: "Cheddar Cheese", quantity: 50, unit: "g" },
      { name: "Lettuce", quantity: 50, unit: "g" }
    ],
    steps: [
      { title: "Cook beef", description: "Sauté onion then add ground beef, cook until browned." },
      { title: "Fill tacos", description: "Spoon beef into taco shells, top with tomato, lettuce, cheese." },
      { title: "Serve", description: "Serve immediately while crispy." }
    ],
    authorId: 2,
    createdAt: "2025-08-21T12:00:00Z",
    updatedAt: "2025-08-21T12:00:00Z"
  },
  {
    id: 11,
    title: "Garlic Bread",
    description: "Crispy bread topped with garlic butter.",
    prepTime: 5,
    cookTime: 10,
    servings: 4,
    difficulty: "Easy",
    category: "SideDish",
    image: "https://picsum.photos/400/250?random=11",
    ingredients: [
      { name: "Baguette", quantity: 1, unit: "pcs" },
      { name: "Butter", quantity: 50, unit: "g" },
      { name: "Garlic", quantity: 2, unit: "cloves" },
      { name: "Parsley", quantity: 1, unit: "tbsp" },
      { name: "Salt", quantity: 0.5, unit: "tsp" }
    ],
    steps: [
      { title: "Prepare butter mix", description: "Mix butter with minced garlic, parsley, salt." },
      { title: "Spread & bake", description: "Spread on bread and bake at 180°C for 8 minutes." },
      { title: "Serve", description: "Serve warm as side dish." }
    ],
    authorId: 1,
    createdAt: "2025-08-20T10:00:00Z",
    updatedAt: "2025-08-20T10:00:00Z"
  },
  {
    id: 12,
    title: "Greek Yogurt Parfait",
    description: "Layers of yogurt, granola, and fresh fruits.",
    prepTime: 5,
    cookTime: 0,
    servings: 2,
    difficulty: "Easy",
    category: "Dessert",
    image: "https://picsum.photos/400/250?random=12",
    ingredients: [
      { name: "Greek Yogurt", quantity: 200, unit: "g" },
      { name: "Granola", quantity: 50, unit: "g" },
      { name: "Blueberries", quantity: 50, unit: "g" },
      { name: "Honey", quantity: 1, unit: "tbsp" }
    ],
    steps: [
      { title: "Layer ingredients", description: "In a glass, layer yogurt, granola, and berries." },
      { title: "Drizzle honey", description: "Top with honey before serving." }
    ],
    authorId: 3,
    createdAt: "2025-08-19T08:00:00Z",
    updatedAt: "2025-08-19T08:00:00Z"
  },
  {
    id: 13,
    title: "Vegetable Stir-Fry",
    description: "Colorful vegetables quickly stir-fried with soy sauce.",
    prepTime: 10,
    cookTime: 10,
    servings: 2,
    difficulty: "Easy",
    category: "MainDish",
    image: "https://picsum.photos/400/250?random=13",
    ingredients: [
      { name: "Broccoli", quantity: 100, unit: "g" },
      { name: "Carrot", quantity: 1, unit: "pcs" },
      { name: "Bell Pepper", quantity: 1, unit: "pcs" },
      { name: "Soy Sauce", quantity: 2, unit: "tbsp" },
      { name: "Garlic", quantity: 2, unit: "cloves" }
    ],
    steps: [
      { title: "Prepare veggies", description: "Cut broccoli, carrot, pepper into bite-sized pieces." },
      { title: "Stir-fry", description: "Heat oil, add garlic then vegetables, cook 5 minutes." },
      { title: "Season", description: "Add soy sauce and toss to coat." }
    ],
    authorId: 2,
    createdAt: "2025-08-18T09:00:00Z",
    updatedAt: "2025-08-18T09:00:00Z"
  },
  {
    id: 14,
    title: "Banana Bread",
    description: "Moist sweet bread made with ripe bananas.",
    prepTime: 15,
    cookTime: 45,
    servings: 6,
    difficulty: "Medium",
    category: "Dessert",
    image: "https://picsum.photos/400/250?random=14",
    ingredients: [
      { name: "Bananas", quantity: 3, unit: "pcs" },
      { name: "Flour", quantity: 200, unit: "g" },
      { name: "Sugar", quantity: 100, unit: "g" },
      { name: "Butter", quantity: 80, unit: "g" },
      { name: "Egg", quantity: 1, unit: "pcs" }
    ],
    steps: [
      { title: "Mash bananas", description: "Mash ripe bananas in a bowl." },
      { title: "Mix batter", description: "Add butter, sugar, egg, then flour, mix well." },
      { title: "Bake", description: "Pour into loaf tin, bake at 175°C for 45 minutes." }
    ],
    authorId: 1,
    createdAt: "2025-08-17T10:00:00Z",
    updatedAt: "2025-08-17T10:00:00Z"
  },
  {
    id: 15,
    title: "Shrimp Pad Thai",
    description: "Classic Thai stir-fried noodles with shrimp.",
    prepTime: 15,
    cookTime: 15,
    servings: 2,
    difficulty: "Medium",
    category: "MainDish",
    image: "https://picsum.photos/400/250?random=15",
    ingredients: [
      { name: "Rice Noodles", quantity: 200, unit: "g" },
      { name: "Shrimp", quantity: 150, unit: "g" },
      { name: "Eggs", quantity: 2, unit: "pcs" },
      { name: "Bean Sprouts", quantity: 50, unit: "g" },
      { name: "Pad Thai Sauce", quantity: 3, unit: "tbsp" },
      { name: "Peanuts", quantity: 20, unit: "g" }
    ],
    steps: [
      { title: "Cook noodles", description: "Soak rice noodles then cook until tender." },
      { title: "Stir-fry shrimp & eggs", description: "In wok, cook shrimp then push aside, scramble eggs." },
      { title: "Add noodles & sauce", description: "Add noodles, sauce, toss with bean sprouts." },
      { title: "Top with peanuts", description: "Serve hot topped with crushed peanuts." }
    ],
    authorId: 3,
    createdAt: "2025-08-16T09:00:00Z",
    updatedAt: "2025-08-16T09:00:00Z"
  }
];
