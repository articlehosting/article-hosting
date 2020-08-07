import { MongoClientOptions } from 'mongodb';

const config = {
  server: {
    useSSL: process.env.APP_USESSL ?? true,
    hostname: process.env.APP_HOSTNAME ?? '127.0.0.1',
    port: process.env.APP_PORT ?? 8000,
  },
  db: {
    mongoUrl: process.env.MONGODB_URL ?? 'mongodb://localhost:27017/articleHosting',
    options: <MongoClientOptions> {
      poolSize: 10,
      retries: 5,
      keepAlive: true,
    },
  },
};

export default config;
