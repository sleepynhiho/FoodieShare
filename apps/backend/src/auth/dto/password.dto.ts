import { IsEmail, IsString, MinLength } from "class-validator";

export class PasswordResetEmailDto {
  @IsEmail({}, { message: "Please enter a valid email address!" })
  email: string;
}

export class PasswordResetDto {
  @IsString()
  @MinLength(8, { message: "Password must be at least 8 characters long!" })
  password: string;

  @IsString()
  userId: string;
}
