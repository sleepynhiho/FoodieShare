import axiosClient from './axiosClient';

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

export interface UserProfile {
  id: string;
  email: string;
  username: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Get application statistics
 */
export const getAppStats = async (): Promise<AppStats> => {
  try {
    const response = await axiosClient.get('/stats/app');
    return response.data;
  } catch (error) {
    console.error('Error fetching app stats:', error);
    // Return default values on error
    return {
      totalRecipes: 0,
      totalUsers: 0,
      totalRatings: 0,
      avgRating: 0,
      totalFavorites: 0,
    };
  }
};

/**
 * Get category statistics
 */
export const getCategoryStats = async (): Promise<CategoryStats[]> => {
  try {
    const response = await axiosClient.get('/stats/categories');
    return response.data;
  } catch (error) {
    console.error('Error fetching category stats:', error);
    return [];
  }
};

/**
 * Get top authors
 */
export const getTopAuthors = async (limit: number = 10): Promise<TopAuthor[]> => {
  try {
    const response = await axiosClient.get('/stats/top-authors', { params: { limit } });
    return response.data;
  } catch (error) {
    console.error('Error fetching top authors:', error);
    return [];
  }
};

/**
 * Get user profile
 */
export const getUserProfile = async (): Promise<UserProfile> => {
  try {
    const response = await axiosClient.get('/users/me');
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

/**
 * Get user's favorite recipes
 */
export const getUserFavorites = async (): Promise<any[]> => {
  try {
    const response = await axiosClient.get('/users/me/favorites');
    return response.data;
  } catch (error) {
    console.error('Error fetching user favorites:', error);
    throw error;
  }
};

/**
 * Get user's recipes
 */
export const getUserRecipes = async (): Promise<any[]> => {
  try {
    const response = await axiosClient.get('/users/me/recipes');
    return response.data;
  } catch (error) {
    console.error('Error fetching user recipes:', error);
    throw error;
  }
};