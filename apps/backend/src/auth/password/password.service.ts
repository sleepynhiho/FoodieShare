import { Injectable } from "@nestjs/common";
import { SupabaseService } from "src/common/supabase/supabase.service";
import { PasswordResetDto, PasswordResetEmailDto } from "../dto/password.dto";
import { ServerException } from "src/common/exceptions/server-exception";
import { PrismaService } from "src/common/prisma/prisma.service";
import { UserNotFoundException } from "src/common/exceptions/user-not-found.exception";

@Injectable()
export class PasswordService {
  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly prisma: PrismaService
  ) {}

  async sendPasswordResetEmail(dto: PasswordResetEmailDto) {
    const supabase = this.supabaseService.getClient();

    // Check if email exists
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: dto["email"]
      }
    })

    if (!existingUser)
      throw new UserNotFoundException("User not found!");

    const { data, error } = await supabase.auth.resetPasswordForEmail(dto["email"], {
      redirectTo: `${process.env.REDIRECT_URL}/reset-password` // frontend reset link
    });

    if (error) 
      throw new ServerException("Failed to send email to reset password!")

    return { message: "Email to reset password has been sent successfully!" }
  }

  async resetPassword(dto: PasswordResetDto) {
    const supabase = this.supabaseService.getClient()
    const { password, userId } = dto;

    const { data, error } = await supabase.auth.admin.updateUserById(userId, {
      password: password
    });

    if (error)
      throw new ServerException("Cannot update password!")

    return { message: "Password has been updated successfully!" }
  }
}
