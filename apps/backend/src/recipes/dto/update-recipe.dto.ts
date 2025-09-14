import { IsString, IsInt, IsOptional, IsArray, ValidateNested, IsNumber, Min, Max, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { Difficulty, Category } from './create-recipe.dto';

export class UpdateIngredientDto {
  @IsOptional()
  @IsString()
  id?: string; // For existing ingredients

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

export class UpdateRecipeStepDto {
  @IsOptional()
  @IsString()
  id?: string; // For existing steps

  @IsString()
  title: string;

  @IsString()
  description: string;
}

export class UpdateRecipeDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsEnum(Category)
  category?: Category;

  @IsOptional()
  @IsInt()
  @Min(0)
  cookingTime?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  prepTime?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(50)
  servings?: number;

  @IsOptional()
  @IsEnum(Difficulty)
  difficulty?: Difficulty;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateIngredientDto)
  ingredients?: UpdateIngredientDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateRecipeStepDto)
  steps?: UpdateRecipeStepDto[];
}