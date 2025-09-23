import { IsOptional, IsString, IsInt, IsEnum, Min, Max } from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { Category, Difficulty } from './create-recipe.dto';

export enum SortField {
  CREATED_AT = 'createdAt',
  TITLE = 'title',
  PREP_TIME = 'prepTime',
  COOKING_TIME = 'cookingTime',
  SERVINGS = 'servings',
  RATING = 'avgRating',
  FAVORITES = 'favoritesCount'
}

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc'
}

export class GetRecipesQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 10;

  @IsOptional()
  @IsString()
  search?: string; // Search in title and description

  @IsOptional()
  @IsEnum(Category)
  category?: Category;

  @IsOptional()
  @IsEnum(Difficulty)
  difficulty?: Difficulty;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  minPrepTime?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  maxPrepTime?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  minCookingTime?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  maxCookingTime?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(5)
  minRating?: number;

  @IsOptional()
  @IsString()
  authorId?: string; // Filter by specific author

  @IsOptional()
  @IsEnum(SortField)
  sortBy?: SortField = SortField.CREATED_AT;

  @IsOptional()
  @IsEnum(SortOrder)
  sortOrder?: SortOrder = SortOrder.DESC;
}

export class RecipeListResponseDto {
  recipes: any[]; // Will be RecipeResponseDto[]
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}