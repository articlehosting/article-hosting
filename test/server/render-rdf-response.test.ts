import { RouterContext } from '@koa/router';
import { OK } from 'http-status-codes';
import { MaybeMockedDeep } from 'ts-jest/dist/utils/testing';
import { mocked } from 'ts-jest/utils';
import routes from '../../src/rdf/routes';
import { AppContext } from '../../src/server/context';
import extendedDataFactory from '../../src/server/data-factory';
import renderRdfResponse from '../../src/server/render-rdf-response';

describe('render rdf response', () => {
  let routerContext: MaybeMockedDeep<RouterContext>;
  const next = jest.fn();

  beforeEach(() => {
    next.mockReset();
    routerContext = mocked({
      params: {},
      response: jest.fn(),
      dataFactory: extendedDataFactory,
      request: {
        origin: 'http://localhost',
      },
      router: {
        url: jest.fn(() => 'test/'),
      },
    } as unknown as RouterContext, true);
  });

  it('call renderRdfResponse fn', async () => {
    const route = routes[0];

    const renderFn = jest.fn();
    const middleware = renderRdfResponse(renderFn, route);

    await middleware(<AppContext><unknown>routerContext, next);

    expect(routerContext.response.status).toStrictEqual(OK);
  });
});
