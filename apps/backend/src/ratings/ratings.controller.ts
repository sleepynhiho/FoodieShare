import { Body, Controller, Post, Get, Delete, Param, Req, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { RatingResponseDto, RecipeRatingStatsDto } from './dto/rating-response.dto';
import { AuthGuard, OptionalAuthGuard } from 'src/auth/auth.guard';
import type { Request } from 'express';

// Extend Express Request interface to include 'user'
declare module 'express' {
  interface Request {
    user?: any;
  }
}

@Controller('recipes')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @Post(':id/rate')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async rateRecipe(
    @Param('id') recipeId: string,
    @Body() createRatingDto: CreateRatingDto,
    @Req() req: Request,
  ): Promise<RatingResponseDto> {
    const userId = req.user.id;
    return this.ratingsService.rateRecipe(recipeId, userId, createRatingDto);
  }
  
  @Get(':id/rating-stats')
  @UseGuards(OptionalAuthGuard)
  async getRecipeRatingStats(
    @Param('id') recipeId: string,
    @Req() req: Request,
  ): Promise<RecipeRatingStatsDto> {
    // Extract user ID if authenticated (optional for this endpoint)
    const userId = req.user?.id;
    return this.ratingsService.getRecipeRatingStats(recipeId, userId);
  }

  @Get(':id/my-rating')
  @UseGuards(AuthGuard)
  async getUserRating(
    @Param('id') recipeId: string,
    @Req() req: Request,
  ): Promise<RatingResponseDto | null> {
    const userId = req.user.id;
    return this.ratingsService.getUserRating(recipeId, userId);
  }

  @Delete(':id/rate')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteRating(
    @Param('id') recipeId: string,
    @Req() req: Request,
  ): Promise<void> {
    const userId = req.user.id;
    return this.ratingsService.deleteRating(recipeId, userId);
  }
}