import mongoose, { ConnectOptions } from 'mongoose';
import { Db } from 'mongodb';
import config from '../config';
import Logger from './logger';

export default async (): Promise<Db> => {
  let connection;
  try {
    connection = await mongoose.connect(config.databaseURL, {
      maxPoolSize: 5,
    } as ConnectOptions);
  } catch (err) {
    Logger.error(err);
  }
  if (connection) {
    await new Promise((resolve, reject) => {
      setTimeout(resolve, 3000);
    });
    return connection.connection.db;
  } else {
    // Handle the case where connection is undefined (e.g., connection error)
    // You may want to throw an error, log a message, or take appropriate action.
    throw new Error('Failed to establish a connection to the database');
  }
  
};
