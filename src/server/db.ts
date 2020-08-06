import { MongoClient } from 'mongodb';

import config from '../config';

export default async (): Promise<MongoClient> => MongoClient.connect(config.db.mongoUrl);
