import { HttpExecption } from "./root";

export class InternalException extends HttpExecption {
  constructor(message: string, errors: any, ErrorCode: Number) {
    super(message, errors, 500, ErrorCode);
  }
}
