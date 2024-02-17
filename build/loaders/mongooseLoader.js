"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../config"));
const logger_1 = __importDefault(require("./logger"));
exports.default = async () => {
    let connection;
    try {
        connection = await mongoose_1.default.connect(config_1.default.databaseURL, {
            maxPoolSize: 5,
        });
    }
    catch (err) {
        logger_1.default.error(err);
    }
    if (connection) {
        await new Promise((resolve, reject) => {
            setTimeout(resolve, 3000);
        });
        return connection.connection.db;
    }
    else {
        // Handle the case where connection is undefined (e.g., connection error)
        // You may want to throw an error, log a message, or take appropriate action.
        throw new Error('Failed to establish a connection to the database');
    }
};
//# sourceMappingURL=mongooseLoader.js.map