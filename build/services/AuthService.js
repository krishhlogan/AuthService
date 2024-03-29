"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/services/auth.service.ts
const typedi_1 = require("typedi");
const UserService_1 = __importDefault(require("./UserService"));
let AuthService = class AuthService {
    // Implement authentication services
    constructor(logger, userService) {
        this.logger = logger;
        this.userService = userService;
    }
    async addEmailAuthUser(user) {
        try {
            const addedUser = await this.userService.addUser(user);
            this.logger.info('Added user', addedUser);
            return addedUser;
        }
        catch (error) {
            console.error('Error during login:', error);
            throw error;
        }
    }
};
AuthService = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)('logger')),
    __metadata("design:paramtypes", [Object, UserService_1.default])
], AuthService);
exports.default = AuthService;
//# sourceMappingURL=AuthService.js.map