import express, { Express, Request, Response } from "express";
import cors from "cors";

import todo from "./controllers/todo";

const app: Express = express();

// app.use(
//   cors({
//     origin: ["http://54.152.135.30"],
//     credentials: true,
//   })
// );
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/todo/api/todo", todo);

app.get("/todo/api", (req: Request, res: Response) => {
  res.status(200).send(process.env.MESSAGE || "AWS's Members");
});

export default app;
