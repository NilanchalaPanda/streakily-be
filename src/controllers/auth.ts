import { NextFunction, Request, Response } from "express";
import { compareSync, hashSync } from "bcrypt";
import { prisma } from "..";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import { ErrorCode } from "../expceptions/root";
import { BadRequestsException } from "../expceptions/bad-request";
import { UnprocessableEntity } from "../expceptions/validations";
import { LoginSchema, SignUpSchema } from "../schema/user";

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
    return next(
      new BadRequestsException(
        "User does not exist",
        ErrorCode.USER_DOES_NOT_EXIST
      )
    );
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
