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
 * Note: This would need to be implemented in the backend
 * For now, we'll calculate from available data
 */
export const getAppStats = async (): Promise<AppStats> => {
  try {
    // For now, we'll make multiple API calls to get the data
    // In the future, consider creating a dedicated stats endpoint
    const recipesResponse = await axiosClient.get('/recipes', { params: { limit: 1 } });
    const totalRecipes = recipesResponse.data.total || 0;
    
    // TODO: Add endpoints for user count, total ratings, etc.
    // For now, return basic data
    return {
      totalRecipes,
      totalUsers: 0, // Would need /users/count endpoint
      totalRatings: 0, // Would need /ratings/count endpoint  
      avgRating: 0, // Would need /ratings/average endpoint
      totalFavorites: 0, // Would need /favorites/count endpoint
    };
  } catch (error) {
    console.error('Error fetching app stats:', error);
    throw error;
  }
};

/**
 * Get category statistics
 */
export const getCategoryStats = async (): Promise<CategoryStats[]> => {
  try {
    // Get all recipes grouped by category
    // This would ideally be a dedicated endpoint
    const response = await axiosClient.get('/recipes', { params: { limit: 1000 } });
    const recipes = response.data.data || [];
    
    // Count recipes per category
    const categoryMap = new Map<string, number>();
    recipes.forEach((recipe: any) => {
      const category = recipe.category;
      categoryMap.set(category, (categoryMap.get(category) || 0) + 1);
    });
    
    return Array.from(categoryMap.entries()).map(([name, count]) => ({
      name,
      count
    }));
  } catch (error) {
    console.error('Error fetching category stats:', error);
    throw error;
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