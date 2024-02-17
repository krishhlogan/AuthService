import axios from 'axios';
import httpContext from 'express-http-context';

export const loadInterceptorsForResponseTime = () => {
  axios.interceptors.request.use(
    function(config) {
      config['metadata'] = { startTime: Date.now() };
      const traceId = httpContext.get('traceId');
      const userId = httpContext.get('userId');
      const client = httpContext.get('client');
      const appVersion = httpContext.get('appVersion');
      const bulidNumber = httpContext.get('bulidNumber');
      if (traceId) {
        config.headers['X-Trace-Id'] = traceId;
        config.headers['X-User-ID'] = userId;
        config.headers['X-Client'] = client;
        config.headers['X-App-Version'] = appVersion;
        config.headers['X-Build-Number'] = bulidNumber;
      }
      return config;
    },
    function(error) {
      return Promise.reject(error);
    },
  );

  axios.interceptors.response.use(
    function(response) {
      response.config['metadata'].endTime = Date.now();
      response['durationInMilliseconds'] =
        response.config['metadata'].endTime - response.config['metadata'].startTime;
      return response;
    },
    function(error) {
      if (error.config && error.config.metadata) {
        error.config.metadata.endTime = Date.now();
        error.duration = error.config.metadata.endTime - error.config.metadata.startTime;
      }
      return Promise.reject(error);
    },
  );
};
