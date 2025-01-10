import { Router } from "express";
import authRouter from "./auth.route";
import userRouter from "./user.route";
import accountRouter from "./accounts.route";
import challengesRouter from "./challenges.route";

const rootRouter: Router = Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/user", userRouter);
rootRouter.use("/acc", accountRouter);
rootRouter.use("/", challengesRouter);

export default rootRouter;
