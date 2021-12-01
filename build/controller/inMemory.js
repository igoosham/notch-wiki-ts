"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
const storage = new Map();
const store = {
    add(token, lang) {
        storage.set(token, lang);
    },
    get(token) {
        const lang = storage.get(token);
        if (lang)
            return lang;
        throw new Error("User not found");
    },
};
exports.controller = store;
