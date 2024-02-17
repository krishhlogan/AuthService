"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/auth.routes.ts
const express_1 = __importDefault(require("express"));
const auth_controller_1 = __importDefault(require("./auth.controller"));
const router = express_1.default.Router();
exports.default = (app) => {
    app.use('/auth', router);
    router.post('/google-signin', auth_controller_1.default.googleSignIn);
    router.post('/otp-signin', auth_controller_1.default.otpSignIn);
    router.post('/email-password-signin', auth_controller_1.default.emailPasswordSignIn);
};
//# sourceMappingURL=index.js.map