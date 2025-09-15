export class RatingResponseDto {
  id: string;
  score: number;
  userId: string;
  recipeId: string;
  createdAt: string;
}

export class RecipeRatingStatsDto {
  averageRating: number;
  totalRatings: number;
  userRating?: number; // Current user's rating if authenticated
}