"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_sqs_1 = require("@aws-sdk/client-sqs");
const getSQSClient = () => {
    var sqs = new client_sqs_1.SQS({
        // The key apiVersion is no longer supported in v3, and can be removed.
        // @deprecated The client uses the "latest" apiVersion.
        apiVersion: '2012-11-05',
        region: 'ap-south-1'
    });
    return sqs;
};
exports.default = getSQSClient;
//# sourceMappingURL=sqs.js.map