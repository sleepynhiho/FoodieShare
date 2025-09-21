import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { RatingResponseDto, RecipeRatingStatsDto } from './dto/rating-response.dto';

@Injectable()
export class RatingsService {
  constructor(private readonly prisma: PrismaService) {}

  async rateRecipe(recipeId: string, userId: string, createRatingDto: CreateRatingDto): Promise<RatingResponseDto> {
    // Check if recipe exists
    const recipe = await this.prisma.recipe.findUnique({
      where: { id: recipeId },
      select: { id: true, userId: true }
    });

    if (!recipe) {
      throw new NotFoundException(`Recipe with ID ${recipeId} not found`);
    }

    // Prevent users from rating their own recipes
    if (recipe.userId === userId) {
      throw new BadRequestException('You cannot rate your own recipe');
    }

    // Check if user has already rated this recipe
    const existingRating = await this.prisma.rating.findUnique({
      where: {
        userId_recipeId: {
          userId,
          recipeId
        }
      }
    });

    let rating;
    
    if (existingRating) {
      // Update existing rating
      rating = await this.prisma.rating.update({
        where: {
          userId_recipeId: {
            userId,
            recipeId
          }
        },
        data: {
          score: createRatingDto.rating
        }
      });
    } else {
      // Create new rating
      rating = await this.prisma.rating.create({
        data: {
          score: createRatingDto.rating,
          userId,
          recipeId
        }
      });
    }

    // Calculate and update average rating for the recipe
    await this.updateRecipeRating(recipeId);

    return this.formatRatingResponse(rating);
  }

  async getRecipeRatingStats(recipeId: string, userId?: string): Promise<RecipeRatingStatsDto> {
    // Check if recipe exists
    const recipe = await this.prisma.recipe.findUnique({
      where: { id: recipeId },
      select: { id: true }
    });

    if (!recipe) {
      throw new NotFoundException(`Recipe with ID ${recipeId} not found`);
    }

    // Get all ratings for this recipe
    const ratings = await this.prisma.rating.findMany({
      where: { recipeId },
      select: { score: true, userId: true }
    });

    const totalRatings = ratings.length;
    const averageRating = totalRatings > 0 
      ? ratings.reduce((sum, rating) => sum + rating.score, 0) / totalRatings 
      : 0;

    // Get user's rating if userId provided
    let userRating: number | undefined;
    if (userId) {
      const userRatingRecord = ratings.find(rating => rating.userId === userId);
      userRating = userRatingRecord?.score;
    }

    return {
      averageRating: Math.round(averageRating * 10) / 10, // Round to 1 decimal place
      totalRatings,
      userRating
    };
  }

  async getUserRating(recipeId: string, userId: string): Promise<RatingResponseDto | null> {
    const rating = await this.prisma.rating.findUnique({
      where: {
        userId_recipeId: {
          userId,
          recipeId
        }
      }
    });

    return rating ? this.formatRatingResponse(rating) : null;
  }

  async deleteRating(recipeId: string, userId: string): Promise<void> {
    // Check if rating exists
    const rating = await this.prisma.rating.findUnique({
      where: {
        userId_recipeId: {
          userId,
          recipeId
        }
      }
    });

    if (!rating) {
      throw new NotFoundException('Rating not found');
    }

    await this.prisma.rating.delete({
      where: {
        userId_recipeId: {
          userId,
          recipeId
        }
      }
    });
  }

  private formatRatingResponse(rating: any): RatingResponseDto {
    return {
      id: rating.id,
      score: rating.score,
      userId: rating.userId,
      recipeId: rating.recipeId,
      createdAt: rating.createdAt.toISOString(),
    };
  }

  private async updateRecipeRating(recipeId: string): Promise<void> {
    // Calculate average rating for this recipe
    const ratingStats = await this.prisma.rating.aggregate({
      where: { recipeId },
      _avg: { score: true },
      _count: { score: true }
    });

    const avgRating = ratingStats._avg.score || 0;
    const totalRating = ratingStats._count.score || 0;
    
    // Update the recipe with the new average rating
    await this.prisma.recipe.update({
      where: { id: recipeId },
      data: { 
        avgRating: Math.round(avgRating * 10) / 10,
        totalRating: totalRating
      } // Round to 1 decimal place
    });
  }
}