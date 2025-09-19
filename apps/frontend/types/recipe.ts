import { User } from ".";

// Recipe-specific types
export interface GeneralInfo {
  title: string;
  description: string;
  image?: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: Difficulty;
  category: Category;
}

export interface Ingredient {
  name: string;
  quantity?: number;
  unit?: string;
  note?: string; // Optional note for ingredients like "salt to taste"
}

// Only used in UI state management
export type UIIngredient = Ingredient & { id: string }; // temparily id for actions control
export type UIStep = RecipeStep & { id: string }; // temparily id for actions control

export interface RecipeStep {
  title: string;
  description: string;
}

export type Difficulty = "Easy" | "Medium" | "Hard";
export type Category =
  | "MainDish"
  | "SideDish"
  | "Dessert"
  | "Soup"
  | "Salad"
  | "Appetizer"
  | "Beverage";

export interface Recipe {
  id: number;
  title: string;
  description: string;
  prepTime: number; // minutes
  cookTime: number; // minutes
  servings: number; // number of servings
  difficulty: Difficulty;
  category: Category;
  image?: string;
  ingredients: Ingredient[];
  steps: RecipeStep[];
  authorId: number;
  createdAt: string;
  updatedAt: string;
}

export interface RecipeWithDetails extends Recipe {
  author?: User;
  averageRating?: number;
  totalRatings?: number;
  isFavorited?: boolean;
  userRating?: number;
}

export interface CreateRecipeForm {
  title: string;
  description: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: Difficulty;
  category: Category;
  ingredients: Ingredient[];
  steps: RecipeStep[];
}

export interface UpdateRecipeForm extends Partial<CreateRecipeForm> {
  id: number;
}

export enum IngredientUnit {
  g = "g",
  kg = "kg",
  ml = "ml",
  l = "l",
  cup = "cup",
  tbsp = "tbsp",
  tsp = "tsp",
  oz = "oz",
  lb = "lb",
  pcs = "pcs",
  slice = "slice",
  pinch = "pinch",
}

export type GeneralInfoRef = {
  getData: () => GeneralInfo;
  getImageFile: () => File | null;
};

export type IngredientsRef = {
  getData: () => Ingredient[];
};

export type StepsRef = {
  getData: () => RecipeStep[];
};