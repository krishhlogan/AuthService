"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const setHeaders = (res) => {
    res.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        // 'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent,X-AUTH-TOKEN,X-Auth-Token,x-auth-token',
        'Strict-Transport-Security': 'max-age=63072000',
        'X-XSS-Protection': '1; mode=block',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'Content-Security-Policy': "default-src 'none'; frame-ancestors 'none'",
        'Referrer-Policy': 'strict-origin',
        'Expect-CT': 'max-age=86400, enforce',
    });
};
const success = (req, res, message, data) => {
    const responseJSON = { error: false, message, data };
    req.log.response = responseJSON;
    setHeaders(res);
    res.status(200).json(responseJSON);
};
const badRequest = (req, res, message, data) => {
    const responseJSON = { error: true, message, data };
    req.log.response = responseJSON;
    setHeaders(res);
    res.status(400).json(responseJSON);
};
const notFound = (req, res, message, data) => {
    const responseJSON = { error: true, message, data };
    req.log.response = responseJSON;
    setHeaders(res);
    res.status(404).json(responseJSON);
};
const internalServerError = (req, res, message, data) => {
    const responseJSON = { error: true, message, data };
    req.log.response = responseJSON;
    setHeaders(res);
    res.status(500).json(responseJSON);
};
const unAuthorized = (req, res, message) => {
    const responseJSON = { error: true, message };
    req.log.response = responseJSON;
    setHeaders(res);
    res.status(401).json(responseJSON);
};
const forbidden = (req, res, message) => {
    const responseJSON = { error: true, message };
    req.log.response = responseJSON;
    setHeaders(res);
    res.status(403).json(responseJSON);
};
const sendExcelBinary = (req, res, filePath) => {
    const fileStream = fs_1.default.createReadStream(filePath);
    fileStream.on('error', (error) => {
        console.error('Error reading the file:', error);
        return internalServerError(req, res, 'Error while reading the file', {});
    });
    setHeaders(res);
    res.status(200);
    fileStream.pipe(res);
};
exports.default = {
    success,
    badRequest,
    internalServerError,
    forbidden,
    notFound,
    unAuthorized,
    sendExcelBinary,
};
//# sourceMappingURL=response.js.map