import axiosClient from './axiosClient';

export interface RatingStats {
  averageRating: number;
  totalRatings: number;
  userRating?: number;
}

export interface CreateRatingPayload {
  rating: number;
}

export interface RatingResponse {
  id: string;
  score: number;
  userId: string;
  recipeId: string;
  createdAt: string;
}

/**
 * Get rating statistics for a recipe
 */
export const getRecipeRatingStats = async (recipeId: string): Promise<RatingStats> => {
  try {
    const response = await axiosClient.get(`/recipes/${recipeId}/rating-stats`);
    return response.data;
  } catch (error) {
    console.error('Error fetching rating stats:', error);
    throw error;
  }
};

/**
 * Submit a rating for a recipe
 */
export const submitRating = async (recipeId: string, rating: number): Promise<RatingResponse> => {
  try {
    const response = await axiosClient.post(`/recipes/${recipeId}/rate`, { rating });
    return response.data;
  } catch (error) {
    console.error('Error submitting rating:', error);
    throw error;
  }
};

/**
 * Get user's rating for a recipe
 */
export const getUserRating = async (recipeId: string): Promise<RatingResponse | null> => {
  try {
    const response = await axiosClient.get(`/recipes/${recipeId}/my-rating`);
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 404) {
      return null; // User hasn't rated this recipe
    }
    console.error('Error fetching user rating:', error);
    throw error;
  }
};

/**
 * Delete user's rating for a recipe
 */
export const deleteRating = async (recipeId: string): Promise<void> => {
  try {
    await axiosClient.delete(`/recipes/${recipeId}/rate`);
  } catch (error) {
    console.error('Error deleting rating:', error);
    throw error;
  }
};