import fs from 'fs';
import path from 'path';
import { MongoClientOptions } from 'mongodb';

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line
  require('dotenv').config({
    path: path.join(__dirname, '..', '..', '.env'),
  });
}

const sslOptions = process.env.NODE_ENV === 'production' ? {
  sslValidate: true,
  sslCA: [fs.readFileSync('rds-combined-ca-bundle.pem')],
  auth: {
    user: process.env.DOCDB_USER ?? '',
    password: process.env.DOCDB_PASS ?? '',
  },
} : {};

const config = {
  server: {
    useSSL: process.env.APP_USESSL ?? true,
    hostname: process.env.APP_HOSTNAME ?? '127.0.0.1',
    port: process.env.APP_PORT ?? 8000,
  },
  db: {
    mongoUrl: process.env.CONNECTION_STRING ?? 'mongodb://localhost:27017/articleHosting',
    options: <MongoClientOptions> {
      poolSize: 10,
      numberOfRetries: 5,
      keepAlive: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      ...sslOptions,
    },
    collections: {
      ARTICLES: 'articles',
    },
  },
  stencila: {
    format: 'jats',
  },
  imageBasePath: process.env.IMAGE_BASEPATH ?? '',
};

export default config;
