import article from '../../src/__fixtures__/article';
import { ArticleIdentifier } from '../../src/components/article/article';
import config from '../../src/config';
import { getArticleIdentifier, renderDate, renderImageUrl } from '../../src/utils';

describe('render image url', () => {
  const cantaloupeHostname = 'http://127.0.0.1:8182';
  const imageUrl = 'someimage.jpeg';
  const defaultSize = 'full';
  const initialSSLValue = config.iiif.useSSL;

  beforeEach(() => {
    config.iiif.useSSL = initialSSLValue;
  });

  it('should render image url with specified width', () => {
    const width = 600;

    expect(renderImageUrl(imageUrl, { width })).toContain(`${cantaloupeHostname}/iiif/2/${imageUrl}/full/${width},/0/default.jpg`);
  });

  it('should render image url with specified height', () => {
    const height = 700;

    expect(renderImageUrl(imageUrl, { height })).toContain(`${cantaloupeHostname}/iiif/2/${imageUrl}/full/,${height}/0/default.jpg`);
  });

  it('should render image url with specified size', () => {
    const size = {
      width: 1200,
      height: 700,
    };

    expect(renderImageUrl(imageUrl, size)).toContain(`${cantaloupeHostname}/iiif/2/${imageUrl}/full/${size.width},${size.height}/0/default.jpg`);
  });

  it('should render image url without specified size', () => {
    expect(renderImageUrl(imageUrl)).toContain(`${cantaloupeHostname}/iiif/2/${imageUrl}/full/${defaultSize}/0/default.jpg`);
  });

  it('should render image url with ssl', () => {
    config.iiif.useSSL = true;

    expect(renderImageUrl(imageUrl)).toContain('https://');
  });

  it('should render image url without ssl', () => {
    config.iiif.useSSL = false;

    expect(renderImageUrl(imageUrl)).toContain('http://');
  });

  it('should not render image url if contentUrl is empty', () => {
    expect(renderImageUrl()).toBe('');
  });
});

describe('render date format', () => {
  const d = new Date('2020-07-17');

  it('should render date format with month long name', () => {
    expect(renderDate('mm dd, yy', 'long', d)).toBe('July 17, 2020');
  });

  it('should render date format with month s name', () => {
    expect(renderDate('mm dd, yy', 'short', d)).toBe('Jul 17, 2020');
  });

  it('should render date format missing arguments', () => {
    const dateNow: Date = new Date();
    const setDate = {
      month: dateNow.toLocaleString('default', { month: 'long' }),
      day: `${dateNow.getDate()}`.padStart(2, '0'),
      year: dateNow.getFullYear(),
    };

    expect(renderDate()).toBe(`${setDate.month} ${setDate.day}, ${setDate.year}`);
  });
});

describe('get artcile identifier', () => {
  it('should get specific article identifier', () => {
    const name = 'some';
    const value = 'someValue';
    const identifiers = [
      {
        type: 'PropertyValue',
        name,
        propertyID: 'some',
        value,
      },
    ];

    const result = getArticleIdentifier(name, { ...article, identifiers });

    expect(result).toBe(value);
  });

  it('should not return value if identifier is missing', () => {
    const name = 'notexists';
    const identifiers = [
      {
        type: 'PropertyValue',
        name: 'some',
        propertyID: 'some',
        value: 'some',
      },
    ];

    const result = getArticleIdentifier(name, { ...article, identifiers });

    expect(result).toBeNull();
  });

  it('should not return value if property value not exists on identifier', () => {
    const name = 'some';
    const identifiers = <Array<ArticleIdentifier>><unknown>[
      {
        type: 'PropertyValue',
        name,
        propertyID: 'some',
      },
    ];

    const result = getArticleIdentifier(name, { ...article, identifiers });

    expect(result).toBeNull();
  });
});
