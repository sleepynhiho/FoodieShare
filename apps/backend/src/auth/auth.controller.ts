import { Controller, Res, Post, Body, HttpCode } from "@nestjs/common";
import type { Response } from "express";
import { CreateUserDto } from "./dto/signup.dto";
import { EmailDto } from "src/email/dto/email.dto";
import { SignupService } from "./signup/signup.service";
import { UserExistException } from "src/common/exceptions/user-exist.exception";
import { EmailService } from "src/email/email.service";
import { ServerException } from "src/common/exceptions/server-exception";
import { LoginDto } from "./dto/login.dto";
import { LoginService } from "./login/login.service";
import { LogoutService } from "./logout/logout.service";
import { UserNotFoundException } from "src/common/exceptions/user-not-found.exception";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly signupService: SignupService,
    private readonly resendEmailService: EmailService,
    private readonly loginService: LoginService,
    private readonly logoutService: LogoutService
  ) {}

  @Post("signup")
  @HttpCode(200)
  async signup(@Body() dto: CreateUserDto) {
    const res = await this.signupService.signup(dto);
    if (!res)
      throw new UserExistException("User already exists!")
    return res
  }

  @Post("resend-email-signup")
  @HttpCode(200)
  async resendEmailSignup(@Body() dto: EmailDto) {
    const res = await this.resendEmailService.resendEmail(dto)
    if (!res)
      throw new ServerException("Failed to resend email!")
    return res
  }

  @Post("login")
  @HttpCode(200)
  async login(@Body() dto: LoginDto) {
    const res = await this.loginService.login(dto)
    if (!res)
      throw new UserNotFoundException("User does not exist!")
    return res
  }
  
  @Post("logout")
  @HttpCode(200)
  async logout(@Res({ passthrough: true }) response: Response) {
    const res = await this.logoutService.logout()
    if (!res)
      throw new UserNotFoundException("User does not exist!")
    response.clearCookie("accessToken"); 
    response.clearCookie("refreshToken"); 
    return res;
  }
}
