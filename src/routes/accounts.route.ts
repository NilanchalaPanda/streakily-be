import { Router } from "express";
import authMiddleware from "../middlewares/auth";
import {
  verifyGithubAuth,
  verifyGithubCallback,
  verifyLeetCode,
} from "../controllers/accounts.controller";
import { errorHandler } from "../error-handler";

const accountRouter: Router = Router();

// !IMP - Make this url dynamic like "/:userId/leetcode"
accountRouter.get("/leetcode", errorHandler(verifyLeetCode));
accountRouter.get("/github", errorHandler(verifyGithubAuth));
accountRouter.get("/oauth-callback", errorHandler(verifyGithubCallback));

export default accountRouter;
