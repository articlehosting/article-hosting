import renderMainHeader from '../../../src/pages/templates/main-header-template';

describe('render main header template', () => {
  it('should render main-header template', () => {
    expect(renderMainHeader()).toContain('<header');
  });
});
