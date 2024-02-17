import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { v1 as uuidv1 } from 'uuid';
import routes from '../api';
import config from '../config';
import { APIResponse, ErrorHandler } from '../utility';
import logger from './logger';
import httpContext from 'express-http-context';
import morgan from 'morgan';
import path from 'path';
import loggerMiddleware from '../api/middlewares/loggerMiddleware';
import { IExtendedRequest } from '../interfaces/IExtendedRequest';
import { isCelebrateError } from 'celebrate';

let loggerMeta = {
  file:
    __dirname
      .toString()
      .split('/')
      .pop() +
    '/' +
    path.basename(__filename),
  action: '',
  id: '',
};

export default ({ app }: { app: express.Application }) => {
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
  var corsOptionsDelegate = function(req, callback) {
    var corsOptions;
    if (config.whitelistedDomains.indexOf(req.header('Origin')) !== -1) {
      corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
    } else {
      corsOptions = { origin: false }; // disable CORS for this request
    }
    corsOptions.methods = 'GET, POST, OPTIONS, PUT, PATCH, DELETE';
    corsOptions.allowedHeaders = ['Content-Type', 'Authorization', 'accept-version'];
    callback(null, corsOptions); // callback expects two parameters: error and options
  };
  app.disable('x-powered-by'); // Disabled powered by header in response.
  app.use(cors(corsOptionsDelegate));
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

  app.use(bodyParser({ limit: '50mb' }));
  // Middleware that transforms the raw string of req.body into json
  app.use(bodyParser.json());

  // for logger
  app.use(httpContext.middleware);

  /* Assign request ID */
  app.use(loggerMiddleware);

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
  app.use(
    morgan(
      function(tokens, req: IExtendedRequest, res) {
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
      },
      { stream: { write: (message) => logger.info(message) } },
    ),
  );

  app.use(
    morgan((tokens, req: IExtendedRequest, res) => {
      req.log.status = tokens.status(req, res);
      req.log.responseTime = Date.now() - req.log.startTimestamp;
      delete req.log.startTimestamp;
      return JSON.stringify(req.log);
    }),
  );

  // Load API routes
  app.use(routes());

  /// catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err['status'] = 404;
    next(err);
  });

  /// error handlers
  app.use((err, req: IExtendedRequest, res, next) => {
    /**
     * Handle 401 thrown by express-jwt library
     */
    if (err.name === 'UnauthorizedError') {
      req.log.error = 'UnauthorizedError';
      return APIResponse.unAuthorized(
        req,
        res,
        'Session expired, please authenticate again to continue.',
      );
    }
    return next(err);
  });
  app.use((err, req, res, next) => {
    logger.error('Instance of Bad error:', err);
    if (err instanceof ErrorHandler.BadError || err.name === 'BadError') {
      req.log.error = 'BadError';
      req.log.errorMessage = err.message;
      return APIResponse.badRequest(req, res, err.message, {});
    } else if (err.status && err.status == 404) {
      req.log.error = 'NotFound';
      req.log.errorMessage = err.message;
      return APIResponse.notFound(req, res, err.message, '');
    } else if (isCelebrateError(err)) {
      req.log.error = 'CelebrateError';
      req.log.errorMessage = err.details[0].message
        .split('"')
        .join('')
        .split(':')[0];
      console.log('APP JOI errors : %o', err);
      return APIResponse.badRequest(
        req,
        res,
        err.details[0].message
          .split('"')
          .join('')
          .split(':')[0],
        {},
      );
    } else {
      req.log.error = 'UnhandledException';
      logger.error(
        `Unhandled error\t${JSON.stringify(req.headers)}\t${JSON.stringify(
          req.path,
        )}\t${JSON.stringify(req.body)}`,
      );
      return APIResponse.internalServerError(
        req,
        res,
        `Oops! This shouldn't have happened. Please try this in some time. We sincerely apologise for the inconvenience caused.`,
        '',
      );
    }
  });
};
