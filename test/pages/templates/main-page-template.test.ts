import { RouterContext } from '@koa/router';
import { MaybeMockedDeep, mocked } from 'ts-jest/dist/utils/testing';
import article from '../../../src/__fixtures__/article';
import renderMainPageTemplate from '../../../src/pages/templates/main-page-template';
import { AppContext } from '../../../src/server/context';

describe('render main page template', () => {
  let routerContext: MaybeMockedDeep<RouterContext>;
  const pageElement = '<h1>Jest Test</h1>';
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
    const ctx: AppContext = <AppContext><unknown>routerContext;
    const template = renderMainPageTemplate(ctx, pageElement);

    expect(template).toContain(pageElement);
    expect(template).toContain('<main');
  });

  it('should render no authors if not in article', async () => {
    const ctx: AppContext = <AppContext><unknown>routerContext;
    const template = renderMainPageTemplate(ctx, pageElement, {
      article: {
        ...article,
        authors: [],
      },
    });

    expect(template).not.toContain('<meta name="dc.contributor"');
  });
});
