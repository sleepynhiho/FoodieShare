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
    }
];
