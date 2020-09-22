import demoArticle from '../../../src/__fixtures__/article';
import articleSidebar from '../../../src/components/article/sidebar';

describe('render article sidebar', () => {
  const result = articleSidebar(demoArticle);

  it('should render article sidebar container', () => {
    expect(result).toContain('<div class="three wide column">');
  });

  it('should render article sidebar items link', () => {
    expect(result).toContain('<a href="/articles/10.34196%2Fijm.00202/"><strong>Article</strong></a>');
  });

  it('should render empty string when doi is undefined', () => {
    const identifiers = [
      {
        type: 'PropertyValue',
        name: 'publisher-id',
        propertyID: 'https://registry.identifiers.org/registry/publisher-id',
        value: '001123',
      },
    ];

    expect(articleSidebar({
      ...demoArticle,
      identifiers,
    })).not.toContain('<div class="item">');
  });
});
