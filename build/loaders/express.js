"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const api_1 = __importDefault(require("../api"));
const config_1 = __importDefault(require("../config"));
const utility_1 = require("../utility");
const logger_1 = __importDefault(require("./logger"));
const express_http_context_1 = __importDefault(require("express-http-context"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const loggerMiddleware_1 = __importDefault(require("../api/middlewares/loggerMiddleware"));
const celebrate_1 = require("celebrate");
let loggerMeta = {
    file: __dirname
        .toString()
        .split('/')
        .pop() +
        '/' +
        path_1.default.basename(__filename),
    action: '',
    id: '',
};
exports.default = ({ app }) => {
    /**
     * Health Check endpoints
     * @TODO Explain why they are here
     */
    app.get('/status', (req, res) => {
        res.status(200).end();
    });
    app.head('/status', (req, res) => {
        res.status(200).end();
    });
    // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
    // It shows the real origin IP in the heroku or Cloudwatch logs
    app.enable('trust proxy');
    // The magic package that prevents frontend developers going nuts
    // Alternate description:
    // Enable Cross Origin Resource Sharing to all origins by default
    var corsOptionsDelegate = function (req, callback) {
        var corsOptions;
        if (config_1.default.whitelistedDomains.indexOf(req.header('Origin')) !== -1) {
            corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
        }
        else {
            corsOptions = { origin: false }; // disable CORS for this request
        }
        corsOptions.methods = 'GET, POST, OPTIONS, PUT, PATCH, DELETE';
        corsOptions.allowedHeaders = ['Content-Type', 'Authorization', 'accept-version'];
        callback(null, corsOptions); // callback expects two parameters: error and options
    };
    app.disable('x-powered-by'); // Disabled powered by header in response.
    app.use((0, cors_1.default)(corsOptionsDelegate));
    // app.use(
    //   cors({
    //     origin: config.whitelistedDomains,
    //     methods: 'GET, POST, OPTIONS, PUT',
    //     allowedHeaders: ['Content-Type', 'Authorization'],
    //   }),
    // );
    // app.use(function(req, res, next) {
    //   res.header('Access-Control-Allow-Origin', 'localhost');
    //   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    //   next();
    // });
    // Some sauce that always add since 2014
    // "Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it."
    // Maybe not needed anymore ?
    app.use(require('method-override')());
    app.use((0, body_parser_1.default)({ limit: '50mb' }));
    // Middleware that transforms the raw string of req.body into json
    app.use(body_parser_1.default.json());
    // for logger
    app.use(express_http_context_1.default.middleware);
    /* Assign request ID */
    app.use(loggerMiddleware_1.default);
    /* Enable Helmet */
    // app.use(
    //   helmet.contentSecurityPolicy({
    //     useDefaults: false,
    //     directives: {
    //       defaultSrc: ['*'],
    //       imgSrc: ['*', 'data:'],
    //       styleSrc: ['*', "'unsafe-inline'"],
    //       scriptSrc: ['*', "'unsafe-inline'", "'unsafe-eval'"],
    //     },
    //   }),
    // );
    /* Log incoming request */
    app.use((0, morgan_1.default)(function (tokens, req, res) {
        return [
            tokens['remote-addr'](req, res),
            tokens['remote-user'](req, res),
            tokens['date'](req, res),
            tokens.method(req, res),
            tokens.url(req, res),
            req.id,
            tokens['http-version'](req, res),
            tokens.status(req, res),
            tokens.res(req, res, 'content-length'),
            '-',
            tokens['response-time'](req, res),
            'ms',
            //tokens['user-agent'](req, res)
        ].join(' ');
    }, { stream: { write: (message) => logger_1.default.info(message) } }));
    app.use((0, morgan_1.default)((tokens, req, res) => {
        req.log.status = tokens.status(req, res);
        req.log.responseTime = Date.now() - req.log.startTimestamp;
        delete req.log.startTimestamp;
        return JSON.stringify(req.log);
    }));
    // Load API routes
    app.use((0, api_1.default)());
    /// catch 404 and forward to error handler
    app.use((req, res, next) => {
        const err = new Error('Not Found');
        err['status'] = 404;
        next(err);
    });
    /// error handlers
    app.use((err, req, res, next) => {
        /**
         * Handle 401 thrown by express-jwt library
         */
        if (err.name === 'UnauthorizedError') {
            req.log.error = 'UnauthorizedError';
            return utility_1.APIResponse.unAuthorized(req, res, 'Session expired, please authenticate again to continue.');
        }
        return next(err);
    });
    app.use((err, req, res, next) => {
        logger_1.default.error('Instance of Bad error:', err);
        if (err instanceof utility_1.ErrorHandler.BadError || err.name === 'BadError') {
            req.log.error = 'BadError';
            req.log.errorMessage = err.message;
            return utility_1.APIResponse.badRequest(req, res, err.message, {});
        }
        else if (err.status && err.status == 404) {
            req.log.error = 'NotFound';
            req.log.errorMessage = err.message;
            return utility_1.APIResponse.notFound(req, res, err.message, '');
        }
        else if ((0, celebrate_1.isCelebrateError)(err)) {
            req.log.error = 'CelebrateError';
            req.log.errorMessage = err.details[0].message
                .split('"')
                .join('')
                .split(':')[0];
            console.log('APP JOI errors : %o', err);
            return utility_1.APIResponse.badRequest(req, res, err.details[0].message
                .split('"')
                .join('')
                .split(':')[0], {});
        }
        else {
            req.log.error = 'UnhandledException';
            logger_1.default.error(`Unhandled error\t${JSON.stringify(req.headers)}\t${JSON.stringify(req.path)}\t${JSON.stringify(req.body)}`);
            return utility_1.APIResponse.internalServerError(req, res, `Oops! This shouldn't have happened. Please try this in some time. We sincerely apologise for the inconvenience caused.`, '');
        }
    });
};
//# sourceMappingURL=express.js.map