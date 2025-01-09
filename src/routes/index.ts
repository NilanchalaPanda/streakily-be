import { Router } from "express";
import authRouter from "./auth.route";
import userRouter from "./user.route";
import accountRouter from "./accounts.route";

const rootRouter: Router = Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/user", userRouter);
rootRouter.use("/acc", accountRouter);

export default rootRouter;
