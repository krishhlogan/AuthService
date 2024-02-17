"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const express_http_context_1 = __importDefault(require("express-http-context"));
const moment_timezone_1 = __importDefault(require("moment-timezone"));
exports.default = (req, res, next) => {
    // const requestId = req.headers['x-request-id'] ? req.headers['x-request-id'] : uuidv1();
    const traceId = req.headers['x-trace-id'] ? req.headers['x-trace-id'] : (0, uuid_1.v1)();
    const userId = req.headers['x-user-id'] ? req.headers['x-user-id'] : '';
    const client = req.headers['x-client'] ? req.headers['x-client'] : '';
    const appVersion = req.headers['x-app-version'] ? req.headers['x-app-version'] : '';
    const acceptVersion = req.headers['accept-version'] ? req.headers['accept-version'] : '';
    const bulidNumber = req.headers['x-build-number'] ? req.headers['x-build-number'] : '';
    //res.setHeader('X-Request-ID', requestId);
    res.setHeader('X-Trace-Id', traceId);
    res.setHeader('X-User-ID', userId);
    res.setHeader('X-Client', client);
    res.setHeader('X-App-Version', appVersion);
    res.setHeader('X-Build-Number', bulidNumber);
    req.id = traceId;
    req.log = {
        id: traceId,
        type: 'request-log',
        userId: userId,
        client,
        appVersion,
        acceptVersion,
        bulidNumber,
        url: req.path,
        method: req.method,
        queryParams: req.query,
        startTimestamp: Date.now(),
        startTime: (0, moment_timezone_1.default)()
            .tz('Asia/Kolkata')
            .format('YYYY-MM-DD HH:mm:ss'),
    };
    express_http_context_1.default.set('traceId', traceId);
    express_http_context_1.default.set('userId', userId);
    express_http_context_1.default.set('client', client);
    express_http_context_1.default.set('appVersion', appVersion);
    express_http_context_1.default.set('acceptVersion', acceptVersion);
    express_http_context_1.default.set('bulidNumber', bulidNumber);
    next();
};
//# sourceMappingURL=loggerMiddleware.js.map