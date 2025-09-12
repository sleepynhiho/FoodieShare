import { HttpStatus } from "@nestjs/common"
import { AppException } from "./base.exception";

export class UnauthorizedException extends AppException {
  constructor(message: string, details?: any) {
    super(message, HttpStatus.UNAUTHORIZED, "UNAUTHORIZED_ERROR", details);
  }
}
