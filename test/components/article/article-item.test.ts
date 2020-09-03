import demoArticle from '../../../src/__fixtures__/article';
import { Article } from '../../../src/components/article/article';
import renderArticleItem from '../../../src/components/article/article-item';

describe('render article item', () => {
  it('should render article item', () => {
    const result = renderArticleItem(demoArticle);

    expect(result).toContain('<div class="item">');
    expect(result).toContain(demoArticle.title);
  });

  it('should render article item with specific link', () => {
    const specificValue = 'doi/id123';

    const article = <Article>{
      ...demoArticle,
      identifiers: [
        {
          ...demoArticle.identifiers[0],
          name: 'doi',
          value: specificValue,
        },
      ],
    };

    const result = renderArticleItem(article);

    expect(result).toContain(`href="/articles/${encodeURIComponent(specificValue)}"`);
    expect(result).toContain('Authors:');
    expect(result).toContain('Data Published');
    expect(result).toContain('Volume');
    expect(result).toContain('Subject');
  });

  it('should render article item with invalid link on missing doi', () => {
    const specificValue = 'doi/id123';

    const article = <Article>{
      ...demoArticle,
      identifiers: [
        {
          ...demoArticle.identifiers[0],
          name: 'missingdoi',
          value: specificValue,
        },
      ],
    };

    const result = renderArticleItem(article);

    expect(result).toContain('href="/articles/"');
  });

  it('should render article item meta doi', () => {
    const specificValue = 'doi/id123';

    const article = <Article>{
      ...demoArticle,
      identifiers: [
        {
          ...demoArticle.identifiers[0],
          name: 'doi',
          value: specificValue,
        },
      ],
    };

    const result = renderArticleItem(article);

    expect(result).toContain(`<span>DOI: ${specificValue}</span>`);
  });

  it('should render article item meta with invalid doi value', () => {
    const specificValue = 'doi/id123';

    const article = <Article>{
      ...demoArticle,
      identifiers: [
        {
          ...demoArticle.identifiers[0],
          name: 'missingdoi',
          value: specificValue,
        },
      ],
    };

    const result = renderArticleItem(article);

    expect(result).toContain('<span>DOI: </span>');
  });
});
