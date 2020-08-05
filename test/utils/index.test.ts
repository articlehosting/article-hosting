import config from '../../src/config';
import utils from '../../src/utils';

const { renderImageUrl } = utils;

describe('render image url', () => {
  const imageUrl = 'someimage.jpeg';
  const defaultSize = 1200;
  const initialSSLValue = config.server.useSSL;

  beforeEach(() => {
    config.server.useSSL = initialSSLValue;
  });

  it('should render image url with specified size', () => {
    const size = 600;

    expect(renderImageUrl(imageUrl, size)).toContain(`https://127.0.0.1:8000/${imageUrl}/full/${size},/0/default.jpg`);
  });

  it('should render image url without specified size', () => {
    expect(renderImageUrl(imageUrl)).toContain(`https://127.0.0.1:8000/${imageUrl}/full/${defaultSize},/0/default.jpg`);
  });

  it('should render image url with ssl', () => {
    config.server.useSSL = true;

    expect(renderImageUrl(imageUrl)).toContain('https://');
  });

  it('should render image url without ssl', () => {
    config.server.useSSL = false;

    expect(renderImageUrl(imageUrl)).toContain('http://');
  });

  it('should not render image url if contentUrl is empty', () => {
    expect(renderImageUrl()).toBe('');
  });
});
