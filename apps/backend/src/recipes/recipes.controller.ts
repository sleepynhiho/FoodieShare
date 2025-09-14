import { Body, Controller, Get, Param, Post, Req, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { RecipeResponseDto } from './dto/recipe-response.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import type { Request } from 'express';

// Extend Express Request interface to include 'user'
declare module 'express' {
  interface Request {
    user?: any;
  }
}

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Post()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createRecipeDto: CreateRecipeDto,
    @Req() req: Request,
  ): Promise<RecipeResponseDto> {
    const userId = req.user.id;
    return this.recipesService.create(createRecipeDto, userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<RecipeResponseDto> {
    return this.recipesService.findOne(id);
  }
}