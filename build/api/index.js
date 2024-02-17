"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const emailAuth_1 = __importDefault(require("./routes/emailAuth"));
const otpAuth_1 = __importDefault(require("./routes/otpAuth"));
const googleAuth_1 = __importDefault(require("./routes/googleAuth"));
exports.default = () => {
    const app = (0, express_1.Router)();
    (0, emailAuth_1.default)(app);
    (0, otpAuth_1.default)(app);
    (0, googleAuth_1.default)(app);
    return app;
};
//# sourceMappingURL=index.js.map