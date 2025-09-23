import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/common/prisma/prisma.service";
import { RecipeResponseDto } from "src/recipes/dto/recipe-response.dto";

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserRecipes(userId: string) {
    const userRecipes = await this.prisma.recipe.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            username: true,
            avatar: true,
          },
        },
      }
    });

    return userRecipes
  }

  async getUserFavorites(userId: string) {
    const favoriteRecipes = await this.prisma.recipe.findMany({
      where: {
        favorites: {
          some: {
            userId: userId,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            username: true,
            avatar: true,
          },
        },
      }
    });

    return favoriteRecipes;
  }

  async getUserRecipeCount(userId: string) {
    const recipeCount = await this.prisma.recipe.count({
      where: {
        userId: userId,
      },
    });

    return { count: recipeCount };
  }
}
