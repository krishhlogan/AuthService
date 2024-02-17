"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadInterceptorsForResponseTime = void 0;
const axios_1 = __importDefault(require("axios"));
const express_http_context_1 = __importDefault(require("express-http-context"));
const loadInterceptorsForResponseTime = () => {
    axios_1.default.interceptors.request.use(function (config) {
        config['metadata'] = { startTime: Date.now() };
        const traceId = express_http_context_1.default.get('traceId');
        const userId = express_http_context_1.default.get('userId');
        const client = express_http_context_1.default.get('client');
        const appVersion = express_http_context_1.default.get('appVersion');
        const bulidNumber = express_http_context_1.default.get('bulidNumber');
        if (traceId) {
            config.headers['X-Trace-Id'] = traceId;
            config.headers['X-User-ID'] = userId;
            config.headers['X-Client'] = client;
            config.headers['X-App-Version'] = appVersion;
            config.headers['X-Build-Number'] = bulidNumber;
        }
        return config;
    }, function (error) {
        return Promise.reject(error);
    });
    axios_1.default.interceptors.response.use(function (response) {
        response.config['metadata'].endTime = Date.now();
        response['durationInMilliseconds'] =
            response.config['metadata'].endTime - response.config['metadata'].startTime;
        return response;
    }, function (error) {
        if (error.config && error.config.metadata) {
            error.config.metadata.endTime = Date.now();
            error.duration = error.config.metadata.endTime - error.config.metadata.startTime;
        }
        return Promise.reject(error);
    });
};
exports.loadInterceptorsForResponseTime = loadInterceptorsForResponseTime;
//# sourceMappingURL=axios.js.map