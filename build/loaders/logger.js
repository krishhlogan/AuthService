"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importStar(require("winston"));
const config_1 = __importDefault(require("../config"));
const express_http_context_1 = __importDefault(require("express-http-context"));
const { printf } = winston_1.format;
const myFormat = printf((_a) => {
    var { level, message, timestamp } = _a, metadata = __rest(_a, ["level", "message", "timestamp"]);
    var objToPrint = message;
    if (objToPrint && objToPrint.isAxiosError) {
        objToPrint = {
            request: {
                url: objToPrint.config.url,
                method: objToPrint.config.method,
                data: objToPrint.config.data,
                headers: objToPrint.config.headers,
            },
            response: objToPrint.response.data,
        };
    }
    const traceId = express_http_context_1.default.get('traceId');
    const userId = express_http_context_1.default.get('userId');
    const client = express_http_context_1.default.get('client');
    const appVersion = express_http_context_1.default.get('appVersion');
    var msg = {
        traceId,
        userId,
        client,
        appVersion,
        level,
        timestamp,
        message: objToPrint,
    };
    if (metadata) {
        msg['metadata'] = metadata;
    }
    // return JSON.stringify(msg, null, 4);
    return JSON.stringify(msg);
});
const transports = [new winston_1.default.transports.Console()];
// if (process.env.NODE_ENV !== 'development') {
//   transports.push(new winston.transports.Console());
// } else {
//   transports.push(
//     new winston.transports.Console({
//       format: winston.format.combine(winston.format.cli(), winston.format.splat()),
//     }),
//   );
// }
const LoggerInstance = winston_1.default.createLogger({
    level: config_1.default.logs.level,
    levels: winston_1.default.config.npm.levels,
    format: winston_1.default.format.combine(winston_1.default.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
    }), winston_1.default.format.errors({ stack: true }), winston_1.default.format.splat(), winston_1.default.format.json(), myFormat),
    transports,
});
exports.default = LoggerInstance;
//# sourceMappingURL=logger.js.map