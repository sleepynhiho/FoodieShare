import { IsString, IsInt, IsOptional, IsArray, ValidateNested, IsNumber, Min, Max, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';

export enum Difficulty {
  EASY = 'Easy',
  MEDIUM = 'Medium',
  HARD = 'Hard'
}

export enum Category {
  MAIN_DISH = 'MainDish',
  SIDE_DISH = 'SideDish', 
  DESSERT = 'Dessert',
  SOUP = 'Soup',
  SALAD = 'Salad',
  APPETIZER = 'Appetizer',
  BEVERAGE = 'Beverage'
}

export class CreateIngredientDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  quantity?: number;

  @IsOptional()
  @IsString()
  unit?: string;

  @IsOptional()
  @IsString()
  note?: string;
}

export class CreateRecipeStepDto {
  @IsString()
  title: string;

  @IsString()
  description: string;
}

export class CreateRecipeDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsEnum(Category)
  category: Category;

  @IsInt()
  @Min(0)
  cookingTime: number; // cookTime in minutes

  @IsInt()
  @Min(0)
  prepTime: number; // prepTime in minutes

  @IsInt()
  @Min(1)
  @Max(50)
  servings: number;

  @IsEnum(Difficulty)
  difficulty: Difficulty;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateIngredientDto)
  ingredients: CreateIngredientDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateRecipeStepDto)
  steps: CreateRecipeStepDto[];
}