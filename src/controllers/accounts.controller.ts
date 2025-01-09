import { NextFunction, Request, Response } from "express";
import { BadRequestsException } from "../expceptions/bad-request";
import { ErrorCode } from "../expceptions/root";
import { executeGraphQLQuery } from "../utils/graphqlClient";
import { leetcodeVerification } from "../gqlQueries/leetcodeUserInfo";
import { LeetcodeSchema } from "../schema/account.schema";
import { UnauthorizedException } from "../expceptions/unauthorized";
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from "../secrets";
import axios from "axios";
import { prisma } from "..";
import { updateAccounts } from "../utils/updateAcconts";

// start method augmentation //
declare module "express-serve-static-core" {
  interface Request {
    user: any;
  }
}
// end method augmentation //

export const verifyLeetCode = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  LeetcodeSchema.parse(req.body);
  const userId = parseInt(req.params.userId);
  const { username, uniqueCode } = req.body;

  if (typeof username !== "string") {
    throw new BadRequestsException(
      "Invalid request - here",
      ErrorCode.INCOMPLETE_DATA
    );
  }

  try {
    const data = await executeGraphQLQuery(leetcodeVerification, {
      username,
    });

    const userInfo = data?.matchedUser;
    if (!userInfo) {
      throw new BadRequestsException(
        "Account not found",
        ErrorCode.USER_NOT_FOUND
      );
    }

    const about = userInfo.profile?.aboutMe;

    if (about !== uniqueCode) {
      throw new BadRequestsException("Invalid code", ErrorCode.INVALID_CODE);
    }

    console.log("heelo there");

    const updatedAccount = await updateAccounts(userId, "leetcode", {
      username,
      isVerified: true,
    });

    res.status(200).json({
      message: "LeetCode account verified",
      account: updatedAccount,
      result: "success",
    });
  } catch (err) {
    next(
      new UnauthorizedException("Invalid request", ErrorCode.UNAUTHORZED_ERROR)
    );
  }
};

export const verifyGithubAuth = (req: Request, res: Response) => {
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}`;

  res.redirect(githubAuthUrl);
};

export const verifyGithubCallback = async (req: Request, res: Response) => {
  const { code } = req.query;
  const body = {
    client_id: GITHUB_CLIENT_ID,
    client_secret: GITHUB_CLIENT_SECRET,
    code,
  };

  const opts = { headers: { accept: "application/json" } };

  const response = await axios.post(
    "https://github.com/login/oauth/access_token",
    body,
    opts
  );

  const token = response.data.access_token;

  if (!token) {
    new UnauthorizedException("Failed to login", ErrorCode.UNAUTHORZED_ERROR);
  }

  res.status(200).json({ message: "Github account connected", success: true });
};
