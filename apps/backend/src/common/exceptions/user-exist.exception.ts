import { HttpStatus } from "@nestjs/common"
import { AppException } from "./base.exception";

export class UserExistException extends AppException {
  constructor(message: string, details?: any) {
    super(message, HttpStatus.CONFLICT, "USER_EXIST_ERROR", details);
  }
}
