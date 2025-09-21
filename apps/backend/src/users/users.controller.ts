import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/auth/auth.guard";
import type { Request } from "express";
import { UsersService } from "./users.service";

// Extend Express Request interface to include 'user'
declare module "express" {
  interface Request {
    user?: any;
  }
}

@Controller("users")
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Get("me")
  @UseGuards(AuthGuard)
  getProfile(@Req() req: Request) {
    return req.user;
  }

  @Get("me/recipes")
  @UseGuards(AuthGuard)
  async getUserRecipes(@Req() req: Request) {
    return this.usersService.getUserRecipes(req.user.id);
  }

  @Get("me/favorites")
  @UseGuards(AuthGuard)
  async getUserFavorites(@Req() req: Request) {
    return this.usersService.getUserFavorites(req.user.id);
  }
}
