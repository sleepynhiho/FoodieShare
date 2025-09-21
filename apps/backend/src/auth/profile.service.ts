import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { SupabaseService } from '../common/supabase/supabase.service';

@Injectable()
export class ProfileService {
  constructor(
    private prisma: PrismaService,
    private supabaseService: SupabaseService
  ) {}

  async updateProfile(userId: string, updateData: UpdateProfileDto) {
    try {
      const updatedUser = await this.prisma.user.update({
        where: { id: userId },
        data: updateData,
        select: {
          id: true,
          email: true,
          username: true,
          avatar: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      return updatedUser;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new Error('Username already exists');
      }
      throw new Error('Failed to update profile');
    }
  }

  async updateAvatar(userId: string, avatarUrl: string) {
    try {
      const updatedUser = await this.prisma.user.update({
        where: { id: userId },
        data: { avatar: avatarUrl },
        select: {
          id: true,
          email: true,
          username: true,
          avatar: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      return updatedUser;
    } catch (error) {
      throw new Error('Failed to update avatar');
    }
  }

  async changePassword(userId: string, changePasswordData: ChangePasswordDto) {
    try {
      const supabase = this.supabaseService.getClient();
      
      // Use Supabase to update password
      const { error } = await supabase.auth.updateUser({
        password: changePasswordData.newPassword
      });

      if (error) {
        throw new Error(error.message);
      }

      return { message: 'Password changed successfully' };
    } catch (error) {
      throw error;
    }
  }
}