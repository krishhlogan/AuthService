"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = __importDefault(require("typedi"));
const logger_1 = __importDefault(require("../../../loaders/logger"));
const AuthService_1 = __importDefault(require("../../../services/AuthService"));
const utility_1 = require("../../../utility");
const EmailAuthController = {
    emailPasswordSignIn: async (req, res, next) => {
        // Implement Email/Password Sign-in logic
    },
    addEmailUser: async (req, res, next) => {
        try {
            logger_1.default.info('starting addEmailUser');
            const user = req.body;
            const authService = typedi_1.default.get(AuthService_1.default);
            const createdUser = await authService.addEmailAuthUser(user);
            return utility_1.APIResponse.success(req, res, 'Successfully added user', { user: createdUser });
        }
        catch (err) {
            logger_1.default.error('Exception in adding email user', err);
            next(err);
        }
    }
};
exports.default = EmailAuthController;
//# sourceMappingURL=emailAuth.controller.js.map