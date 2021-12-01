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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validation_1 = require("../misc/validation");
const inMemory_1 = require("../controller/inMemory");
const partC = express_1.default.Router();
partC.get("/c/introduction/:articleName", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers["x-authorization"];
    let lang;
    try {
        lang = inMemory_1.controller.get(token);
    }
    catch ({ message }) {
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
partC.post("/c/user", (req, res) => {
    const { userName, language } = req.body;
    const errors = [];
    const isValidLang = (0, validation_1.validateLang)(language);
    if (!isValidLang) {
        errors.push(`Language should consist of two letters only.`);
    }
    const isValidName = (0, validation_1.validateName)(userName);
    if (!isValidName) {
        errors.push(`User name can only comprise of letters, hyphens (-), underscores (_) and numbers`);
    }
    if (errors.length) {
        res.status(400).send(errors);
        return;
    }
    var token = jsonwebtoken_1.default.sign({ userName, language }, "myVerySecretKey");
    inMemory_1.controller.add(token, language);
    res.status(200).send(token);
});
exports.default = partC;
