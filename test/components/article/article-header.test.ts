import article from '../../../src/__fixtures__/article';
import { Article } from '../../../src/components/article/article';
import renderArticleHeader from '../../../src/components/article/article-header';

describe('render article header', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('should render article header with correct article', () => {
    expect(() => renderArticleHeader(article)).not.toThrow();
  });

  it('should not render article header with missing article', () => {
    const wrongArticle = <Article><unknown>{};

    expect(() => renderArticleHeader(wrongArticle)).toThrow('Cannot read property \'map\' of undefined');
  });
});
