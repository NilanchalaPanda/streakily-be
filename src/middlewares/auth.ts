import { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../expceptions/unauthorized";
import { ErrorCode } from "../expceptions/root";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import { prisma } from "..";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //1. Extract token from header.
  const token = req.headers.authorization;

  //2. Token not there, throw error.
  if (!token) {
    next(
      new UnauthorizedException(
        "Unauthorized request - Token not passed",
        ErrorCode.UNAUTHORZED_ERROR
      )
    );
  }

  try {
    //3. Verify token and extract payload {userId in our case}
    const payload = jwt.verify(token!, JWT_SECRET!) as any;

    //4. Fetch user from payload.
    const user = await prisma.user.findFirst({
      where: { id: payload.userId },
    });

    if (!user) {
      next(
        new UnauthorizedException(
          "Unathorized request - User not found",
          ErrorCode.UNAUTHORZED_ERROR
        )
      );
    }

    //5. Attach user to currRequest object.
    req.user = user!;
    next();
  } catch (error) {
    next(
      new UnauthorizedException(
        "Unathorized request - Catch error",
        ErrorCode.UNAUTHORZED_ERROR
      )
    );
  }
};

export default authMiddleware;
