import path from 'path';
import { mocked } from 'ts-jest';

const mockedDotenvConfigFn = jest.fn();

jest.mock('dotenv', () => ({
  config: mockedDotenvConfigFn,
}));

jest.mock('fs');

// eslint-disable-next-line import/first, import/order
import config from '../../src/config';
// eslint-disable-next-line import/first, import/order
import dotenv from 'dotenv';

const mockedDotenv = mocked(dotenv);

describe('config', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    mockedDotenv.config.mockReset();
    process.env = { ...OLD_ENV };
  });

  it('should have a default port of 8000', () => {
    expect(config.server.port).toBe(8000);
  });

  it('should user process environment variable for the port', async () => {
    process.env.APP_PORT = '1111';
    // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
    const newConfig = require('../../src/config').default;

    expect(newConfig.server.port).toBe('1111');
  });

  it('should load .env file if not production/test mode', () => {
    process.env.NODE_ENV = 'not-production';

    // eslint-disable-next-line global-require
    require('../../src/config');

    expect(mockedDotenvConfigFn).toHaveBeenCalledWith({
      path: path.join(__dirname, '../../.env'),
    });
  });

  it('should load sslOptions if production mode', () => {
    process.env.NODE_ENV = 'production';

    // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
    const newConfig = require('../../src/config').default;

    expect(newConfig.db.options.sslValidate).toBe(true);
  });

  // tests for s3 options optional values..
  [
    {
      name: 'endpoint',
      env: 'S3_ENDPOINT',
      value: 'http://aws.s3.com',
    },
    {
      name: 'region',
      env: 'S3_REGION',
      value: 'us-west-1',
    },
    {
      name: 's3ForcePathStyle',
      env: 'S3_FORCE_PATH_STYLE',
      value: true,
    },
    {
      name: 'signatureVersion',
      env: 'S3_SIGNATURE_VER',
      value: 'v4',
    },
  ].forEach((e) => {
    it(`should load s3 ${e.name} env if was provided`, () => {
      process.env[e.env] = <string><unknown>e.value;

      // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
      const newConfig = require('../../src/config').default;

      expect(newConfig.aws.s3.options[e.name]).toBe(e.value);
    });
  });
});
