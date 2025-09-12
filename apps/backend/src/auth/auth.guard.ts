import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { SupabaseService } from "src/common/supabase/supabase.service";
import { UnauthorizedException } from "@nestjs/common";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly supabaseService: SupabaseService) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const supabase = this.supabaseService.getClient();
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers["authorization"];

    if (!authHeader) throw new UnauthorizedException("No auth token");

    const token = authHeader.replace("Bearer ", "");
    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data?.user)
      throw new UnauthorizedException("Invalid or expired token");

    request.user = data.user; // attach user to request
    return true;
  }
}

