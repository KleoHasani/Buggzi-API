import express, { Application, Request, Response } from "express";

const PORT = process.env.PORT || 3000;

const app: Application = express();

app.get("/", (req: Request, res: Response) => {
  console.log(req);
  console.log(res);
  res.json({
    hello: "world",
  });
});

app.listen(PORT);
