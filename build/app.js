"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const config_1 = __importDefault(require("./config"));
const express_1 = __importDefault(require("express"));
const logger_1 = __importDefault(require("./loaders/logger"));
const dayjs_1 = __importDefault(require("dayjs"));
const localizedFormat_1 = __importDefault(require("dayjs/plugin/localizedFormat"));
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
const timezone_1 = __importDefault(require("dayjs/plugin/timezone"));
const relativeTime_1 = __importDefault(require("dayjs/plugin/relativeTime"));
const cors_1 = __importDefault(require("cors"));
const loaders_1 = __importDefault(require("./loaders"));
dayjs_1.default.extend(localizedFormat_1.default);
dayjs_1.default.extend(utc_1.default);
dayjs_1.default.extend(timezone_1.default);
dayjs_1.default.extend(relativeTime_1.default);
dayjs_1.default.tz.setDefault('Asia/Kolkata');
async function startServer() {
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)());
    /**
     * A little hack here
     * Import/Export can only be used in 'top-level code'
     * Well, at least in node 10 without babel and at the time of writing
     * So we are using good old require.
     **/
    await (0, loaders_1.default)({ expressApp: app });
    if (process.env.NODE_ENV !== 'test') {
        let server = app.listen(config_1.default.port, () => {
            logger_1.default.info(`
      ################################################
      🛡️  Server listening in ${process.env.NODE_ENV} environment on port: ${config_1.default.port} 🛡️
      ################################################
    `);
        });
        logger_1.default.info(`Default keep alive timeout is: ${server.keepAliveTimeout}`);
        server.keepAliveTimeout = config_1.default.keepAliveTimeout;
        logger_1.default.info(`Default keep alive timeout is: ${server.keepAliveTimeout}`);
    }
    return app;
}
exports.default = startServer;
startServer();
//# sourceMappingURL=app.js.map