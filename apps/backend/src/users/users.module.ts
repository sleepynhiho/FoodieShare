import { Module } from "@nestjs/common";
import { UserController } from "./users.controller";
import { SupabaseModule } from "src/common/supabase/supabase.module";
import { PrismaModule } from "src/common/prisma/prisma.module";
import { UsersService } from "./users.service";

@Module({
  imports: [SupabaseModule, PrismaModule],
  controllers: [UserController],
  providers: [UsersService]
})
export class UsersModule {}
