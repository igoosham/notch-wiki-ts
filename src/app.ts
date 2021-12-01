import express from "express";
import { Request, Response } from "express";

import router from "./routes";

const app = express();

const PORT = 3000;

app.use(express.json());

app.use(router);

// handling wrong addresses
app.use(function (req: Request, res: Response) {
  const message = req.url + " does not exist";
  res.status(404).send(message);
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
