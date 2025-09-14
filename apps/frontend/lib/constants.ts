import { Difficulty, Category } from '@/types';

// Recipe difficulty levels
export const DIFFICULTY_LEVELS: Difficulty[] = ['Easy', 'Medium', 'Hard'];

// Recipe categories
export const RECIPE_CATEGORIES: Category[] = [
  'MainDish',
  'SideDish', 
  'Dessert',
  'Soup',
  'Salad',
  'Appetizer',
  'Beverage'
];

// Category display names
export const CATEGORY_DISPLAY_NAMES: Record<Category, string> = {
  MainDish: 'Main Dish',
  SideDish: 'Side Dish',
  Dessert: 'Dessert',
  Soup: 'Soup',
  Salad: 'Salad',
  Appetizer: 'Appetizer',
  Beverage: 'Beverage'
};

// Pagination defaults
export const PAGINATION_DEFAULTS = {
  PAGE_SIZE: 12,
  MAX_PAGE_SIZE: 50,
  DEFAULT_PAGE: 1
};

// Rating constants
export const RATING_CONSTANTS = {
  MIN_SCORE: 1,
  MAX_SCORE: 5,
  DEFAULT_SCORE: 0
};

// API endpoints (for future use)
export const API_ENDPOINTS = {
  RECIPES: '/api/recipes',
  USERS: '/api/users',
  AUTH: '/api/auth',
  FAVORITES: '/api/favorites',
  RATINGS: '/api/ratings',
  COLLECTIONS: '/api/collections'
};

// Image upload settings
export const IMAGE_SETTINGS = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
  MAX_DIMENSIONS: {
    width: 1920,
    height: 1080
  }
}; 