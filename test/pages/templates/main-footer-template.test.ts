import renderMainFooter from '../../../src/pages/templates/main-footer-template';

describe('render main footer template', () => {
  it('should render main-footer template', () => {
    expect(renderMainFooter()).toContain('<footer');
  });
});
