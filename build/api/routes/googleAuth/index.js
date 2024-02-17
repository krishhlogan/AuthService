"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const googleAuth_controller_1 = __importDefault(require("./googleAuth.controller"));
const router = (0, express_1.Router)();
exports.default = (app) => {
    app.use('/google-auth', router);
    router.post('/signin', googleAuth_controller_1.default.googleSignIn);
};
//# sourceMappingURL=index.js.map