import { NextFunction, Request, Response } from "express";
import { ErrorCode, HttpExecption } from "./expceptions/root";
import { InternalException } from "./expceptions/internal-exception";

export const errorHandler = (method: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await method(req, res, next);
    } catch (error) {
      let exception: HttpExecption;
      if (error instanceof HttpExecption) {
        exception = error;
      } else {
        exception = new InternalException(
          "Something went wrong",
          error,
          ErrorCode.INTERNAL_EXCEPTION
        );
      }
      next(exception);
    }
  };
};
