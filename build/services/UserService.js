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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const typedi_1 = require("typedi");
let UserService = class UserService {
    constructor(logger, userModel) {
        this.logger = logger;
        this.userModel = userModel;
    }
    async addUser(user) {
        try {
            const createdData = await this.userModel.create(user);
            this.logger.info('CreatedData %o', createdData);
            return createdData;
        }
        catch (err) {
            this.logger.error('Exceptoin while creating user', err);
            throw err;
        }
    }
    async getUserByEmail(email) {
    }
    async markUserInactive(email) {
    }
};
UserService = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)('logger')),
    __param(1, (0, typedi_1.Inject)('userModel')),
    __metadata("design:paramtypes", [Object, mongoose_1.Model])
], UserService);
exports.default = UserService;
//# sourceMappingURL=UserService.js.map