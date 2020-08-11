import { Db, MongoClient } from 'mongodb';

import config from '../config';

let connection: MongoClient | undefined;

export const close = async (): Promise<void> => {
  if (connection) {
    await connection.close();

    connection = undefined;
  }
};

export const connect = async (): Promise<MongoClient> => {
  if (connection) {
    await connection.close();
  }

  connection = await MongoClient.connect(config.db.mongoUrl, config.db.options);

  return connection;
};

const db = async (): Promise<Db> => (connection ?? await connect()).db(config.db.mongoUrl.split('/')[3]);

export default db;
