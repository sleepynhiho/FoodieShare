import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed process...");

  // Clear existing data
  console.log("🧹 Cleaning existing data...");
  await prisma.rating.deleteMany();
  await prisma.favorite.deleteMany();
  await prisma.recipeStep.deleteMany();
  await prisma.recipeIngredient.deleteMany();
  await prisma.recipe.deleteMany();
  await prisma.user.deleteMany();

  // Create users
  console.log("👥 Creating users...");
  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: "chef.maria@foodieshare.com",
        username: "chef_maria",
        avatar:
          "https://plus.unsplash.com/premium_photo-1666264200737-acad542a92ff?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cG9ydHJhaXRzJTIwb2YlMjB3b21lbnxlbnwwfHwwfHx8MA%3D%3D",
      },
    }),
    prisma.user.create({
      data: {
        email: "baker.john@foodieshare.com",
        username: "baker_john",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      },
    }),
    prisma.user.create({
      data: {
        email: "healthy.sarah@foodieshare.com",
        username: "healthy_sarah",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      },
    }),
    prisma.user.create({
      data: {
        email: "spice.master@foodieshare.com",
        username: "spice_master",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      },
    }),
    prisma.user.create({
      data: {
        email: "dessert.queen@foodieshare.com",
        username: "dessert_queen",
        avatar:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      },
    }),
    prisma.user.create({
      data: {
        email: "vegan.vicky@foodieshare.com",
        username: "vegan_vicky",
        avatar:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
      },
    }),
    prisma.user.create({
      data: {
        email: "grill.guru@foodieshare.com",
        username: "grill_guru",
        avatar:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      },
    }),
    prisma.user.create({
      data: {
        email: "pasta.prince@foodieshare.com",
        username: "pasta_prince",
        avatar:
          "https://images.unsplash.com/photo-1520854221256-17451cb3ce86?w=150&h=150&fit=crop&crop=face",
      },
    }),
    prisma.user.create({
      data: {
        email: "smoothie.sally@foodieshare.com",
        username: "smoothie_sally",
        avatar:
          "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
      },
    }),
    prisma.user.create({
      data: {
        email: "coffee.connoisseur@foodieshare.com",
        username: "coffee_connoisseur",
        avatar:
          "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=150&h=150&fit=crop&crop=face",
      },
    }),
    prisma.user.create({
      data: {
        email: "soup.specialist@foodieshare.com",
        username: "soup_specialist",
        avatar:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
      },
    }),
    prisma.user.create({
      data: {
        email: "cocktail.chris@foodieshare.com",
        username: "cocktail_chris",
        avatar:
          "https://images.unsplash.com/photo-1499952127958-e4b9f30b200b?w=150&h=150&fit=crop&crop=face",
      },
    }),
    prisma.user.create({
      data: {
        email: "taco.tina@foodieshare.com",
        username: "taco_tina",
        avatar:
          "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
      },
    }),
    prisma.user.create({
      data: {
        email: "bbq.bill@foodieshare.com",
        username: "bbq_bill",
        avatar:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      },
    }),
    prisma.user.create({
      data: {
        email: "pie.piper@foodieshare.com",
        username: "pie_piper",
        avatar:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      },
    }),
    prisma.user.create({
      data: {
        email: "stirfry.steve@foodieshare.com",
        username: "stirfry_steve",
        avatar:
          "https://images.unsplash.com/photo-1519085360753-af02916ce432?w=150&h=150&fit=crop&crop=face",
      },
    }),
    prisma.user.create({
      data: {
        email: "curry.catherine@foodieshare.com",
        username: "curry_catherine",
        avatar:
          "https://images.unsplash.com/photo-1528892952291-009c6695fd8e?w=150&h=150&fit=crop&crop=face",
      },
    }),
    prisma.user.create({
      data: {
        email: "brunch.ben@foodieshare.com",
        username: "brunch_ben",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      },
    }),
    prisma.user.create({
      data: {
        email: "snack.sophie@foodieshare.com",
        username: "snack_sophie",
        avatar:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
      },
    }),
    prisma.user.create({
      data: {
        email: "gourmet.greg@foodieshare.com",
        username: "gourmet_greg",
        avatar:
          "https://images.unsplash.com/photo-1519085360753-af02916ce432?w=150&h=150&fit=crop&crop=face",
      },
    }),
  ]);

  console.log(`✅ Created ${users.length} users`);

  // Create recipes
  console.log("🍳 Creating recipes...");

  const recipesData = [
    {
      title: "Classic Spaghetti Carbonara",
      description:
        "A traditional Italian pasta dish with eggs, cheese, pancetta, and pepper. Simple yet absolutely delicious!",
      image:
        "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=800&h=600&fit=crop",
      category: "MainDish",
      cookingTime: 20,
      prepTime: 10,
      servings: 4,
      difficulty: "Easy",
      avgRating: 4.8,
      totalRating: 24,
      userId: users[0].id,
      ingredients: [
        {
          name: "Spaghetti",
          quantity: 400,
          unit: "g",
          note: "High quality pasta",
        },
        { name: "Pancetta", quantity: 200, unit: "g", note: "Diced" },
        {
          name: "Large eggs",
          quantity: 4,
          unit: "pieces",
          note: "Room temperature",
        },
        {
          name: "Pecorino Romano cheese",
          quantity: 100,
          unit: "g",
          note: "Freshly grated",
        },
        {
          name: "Black pepper",
          quantity: 1,
          unit: "tsp",
          note: "Freshly ground",
        },
        { name: "Salt", quantity: 1, unit: "tsp", note: "For pasta water" },
      ],
      steps: [
        {
          title: "Prepare ingredients",
          description:
            "Bring a large pot of salted water to boil. Dice pancetta and grate cheese.",
        },
        {
          title: "Cook pancetta",
          description:
            "In a large pan, cook pancetta over medium heat until crispy, about 5-7 minutes.",
        },
        {
          title: "Cook pasta",
          description:
            "Add spaghetti to boiling water and cook according to package directions until al dente.",
        },
        {
          title: "Mix eggs and cheese",
          description:
            "In a bowl, whisk together eggs, grated cheese, and black pepper.",
        },
        {
          title: "Combine",
          description:
            "Drain pasta, reserving 1 cup pasta water. Add hot pasta to pancetta pan.",
        },
        {
          title: "Finish",
          description:
            "Remove from heat, add egg mixture, toss quickly. Add pasta water if needed. Serve immediately.",
        },
      ],
    },
    {
      title: "Chocolate Chip Cookies",
      description:
        "Soft, chewy, and loaded with chocolate chips. The perfect homemade cookie recipe!",
      image:
        "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&h=600&fit=crop",
      category: "Dessert",
      cookingTime: 12,
      prepTime: 15,
      servings: 24,
      difficulty: "Easy",
      avgRating: 4.9,
      totalRating: 36,
      userId: users[1].id,
      ingredients: [
        {
          name: "All-purpose flour",
          quantity: 2.25,
          unit: "cups",
          note: "Sifted",
        },
        { name: "Baking soda", quantity: 1, unit: "tsp", note: "" },
        { name: "Salt", quantity: 1, unit: "tsp", note: "" },
        { name: "Butter", quantity: 1, unit: "cup", note: "Softened" },
        { name: "Brown sugar", quantity: 0.75, unit: "cup", note: "Packed" },
        { name: "Granulated sugar", quantity: 0.75, unit: "cup", note: "" },
        { name: "Large eggs", quantity: 2, unit: "pieces", note: "" },
        { name: "Vanilla extract", quantity: 2, unit: "tsp", note: "" },
        {
          name: "Chocolate chips",
          quantity: 2,
          unit: "cups",
          note: "Semi-sweet",
        },
      ],
      steps: [
        {
          title: "Preheat oven",
          description:
            "Preheat oven to 375°F (190°C). Line baking sheets with parchment paper.",
        },
        {
          title: "Mix dry ingredients",
          description:
            "In a bowl, whisk together flour, baking soda, and salt.",
        },
        {
          title: "Cream butter and sugars",
          description:
            "In a large bowl, cream together butter and both sugars until light and fluffy.",
        },
        {
          title: "Add eggs and vanilla",
          description: "Beat in eggs one at a time, then add vanilla extract.",
        },
        {
          title: "Combine wet and dry",
          description: "Gradually mix in flour mixture until just combined.",
        },
        {
          title: "Add chocolate chips",
          description: "Fold in chocolate chips until evenly distributed.",
        },
        {
          title: "Bake",
          description:
            "Drop rounded tablespoons of dough onto prepared baking sheets. Bake 9-11 minutes until golden brown.",
        },
      ],
    },
    {
      title: "Mediterranean Quinoa Salad",
      description:
        "A healthy, refreshing salad packed with quinoa, vegetables, and a zesty lemon dressing.",
      image:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=600&fit=crop",
      category: "Salad",
      cookingTime: 15,
      prepTime: 20,
      servings: 6,
      difficulty: "Easy",
      avgRating: 4.6,
      totalRating: 18,
      userId: users[2].id,
      ingredients: [
        { name: "Quinoa", quantity: 1, unit: "cup", note: "Rinsed" },
        { name: "Cucumber", quantity: 2, unit: "pieces", note: "Diced" },
        { name: "Cherry tomatoes", quantity: 2, unit: "cups", note: "Halved" },
        {
          name: "Red onion",
          quantity: 0.5,
          unit: "piece",
          note: "Finely diced",
        },
        { name: "Feta cheese", quantity: 1, unit: "cup", note: "Crumbled" },
        {
          name: "Kalamata olives",
          quantity: 0.5,
          unit: "cup",
          note: "Pitted and halved",
        },
        { name: "Fresh parsley", quantity: 0.5, unit: "cup", note: "Chopped" },
        { name: "Lemon juice", quantity: 0.25, unit: "cup", note: "Fresh" },
        {
          name: "Olive oil",
          quantity: 0.25,
          unit: "cup",
          note: "Extra virgin",
        },
        { name: "Salt and pepper", quantity: 1, unit: "tsp", note: "To taste" },
      ],
      steps: [
        {
          title: "Cook quinoa",
          description:
            "Cook quinoa according to package directions. Let cool completely.",
        },
        {
          title: "Prepare vegetables",
          description:
            "Dice cucumber and red onion, halve cherry tomatoes and olives.",
        },
        {
          title: "Make dressing",
          description:
            "Whisk together lemon juice, olive oil, salt, and pepper.",
        },
        {
          title: "Combine",
          description:
            "In a large bowl, combine quinoa, vegetables, feta, and parsley.",
        },
        {
          title: "Dress and serve",
          description:
            "Pour dressing over salad and toss well. Chill for 30 minutes before serving.",
        },
      ],
    },
    {
      title: "Spicy Thai Red Curry",
      description:
        "Aromatic and spicy Thai curry with tender chicken and vegetables in coconut milk.",
      image:
        "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=800&h=600&fit=crop",
      category: "MainDish",
      cookingTime: 25,
      prepTime: 15,
      servings: 4,
      difficulty: "Medium",
      avgRating: 4.7,
      totalRating: 21,
      userId: users[3].id,
      ingredients: [
        {
          name: "Chicken breast",
          quantity: 500,
          unit: "g",
          note: "Cut into strips",
        },
        {
          name: "Red curry paste",
          quantity: 3,
          unit: "tbsp",
          note: "Thai brand preferred",
        },
        { name: "Coconut milk", quantity: 400, unit: "ml", note: "Full-fat" },
        { name: "Bell peppers", quantity: 2, unit: "pieces", note: "Sliced" },
        { name: "Baby corn", quantity: 200, unit: "g", note: "Halved" },
        { name: "Thai basil", quantity: 1, unit: "cup", note: "Fresh leaves" },
        { name: "Fish sauce", quantity: 2, unit: "tbsp", note: "" },
        {
          name: "Palm sugar",
          quantity: 1,
          unit: "tbsp",
          note: "Or brown sugar",
        },
        { name: "Lime juice", quantity: 2, unit: "tbsp", note: "Fresh" },
      ],
      steps: [
        {
          title: "Heat oil",
          description: "Heat oil in a large pan or wok over medium-high heat.",
        },
        {
          title: "Cook curry paste",
          description:
            "Add curry paste and cook for 1-2 minutes until fragrant.",
        },
        {
          title: "Add coconut milk",
          description:
            "Gradually add coconut milk, stirring to combine with paste.",
        },
        {
          title: "Add chicken",
          description:
            "Add chicken and cook for 5-7 minutes until nearly cooked through.",
        },
        {
          title: "Add vegetables",
          description: "Add bell peppers and baby corn, cook for 3-4 minutes.",
        },
        {
          title: "Season",
          description:
            "Add fish sauce, palm sugar, and lime juice. Taste and adjust seasoning.",
        },
        {
          title: "Finish",
          description:
            "Remove from heat, stir in Thai basil. Serve with jasmine rice.",
        },
      ],
    },
    {
      title: "Classic Caesar Salad",
      description:
        "Crisp romaine lettuce with homemade Caesar dressing, croutons, and parmesan cheese.",
      image:
        "https://images.unsplash.com/photo-1551248429-40975aa4de74?w=800&h=600&fit=crop",
      category: "Salad",
      cookingTime: 0,
      prepTime: 20,
      servings: 4,
      difficulty: "Easy",
      avgRating: 4.4,
      totalRating: 16,
      userId: users[0].id,
      ingredients: [
        {
          name: "Romaine lettuce",
          quantity: 2,
          unit: "heads",
          note: "Chopped",
        },
        {
          name: "Parmesan cheese",
          quantity: 1,
          unit: "cup",
          note: "Freshly grated",
        },
        {
          name: "Croutons",
          quantity: 2,
          unit: "cups",
          note: "Homemade preferred",
        },
        { name: "Mayonnaise", quantity: 0.5, unit: "cup", note: "" },
        { name: "Lemon juice", quantity: 2, unit: "tbsp", note: "Fresh" },
        { name: "Worcestershire sauce", quantity: 1, unit: "tsp", note: "" },
        { name: "Dijon mustard", quantity: 1, unit: "tsp", note: "" },
        { name: "Garlic", quantity: 2, unit: "cloves", note: "Minced" },
        { name: "Anchovy paste", quantity: 1, unit: "tsp", note: "Optional" },
      ],
      steps: [
        {
          title: "Make dressing",
          description:
            "Whisk together mayonnaise, lemon juice, Worcestershire, mustard, garlic, and anchovy paste.",
        },
        {
          title: "Prepare lettuce",
          description: "Wash and chop romaine lettuce, spin dry thoroughly.",
        },
        {
          title: "Assemble",
          description:
            "In a large bowl, toss lettuce with dressing until well coated.",
        },
        {
          title: "Add toppings",
          description: "Top with croutons and freshly grated parmesan cheese.",
        },
        {
          title: "Serve",
          description: "Serve immediately while lettuce is crisp.",
        },
      ],
    },
    {
      title: "Creamy Mushroom Risotto",
      description:
        "Rich and creamy Italian risotto with mixed mushrooms and parmesan cheese.",
      image:
        "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800&h=600&fit=crop",
      category: "MainDish",
      cookingTime: 30,
      prepTime: 15,
      servings: 4,
      difficulty: "Hard",
      avgRating: 4.8,
      totalRating: 32,
      userId: users[1].id,
      ingredients: [
        {
          name: "Arborio rice",
          quantity: 1.5,
          unit: "cups",
          note: "Short grain",
        },
        { name: "Mixed mushrooms", quantity: 500, unit: "g", note: "Sliced" },
        { name: "Chicken stock", quantity: 6, unit: "cups", note: "Warm" },
        { name: "White wine", quantity: 0.5, unit: "cup", note: "Dry" },
        { name: "Onion", quantity: 1, unit: "piece", note: "Finely diced" },
        { name: "Garlic", quantity: 3, unit: "cloves", note: "Minced" },
        { name: "Parmesan cheese", quantity: 1, unit: "cup", note: "Grated" },
        { name: "Butter", quantity: 4, unit: "tbsp", note: "Cold" },
        { name: "Olive oil", quantity: 2, unit: "tbsp", note: "" },
      ],
      steps: [
        {
          title: "Sauté mushrooms",
          description:
            "Heat olive oil in a large pan, sauté mushrooms until golden. Set aside.",
        },
        {
          title: "Cook aromatics",
          description:
            "In the same pan, cook onion until translucent, add garlic for 1 minute.",
        },
        {
          title: "Toast rice",
          description:
            "Add rice and stir for 2-3 minutes until grains are coated and slightly translucent.",
        },
        {
          title: "Add wine",
          description: "Pour in wine and stir until absorbed.",
        },
        {
          title: "Add stock gradually",
          description:
            "Add warm stock one ladle at a time, stirring constantly until absorbed before adding more.",
        },
        {
          title: "Finish risotto",
          description:
            "After 18-20 minutes, rice should be creamy but still al dente. Stir in mushrooms, butter, and parmesan.",
        },
        {
          title: "Serve",
          description:
            "Serve immediately with extra parmesan and black pepper.",
        },
      ],
    },
    {
      title: "Fresh Fruit Smoothie Bowl",
      description:
        "A healthy and colorful smoothie bowl topped with fresh fruits, nuts, and seeds.",
      image:
        "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=800&h=600&fit=crop",
      category: "Beverage",
      cookingTime: 0,
      prepTime: 10,
      servings: 2,
      difficulty: "Easy",
      avgRating: 4.5,
      totalRating: 15,
      userId: users[2].id,
      ingredients: [
        { name: "Frozen berries", quantity: 2, unit: "cups", note: "Mixed" },
        { name: "Banana", quantity: 1, unit: "piece", note: "Frozen" },
        { name: "Greek yogurt", quantity: 0.5, unit: "cup", note: "Plain" },
        { name: "Honey", quantity: 2, unit: "tbsp", note: "" },
        {
          name: "Fresh strawberries",
          quantity: 1,
          unit: "cup",
          note: "Sliced",
        },
        { name: "Blueberries", quantity: 0.5, unit: "cup", note: "Fresh" },
        { name: "Granola", quantity: 0.5, unit: "cup", note: "" },
        { name: "Chia seeds", quantity: 2, unit: "tbsp", note: "" },
        { name: "Coconut flakes", quantity: 2, unit: "tbsp", note: "" },
      ],
      steps: [
        {
          title: "Blend smoothie",
          description:
            "Blend frozen berries, banana, yogurt, and honey until thick and creamy.",
        },
        {
          title: "Pour into bowls",
          description: "Divide smoothie mixture between two bowls.",
        },
        {
          title: "Add toppings",
          description:
            "Arrange fresh strawberries, blueberries, granola, chia seeds, and coconut flakes on top.",
        },
        {
          title: "Serve immediately",
          description:
            "Serve with spoons and enjoy this healthy breakfast or snack.",
        },
      ],
    },
    {
      title: "Homemade Pizza Margherita",
      description:
        "Classic Italian pizza with fresh tomato sauce, mozzarella, and basil on homemade dough.",
      image:
        "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&h=600&fit=crop",
      category: "MainDish",
      cookingTime: 15,
      prepTime: 45,
      servings: 4,
      difficulty: "Medium",
      avgRating: 4.9,
      totalRating: 45,
      userId: users[3].id,
      ingredients: [
        {
          name: "Pizza dough",
          quantity: 1,
          unit: "piece",
          note: "Store-bought or homemade",
        },
        {
          name: "Crushed tomatoes",
          quantity: 1,
          unit: "cup",
          note: "San Marzano preferred",
        },
        { name: "Fresh mozzarella", quantity: 200, unit: "g", note: "Sliced" },
        { name: "Fresh basil", quantity: 0.5, unit: "cup", note: "Leaves" },
        { name: "Olive oil", quantity: 3, unit: "tbsp", note: "Extra virgin" },
        { name: "Garlic", quantity: 2, unit: "cloves", note: "Minced" },
        { name: "Salt", quantity: 1, unit: "tsp", note: "" },
        { name: "Black pepper", quantity: 0.5, unit: "tsp", note: "" },
      ],
      steps: [
        {
          title: "Preheat oven",
          description:
            "Preheat oven to 475°F (245°C). If using a pizza stone, place it in the oven.",
        },
        {
          title: "Make sauce",
          description:
            "Mix crushed tomatoes with minced garlic, salt, and pepper.",
        },
        {
          title: "Roll dough",
          description:
            "Roll out pizza dough on a floured surface to desired thickness.",
        },
        {
          title: "Add sauce",
          description:
            "Spread tomato sauce evenly over dough, leaving a border for crust.",
        },
        {
          title: "Add cheese",
          description: "Distribute mozzarella slices evenly over sauce.",
        },
        {
          title: "Bake",
          description:
            "Bake for 12-15 minutes until crust is golden and cheese is bubbly.",
        },
        {
          title: "Finish",
          description:
            "Remove from oven, drizzle with olive oil, and top with fresh basil leaves.",
        },
      ],
    },
    {
      title: "Chicken Noodle Soup",
      description:
        "Comforting homemade chicken soup with tender vegetables and egg noodles.",
      image:
        "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&h=600&fit=crop",
      category: "Soup",
      cookingTime: 45,
      prepTime: 20,
      servings: 6,
      difficulty: "Easy",
      avgRating: 4.6,
      totalRating: 22,
      userId: users[4].id,
      ingredients: [
        {
          name: "Chicken breast",
          quantity: 2,
          unit: "pieces",
          note: "Boneless, skinless",
        },
        { name: "Egg noodles", quantity: 2, unit: "cups", note: "Wide" },
        { name: "Carrots", quantity: 3, unit: "pieces", note: "Sliced" },
        { name: "Celery", quantity: 3, unit: "stalks", note: "Chopped" },
        { name: "Onion", quantity: 1, unit: "piece", note: "Diced" },
        {
          name: "Chicken broth",
          quantity: 8,
          unit: "cups",
          note: "Low sodium",
        },
        { name: "Bay leaves", quantity: 2, unit: "pieces", note: "" },
        { name: "Fresh thyme", quantity: 1, unit: "tsp", note: "" },
        { name: "Salt and pepper", quantity: 1, unit: "tsp", note: "To taste" },
      ],
      steps: [
        {
          title: "Cook chicken",
          description:
            "In a large pot, bring chicken and broth to a boil. Simmer for 20 minutes until cooked through.",
        },
        {
          title: "Shred chicken",
          description:
            "Remove chicken, let cool, then shred into bite-sized pieces.",
        },
        {
          title: "Cook vegetables",
          description:
            "Add carrots, celery, and onion to the broth. Simmer for 10 minutes.",
        },
        {
          title: "Add noodles",
          description:
            "Add egg noodles and cook according to package directions.",
        },
        {
          title: "Return chicken",
          description:
            "Add shredded chicken back to pot along with thyme and bay leaves.",
        },
        {
          title: "Season and serve",
          description:
            "Season with salt and pepper. Remove bay leaves before serving.",
        },
      ],
    },
    {
      title: "Chocolate Lava Cake",
      description:
        "Decadent individual chocolate cakes with a molten chocolate center.",
      image:
        "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&h=600&fit=crop",
      category: "Dessert",
      cookingTime: 12,
      prepTime: 20,
      servings: 4,
      difficulty: "Medium",
      avgRating: 4.9,
      totalRating: 38,
      userId: users[4].id,
      ingredients: [
        { name: "Dark chocolate", quantity: 200, unit: "g", note: "70% cocoa" },
        { name: "Butter", quantity: 200, unit: "g", note: "Unsalted" },
        { name: "Large eggs", quantity: 2, unit: "pieces", note: "" },
        { name: "Egg yolks", quantity: 2, unit: "pieces", note: "" },
        { name: "Granulated sugar", quantity: 0.25, unit: "cup", note: "" },
        { name: "All-purpose flour", quantity: 2, unit: "tbsp", note: "" },
        {
          name: "Butter for ramekins",
          quantity: 1,
          unit: "tbsp",
          note: "For greasing",
        },
        {
          name: "Cocoa powder",
          quantity: 1,
          unit: "tbsp",
          note: "For dusting",
        },
        {
          name: "Vanilla ice cream",
          quantity: 4,
          unit: "scoops",
          note: "For serving",
        },
      ],
      steps: [
        {
          title: "Preheat oven",
          description:
            "Preheat oven to 425°F (220°C). Grease ramekins with butter and dust with cocoa powder.",
        },
        {
          title: "Melt chocolate",
          description:
            "Melt chocolate and butter in a double boiler or microwave until smooth.",
        },
        {
          title: "Mix eggs",
          description:
            "In a bowl, whisk together whole eggs, egg yolks, and sugar until thick and pale.",
        },
        {
          title: "Combine",
          description:
            "Fold melted chocolate mixture into egg mixture, then fold in flour.",
        },
        {
          title: "Fill ramekins",
          description: "Divide batter evenly among prepared ramekins.",
        },
        {
          title: "Bake",
          description:
            "Bake for 12-14 minutes until edges are firm but centers are soft.",
        },
        {
          title: "Serve",
          description:
            "Let cool for 1 minute, then run a knife around edges and invert onto plates. Serve with ice cream.",
        },
      ],
    },
    {
      title: "Vegan Lentil Soup",
      description:
        "A hearty and healthy vegan lentil soup, packed with vegetables and flavor.",
      image:
        "https://images.unsplash.com/photo-1596700086884-601d83505c24?w=800&h=600&fit=crop",
      category: "Soup",
      cookingTime: 40,
      prepTime: 15,
      servings: 6,
      difficulty: "Easy",
      avgRating: 4.5,
      totalRating: 19,
      userId: users[5].id,
      ingredients: [
        { name: "Brown lentils", quantity: 1, unit: "cup", note: "Rinsed" },
        {
          name: "Vegetable broth",
          quantity: 6,
          unit: "cups",
          note: "Low sodium",
        },
        { name: "Carrots", quantity: 2, unit: "pieces", note: "Diced" },
        { name: "Celery stalks", quantity: 2, unit: "pieces", note: "Diced" },
        { name: "Onion", quantity: 1, unit: "piece", note: "Diced" },
        { name: "Garlic", quantity: 3, unit: "cloves", note: "Minced" },
        { name: "Diced tomatoes", quantity: 1, unit: "can", note: "14.5 oz" },
        { name: "Bay leaf", quantity: 1, unit: "piece", note: "" },
        { name: "Cumin", quantity: 1, unit: "tsp", note: "" },
        { name: "Coriander", quantity: 0.5, unit: "tsp", note: "" },
        { name: "Spinach", quantity: 2, unit: "cups", note: "Fresh" },
        { name: "Olive oil", quantity: 2, unit: "tbsp", note: "" },
      ],
      steps: [
        {
          title: "Sauté aromatics",
          description:
            "Heat olive oil in a large pot. Add onion, carrots, and celery. Cook until softened, about 8 minutes.",
        },
        {
          title: "Add spices and garlic",
          description:
            "Add garlic, cumin, and coriander. Cook for 1 minute until fragrant.",
        },
        {
          title: "Simmer soup",
          description:
            "Add lentils, vegetable broth, diced tomatoes, and bay leaf. Bring to a boil, then reduce heat and simmer for 30 minutes, or until lentils are tender.",
        },
        {
          title: "Finish with spinach",
          description:
            "Remove bay leaf. Stir in fresh spinach until wilted. Season with salt and pepper to taste.",
        },
        {
          title: "Serve",
          description: "Serve hot with crusty bread.",
        },
      ],
    },
    {
      title: "Grilled Steak with Chimichurri",
      description:
        "Perfectly grilled steak topped with a vibrant and fresh Argentinian chimichurri sauce.",
      image:
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop",
      category: "MainDish",
      cookingTime: 15,
      prepTime: 20,
      servings: 2,
      difficulty: "Medium",
      avgRating: 4.8,
      totalRating: 28,
      userId: users[6].id,
      ingredients: [
        {
          name: "Ribeye steaks",
          quantity: 2,
          unit: "pieces",
          note: "1-inch thick",
        },
        { name: "Fresh parsley", quantity: 1, unit: "cup", note: "Chopped" },
        { name: "Fresh oregano", quantity: 0.25, unit: "cup", note: "Chopped" },
        { name: "Garlic", quantity: 3, unit: "cloves", note: "Minced" },
        { name: "Red wine vinegar", quantity: 0.25, unit: "cup", note: "" },
        {
          name: "Olive oil",
          quantity: 0.5,
          unit: "cup",
          note: "Extra virgin",
        },
        {
          name: "Red pepper flakes",
          quantity: 0.5,
          unit: "tsp",
          note: "Optional",
        },
        { name: "Salt and pepper", quantity: 1, unit: "tsp", note: "To taste" },
      ],
      steps: [
        {
          title: "Make chimichurri",
          description:
            "Combine parsley, oregano, garlic, red wine vinegar, olive oil, red pepper flakes, salt, and pepper in a bowl. Mix well and let sit for 15 minutes.",
        },
        {
          title: "Season steak",
          description:
            "Season steaks generously with salt and black pepper on both sides.",
        },
        {
          title: "Grill steak",
          description:
            "Preheat grill to high. Grill steaks for 4-5 minutes per side for medium-rare, or to desired doneness.",
        },
        {
          title: "Rest and serve",
          description:
            "Remove steaks from grill and let rest for 5 minutes. Slice against the grain and top with chimichurri sauce.",
        },
      ],
    },
    {
      title: "Creamy Tomato Pasta",
      description:
        "Quick and easy pasta dish with a rich and creamy tomato sauce.",
      image:
        "https://images.unsplash.com/photo-1596700086884-601d83505c24?w=800&h=600&fit=crop",
      category: "MainDish",
      cookingTime: 20,
      prepTime: 10,
      servings: 4,
      difficulty: "Easy",
      avgRating: 4.7,
      totalRating: 25,
      userId: users[7].id,
      ingredients: [
        { name: "Penne pasta", quantity: 400, unit: "g", note: "" },
        {
          name: "Canned crushed tomatoes",
          quantity: 1,
          unit: "can",
          note: "28 oz",
        },
        { name: "Heavy cream", quantity: 0.5, unit: "cup", note: "" },
        { name: "Garlic", quantity: 2, unit: "cloves", note: "Minced" },
        { name: "Onion", quantity: 1, unit: "piece", note: "Diced" },
        { name: "Olive oil", quantity: 2, unit: "tbsp", note: "" },
        { name: "Fresh basil", quantity: 0.5, unit: "cup", note: "Chopped" },
        { name: "Parmesan cheese", quantity: 0.5, unit: "cup", note: "Grated" },
        { name: "Salt and pepper", quantity: 1, unit: "tsp", note: "To taste" },
      ],
      steps: [
        {
          title: "Cook pasta",
          description:
            "Cook penne pasta according to package directions until al dente. Drain and set aside.",
        },
        {
          title: "Sauté aromatics",
          description:
            "In a large pan, heat olive oil over medium heat. Add onion and cook until translucent, about 5 minutes. Add garlic and cook for 1 minute.",
        },
        {
          title: "Make sauce",
          description:
            "Add crushed tomatoes to the pan. Simmer for 10 minutes. Stir in heavy cream and fresh basil. Season with salt and pepper.",
        },
        {
          title: "Combine pasta and sauce",
          description: "Add cooked pasta to the sauce and toss to coat evenly.",
        },
        {
          title: "Serve",
          description: "Serve immediately, topped with grated Parmesan cheese.",
        },
      ],
    },
    {
      title: "Chicken Teriyaki Bowl",
      description:
        "Juicy chicken thighs glazed with a sweet and savory teriyaki sauce, served over steamed rice and vegetables.",
      image:
        "https://images.unsplash.com/photo-1604908812499-5d7d38d4f4a5?w=800&h=600&fit=crop",
      category: "MainDish",
      cookingTime: 25,
      prepTime: 15,
      servings: 4,
      difficulty: "Medium",
      avgRating: 4.6,
      totalRating: 18,
      userId: users[1].id,
      ingredients: [
        { name: "Chicken thighs", quantity: 500, unit: "g", note: "Boneless" },
        { name: "Soy sauce", quantity: 100, unit: "ml", note: "Low sodium" },
        { name: "Mirin", quantity: 50, unit: "ml", note: "Sweet rice wine" },
        { name: "Brown sugar", quantity: 2, unit: "tbsp", note: "Packed" },
        { name: "Garlic", quantity: 2, unit: "cloves", note: "Minced" },
        { name: "Rice", quantity: 2, unit: "cups", note: "Steamed" },
      ],
      steps: [
        {
          title: "Marinate chicken",
          description:
            "Combine soy sauce, mirin, sugar, garlic. Marinate chicken 15 minutes.",
        },
        {
          title: "Cook chicken",
          description: "Pan-fry chicken until browned and cooked through.",
        },
        {
          title: "Make sauce",
          description:
            "Pour remaining marinade into pan and simmer to thicken.",
        },
        {
          title: "Serve",
          description: "Slice chicken, pour sauce over rice and vegetables.",
        },
      ],
    },
    {
      title: "Vegetarian Buddha Bowl",
      description:
        "A nourishing bowl of quinoa, roasted veggies, chickpeas, and tahini dressing.",
      image:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop",
      category: "MainDish",
      cookingTime: 30,
      prepTime: 15,
      servings: 2,
      difficulty: "Easy",
      avgRating: 4.7,
      totalRating: 30,
      userId: users[2].id,
      ingredients: [
        { name: "Quinoa", quantity: 150, unit: "g", note: "Rinsed" },
        { name: "Chickpeas", quantity: 1, unit: "can", note: "Drained" },
        { name: "Sweet potato", quantity: 1, unit: "large", note: "Cubed" },
        { name: "Broccoli florets", quantity: 150, unit: "g", note: "Fresh" },
        { name: "Tahini", quantity: 2, unit: "tbsp", note: "For dressing" },
        { name: "Lemon juice", quantity: 1, unit: "tbsp", note: "Fresh" },
      ],
      steps: [
        {
          title: "Cook quinoa",
          description: "Simmer quinoa with water until fluffy.",
        },
        {
          title: "Roast veggies",
          description:
            "Roast sweet potato and broccoli with olive oil at 200°C for 20 minutes.",
        },
        {
          title: "Assemble bowl",
          description: "Arrange quinoa, chickpeas, veggies in a bowl.",
        },
        {
          title: "Add dressing",
          description: "Mix tahini with lemon juice and drizzle on top.",
        },
      ],
    },
    {
      title: "Caprese Salad",
      description:
        "A refreshing Italian salad with fresh mozzarella, tomatoes, and basil drizzled with balsamic glaze.",
      image:
        "https://images.unsplash.com/photo-1606788075761-7f1699bb1c3b?w=800&h=600&fit=crop",
      category: "Appetizer",
      cookingTime: 10,
      prepTime: 10,
      servings: 2,
      difficulty: "Easy",
      avgRating: 4.9,
      totalRating: 40,
      userId: users[3].id,
      ingredients: [
        { name: "Fresh mozzarella", quantity: 125, unit: "g", note: "Sliced" },
        { name: "Tomatoes", quantity: 2, unit: "medium", note: "Sliced" },
        { name: "Fresh basil", quantity: 10, unit: "leaves", note: "" },
        { name: "Balsamic glaze", quantity: 2, unit: "tbsp", note: "" },
        { name: "Olive oil", quantity: 1, unit: "tbsp", note: "Extra virgin" },
      ],
      steps: [
        {
          title: "Layer ingredients",
          description: "Alternate tomato and mozzarella slices on a plate.",
        },
        {
          title: "Garnish",
          description:
            "Top with basil leaves, drizzle olive oil and balsamic glaze.",
        },
      ],
    },
    {
      title: "Beef Tacos",
      description:
        "Crispy taco shells filled with seasoned beef, cheese, lettuce, and salsa.",
      image:
        "https://images.unsplash.com/photo-1601050690293-0aa3b14297da?w=800&h=600&fit=crop",
      category: "MainDish",
      cookingTime: 20,
      prepTime: 15,
      servings: 4,
      difficulty: "Easy",
      avgRating: 4.5,
      totalRating: 25,
      userId: users[4].id,
      ingredients: [
        { name: "Ground beef", quantity: 500, unit: "g", note: "Lean" },
        { name: "Taco seasoning", quantity: 2, unit: "tbsp", note: "" },
        { name: "Taco shells", quantity: 8, unit: "pieces", note: "Crispy" },
        { name: "Cheddar cheese", quantity: 100, unit: "g", note: "Shredded" },
        { name: "Lettuce", quantity: 50, unit: "g", note: "Shredded" },
        { name: "Salsa", quantity: 100, unit: "g", note: "Mild" },
      ],
      steps: [
        {
          title: "Cook beef",
          description: "Brown beef in a pan, add taco seasoning.",
        },
        {
          title: "Assemble tacos",
          description:
            "Fill taco shells with beef, cheese, lettuce, and salsa.",
        },
      ],
    },
    {
      title: "Chocolate Chip Cookies",
      description:
        "Chewy and gooey homemade cookies with plenty of chocolate chips.",
      image:
        "https://images.unsplash.com/photo-1590080876396-1e7c1b4f90c1?w=800&h=600&fit=crop",
      category: "Dessert",
      cookingTime: 12,
      prepTime: 15,
      servings: 24,
      difficulty: "Easy",
      avgRating: 4.8,
      totalRating: 50,
      userId: users[5].id,
      ingredients: [
        { name: "Butter", quantity: 200, unit: "g", note: "Softened" },
        { name: "Brown sugar", quantity: 150, unit: "g", note: "" },
        { name: "Granulated sugar", quantity: 100, unit: "g", note: "" },
        { name: "Eggs", quantity: 2, unit: "pieces", note: "" },
        { name: "Flour", quantity: 300, unit: "g", note: "All-purpose" },
        { name: "Chocolate chips", quantity: 200, unit: "g", note: "" },
      ],
      steps: [
        {
          title: "Make dough",
          description:
            "Cream butter and sugars, add eggs, fold in flour and chocolate chips.",
        },
        {
          title: "Bake",
          description:
            "Drop spoonfuls onto tray, bake at 180°C for 12 minutes.",
        },
      ],
    },
    {
      title: "Shrimp Fried Rice",
      description:
        "A quick and flavorful stir-fried rice with shrimp, eggs, and veggies.",
      image:
        "https://images.unsplash.com/photo-1594041680534-6fc44b7c7bd9?w=800&h=600&fit=crop",
      category: "MainDish",
      cookingTime: 15,
      prepTime: 10,
      servings: 3,
      difficulty: "Easy",
      avgRating: 4.6,
      totalRating: 22,
      userId: users[6].id,
      ingredients: [
        { name: "Cooked rice", quantity: 3, unit: "cups", note: "Cold" },
        { name: "Shrimp", quantity: 200, unit: "g", note: "Peeled" },
        { name: "Eggs", quantity: 2, unit: "pieces", note: "Beaten" },
        { name: "Peas and carrots", quantity: 100, unit: "g", note: "" },
        { name: "Soy sauce", quantity: 2, unit: "tbsp", note: "" },
        { name: "Sesame oil", quantity: 1, unit: "tsp", note: "" },
      ],
      steps: [
        {
          title: "Cook shrimp",
          description: "Sauté shrimp until pink, remove.",
        },
        { title: "Scramble eggs", description: "Cook eggs in pan, set aside." },
        {
          title: "Stir-fry rice",
          description:
            "Add veggies, rice, soy sauce, sesame oil. Stir in shrimp and eggs.",
        },
      ],
    },
    {
      title: "Greek Yogurt Parfait",
      description:
        "A healthy layered breakfast with yogurt, granola, and fresh berries.",
      image:
        "https://images.unsplash.com/photo-1597305498327-96b61c3640fb?w=800&h=600&fit=crop",
      category: "MainDish",
      cookingTime: 5,
      prepTime: 5,
      servings: 1,
      difficulty: "Easy",
      avgRating: 4.9,
      totalRating: 35,
      userId: users[7].id,
      ingredients: [
        { name: "Greek yogurt", quantity: 200, unit: "g", note: "" },
        { name: "Granola", quantity: 50, unit: "g", note: "" },
        { name: "Fresh berries", quantity: 100, unit: "g", note: "Mixed" },
        { name: "Honey", quantity: 1, unit: "tbsp", note: "" },
      ],
      steps: [
        {
          title: "Layer ingredients",
          description:
            "Spoon yogurt, add granola, top with berries, drizzle honey.",
        },
      ],
    },
    {
      title: "Margherita Pizza",
      description:
        "Classic Italian pizza with tomato sauce, mozzarella, and fresh basil.",
      image:
        "https://images.unsplash.com/photo-1601924577964-06c2a49b46d2?w=800&h=600&fit=crop",
      category: "MainDish",
      cookingTime: 15,
      prepTime: 20,
      servings: 2,
      difficulty: "Medium",
      avgRating: 4.7,
      totalRating: 28,
      userId: users[8].id,
      ingredients: [
        { name: "Pizza dough", quantity: 250, unit: "g", note: "Prepared" },
        { name: "Tomato sauce", quantity: 100, unit: "g", note: "" },
        { name: "Mozzarella", quantity: 125, unit: "g", note: "Fresh" },
        { name: "Basil leaves", quantity: 6, unit: "pieces", note: "" },
        { name: "Olive oil", quantity: 1, unit: "tbsp", note: "" },
      ],
      steps: [
        {
          title: "Preheat oven",
          description: "Heat to 250°C with a pizza stone.",
        },
        {
          title: "Assemble pizza",
          description:
            "Spread sauce, add mozzarella, basil, drizzle olive oil.",
        },
        {
          title: "Bake",
          description: "Bake 7–10 minutes until crust is golden.",
        },
      ],
    },
    {
      title: "Banana Pancakes",
      description:
        "Fluffy pancakes infused with ripe bananas, perfect for breakfast.",
      image:
        "https://images.unsplash.com/photo-1598515213696-1f4782555026?w=800&h=600&fit=crop",
      category: "MainDish",
      cookingTime: 15,
      prepTime: 10,
      servings: 3,
      difficulty: "Easy",
      avgRating: 4.8,
      totalRating: 32,
      userId: users[9].id,
      ingredients: [
        { name: "Ripe bananas", quantity: 2, unit: "pieces", note: "Mashed" },
        { name: "Flour", quantity: 150, unit: "g", note: "All-purpose" },
        { name: "Milk", quantity: 150, unit: "ml", note: "" },
        { name: "Egg", quantity: 1, unit: "piece", note: "" },
        { name: "Baking powder", quantity: 1, unit: "tsp", note: "" },
      ],
      steps: [
        {
          title: "Make batter",
          description: "Combine bananas, egg, milk, flour, baking powder.",
        },
        {
          title: "Cook pancakes",
          description:
            "Pour batter into hot pan, cook until golden on both sides.",
        },
      ],
    },
    {
      title: "Mediterranean Grilled Salmon",
      description:
        "Salmon fillets marinated with olive oil, lemon, and herbs, grilled to perfection.",
      image:
        "https://images.unsplash.com/photo-1625948513740-77d6532fcdd4?w=800&h=600&fit=crop",
      category: "MainDish",
      cookingTime: 15,
      prepTime: 10,
      servings: 2,
      difficulty: "Easy",
      avgRating: 4.7,
      totalRating: 21,
      userId: users[9].id,
      ingredients: [
        { name: "Salmon fillets", quantity: 2, unit: "pieces", note: "Fresh" },
        { name: "Olive oil", quantity: 2, unit: "tbsp", note: "" },
        { name: "Lemon juice", quantity: 1, unit: "tbsp", note: "Fresh" },
        { name: "Garlic", quantity: 2, unit: "cloves", note: "Minced" },
        { name: "Fresh dill", quantity: 1, unit: "tbsp", note: "Chopped" },
        { name: "Salt & pepper", quantity: 1, unit: "tsp", note: "To taste" },
      ],
      steps: [
        {
          title: "Marinate salmon",
          description:
            "Combine oil, lemon, garlic, dill, salt & pepper. Coat salmon.",
        },
        {
          title: "Grill",
          description:
            "Grill salmon 4–5 minutes per side until cooked through.",
        },
        { title: "Serve", description: "Serve hot with lemon wedges." },
      ],
    },
    {
      title: "Thai Green Curry",
      description:
        "A fragrant coconut-based curry with chicken, green curry paste, and vegetables.",
      image:
        "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800&h=600&fit=crop",
      category: "MainDish",
      cookingTime: 25,
      prepTime: 15,
      servings: 4,
      difficulty: "Medium",
      avgRating: 4.8,
      totalRating: 29,
      userId: users[9].id,
      ingredients: [
        { name: "Chicken breast", quantity: 400, unit: "g", note: "Sliced" },
        { name: "Green curry paste", quantity: 3, unit: "tbsp", note: "" },
        { name: "Coconut milk", quantity: 400, unit: "ml", note: "" },
        { name: "Thai eggplants", quantity: 100, unit: "g", note: "" },
        { name: "Fish sauce", quantity: 2, unit: "tbsp", note: "" },
        { name: "Basil leaves", quantity: 6, unit: "pieces", note: "Fresh" },
      ],
      steps: [
        {
          title: "Cook curry paste",
          description: "Fry green curry paste in a little oil.",
        },
        {
          title: "Add chicken & coconut milk",
          description: "Simmer until chicken is cooked.",
        },
        {
          title: "Add vegetables",
          description: "Cook until tender, finish with fish sauce and basil.",
        },
      ],
    },
    {
      title: "French Onion Soup",
      description:
        "Rich and comforting soup with caramelized onions, beef broth, and cheesy croutons.",
      image:
        "https://images.unsplash.com/photo-1605529773866-42d43885c955?w=800&h=600&fit=crop",
      category: "Appetizer",
      cookingTime: 50,
      prepTime: 15,
      servings: 4,
      difficulty: "Medium",
      avgRating: 4.9,
      totalRating: 38,
      userId: users[9].id,
      ingredients: [
        { name: "Onions", quantity: 4, unit: "large", note: "Thinly sliced" },
        { name: "Beef broth", quantity: 1, unit: "L", note: "" },
        { name: "Butter", quantity: 2, unit: "tbsp", note: "" },
        { name: "Thyme", quantity: 1, unit: "tsp", note: "Dried" },
        {
          name: "Baguette slices",
          quantity: 8,
          unit: "pieces",
          note: "Toasted",
        },
        { name: "Gruyère cheese", quantity: 100, unit: "g", note: "Grated" },
      ],
      steps: [
        {
          title: "Caramelize onions",
          description:
            "Cook onions in butter over low heat until golden brown.",
        },
        {
          title: "Add broth & simmer",
          description: "Add beef broth and thyme, simmer 30 minutes.",
        },
        {
          title: "Serve with croutons",
          description:
            "Top soup with baguette slices and cheese, broil until melted.",
        },
      ],
    },
    {
      title: "Falafel Wrap",
      description:
        "Crispy chickpea falafel balls served in a pita with fresh veggies and tahini sauce.",
      image:
        "https://images.unsplash.com/photo-1603048291835-58d2a6c3f9e0?w=800&h=600&fit=crop",
      category: "MainDish",
      cookingTime: 20,
      prepTime: 15,
      servings: 2,
      difficulty: "Easy",
      avgRating: 4.6,
      totalRating: 19,
      userId: users[9].id,
      ingredients: [
        {
          name: "Falafel balls",
          quantity: 6,
          unit: "pieces",
          note: "Prepared or homemade",
        },
        { name: "Pita bread", quantity: 2, unit: "pieces", note: "" },
        { name: "Lettuce", quantity: 50, unit: "g", note: "Shredded" },
        { name: "Tomato", quantity: 1, unit: "medium", note: "Sliced" },
        { name: "Tahini sauce", quantity: 2, unit: "tbsp", note: "" },
      ],
      steps: [
        { title: "Warm pita", description: "Heat pita bread on a pan." },
        {
          title: "Assemble wrap",
          description: "Add falafel, veggies, and drizzle tahini sauce.",
        },
      ],
    },
    {
      title: "Sushi Rolls",
      description:
        "Homemade sushi rolls filled with salmon, avocado, and cucumber.",
      image:
        "https://images.unsplash.com/photo-1553621042-f6e147245754?w=800&h=600&fit=crop",
      category: "MainDish",
      cookingTime: 40,
      prepTime: 20,
      servings: 3,
      difficulty: "Hard",
      avgRating: 4.8,
      totalRating: 26,
      userId: users[9].id,
      ingredients: [
        {
          name: "Sushi rice",
          quantity: 300,
          unit: "g",
          note: "Cooked and seasoned",
        },
        { name: "Nori sheets", quantity: 4, unit: "pieces", note: "" },
        {
          name: "Salmon",
          quantity: 150,
          unit: "g",
          note: "Fresh sashimi grade",
        },
        { name: "Avocado", quantity: 1, unit: "piece", note: "Sliced" },
        { name: "Cucumber", quantity: 1, unit: "piece", note: "Julienned" },
      ],
      steps: [
        {
          title: "Prepare rice",
          description:
            "Cook and season sushi rice with vinegar, sugar, and salt.",
        },
        {
          title: "Roll sushi",
          description: "Place nori, spread rice, add fillings, roll tightly.",
        },
        {
          title: "Slice & serve",
          description: "Cut into pieces and serve with soy sauce.",
        },
      ],
    },
    {
      title: "Classic Cheeseburger",
      description:
        "Juicy beef patty with melted cheese, lettuce, and tomato on a toasted bun.",
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=600&fit=crop",
      category: "MainDish",
      cookingTime: 15,
      prepTime: 10,
      servings: 2,
      difficulty: "Easy",
      avgRating: 4.7,
      totalRating: 31,
      userId: users[9].id,
      ingredients: [
        { name: "Ground beef", quantity: 250, unit: "g", note: "80% lean" },
        { name: "Cheddar cheese", quantity: 2, unit: "slices", note: "" },
        { name: "Burger buns", quantity: 2, unit: "pieces", note: "Toasted" },
        { name: "Lettuce", quantity: 2, unit: "leaves", note: "" },
        { name: "Tomato", quantity: 2, unit: "slices", note: "" },
      ],
      steps: [
        {
          title: "Form patties",
          description: "Shape beef into patties, season with salt and pepper.",
        },
        {
          title: "Cook patties",
          description:
            "Grill or pan-fry until desired doneness, melt cheese on top.",
        },
        {
          title: "Assemble burger",
          description: "Place patty on bun with lettuce and tomato.",
        },
      ],
    },
    {
      title: "Mango Smoothie",
      description:
        "A creamy and refreshing smoothie made with ripe mangoes and yogurt.",
      image:
        "https://images.unsplash.com/photo-1617196039897-959b0360f902?w=800&h=600&fit=crop",
      category: "Beverage",
      cookingTime: 5,
      prepTime: 5,
      servings: 2,
      difficulty: "Easy",
      avgRating: 4.9,
      totalRating: 40,
      userId: users[9].id,
      ingredients: [
        { name: "Ripe mango", quantity: 2, unit: "pieces", note: "Peeled" },
        { name: "Yogurt", quantity: 150, unit: "g", note: "" },
        { name: "Honey", quantity: 1, unit: "tbsp", note: "" },
        { name: "Ice cubes", quantity: 4, unit: "pieces", note: "" },
      ],
      steps: [
        {
          title: "Blend",
          description: "Combine all ingredients in a blender until smooth.",
        },
        { title: "Serve", description: "Pour into glasses and enjoy chilled." },
      ],
    },
    {
      title: "Stuffed Bell Peppers",
      description:
        "Colorful bell peppers stuffed with a mixture of rice, ground meat, and herbs.",
      image:
        "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=800&h=600&fit=crop",
      category: "MainDish",
      cookingTime: 35,
      prepTime: 15,
      servings: 4,
      difficulty: "Medium",
      avgRating: 4.6,
      totalRating: 24,
      userId: users[9].id,
      ingredients: [
        {
          name: "Bell peppers",
          quantity: 4,
          unit: "pieces",
          note: "Red, yellow or green",
        },
        { name: "Cooked rice", quantity: 2, unit: "cups", note: "" },
        { name: "Ground beef", quantity: 250, unit: "g", note: "" },
        { name: "Tomato sauce", quantity: 200, unit: "g", note: "" },
        { name: "Herbs", quantity: 1, unit: "tsp", note: "Oregano, basil" },
      ],
      steps: [
        {
          title: "Prepare peppers",
          description: "Cut tops off peppers, remove seeds.",
        },
        {
          title: "Make filling",
          description: "Mix rice, beef, tomato sauce, herbs.",
        },
        {
          title: "Bake",
          description: "Stuff peppers and bake at 180°C for 30 minutes.",
        },
      ],
    },
    {
      title: "Apple Crumble",
      description:
        "Warm baked apples topped with a crunchy cinnamon oat crumble.",
      image:
        "https://images.unsplash.com/photo-1603133872879-2d16ec5b5da3?w=800&h=600&fit=crop",
      category: "Dessert",
      cookingTime: 30,
      prepTime: 15,
      servings: 4,
      difficulty: "Easy",
      avgRating: 4.8,
      totalRating: 27,
      userId: users[9].id,
      ingredients: [
        {
          name: "Apples",
          quantity: 4,
          unit: "pieces",
          note: "Peeled and sliced",
        },
        { name: "Brown sugar", quantity: 100, unit: "g", note: "" },
        { name: "Rolled oats", quantity: 100, unit: "g", note: "" },
        { name: "Butter", quantity: 75, unit: "g", note: "" },
        { name: "Cinnamon", quantity: 1, unit: "tsp", note: "" },
      ],
      steps: [
        {
          title: "Prepare apples",
          description: "Arrange apples in a baking dish.",
        },
        {
          title: "Make crumble",
          description: "Mix oats, sugar, butter, cinnamon until crumbly.",
        },
        {
          title: "Bake",
          description:
            "Sprinkle crumble over apples and bake at 180°C for 30 minutes.",
        },
      ],
    },
    {
      title: "Avocado Toast with Poached Egg",
      description:
        "Creamy smashed avocado on toasted bread topped with a soft poached egg.",
      image:
        "https://images.unsplash.com/photo-1572441710534-6801d9f3fc6f?w=800&h=600&fit=crop",
      category: "MainDish",
      cookingTime: 10,
      prepTime: 5,
      servings: 1,
      difficulty: "Easy",
      avgRating: 4.9,
      totalRating: 33,
      userId: users[9].id,
      ingredients: [
        { name: "Bread slice", quantity: 1, unit: "piece", note: "Toasted" },
        { name: "Avocado", quantity: 0.5, unit: "piece", note: "Mashed" },
        { name: "Egg", quantity: 1, unit: "piece", note: "Poached" },
        { name: "Salt & pepper", quantity: 1, unit: "pinch", note: "" },
      ],
      steps: [
        { title: "Toast bread", description: "Toast the bread until golden." },
        {
          title: "Smash avocado",
          description: "Spread mashed avocado over toast.",
        },
        {
          title: "Add egg",
          description: "Place poached egg on top, season with salt and pepper.",
        },
      ],
    },
  ];

  // Create recipes with ingredients and steps
  for (let i = 0; i < recipesData.length; i++) {
    const recipeData = recipesData[i];
    console.log(`📝 Creating recipe: ${recipeData.title}`);

    const recipe = await prisma.recipe.create({
      data: {
        title: recipeData.title,
        description: recipeData.description,
        image: recipeData.image,
        category: recipeData.category,
        cookingTime: recipeData.cookingTime,
        prepTime: recipeData.prepTime,
        servings: recipeData.servings,
        difficulty: recipeData.difficulty,
        avgRating: recipeData.avgRating,
        totalRating: recipeData.totalRating,
        userId: recipeData.userId,
        ingredients: {
          create: recipeData.ingredients.map((ingredient) => ({
            name: ingredient.name,
            quantity: ingredient.quantity,
            unit: ingredient.unit,
            note: ingredient.note,
          })),
        },
        steps: {
          create: recipeData.steps.map((step, index) => ({
            title: step.title,
            description: step.description,
            order: index + 1,
          })),
        },
      },
    });

    // Create some ratings for each recipe
    const ratingCount = Math.floor(Math.random() * 5) + 3; // 3-7 ratings per recipe
    for (let j = 0; j < ratingCount; j++) {
      const randomUser = users[j % users.length];
      const score = Math.floor(Math.random() * 2) + 4; // 4-5 star ratings mostly

      try {
        await prisma.rating.create({
          data: {
            userId: randomUser.id,
            recipeId: recipe.id,
            score: score,
          },
        });
      } catch (error) {
        // Skip duplicate ratings (same user rating same recipe)
        console.log(
          `Skipping duplicate rating for ${randomUser.username} on ${recipe.title}`
        );
      }
    }

    // Create some favorites
    const favoriteCount = Math.floor(Math.random() * 4) + 2; // 2-5 favorites per recipe
    for (let k = 0; k < favoriteCount; k++) {
      const randomUser = users[k % users.length];

      try {
        await prisma.favorite.create({
          data: {
            userId: randomUser.id,
            recipeId: recipe.id,
          },
        });
      } catch (error) {
        // Skip duplicate favorites
        console.log(
          `Skipping duplicate favorite for ${randomUser.username} on ${recipe.title}`
        );
      }
    }
  }

  console.log(
    "✅ Created 10 recipes with ingredients, steps, ratings, and favorites"
  );

  // Display summary
  const userCount = await prisma.user.count();
  const recipeCount = await prisma.recipe.count();
  const ingredientCount = await prisma.recipeIngredient.count();
  const stepCount = await prisma.recipeStep.count();
  const ratingCount = await prisma.rating.count();
  const favoriteCount = await prisma.favorite.count();

  console.log("\n📊 Seed Summary:");
  console.log(`👥 Users: ${userCount}`);
  console.log(`🍳 Recipes: ${recipeCount}`);
  console.log(`🥕 Ingredients: ${ingredientCount}`);
  console.log(`📋 Steps: ${stepCount}`);
  console.log(`⭐ Ratings: ${ratingCount}`);
  console.log(`❤️ Favorites: ${favoriteCount}`);
  console.log("\n🎉 Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
