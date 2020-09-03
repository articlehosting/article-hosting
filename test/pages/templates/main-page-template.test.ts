import renderMainPageTemplate from '../../../src/pages/templates/main-page-template';

describe('render main page template', () => {
  it('should render main-page template', () => {
    const pageElement = '<h1>Jest Test</h1>';

    const template = renderMainPageTemplate(pageElement);

    expect(template).toContain(pageElement);
    expect(template).toContain('<body');
  });
});
