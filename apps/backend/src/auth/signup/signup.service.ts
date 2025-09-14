import { Injectable } from "@nestjs/common";
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
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto["email"]
      }
    })

    if (user) return null

    const { data } = await supabase.auth.signUp({
      email: dto["email"],
      password: dto["password"],
      options: {
        emailRedirectTo: process.env.REDIRECT_URL
      }
    });

    await this.prisma.user.create({
      data: {
        email: dto["email"],
      }
    })

    return data;
  }
}
