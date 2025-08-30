import { User } from ".";

// Recipe-specific types
export interface Ingredient {
    name: string;
    quantity?: number;
    unit?: string;
    note?: string; // Optional note for ingredients like "salt to taste"
}

export interface RecipeStep {
    title: string;
    description: string;
}

export type Difficulty = "Easy" | "Medium" | "Hard";
export type Category = "MainDish" | "SideDish" | "Dessert" | "Soup" | "Salad" | "Appetizer" | "Beverage";

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