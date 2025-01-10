import { Router } from "express";
import {
  verifyGithubAuth,
  verifyGithubCallback,
  verifyLeetCode,
} from "../controllers/account.controller";
import { errorHandler } from "../error-handler";
import authMiddleware from "../middlewares/auth";

const accountRouter: Router = Router();

accountRouter.get(
  "/:userId/leetcode",
  [authMiddleware],
  errorHandler(verifyLeetCode)
);
accountRouter.get("/github", errorHandler(verifyGithubAuth));
accountRouter.get(
  "/oauth-callback",
  [authMiddleware],
  errorHandler(verifyGithubCallback)
);

export default accountRouter;
