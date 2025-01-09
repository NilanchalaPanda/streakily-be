import { NextFunction, Request, Response } from "express";
import { compareSync, hashSync } from "bcrypt";
import { prisma } from "..";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import { ErrorCode } from "../expceptions/root";
import { BadRequestsException } from "../expceptions/bad-request";
import { LoginSchema, SignUpSchema } from "../schema/user.schema";
import { NotFoundException } from "../expceptions/not-found";

// Start module augmentation //
declare module "express-serve-static-core" {
  interface Request {
    user: any;
  }
}
// End module augmentation //

export const Signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  SignUpSchema.parse(req.body);
  const { userName, name, email, password } = req.body;

  let user = await prisma.user.findFirst({
    where: { email },
  });

  if (user) {
    return next(
      new BadRequestsException(
        "User already exists",
        ErrorCode.USER_ALREADY_EXISTS
      )
    );
  }

  user = await prisma.user.create({
    data: {
      userName,
      name,
      email,
      password: hashSync(password, 10),
    },
  });

  res.status(201).json({ message: "Success", user });
};

export const Login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  LoginSchema.parse(req.body);
  const { email, password } = req.body;
  const user = await prisma.user.findFirst({
    where: { email },
  });

  if (!user) {
    new NotFoundException("User not found!", ErrorCode.USER_NOT_FOUND);
  }

  if (!compareSync(password, user?.password!)) {
    return next(
      new BadRequestsException(
        "Incorrect password",
        ErrorCode.INCORRECT_PASSWORD
      )
    );
  }

  const token = jwt.sign({ userId: user?.id }, JWT_SECRET!);

  res.status(200).json({ message: "Success", user, token });
};

export const me = async (req: Request, res: Response, next: NextFunction) => {
  res.json(req.user);
};
