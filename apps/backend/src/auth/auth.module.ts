import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthGuard } from "./auth.guard";
import { LoginService } from "./login/login.service";
import { LogoutService } from "./logout/logout.service";
import { SignupService } from "./signup/signup.service";
import { ProfileService } from "./profile.service";
import { SupabaseModule } from "../common/supabase/supabase.module";
import { EmailModule } from "src/email/email.module";
import { EmailService } from "src/email/email.service";
import { PrismaModule } from "src/common/prisma/prisma.module";
import { CloudinaryModule } from "../cloudinary/cloudinary.module";

@Module({
  imports: [SupabaseModule, EmailModule, PrismaModule, CloudinaryModule],
  controllers: [AuthController],
  providers: [AuthGuard, LoginService, LogoutService, SignupService, ProfileService, EmailService],
  exports: [AuthGuard]
})
export class AuthModule {}
