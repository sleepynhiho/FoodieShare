import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/auth/auth.guard";
import type { Request } from "express";

// Extend Express Request interface to include 'user'
declare module "express" {
  interface Request {
    user?: any;
  }
}

@Controller("users")
export class UserController {
  @Get("me")
  @UseGuards(AuthGuard)
  getProfile(@Req() req: Request) {
    return req.user;
  }
}
