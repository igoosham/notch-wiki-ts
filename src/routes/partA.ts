import express from "express";
import wiki from "wikijs";
import { Request, Response } from "express";

import { validateName } from "../misc/validation";

const partA = express.Router();

partA.get("/a/introduction/:articleName", async (req:Request, res:Response) => {
  const { articleName } = req.params;

  const isValid = validateName(articleName);

  if (!isValid) {
    const message = `Article name can only comprise of letters, hyphens (-), underscores (_) and numbers`;
    res.status(400).send(message);
    return;
  }

  let summary;

  try {
    summary = await wiki({ apiUrl: "https://en.wikipedia.org/w/api.php" })
      .page(articleName)
      .then((page) => page.summary());
  } catch ({message}) {
    res.status(400).send(message);
    return;
  }

  const result = {
    scrapeDate: new Date().getTime(),
    articleName,
    introduction: summary,
  };

  res.status(200).send(result);
});

export default partA;