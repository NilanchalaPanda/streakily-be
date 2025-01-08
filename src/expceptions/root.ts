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
  PAGE_NOT_FOUND = 1000,
  USER_NOT_FOUND = 1001,
  USER_ALREADY_EXISTS = 1002,
  INCORRECT_PASSWORD = 1003,
  USER_DOES_NOT_EXIST = 1004,
  INCOMPLETE_DATA = 1005,
  UNPROCESSABLE_ENTITY = 2000,
  INTERNAL_EXCEPTION = 3000,
  UNAUTHORZED_ERROR = 4000,
}
