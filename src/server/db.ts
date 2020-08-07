import { Db, MongoClient } from 'mongodb';

import config from '../config';

let connection: MongoClient | undefined;

export const connect = async (): Promise<MongoClient> => {
  try {
    if (connection) {
      await connection.close();
    }

    connection = await MongoClient.connect(config.db.mongoUrl, config.db.options);

    return connection;
  } catch (e) {
    throw new Error(e);
  }
};

const db = async (): Promise<Db> => {
  try {
    return (connection ?? await connect()).db(config.db.mongoUrl.split('/')[3]);
  } catch (e) {
    throw new Error(e);
  }
};

export default db;
