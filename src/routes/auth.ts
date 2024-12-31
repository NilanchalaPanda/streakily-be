import { Router } from "express";

const authRouter: Router = Router();

authRouter.get("/login", (req, res) => {
  res.send("Login");
});

export default authRouter;
