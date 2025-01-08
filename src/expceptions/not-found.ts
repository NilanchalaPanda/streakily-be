import { ErrorCode, HttpExecption } from "./root";

export class NotFoundException extends HttpExecption {
  constructor(message: string, errorCode: ErrorCode) {
    super(message, errorCode, 404, null);
  }
}
