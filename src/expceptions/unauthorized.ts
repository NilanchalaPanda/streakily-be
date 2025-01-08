import { ErrorCode, HttpExecption } from "./root";

export class UnauthorizedException extends HttpExecption {
  constructor(message: string, errorCode: ErrorCode, errors?: any) {
    super(message, errorCode, 401, errors);
  }
}
