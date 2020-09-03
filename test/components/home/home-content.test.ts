import demoArticle from '../../../src/__fixtures__/article';
import { renderHomePageContent, renderNoContent } from '../../../src/components/home/home-content';

describe('render homepage content', () => {
  it('should render home page content', () => {
    expect(renderHomePageContent([demoArticle])).toContain('Latest research');
  });

  it('should render home page without content', () => {
    expect(renderHomePageContent([])).toContain('No articles.');
  });

  it('should render no content for home page', () => {
    expect(renderNoContent()).toContain('No articles.');
  });
});
