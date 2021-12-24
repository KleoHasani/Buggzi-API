import express, { Application, Request, Response } from "express";

const app: Application = express();

app.get("/", (req: Request, res: Response) => {
  console.log(req);
  console.log(res);
  res.json({
    hello: "world",
  });
});

app.listen(8000, () => console.log("Live on port: 8000"));
