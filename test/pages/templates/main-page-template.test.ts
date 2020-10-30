import { RouterContext } from '@koa/router';
import { MaybeMockedDeep, mocked } from 'ts-jest/dist/utils/testing';
import renderMainPageTemplate from '../../../src/pages/templates/main-page-template';
import { AppContext } from '../../../src/server/context';

describe('render main page template', () => {
  let routerContext: MaybeMockedDeep<RouterContext>;
  const next = jest.fn();

  beforeEach(() => {
    next.mockReset();
    routerContext = mocked({
      request: {
        url: 'localhost/test',
        origin: 'localhost',
      },
      params: {},
      response: jest.fn(),
    } as unknown as RouterContext, true);
  });

  it('should render main-page template', () => {
    const pageElement = '<h1>Jest Test</h1>';
    const template = renderMainPageTemplate(<AppContext><unknown>routerContext, pageElement);

    expect(template).toContain(pageElement);
    expect(template).toContain('<main');
  });
});
