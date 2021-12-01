"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateName = exports.validateLang = void 0;
function validateName(value) {
    const validator = /^[0-9A-Za-z\-\_]+$/;
    return validator.test(value);
}
exports.validateName = validateName;
function validateLang(value) {
    const validator = /^[a-z]{2}$/;
    return validator.test(value);
}
exports.validateLang = validateLang;
