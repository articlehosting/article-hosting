import renderNotFound from '../../../src/components/static/not-found';

describe('render static not-found page', () => {
  it('should render not-found page', () => {
    expect(renderNotFound()).toContain('Not Found');
  });
});
