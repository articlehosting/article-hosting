import { MongoClientOptions } from 'mongodb';

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
