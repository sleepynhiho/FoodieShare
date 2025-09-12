import { IsEmail, IsString, MinLength } from "class-validator";

export class CreateUserDto {
  @IsEmail({}, { message: "Please enter a valid email address!" })
  email: string;

  @IsString()
  @MinLength(8, { message: "Password must be at least 8 characters long!" })
  password: string;
}
