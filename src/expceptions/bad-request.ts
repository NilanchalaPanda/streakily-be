import { ErrorCode, HttpExecption } from "./root";

export class BadRequestsException extends HttpExecption {
  constructor(message: string, errorCode: ErrorCode) {
    super(message, errorCode, 400, null);
  }
}
