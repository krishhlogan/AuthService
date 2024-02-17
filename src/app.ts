import 'reflect-metadata'; // We need this in order to use @Decorators

import config from './config';

import express from 'express';

import Logger from './loaders/logger';


import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import utc from 'dayjs/plugin/utc'; // dependent on utc plugin
import timezone from 'dayjs/plugin/timezone';
import relativeTime from 'dayjs/plugin/relativeTime';
//import RedisInstance from "./spa-shared-be/init/redis"

//import { swaggerDocument } from "./swigger"
import cors from 'cors';

import loaders from './loaders';

dayjs.extend(localizedFormat);

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);
dayjs.tz.setDefault('Asia/Kolkata');

export default async function startServer() {
  const app = express();
  app.use(cors());

  /**
   * A little hack here
   * Import/Export can only be used in 'top-level code'
   * Well, at least in node 10 without babel and at the time of writing
   * So we are using good old require.
   **/
  await loaders({ expressApp: app });
  if (process.env.NODE_ENV !== 'test') {
    let server = app.listen(config.port, () => {
      Logger.info(`
      ################################################
      🛡️  Server listening in ${process.env.NODE_ENV} environment on port: ${config.port} 🛡️
      ################################################
    `);
    });
    Logger.info(`Default keep alive timeout is: ${server.keepAliveTimeout}`);
    server.keepAliveTimeout = config.keepAliveTimeout;
    Logger.info(`Default keep alive timeout is: ${server.keepAliveTimeout}`);
  }
  return app;
}

//RedisInstance.getReadClient();
//RedisInstance.getWriteClient();
startServer();
