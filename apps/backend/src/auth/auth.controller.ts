import { Controller, Req, Res, Post, Body, HttpCode } from "@nestjs/common";
import type { Request, Response } from "express";
import { CreateUserDto } from "./dto/signup.dto";
import { EmailDto } from "src/email/dto/email.dto";
import { SignupService } from "./signup/signup.service";
import { EmailService } from "src/email/email.service";
import { ServerException } from "src/common/exceptions/server-exception";
import { LoginDto } from "./dto/login.dto";
import { LoginService } from "./login/login.service";
import { LogoutService } from "./logout/logout.service";
import { UnauthorizedException } from "src/common/exceptions/unauthorized-exception";
import { RefreshService } from "./refresh/refresh.service";
import { PasswordResetEmailDto, PasswordResetDto } from "./dto/password.dto";
import { PasswordService } from "./password/password.service";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly signupService: SignupService,
    private readonly resendEmailService: EmailService,
    private readonly loginService: LoginService,
    private readonly logoutService: LogoutService,
    private readonly refreshService: RefreshService,
    private readonly passwordService: PasswordService
  ) {}

  @Post("signup")
  @HttpCode(201)
  async signup(@Body() dto: CreateUserDto) {
    const res = await this.signupService.signup(dto);
    return res
  }

  @Post("resend-email-signup")
  @HttpCode(200)
  async resendEmailSignup(@Body() dto: EmailDto) {
    const res = await this.resendEmailService.resendEmail(dto)
    return res
  }

  @Post("login")
  @HttpCode(200)
  async login(@Body() dto: LoginDto, @Res({ passthrough: true }) response: Response) {
    const res = await this.loginService.login(dto)

    if (!res.success) {
      if (res.errorCode === "INVALID_CREDENTIALS") 
        throw new UnauthorizedException("Invalid credentials!")
      throw new ServerException(res.error || "Login failed!")
    }

    if (res.data?.session) {
      response.cookie("accessToken", res.data.session.access_token, {
        httpOnly: true,   
        secure: false,     
        sameSite: "lax", 
        maxAge: 60 * 60 * 1000 // 1 hour
      });

      response.cookie("refreshToken", res.data.session.refresh_token, {
        httpOnly: true,   
        secure: false,     
        sameSite: "lax", 
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
      });
    }

    return res.data
  }

  @Post("refresh")
  @HttpCode(200)
  async refresh(@Req() request: Request, @Res({ passthrough: true }) response: Response) {
    const refreshToken = request.cookies["refreshToken"];

    if (!refreshToken)
      throw new UnauthorizedException("Invalid or expired refresh token!")
    
    const res = await this.refreshService.refresh(refreshToken)
    if (res) {
      response.cookie("accessToken", res.accessToken, {
        httpOnly: true,   
        secure: false,     
        sameSite: "lax", 
        maxAge: 60 * 60 * 1000 // 1 hour
      });

      response.cookie("refreshToken", res.refreshToken, {
        httpOnly: true,   
        secure: false,     
        sameSite: "lax", 
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
      });

      return {
        "message": "Refresh token successfully!"
      }
    }
  }
  
  @Post("logout")
  @HttpCode(200)
  async logout(@Req() request: Request, @Res({ passthrough: true }) response: Response) {
    const accessToken = request.cookies["accessToken"];

    if (!accessToken)
      throw new UnauthorizedException("Invalid or expired access token!")

    const res = await this.logoutService.logout(accessToken)
    if (res) {
      response.clearCookie("accessToken"); 
      response.clearCookie("refreshToken"); 
      return res;
    }
  }

  @Post("send-email-reset-password")
  @HttpCode(200)
  async sendEmailResetPassword(@Body() dto: PasswordResetEmailDto) {
    const res = await this.passwordService.sendPasswordResetEmail(dto)
    return res
  }

  @Post("reset-password")
  @HttpCode(200)
  async resetPassword(@Body() dto: PasswordResetDto) {
    const res = await this.passwordService.resetPassword(dto)
    return res
  }
}
