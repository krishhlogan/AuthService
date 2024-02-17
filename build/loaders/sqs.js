"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const getSQSClient = () => {
    var sqs = new aws_sdk_1.default.SQS({ apiVersion: '2012-11-05', region: 'ap-south-1' });
    return sqs;
};
exports.default = getSQSClient;
//# sourceMappingURL=sqs.js.map