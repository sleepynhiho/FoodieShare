import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthGuard } from "./auth.guard";
import { LoginService } from "./login/login.service";
import { LogoutService } from "./logout/logout.service";
import { SignupService } from "./signup/signup.service";
import { SupabaseModule } from "../common/supabase/supabase.module";
import { EmailModule } from "src/email/email.module";
import { EmailService } from "src/email/email.service";
import { PrismaModule } from "src/common/prisma/prisma.module";
import { RefreshService } from './refresh/refresh.service';
import { PasswordService } from './password/password.service';

@Module({
  imports: [SupabaseModule, EmailModule, PrismaModule],
  controllers: [AuthController],
  providers: [AuthGuard, LoginService, LogoutService, SignupService, EmailService, RefreshService, PasswordService],
  exports: [AuthGuard]
})
export class AuthModule {}
