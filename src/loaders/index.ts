import { SQS } from '@aws-sdk/client-sqs';
import expressLoader from './express';
import dependencyInjectorLoader from './dependencyInjector';
import mongooseLoader from './mongooseLoader';
import Logger from './logger';
import { loadInterceptorsForResponseTime } from './axios';

import {
  UserModel
} from '../models';
import getSQSClient from './sqs';

export default async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader();
  Logger.info('✌️ DB loaded and connected!');
  // const userModel = {
  //   name: 'userModel',
  //   // Notice the require syntax and the '.default'
  //   //model: require('../models/user').default,
  //   model: UserModel,
  // };

  let models = [
    {
      name: 'userModel',
      model: UserModel,
    },
];

const sqsClient: SQS = getSQSClient();

  // It returns the agenda instance because it's needed in the subsequent loaders
  const { agenda } = await dependencyInjectorLoader({
    mongoConnection,
    models: models,
    sqsClient,
  });
  Logger.info('✌️ Dependency Injector loaded');

  loadInterceptorsForResponseTime();
  Logger.info('✌️ Axios interceptors loaded');

  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
};
