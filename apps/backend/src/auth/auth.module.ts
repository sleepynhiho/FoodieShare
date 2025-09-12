import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { LoginService } from "./login/login.service";
import { LogoutService } from "./logout/logout.service";
import { SignupService } from "./signup/signup.service";
import { SupabaseModule } from "../common/supabase/supabase.module";
import { EmailModule } from "src/email/email.module";
import { EmailService } from "src/email/email.service";
import { PrismaModule } from "src/common/prisma/prisma.module";

@Module({
  imports: [SupabaseModule, EmailModule, PrismaModule],
  controllers: [AuthController],
  providers: [LoginService, LogoutService, SignupService, EmailService]
})
export class AuthModule {}
