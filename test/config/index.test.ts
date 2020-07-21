import config from '../../src/config';

describe('config', () => {
  it('should have a default port of 8000', () => {
    expect(config.server.port).toBe(8000);
  });
});
