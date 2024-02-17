import { Container } from 'typedi';
import LoggerInstance from './logger';
import agendaFactory from './agenda';
import { Db } from 'mongodb';
import { SQS } from '@aws-sdk/client-sqs';

export default async ({
  mongoConnection,
  models,
  sqsClient,
}: {
  mongoConnection: Db;
  models: { name: string; model: any }[];
  sqsClient: SQS;
}) => {
  try {
    Container.set('sqsClient', sqsClient);

    models.forEach((m) => {
      Container.set(m.name, m.model);
    });

    const agendaInstance = agendaFactory({ mongoConnection });

    Container.set('agendaInstance', agendaInstance);
    Container.set('logger', LoggerInstance);

    LoggerInstance.info('✌️ Agenda injected into container');

    return { agenda: agendaInstance };
  } catch (e) {
    LoggerInstance.error('🔥 Error on dependency injector loader: %o', e);
    throw e;
  }
};
