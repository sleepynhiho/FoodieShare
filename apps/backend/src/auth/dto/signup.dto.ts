import { IsEmail, IsString, MinLength } from "class-validator";

export class CreateUserDto {
  @IsEmail({}, { message: "Please enter a valid email address!" })
  email: string;

  @IsString()
  @MinLength(8, { message: "Password must be at least 8 characters long!" })
  password: string;

  @IsString({ message: "Username is required!" })
  @MinLength(3, { message: "Username must be at least 3 characters long!" })
  username: string;
}
