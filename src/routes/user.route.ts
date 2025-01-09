import { Router } from "express";
import { errorHandler } from "../error-handler";
import {
  addProfileDetails,
  updateProfileDetails,
} from "../controllers/user.controller";
import authMiddleware from "../middlewares/auth";

const userRouter = Router();

userRouter.post(
  "/:userId/profile",
  [authMiddleware],
  errorHandler(addProfileDetails)
);
userRouter.put(
  "/:userId/profile",
  [authMiddleware],
  errorHandler(updateProfileDetails)
);

export default userRouter;
