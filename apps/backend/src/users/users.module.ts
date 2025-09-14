import { Module } from "@nestjs/common";
import { UserController } from "./users.controller";
import { SupabaseModule } from "src/common/supabase/supabase.module";

@Module({
  imports: [SupabaseModule],
  controllers: [UserController]
})
export class UsersModule {}
