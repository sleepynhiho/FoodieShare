import { HttpStatus } from "@nestjs/common"
import { AppException } from "./base.exception";

export class ServerException extends AppException {
  constructor(message: string, details?: any) {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR, "INTERNAL_SERVER_ERROR", details);
  }
}
