import { Injectable, BadRequestException } from "@nestjs/common";
import { SupabaseService } from "src/common/supabase/supabase.service";
import { PrismaService } from "src/common/prisma/prisma.service";
import { CreateUserDto } from "../dto/signup.dto";

@Injectable()
export class SignupService {
  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly prisma: PrismaService
  ) {}

  async signup(dto: CreateUserDto) {
    const supabase = this.supabaseService.getClient();

    // Check if email exists
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: dto.email
      }
    })

    if (existingUser) {
      throw new BadRequestException("Email already exists");
    }

    // Check if username exists
    const existingUsername = await this.prisma.user.findFirst({
      where: {
        username: dto.username
      }
    })

    if (existingUsername) {
      throw new BadRequestException("Username already exists");
    }

    const { data, error } = await supabase.auth.signUp({
      email: dto.email,
      password: dto.password,
      options: {
        emailRedirectTo: process.env.REDIRECT_URL
      }
    });

    if (error) {
      throw new BadRequestException(`Signup failed: ${error.message}`);
    }

    // Only create user in database if Supabase signup was successful and returned a user
    if (data?.user) {
      try {
        await this.prisma.user.create({
          data: {
            id: data.user.id, // Use Supabase user ID
            email: dto.email,
            username: dto.username,
          }
        })
      } catch (dbError) {
        // If database creation fails, we should clean up the Supabase user
        // But for now, just throw an error
        throw new BadRequestException("Failed to create user profile");
      }
    }

    return data;
  }
}
