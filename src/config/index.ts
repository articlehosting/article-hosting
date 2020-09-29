import fs from 'fs';
import path from 'path';
import { ClientConfiguration } from 'aws-sdk/clients/s3';
import { MongoClientOptions } from 'mongodb';

if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
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
  name: 'Hive Articles',
  server: {
    useSSL: process.env.APP_USESSL ?? true,
    hostname: process.env.APP_HOSTNAME ?? '127.0.0.1',
    port: process.env.APP_PORT ?? 8000,
  },
  db: {
    mongoUrl: process.env.CONNECTION_STRING ?? 'mongodb://localhost:27017/articleHosting',
    options: <MongoClientOptions>{
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
  aws: {
    s3: {
      bucketName: process.env.S3_BUCKET_NAME ?? 'article-storage',
      options: <ClientConfiguration>{
        accessKeyId: process.env.S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
        ...(process.env.S3_ENDPOINT && { endpoint: process.env.S3_ENDPOINT }),
        ...(process.env.S3_REGION && { region: process.env.S3_REGION }),
        ...(process.env.S3_FORCE_PATH_STYLE && { s3ForcePathStyle: true }),
        ...(process.env.S3_SIGNATURE_VER && { signatureVersion: process.env.S3_SIGNATURE_VER }),
      },
    },
  },
  stencila: {
    format: 'jats',
  },
  imageBasePath: process.env.IMAGE_BASEPATH ?? '',
  rdf: {
    Language: 'en',
    routePrefix: '/rdf',
    ldJson: {
      type: 'application/ld+json',
      profile: 'http://www.w3.org/ns/json-ld#compacted',
      requestType: 'jsonld',
    },
  },
};

export default config;
