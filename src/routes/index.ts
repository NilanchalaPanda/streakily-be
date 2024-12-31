import { Router } from "express";
import authRouter from "./auth";
import userRouter from "./user.route";

const rootRouter: Router = Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/user", userRouter);

export default rootRouter;
