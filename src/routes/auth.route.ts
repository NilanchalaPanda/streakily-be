import { Router } from "express";
import { Login, me, Signup } from "../controllers/auth";
import { errorHandler } from "../error-handler";
import authMiddleware from "../middlewares/auth";

const authRouter: Router = Router();

authRouter.post("/signup", errorHandler(Signup));
authRouter.post("/login", errorHandler(Login));
authRouter.get("/me", [authMiddleware], errorHandler(me));

export default authRouter;
