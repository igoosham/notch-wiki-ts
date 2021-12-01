"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const wikijs_1 = __importDefault(require("wikijs"));
const validation_1 = require("../misc/validation");
const partB = express_1.default.Router();
partB.get("/b/introduction/:articleName", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const lang = req.headers["accept-language"];
    const isValidLang = (0, validation_1.validateLang)(lang);
    if (!isValidLang) {
        const message = `Accept-Language header value consist of two lowercase letters only`;
        res.status(400).send(message);
        return;
    }
    const { articleName } = req.params;
    const isValidName = (0, validation_1.validateName)(articleName);
    if (!isValidName) {
        const message = `Article name can only comprise of letters, hyphens (-), underscores (_) and numbers`;
        res.status(400).send(message);
        return;
    }
    let summary;
    const apiUrl = `https://${lang}.wikipedia.org/w/api.php`;
    try {
        summary = yield (0, wikijs_1.default)({ apiUrl })
            .page(articleName)
            .then((page) => page.summary());
    }
    catch ({ message }) {
        res.status(400).send(message);
        return;
    }
    const result = {
        scrapeDate: new Date().getTime(),
        articleName,
        introduction: summary,
    };
    res.status(200).send(result);
}));
exports.default = partB;
