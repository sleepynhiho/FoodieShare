import { Injectable } from "@nestjs/common";
import { SupabaseService } from "src/common/supabase/supabase.service";
import { UnauthorizedException } from "src/common/exceptions/unauthorized-exception";

@Injectable()
export class LogoutService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async logout(accessToken: string) {
    const supabase = this.supabaseService.getClient();

    const { error } = await supabase.auth.admin.signOut(accessToken);

    if (error) 
      throw new UnauthorizedException("Invalid or expired access token!")

    return { 
      "message": "Logout successfully!"
    };
  }
}
