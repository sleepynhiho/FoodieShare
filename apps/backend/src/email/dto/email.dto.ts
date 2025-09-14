import { IsEmail, IsIn } from "class-validator";

export class EmailDto {
  @IsEmail({}, { message: "Please enter a valid email address!" })
  email: string;

  @IsIn(["signup", "email_change"])
  type: "signup" | "email_change";
}
