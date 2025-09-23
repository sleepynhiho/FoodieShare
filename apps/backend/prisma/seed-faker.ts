import { PrismaClient } from '@prisma/client'
import { fakerEN as faker } from '@faker-js/faker'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed process...')

  // 🧹 Clear old data
  console.log('🧹 Cleaning existing data...')
  await prisma.rating.deleteMany()
  await prisma.favorite.deleteMany()
  await prisma.recipeStep.deleteMany()
  await prisma.recipeIngredient.deleteMany()
  await prisma.recipe.deleteMany()
  await prisma.user.deleteMany()

  // 👥 Create 20 random users
  console.log('👥 Creating users...')
  const usersData = Array.from({ length: 20 }).map(() => ({
    email: faker.internet.email(),
    username: faker.internet.username(),
    avatar: faker.image.avatar(), // always English-ish
  }))

  await prisma.user.createMany({ data: usersData })
  const allUsers = await prisma.user.findMany() // to get ids

  console.log(`✅ Created ${allUsers.length} users`)

  // 🍳 Create 100 random recipes
  console.log('🍳 Creating recipes...')
  for (let i = 0; i < 100; i++) {
    const randomUser = allUsers[Math.floor(Math.random() * allUsers.length)]

    // random category
    const category = faker.helpers.arrayElement(['MainDish', 'Dessert', 'Appetizer', 'Salad', 'Beverage', 'Soup'])

    // ingredients random
    const ingredients = Array.from({ length: faker.number.int({ min: 3, max: 8 }) }).map(() => ({
      name: faker.commerce.productName(),
      quantity: faker.number.int({ min: 1, max: 500 }),
      unit: faker.helpers.arrayElement(['g', 'ml', 'tbsp', 'tsp', 'pieces']),
      note: faker.lorem.words(3),
    }))

    // steps random
    const steps = Array.from({ length: faker.number.int({ min: 3, max: 6 }) }).map((_, idx) => ({
      title: `Step ${idx + 1}`,
      description: faker.lorem.sentence(),
      order: idx + 1,
    }))

    // dynamic image URL based on category
    const imageUrl = `https://source.unsplash.com/800x600/?food,${category.toLowerCase()}&sig=${i}`

    await prisma.recipe.create({
      data: {
        title: faker.lorem.words(3),
        description: faker.lorem.paragraph(),
        image: imageUrl,
        category,
        cookingTime: faker.number.int({ min: 5, max: 90 }),
        prepTime: faker.number.int({ min: 5, max: 30 }),
        servings: faker.number.int({ min: 1, max: 6 }),
        difficulty: faker.helpers.arrayElement(['Easy', 'Medium', 'Hard']),
        avgRating: faker.number.float({ min: 3, max: 5, fractionDigits: 1 }),
        totalRating: faker.number.int({ min: 0, max: 500 }),
        userId: randomUser.id,
        ingredients: {
          create: ingredients
        },
        steps: {
          create: steps
        },
      },
      include: { ingredients: true, steps: true }
    })
  }

  console.log('✅ Created recipes!')
}

main()
  .then(() => prisma.$disconnect())
  .catch(e => {
    console.error(e)
    prisma.$disconnect()
    process.exit(1)
  })
