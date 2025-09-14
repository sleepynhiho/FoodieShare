import { Injectable } from "@nestjs/common";
import { LoginDto } from "../dto/login.dto";
import { SupabaseService } from "src/common/supabase/supabase.service";

@Injectable()
export class LoginService {
  constructor(
    private readonly supabaseService: SupabaseService
  ) {}

  async login(dto: LoginDto) {
    const supabase = this.supabaseService.getClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email: dto["email"],
      password: dto["password"],
    });

    if (error) {
      // Return error details instead of just null
      return { 
        success: false, 
        error: error.message,
        errorCode: error.message.includes('Invalid login credentials') ? 'INVALID_CREDENTIALS' : 'LOGIN_ERROR'
      };
    }

    return { 
      success: true, 
      data 
    }; 
  }
}
