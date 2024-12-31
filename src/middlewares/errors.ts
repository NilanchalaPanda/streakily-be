import { NextFunction, Request, Response } from "express";
import { HttpExecption } from "../expceptions/root";

export const errorMiddleware = (
  errors: HttpExecption,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(errors.statusCode).json({
    message: errors.message,
    errorCode: errors.errorCode,
    errors: errors.errors,
  });
};
