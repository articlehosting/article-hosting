import demoArticle from '../../../src/__fixtures__/article';
import { Article } from '../../../src/components/article/article';
import renderArticleItem from '../../../src/components/article/article-item';

describe('render article item', () => {
  const specificValue = 'publisherId/id';

  it('should render article item', () => {
    const result = renderArticleItem(demoArticle);

    expect(result).toContain('<div class="item">');
    expect(result).toContain(demoArticle.title);
  });

  it('should render article item with specific link', () => {
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

    expect(result).toContain(`href="/articles/${specificValue}"`);
    expect(result).toContain('Authors:');
    expect(result).toContain('Data Published');
    expect(result).toContain('Volume');
    expect(result).toContain('Subject');
  });

  it('should render article item with invalid link on missing doi', () => {
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

    expect(result).not.toContain('href="/articles/"');
  });

  it('should render article item meta doi', () => {
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
