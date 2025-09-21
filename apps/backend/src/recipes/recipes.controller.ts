import { Body, Controller, Get, Param, Post, Put, Delete, Req, UseGuards, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { RecipeResponseDto } from './dto/recipe-response.dto';
import { GetRecipesQueryDto, RecipeListResponseDto } from './dto/get-recipes-query.dto';
import { FavoriteRecipeResponseDto } from './dto/favorite-recipe-response.dto';
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

  @Get()
  async findAll(@Query() query: GetRecipesQueryDto): Promise<RecipeListResponseDto> {
    return this.recipesService.findAll(query);
  }

  @Get('random')
  async findRandom(): Promise<RecipeResponseDto> {
    return this.recipesService.findRandom();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<RecipeResponseDto> {
    return this.recipesService.findOne(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateRecipeDto: UpdateRecipeDto,
    @Req() req: Request,
  ): Promise<RecipeResponseDto> {
    const userId = req.user.id;
    return this.recipesService.update(id, updateRecipeDto, userId);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('id') id: string,
    @Req() req: Request,
  ): Promise<void> {
    const userId = req.user.id;
    return this.recipesService.remove(id, userId);
  }

  @Post(':id/favorite')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async toggleFavorite(
    @Param('id') id: string,
    @Req() req: Request,
  ): Promise<FavoriteRecipeResponseDto> {
    const userId = req.user.id;
    return this.recipesService.toggleFavorite(id, userId);
  }
}