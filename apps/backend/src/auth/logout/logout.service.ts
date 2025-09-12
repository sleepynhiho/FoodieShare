import { Injectable } from "@nestjs/common";
import { SupabaseService } from "src/common/supabase/supabase.service";

@Injectable()
export class LogoutService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async logout() {
    const supabase = this.supabaseService.getClient();

    const { error } = await supabase.auth.signOut();

    if (error) return null

    return { 
      "message": "Logout successfully!"
    };
  }
}
