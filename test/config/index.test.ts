import config from '../../src/config';

describe('config', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
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
});
