import { Injectable } from "@nestjs/common";
import { UnauthorizedException } from "src/common/exceptions/unauthorized-exception";
import { SupabaseService } from "src/common/supabase/supabase.service";

@Injectable()
export class RefreshService {
  constructor(
    private readonly supabaseService: SupabaseService
  ) {}

  async refresh(refreshToken: string) {
    const supabase = this.supabaseService.getClient();

    const { data, error } = await supabase.auth.refreshSession({
      refresh_token: refreshToken
    });

    if (error || !data.session)
      throw new UnauthorizedException("Invalid or expired refresh token");

    return {
      "accessToken": data.session.access_token,
      "refreshToken": data.session.refresh_token
    }
  }
}
