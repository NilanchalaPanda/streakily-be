import Router from "express";
import { errorHandler } from "../error-handler";
import {
  createChallenge,
  deleteChallenge,
  getChallenges,
  updateChallenge,
} from "../controllers/challenges.controller";
import authMiddleware from "../middlewares/auth";

const challengesRouter = Router();

challengesRouter.post(
  "/create",
  [authMiddleware],
  errorHandler(createChallenge)
);
challengesRouter.get("/", [authMiddleware], errorHandler(getChallenges));
challengesRouter.put("/:id", [authMiddleware], errorHandler(updateChallenge));
challengesRouter.delete(
  "/:id",
  [authMiddleware],
  errorHandler(deleteChallenge)
);

export default challengesRouter;
