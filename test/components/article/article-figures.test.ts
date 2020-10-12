import article from '../../../src/__fixtures__/article';
import {
  renderArticleFiguresContent,
} from '../../../src/components/article/article-figures';

describe('render article figures content', () => {
  it('should not throw', () => {
    expect(() => renderArticleFiguresContent(article)).not.toThrow();
  });
});
