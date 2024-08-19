import express, { Express, Request, Response } from "express";
import cors from "cors";

import todo from "./controllers/todo";

const app: Express = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "http://54.152.135.30"],
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/todo", todo);

app.get("/api", (req: Request, res: Response) => {
  res.status(200).send(process.env.MESSAGE || "AWS's Members");
});

export default app;
