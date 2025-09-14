import { Module } from "@nestjs/common";
import { EmailService } from "./email.service";
import { SupabaseModule } from "src/common/supabase/supabase.module";

@Module({
  imports: [SupabaseModule],
  providers: [EmailService]
})
export class EmailModule {}
