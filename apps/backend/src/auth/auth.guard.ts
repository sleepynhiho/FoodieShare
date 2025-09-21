import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { SupabaseService } from "src/common/supabase/supabase.service";
import { PrismaService } from "src/common/prisma/prisma.service";
import { UnauthorizedException } from "@nestjs/common";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly prisma: PrismaService
  ) {}

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

    // Ensure user exists in local database
    const supabaseUser = data.user;
    let localUser = await this.prisma.user.findFirst({
      where: {
        OR: [
          { id: supabaseUser.id },
          { email: supabaseUser.email }
        ]
      }
    });

    // If user doesn't exist in local database, create them
    if (!localUser) {
      try {
        localUser = await this.prisma.user.create({
          data: {
            id: supabaseUser.id,
            email: supabaseUser.email || '',
            username: supabaseUser.user_metadata?.username || 
                     supabaseUser.email?.split('@')[0] || 
                     `user_${supabaseUser.id.slice(0, 8)}`,
            avatar: supabaseUser.user_metadata?.avatar_url || null,
          }
        });
      } catch (createError) {
        // If creation fails due to duplicate constraints, try to find the existing user
        if (createError.code === 'P2002') {
          localUser = await this.prisma.user.findFirst({
            where: {
              OR: [
                { id: supabaseUser.id },
                { email: supabaseUser.email }
              ]
            }
          });
          
          // If we still can't find the user, create with unique identifiers
          if (!localUser) {
            const timestamp = Date.now();
            localUser = await this.prisma.user.create({
              data: {
                id: supabaseUser.id,
                email: `${supabaseUser.email || 'user'}_${timestamp}@temp.com`,
                username: `user_${supabaseUser.id.slice(0, 8)}_${timestamp}`,
                avatar: supabaseUser.user_metadata?.avatar_url || null,
              }
            });
          }
        } else {
          throw createError;
        }
      }
    }

    request.user = localUser; // attach local user to request
    return true;
  }
}

@Injectable()
export class OptionalAuthGuard extends AuthGuard {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      request.user = undefined; 
      return true;
    }

    try {
      return await super.canActivate(context);
    } catch (err) {
      request.user = undefined;
      return true;
    }
  }
}
