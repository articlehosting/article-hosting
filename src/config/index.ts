import fs from 'fs';
import { MongoClientOptions } from 'mongodb';

const sslOptions = process.env.NODE_ENV === 'production' ? {
  sslValidate: true,
  sslCA: [fs.readFileSync('rds-combined-ca-bundle.pem')],
  auth: {
    user: process.env.DOCDB_USERNAME ?? '',
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
};

export default config;
