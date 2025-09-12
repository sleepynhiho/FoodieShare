import { HttpException, HttpStatus } from "@nestjs/common";

export class AppException extends HttpException {
  constructor(
    message: string,
    statusCode: HttpStatus,
    public readonly errorCode?: string,
    public readonly details?: any,
  ) {
    super(
      {
        message,
        errorCode,
        details,
        timestamp: new Date().toISOString(),
      },
      statusCode,
    );
  }
}
