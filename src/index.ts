import express, { Express } from "express";
import { PORT } from "./secrets";
import rootRouter from "./routes";
import { errorMiddleware } from "./middlewares/errors";
import { PrismaClient } from "@prisma/client";
import morgan from "morgan";

const app: Express = express();

app.use(morgan("dev"));
app.use(express.json());

app.use("/api/v1", rootRouter);

export const prisma = new PrismaClient({
  log: ["query"],
});

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Serving on ${PORT}`);
});
