"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../config/errors");
class BadError extends Error {
    constructor(message) {
        super(message);
        this.name = 'BadError';
    }
}
class RequestBodyValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'RequestBodyValidationError';
    }
}
const getErrorMessageWithCode = (code) => {
    let errorDetails = errors_1.ERRORS_LIST.find((item) => item.code == code);
    if (errorDetails) {
        return `${errorDetails.code}: ${errorDetails.message}`;
    }
    else {
        // let defaultCode = code.split('_')[0] + '_DEF';
        // errorDetails = ERRORS_LIST.find((item) => item.code == defaultCode);
        // if (errorDetails) return `${errorDetails.code}: ${errorDetails.message}`;
        // else {
        return `C_DEF: Something went wrong`;
        // }
    }
};
exports.default = {
    BadError,
    RequestBodyValidationError,
    getErrorMessageWithCode,
};
//# sourceMappingURL=errors.js.map