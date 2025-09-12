import { HttpStatus } from "@nestjs/common"
import { AppException } from "./base.exception";

export class UserNotFoundException extends AppException {
  constructor(message: string, details?: any) {
    super(message, HttpStatus.NOT_FOUND, "USER_NOT_FOUND_ERROR", details);
  }
}
