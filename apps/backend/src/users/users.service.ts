import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/common/prisma/prisma.service";

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserRecipes(userId: string) {
    return this.prisma.recipe.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async getUserFavorites(userId: string) {
    return this.prisma.recipe.findMany({
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
    });
  }
}
