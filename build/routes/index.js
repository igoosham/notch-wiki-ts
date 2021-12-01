"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const partA_1 = __importDefault(require("./partA"));
const partB_1 = __importDefault(require("./partB"));
const partC_1 = __importDefault(require("./partC"));
const router = express_1.default.Router();
router.use(partA_1.default);
router.use(partB_1.default);
router.use(partC_1.default);
exports.default = router;
