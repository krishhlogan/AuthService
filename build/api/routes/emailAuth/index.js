"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/auth.routes.ts
const celebrate_1 = require("celebrate");
const express_1 = require("express");
const emailAuth_controller_1 = __importDefault(require("./emailAuth.controller"));
const validation_1 = __importDefault(require("./validation"));
const router = (0, express_1.Router)();
exports.default = (app) => {
    app.use('/email-auth', router);
    router.post('/signin', emailAuth_controller_1.default.emailPasswordSignIn);
    router.post('/add-user', (0, celebrate_1.celebrate)({ body: validation_1.default.emailAddUser }), emailAuth_controller_1.default.addEmailUser);
};
//# sourceMappingURL=index.js.map