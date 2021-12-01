import express from "express";
import wiki from "wikijs";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

import { validateName, validateLang } from "../misc/validation";
import { controller } from "../controller/inMemory";

const partC = express.Router();

partC.get("/c/introduction/:articleName", async (req: Request, res: Response) => {
  const token = req.headers["x-authorization"] as string;

  let lang: string;

  try {
    lang = controller.get(token);
  } catch ({ message }) {
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
  } catch ({ message }) {
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

partC.post("/c/user", (req, res) => {
  const { userName, language } = req.body;

  const errors = [];

  const isValidLang = validateLang(language);
  if (!isValidLang) {
    errors.push(`Language should consist of two letters only.`);
  }

  const isValidName = validateName(userName);
  if (!isValidName) {
    errors.push(`User name can only comprise of letters, hyphens (-), underscores (_) and numbers`);
  }

  if (errors.length) {
    res.status(400).send(errors);
    return;
  }

  var token = jwt.sign({ userName, language }, "myVerySecretKey");

  controller.add(token, language);

  res.status(200).send(token);
});


export default partC;
