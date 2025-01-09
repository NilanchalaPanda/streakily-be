import express, { Express } from "express";
import { PORT } from "./secrets";
import rootRouter from "./routes";
import { errorMiddleware } from "./middlewares/errors";
import { PrismaClient } from "@prisma/client";
import morgan from "morgan";
import cors from "cors";

const app: Express = express();

app.use(
  cors({
    origin: "http://localhost:3000", // Only your frontend should be allowed
    methods: "GET,POST", // Adjust methods as needed
    credentials: true, // If you need to send credentials like cookies
  })
);

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
