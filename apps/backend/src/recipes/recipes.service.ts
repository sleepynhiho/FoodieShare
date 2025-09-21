import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { RecipeResponseDto } from './dto/recipe-response.dto';
import { GetRecipesQueryDto, RecipeListResponseDto } from './dto/get-recipes-query.dto';
import { FavoriteRecipeResponseDto } from './dto/favorite-recipe-response.dto';

@Injectable()
export class RecipesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createRecipeDto: CreateRecipeDto, userId: string): Promise<RecipeResponseDto> {
    const { ingredients, steps, ...recipeData } = createRecipeDto;

    const recipe = await this.prisma.recipe.create({
      data: {
        ...recipeData,
        userId,
        ingredients: {
          create: ingredients.map((ingredient) => ({
            name: ingredient.name,
            quantity: ingredient.quantity,
            unit: ingredient.unit,
            note: ingredient.note,
          })),
        },
        steps: {
          create: steps.map((step, index) => ({
            title: step.title,
            description: step.description,
            order: index + 1,
          })),
        },
      },
      include: {
        ingredients: true,
        steps: {
          orderBy: {
            order: 'asc',
          },
        },
        user: {
          select: {
            id: true,
            email: true,
            username: true,
            avatar: true,
          },
        },
        _count: {
          select: {
            favorites: true,
          },
        },
      },
    });

    return this.formatRecipeResponse(recipe);
  }

  async findOne(id: string): Promise<RecipeResponseDto> {
    const recipe = await this.prisma.recipe.findUnique({
      where: { id },
      include: {
        ingredients: true,
        steps: {
          orderBy: {
            order: 'asc',
          },
        },
        user: {
          select: {
            id: true,
            email: true,
            username: true,
            avatar: true,
          },
        },
        _count: {
          select: {
            favorites: true,
          },
        },
      },
    });

    if (!recipe) {
      throw new NotFoundException(`Recipe with ID ${id} not found`);
    }

    return this.formatRecipeResponse(recipe);
  }

  async findAll(query: GetRecipesQueryDto): Promise<RecipeListResponseDto> {
    const {
      page = 1,
      limit = 10,
      search,
      category,
      difficulty,
      minPrepTime,
      maxPrepTime,
      minCookingTime,
      maxCookingTime,
      minServings,
      maxServings,
      minRating,
      authorId,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = query;

    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ];
    }

    if (category) where.category = category;
    if (difficulty) where.difficulty = difficulty;
    if (authorId) where.userId = authorId;

    if (minPrepTime !== undefined) {
      where.prepTime = { ...where.prepTime, gte: minPrepTime };
    }
    if (maxPrepTime !== undefined) {
      where.prepTime = { ...where.prepTime, lte: maxPrepTime };
    }

    if (minCookingTime !== undefined) {
      where.cookingTime = { ...where.cookingTime, gte: minCookingTime };
    }
    if (maxCookingTime !== undefined) {
      where.cookingTime = { ...where.cookingTime, lte: maxCookingTime };
    }

    if (minServings !== undefined) {
      where.servings = { ...where.servings, gte: minServings };
    }
    if (maxServings !== undefined) {
      where.servings = { ...where.servings, lte: maxServings };
    }

    if (minRating !== undefined) {
      where.avgRating = { ...where.avgRating, gte: minRating };
    }

    // Execute queries
    const [recipes, total] = await Promise.all([
      this.prisma.recipe.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        include: {
          ingredients: true,
          steps: {
            orderBy: { order: 'asc' }
          },
          user: {
            select: {
              id: true,
              email: true,
              username: true,
              avatar: true,
            },
          },
          _count: {
            select: {
              favorites: true,
            },
          },
        },
      }),
      this.prisma.recipe.count({ where })
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      recipes: recipes.map(recipe => this.formatRecipeResponse(recipe)),
      total,
      page,
      limit,
      totalPages,
    };
  }

  async update(id: string, updateRecipeDto: UpdateRecipeDto, userId: string): Promise<RecipeResponseDto> {
    // First, check if recipe exists and user owns it
    const existingRecipe = await this.prisma.recipe.findUnique({
      where: { id },
      select: { userId: true }
    });

    if (!existingRecipe) {
      throw new NotFoundException(`Recipe with ID ${id} not found`);
    }

    if (existingRecipe.userId !== userId) {
      throw new ForbiddenException('You can only update your own recipes');
    }

    const { ingredients, steps, ...recipeData } = updateRecipeDto;

    // Update recipe with related data
    const updateData: any = { ...recipeData };

    // Handle ingredients update (replace all)
    if (ingredients) {
      updateData.ingredients = {
        deleteMany: {}, // Delete all existing ingredients
        create: ingredients.map((ingredient) => ({
          name: ingredient.name,
          quantity: ingredient.quantity,
          unit: ingredient.unit,
          note: ingredient.note,
        })),
      };
    }

    // Handle steps update (replace all)
    if (steps) {
      updateData.steps = {
        deleteMany: {}, // Delete all existing steps
        create: steps.map((step, index) => ({
          title: step.title,
          description: step.description,
          order: index + 1,
        })),
      };
    }

    const updatedRecipe = await this.prisma.recipe.update({
      where: { id },
      data: updateData,
      include: {
        ingredients: true,
        steps: {
          orderBy: { order: 'asc' }
        },
        user: {
          select: {
            id: true,
            email: true,
            username: true,
            avatar: true,
          },
        },
        _count: {
          select: {
            favorites: true,
          },
        },
      },
    });

    return this.formatRecipeResponse(updatedRecipe);
  }

  async remove(id: string, userId: string): Promise<void> {
    // First, check if recipe exists and user owns it
    const existingRecipe = await this.prisma.recipe.findUnique({
      where: { id },
      select: { userId: true }
    });

    if (!existingRecipe) {
      throw new NotFoundException(`Recipe with ID ${id} not found`);
    }

    if (existingRecipe.userId !== userId) {
      throw new ForbiddenException('You can only delete your own recipes');
    }

    // Delete recipe (ingredients and steps will be deleted automatically due to cascade)
    await this.prisma.recipe.delete({
      where: { id }
    });
  }

  async toggleFavorite(recipeId: string, userId: string): Promise<FavoriteRecipeResponseDto> {
    // Check if recipe exists
    const recipe = await this.prisma.recipe.findUnique({
      where: { id: recipeId }
    });

    if (!recipe) {
      throw new NotFoundException(`Recipe with ID ${recipeId} not found`);
    }

    // Check if the recipe is already favorited by the user
    const existingFavorite = await this.prisma.favorite.findUnique({
      where: {
        userId_recipeId: {
          userId,
          recipeId,
        },
      },
    });

    let isFavorited: boolean;

    if (existingFavorite) {
      // If favorite exists, remove it
      await this.prisma.favorite.delete({
        where: {
          id: existingFavorite.id,
        },
      });
      isFavorited = false;
    } else {
      // If favorite doesn't exist, create it
      await this.prisma.favorite.create({
        data: {
          userId,
          recipeId,
        },
      });
      isFavorited = true;
    }

    // Get the updated favorites count
    const updatedRecipe = await this.prisma.recipe.findUnique({
      where: { id: recipeId },
      include: {
        _count: {
          select: {
            favorites: true,
          },
        },
      },
    });

    if (!updatedRecipe) {
      throw new NotFoundException(`Recipe with ID ${recipeId} not found`);
    }

    return {
      id: recipeId,
      isFavorited,
      favoritesCount: updatedRecipe._count.favorites,
      message: isFavorited ? 'Recipe added to favorites' : 'Recipe removed from favorites',
    };
  }

  private formatRecipeResponse(recipe: any): RecipeResponseDto {
    return {
      id: recipe.id,
      title: recipe.title,
      description: recipe.description,
      image: recipe.image,
      category: recipe.category,
      cookingTime: recipe.cookingTime,
      prepTime: recipe.prepTime,
      servings: recipe.servings,
      difficulty: recipe.difficulty,
      avgRating: recipe.avgRating,
      favoritesCount: recipe._count?.favorites || 0,
      ingredients: recipe.ingredients.map((ingredient: any) => ({
        id: ingredient.id,
        name: ingredient.name,
        quantity: ingredient.quantity,
        unit: ingredient.unit,
        note: ingredient.note,
      })),
      steps: recipe.steps.map((step: any) => ({
        id: step.id,
        title: step.title,
        description: step.description,
        order: step.order,
      })),
      author: {
        id: recipe.user.id,
        email: recipe.user.email,
        username: recipe.user.username,
        avatar: recipe.user.avatar,
      },
      createdAt: recipe.createdAt.toISOString(),
      updatedAt: recipe.updatedAt.toISOString(),
    };
  }

  async findRandom(): Promise<RecipeResponseDto> {
    // Use raw SQL for true randomness with PostgreSQL RANDOM() function
    const result = await this.prisma.$queryRaw`
      SELECT id FROM "Recipe" 
      ORDER BY RANDOM() 
      LIMIT 1
    ` as { id: string }[];
    
    if (!result || result.length === 0) {
      throw new NotFoundException('No recipes found');
    }

    const randomId = result[0].id;
    
    // Fetch the full recipe data
    const randomRecipe = await this.prisma.recipe.findUnique({
      where: { id: randomId },
      include: {
        ingredients: true,
        steps: {
          orderBy: { order: 'asc' }
        },
        user: {
          select: {
            id: true,
            email: true,
            username: true,
            avatar: true,
          },
        },
        _count: {
          select: {
            favorites: true,
          },
        },
      },
    });

    if (!randomRecipe) {
      throw new NotFoundException('Recipe not found');
    }

    return this.formatRecipeResponse(randomRecipe);
  }
}