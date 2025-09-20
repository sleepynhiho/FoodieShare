import { Injectable } from "@nestjs/common";
import { EmailDto } from "./dto/email.dto";
import { SupabaseService } from "src/common/supabase/supabase.service";
import { ServerException } from "src/common/exceptions/server-exception";

@Injectable()
export class EmailService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async resendEmail(dto: EmailDto) {
    const supabase = this.supabaseService.getClient();

    const { data, error } = await supabase.auth.resend({
      email: dto["email"],
      type: dto["type"],
      options: {
        emailRedirectTo: process.env.REDIRECT_URL
      }
    })

    if (error) 
      throw new ServerException("Failed to resend email!")

    return data
  }
}
