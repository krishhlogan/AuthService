import winston, { format } from 'winston';
import config from '../config';
import httpContext from 'express-http-context';

const { printf } = format;
const myFormat = printf(({ level, message, timestamp, ...metadata }) => {
  var objToPrint: any = message;
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

  const traceId = httpContext.get('traceId');
  const userId = httpContext.get('userId');
  const client = httpContext.get('client');
  const appVersion = httpContext.get('appVersion');
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

const transports = [new winston.transports.Console()];
// if (process.env.NODE_ENV !== 'development') {
//   transports.push(new winston.transports.Console());
// } else {
//   transports.push(
//     new winston.transports.Console({
//       format: winston.format.combine(winston.format.cli(), winston.format.splat()),
//     }),
//   );
// }

const LoggerInstance = winston.createLogger({
  level: config.logs.level,
  levels: winston.config.npm.levels,
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json(),
    myFormat,
  ),
  transports,
});

export default LoggerInstance;
