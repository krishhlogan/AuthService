"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("./express"));
const dependencyInjector_1 = __importDefault(require("./dependencyInjector"));
const mongooseLoader_1 = __importDefault(require("./mongooseLoader"));
const logger_1 = __importDefault(require("./logger"));
const axios_1 = require("./axios");
const models_1 = require("../models");
const sqs_1 = __importDefault(require("./sqs"));
exports.default = async ({ expressApp }) => {
    const mongoConnection = await (0, mongooseLoader_1.default)();
    logger_1.default.info('✌️ DB loaded and connected!');
    // const userModel = {
    //   name: 'userModel',
    //   // Notice the require syntax and the '.default'
    //   //model: require('../models/user').default,
    //   model: UserModel,
    // };
    let models = [
        {
            name: 'userModel',
            model: models_1.UserModel,
        },
    ];
    const sqsClient = (0, sqs_1.default)();
    // It returns the agenda instance because it's needed in the subsequent loaders
    const { agenda } = await (0, dependencyInjector_1.default)({
        mongoConnection,
        models: models,
        sqsClient,
    });
    logger_1.default.info('✌️ Dependency Injector loaded');
    (0, axios_1.loadInterceptorsForResponseTime)();
    logger_1.default.info('✌️ Axios interceptors loaded');
    await (0, express_1.default)({ app: expressApp });
    logger_1.default.info('✌️ Express loaded');
};
//# sourceMappingURL=index.js.map