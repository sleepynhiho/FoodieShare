import { Controller, Res, Post, Body, HttpCode, Get, Patch, UseGuards, Req, UseInterceptors, UploadedFile } from "@nestjs/common";
import { FileInterceptor } from '@nestjs/platform-express';
import type { Response, Request } from "express";
import { CreateUserDto } from "./dto/signup.dto";
import { EmailDto } from "src/email/dto/email.dto";
import { SignupService } from "./signup/signup.service";
import { EmailService } from "src/email/email.service";
import { ServerException } from "src/common/exceptions/server-exception";
import { LoginDto } from "./dto/login.dto";
import { LoginService } from "./login/login.service";
import { LogoutService } from "./logout/logout.service";
import { AuthGuard } from "./auth.guard";
import { UpdateProfileDto } from "./dto/update-profile.dto";
import { ChangePasswordDto } from "./dto/change-password.dto";
import { ProfileService } from "./profile.service";
import { CloudinaryService } from "../cloudinary/cloudinary.service";
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
    private readonly profileService: ProfileService,
    private readonly cloudinaryService: CloudinaryService,
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
      throw new UnauthorizedException("No token provided!")
    
    const res = await this.refreshService.refresh(refreshToken)
    if (res) {
      response.cookie("refreshToken", res.refreshToken, {
        httpOnly: true,   
        secure: false,     
        sameSite: "lax", 
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
      });

      return {
        "accessToken": res.accessToken,
        "message": "Refreshed token successfully!"
      }
    }
  }
  
  @Post("logout")
  @HttpCode(200)
  async logout(@Req() request: Request, @Res({ passthrough: true }) response: Response) {
    const authHeader = request.headers["authorization"];

    if (!authHeader)
      throw new UnauthorizedException("No token provided!")

    const accessToken = authHeader.replace("Bearer", "")
    const res = await this.logoutService.logout(accessToken)
    if (res) {
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

  @Get("profile")
  @UseGuards(AuthGuard)
  async getProfile(@Req() request: Request) {
    return request.user;
  }

  @Patch("profile")
  @UseGuards(AuthGuard)
  async updateProfile(@Req() request: Request, @Body() dto: UpdateProfileDto) {
    try {
      const updatedProfile = await this.profileService.updateProfile(request.user.id, dto);
      return updatedProfile;
    } catch (error) {
      throw new ServerException(error.message || "Failed to update profile");
    }
  }

  @Patch("change-password")
  @UseGuards(AuthGuard)
  async changePassword(@Req() request: Request, @Body() dto: ChangePasswordDto) {
    try {
      const result = await this.profileService.changePassword(request.user.id, dto);
      return result;
    } catch (error) {
      throw new ServerException(error.message || "Failed to change password");
    }
  }

  @Post("upload-avatar")
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('avatar'))
  async uploadAvatar(@Req() request: Request, @UploadedFile() file: Express.Multer.File) {
    try {
      if (!file) {
        throw new Error("No file provided");
      }

      // Validate file type
      if (!file.mimetype.startsWith('image/')) {
        throw new Error("File must be an image");
      }

      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        throw new Error("File size must be less than 5MB");
      }

      // Upload to Cloudinary
      const avatarUrl = await this.cloudinaryService.uploadFile(file, 'avatars');
      
      // Update user avatar in database
      const updatedUser = await this.profileService.updateAvatar(request.user.id, avatarUrl);
      
      return { 
        avatarUrl,
        user: updatedUser
      };
    } catch (error) {
      throw new ServerException(error.message || "Failed to upload avatar");
    }
  }
}
