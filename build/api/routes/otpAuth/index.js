"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const otpAuth_controller_1 = __importDefault(require("./otpAuth.controller"));
const router = (0, express_1.Router)();
exports.default = (app) => {
    app.use('/otp-auth', router);
    router.post('/signin', otpAuth_controller_1.default.otpSignIn);
};
//# sourceMappingURL=index.js.map