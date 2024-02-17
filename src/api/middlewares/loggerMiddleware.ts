import { v1 as uuidv1 } from 'uuid';
import httpContext from 'express-http-context';
import moment from 'moment-timezone';

export default (req, res, next) => {
  // const requestId = req.headers['x-request-id'] ? req.headers['x-request-id'] : uuidv1();
  const traceId = req.headers['x-trace-id'] ? req.headers['x-trace-id'] : uuidv1();
  const userId = req.headers['x-user-id'] ? req.headers['x-user-id'] : '';
  const client = req.headers['x-client'] ? req.headers['x-client'] : '';
  const appVersion = req.headers['x-app-version'] ? req.headers['x-app-version'] : '';
  const acceptVersion = req.headers['accept-version'] ? req.headers['accept-version'] : '';
  const bulidNumber = req.headers['x-build-number'] ? req.headers['x-build-number'] : '';

  //res.setHeader('X-Request-ID', requestId);
  res.setHeader('X-Trace-Id', traceId);
  res.setHeader('X-User-ID', userId);
  res.setHeader('X-Client', client);
  res.setHeader('X-App-Version', appVersion);
  res.setHeader('X-Build-Number', bulidNumber);
  req.id = traceId;
  req.log = {
    id: traceId,
    type: 'request-log',
    userId: userId,
    client,
    appVersion,
    acceptVersion,
    bulidNumber,
    url: req.path,
    method: req.method,
    queryParams: req.query,
    startTimestamp: Date.now(),
    startTime: moment()
      .tz('Asia/Kolkata')
      .format('YYYY-MM-DD HH:mm:ss'),
  };
  httpContext.set('traceId', traceId);
  httpContext.set('userId', userId);
  httpContext.set('client', client);
  httpContext.set('appVersion', appVersion);
  httpContext.set('acceptVersion', acceptVersion);
  httpContext.set('bulidNumber', bulidNumber);
  next();
};
