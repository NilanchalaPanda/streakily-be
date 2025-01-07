import { Router } from "express";
import authRouter from "./auth.route";
import userRouter from "./user.route";

const rootRouter: Router = Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/user", userRouter);

export default rootRouter;
