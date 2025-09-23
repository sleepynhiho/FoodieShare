import axiosClient from './axiosClient';
import { GeneralInfo, Ingredient, RecipeStep } from '@/types/recipe';

export interface CreateRecipePayload {
  title: string;
  description?: string;
  image?: string;
  category: string;
  cookingTime: number;
  prepTime: number;
  servings: number;
  difficulty: string;
  ingredients: Array<{
    name: string;
    quantity?: number;
    unit?: string;
    note?: string;
  }>;
  steps: Array<{
    title: string;
    description: string;
  }>;
}

export interface CreateRecipeRequest {
  general: GeneralInfo;
  ingredients: Ingredient[];
  steps: RecipeStep[];
  imageUrl?: string;
}

/**
 * Transform the form data to match the API expected format
 */
const transformRecipeData = (data: CreateRecipeRequest): CreateRecipePayload => {
  console.log('Transforming recipe data:', data);
  return {
    title: data.general.title,
    description: data.general.description,
    image: data.imageUrl,
    category: data.general.category,
    cookingTime: data.general.cookTime,
    prepTime: data.general.prepTime,
    servings: data.general.servings,
    difficulty: data.general.difficulty,
    ingredients: data.ingredients.map(ingredient => ({
      name: ingredient.name,
      quantity: ingredient.quantity,
      unit: ingredient.unit,
      note: ingredient.note
    })),
    steps: data.steps.map(step => ({
      title: step.title,
      description: step.description
    }))
  };
};

/**
 * Create a new recipe
 */
export const createRecipe = async (data: CreateRecipeRequest): Promise<any> => {
  try {
    const payload = transformRecipeData(data);
    
    const response = await axiosClient.post('/recipes', payload, {
      headers: {
        'Content-Type': 'application/json',
      }
    });

    return response.data;
  } catch (error: any) {
    console.error('Error creating recipe:', error);
    
    // Handle different error types
    if (error.response) {
      // Server responded with error status
      const message = error.response.data?.message || 'Failed to create recipe';
      throw new Error(message);
    } else if (error.request) {
      // Request was made but no response received
      throw new Error('Network error: Unable to reach server');
    } else {
      // Something else happened
      throw new Error('An unexpected error occurred');
    }
  }
};

/**
 * Get all recipes with optional filters
 */
export const getRecipes = async (params?: {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  difficulty?: string;
  minPrepTime?: number;
  maxPrepTime?: number;
  minCookingTime?: number;
  maxCookingTime?: number;
  minRating?: number;
  authorId?: string;
  sortBy?: 'createdAt' | 'title' | 'prepTime' | 'cookingTime' | 'servings' | 'avgRating' | 'favoritesCount';
  sortOrder?: 'asc' | 'desc';
}) => {
  try {
    const response = await axiosClient.get('/recipes', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
};

/**
 * Get a single recipe by ID
 */
export const getRecipe = async (id: string) => {
  try {
    const response = await axiosClient.get(`/recipes/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching recipe:', error);
    throw error;
  }
};

/**
 * Get a random recipe
 */
export const getRandomRecipe = async () => {
  try {
    const response = await axiosClient.get('/recipes/random');
    return response.data;
  } catch (error) {
    console.error('Error fetching random recipe:', error);
    throw error;
  }
};

/**
 * Update a recipe
 */
export const updateRecipe = async (id: string, data: Partial<CreateRecipeRequest>) => {
  try {
    const payload = data.general ? transformRecipeData(data as CreateRecipeRequest) : data;
    const response = await axiosClient.put(`/recipes/${id}`, payload);
    return response.data;
  } catch (error) {
    console.error('Error updating recipe:', error);
    throw error;
  }
};

/**
 * Get featured recipes (top-rated)
 */
export const getFeaturedRecipes = async (limit: number = 6) => {
  return getRecipes({
    limit,
    sortBy: 'avgRating',
    sortOrder: 'desc'
  });
};

/**
 * Get latest recipes (most recent)
 */
export const getLatestRecipes = async (limit: number = 6) => {
  return getRecipes({
    limit,
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });
};

/**
 * Get trending recipes (most favorited)
 */
export const getTrendingRecipes = async (limit: number = 6) => {
  return getRecipes({
    limit,
    sortBy: 'favoritesCount',
    sortOrder: 'desc'
  });
};

/**

 * Delete a recipe
 */
export const deleteRecipe = async (id: string) => {
  try {
    const response = await axiosClient.delete(`/recipes/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting recipe:', error);
    throw error;
  }
};

/** Favorite or unfavorite a recipe
 */
export const toggleFavoriteRecipe = async (id: string) => {
  try {
    const response = await axiosClient.post(`/recipes/${id}/favorite`);
    return response.data;
  } catch (error) {
    console.error('Error toggling favorite:', error);
    throw error;
  }
}
