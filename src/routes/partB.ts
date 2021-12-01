import express from "express";
import wiki from "wikijs";
import { Request, Response } from "express";

import { validateName, validateLang } from "../misc/validation";
import exp from "constants";

const partB = express.Router();

partB.get("/b/introduction/:articleName", async (req: Request, res: Response) => {
  const lang = req.headers["accept-language"] as string;
  
  const isValidLang = validateLang(lang);

  if (!isValidLang) {
    const message = `Accept-Language header value consist of two lowercase letters only`;
    res.status(400).send(message);
    return;
  }

  const { articleName } = req.params;

  const isValidName = validateName(articleName);

  if (!isValidName) {
    const message = `Article name can only comprise of letters, hyphens (-), underscores (_) and numbers`;
    res.status(400).send(message);
    return;
  }

  let summary;

  const apiUrl = `https://${lang}.wikipedia.org/w/api.php`;

  try {
    summary = await wiki({ apiUrl })
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

export default partB;