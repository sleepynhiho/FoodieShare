import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';

export interface AppStats {
  totalRecipes: number;
  totalUsers: number;
  totalRatings: number;
  avgRating: number;
  totalFavorites: number;
}

export interface CategoryStats {
  name: string;
  count: number;
}

export interface TopAuthor {
  id: string;
  username: string;
  avatar?: string;
  recipeCount: number;
  avgRating: number;
  totalFavorites: number;
}

@Injectable()
export class StatsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAppStats(): Promise<AppStats> {
    // Get all stats in parallel for better performance
    const [
      totalRecipes,
      totalUsers,
      totalRatings,
      avgRatingResult,
      totalFavorites
    ] = await Promise.all([
      this.prisma.recipe.count(),
      this.prisma.user.count(),
      this.prisma.rating.count(),
      this.prisma.rating.aggregate({
        _avg: {
          score: true
        }
      }),
      this.prisma.favorite.count()
    ]);

    return {
      totalRecipes,
      totalUsers,
      totalRatings,
      avgRating: avgRatingResult._avg.score || 0,
      totalFavorites
    };
  }

  async getCategoryStats(): Promise<CategoryStats[]> {
    const categoryStats = await this.prisma.recipe.groupBy({
      by: ['category'],
      _count: {
        category: true
      },
      orderBy: {
        _count: {
          category: 'desc'
        }
      }
    });

    return categoryStats.map(stat => ({
      name: stat.category,
      count: stat._count.category
    }));
  }

  async getTopAuthors(limit: number = 10): Promise<TopAuthor[]> {
    // Get users with their recipe counts, average ratings, and total favorites
    const topAuthors = await this.prisma.user.findMany({
      select: {
        id: true,
        username: true,
        avatar: true,
        recipes: {
          select: {
            avgRating: true,
            _count: {
              select: {
                favorites: true
              }
            }
          }
        }
      },
      where: {
        recipes: {
          some: {} // Only users who have at least one recipe
        }
      }
    });

    // Calculate stats for each author
    const authorsWithStats = topAuthors.map(author => {
      const recipeCount = author.recipes.length;
      const totalRating = author.recipes.reduce((sum, recipe) => sum + (recipe.avgRating || 0), 0);
      const avgRating = recipeCount > 0 ? totalRating / recipeCount : 0;
      const totalFavorites = author.recipes.reduce((sum, recipe) => sum + recipe._count.favorites, 0);

      return {
        id: author.id,
        username: author.username,
        avatar: author.avatar || undefined,
        recipeCount,
        avgRating,
        totalFavorites
      };
    });

    // Sort by recipe count (primary) and then by average rating (secondary)
    return authorsWithStats
      .sort((a, b) => {
        if (b.recipeCount !== a.recipeCount) {
          return b.recipeCount - a.recipeCount;
        }
        return b.avgRating - a.avgRating;
      })
      .slice(0, limit);
  }
}