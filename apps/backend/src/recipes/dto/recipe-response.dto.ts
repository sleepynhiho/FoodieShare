export class RecipeIngredientResponseDto {
  id: string;
  name: string;
  quantity?: number;
  unit?: string;
  note?: string;
}

export class RecipeStepResponseDto {
  id: string;
  title: string;
  description: string;
  order: number;
}

export class RecipeAuthorDto {
  id: string;
  email: string;
  username?: string;
  avatar?: string;
}

export class RecipeResponseDto {
  id: string;
  title: string;
  description?: string;
  image?: string;
  category: string;
  cookingTime: number;
  prepTime: number;
  servings: number;
  difficulty: string;
  avgRating?: number;
  totalRating?: number;
  favoritesCount: number;
  ingredients: RecipeIngredientResponseDto[];
  steps: RecipeStepResponseDto[];
  author: RecipeAuthorDto;
  createdAt: string;
  updatedAt: string;
}