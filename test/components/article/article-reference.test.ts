import article from '../../../src/__fixtures__/article';
import renderArticleReferences from '../../../src/components/article/article-reference';

describe('render article references', () => {
  it('should render a semantic list', () => {
    expect(renderArticleReferences({ ...article, references: [] })).toContain('<div class="ui ordered relaxed list">');
  });

  it('should render an h2 title', () => {
    expect(renderArticleReferences({ ...article, references: [] })).toContain('<h2 class="ui header">References</h2>');
  });
});
