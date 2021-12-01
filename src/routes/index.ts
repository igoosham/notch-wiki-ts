import express from "express";

import partA from "./partA"
import partB from "./partB"
import partC from "./partC"

const router = express.Router();

router.use(partA);
router.use(partB);
router.use(partC);

export default router;