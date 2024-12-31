// message, statusCodes, code, ErrorCodes, Error

export class HttpExecption extends Error {
  message: string;
  errorCode: ErrorCode;
  statusCode: any;
  errors: any;

  constructor(
    message: string,
    errorCode: ErrorCode,
    statusCode: any,
    errors: any
  ) {
    super(message);
    this.message = message;
    this.errorCode = errorCode;
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

export enum ErrorCode {
  USER_NOT_FOUND = 1001,
  USER_ALREADY_EXISTS = 1002,
  INCORRECT_PASSWORD = 1003,
}
