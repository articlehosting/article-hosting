import { RouterContext } from '@koa/router';
import { INTERNAL_SERVER_ERROR } from 'http-status-codes';
import { MaybeMockedDeep } from 'ts-jest/dist/util/testing';
import { mocked } from 'ts-jest/utils';

import ApiError from '../../src/server/error';
import renderApiResponse from '../../src/server/render-api-response';

describe('render api response', () => {
  let routerContext: MaybeMockedDeep<RouterContext>;
  const pageContent = 'page';
  const error = new ApiError('Internal Server Error', INTERNAL_SERVER_ERROR);
  const next = jest.fn();

  beforeEach(() => {
    next.mockReset();
    routerContext = mocked(<RouterContext><unknown>{
      params: {},
      request: jest.fn(),
      response: jest.fn(),
    }, true);
  });

  it('call passed rendering function', async (): Promise<void> => {
    const apiRenderingFn = jest.fn().mockResolvedValueOnce('api' as jest.ResolvedValue<string>);
    const middleware = await renderApiResponse(apiRenderingFn);

    await middleware(routerContext as unknown as RouterContext, next);

    expect(apiRenderingFn).toHaveBeenCalledWith({}, undefined);
  });

  it('should set response type to application/json', async (): Promise<void> => {
    const apiRenderingFn = jest.fn().mockResolvedValueOnce('page' as jest.ResolvedValue<string>);
    const middleware = await renderApiResponse(apiRenderingFn);

    await middleware(<RouterContext><unknown>routerContext, next);

    expect(routerContext.response.type).toBe('application/json');
  });

  it('should set status to OK when render api response returns string', async (): Promise<void> => {
    const apiRenderingFn = jest.fn().mockResolvedValueOnce(pageContent as jest.ResolvedValue<string>);
    const middleware = await renderApiResponse(apiRenderingFn);

    await middleware(<RouterContext><unknown>routerContext, next);

    expect(routerContext.response.status).toBe(200);
    expect(routerContext.response.body).toBe(pageContent);
  });

  it('should set status to OK when render page returns truth value', async (): Promise<void> => {
    const apiRenderingFn = jest.fn().mockResolvedValueOnce(pageContent as jest.ResolvedValue<string>);
    const middleware = await renderApiResponse(apiRenderingFn);

    await middleware(<RouterContext><unknown>routerContext, next);

    expect(routerContext.response.status).toBe(200);
    expect(routerContext.response.body).toContain(pageContent);
  });

  it('should return correct error body on api error', async (): Promise<void> => {
    const apiRenderingFn = jest.fn().mockRejectedValueOnce(error);

    const middleware = await renderApiResponse(apiRenderingFn);

    await middleware(<RouterContext><unknown>routerContext, next);

    expect(routerContext.response.status).toBe(error.status);
    expect(routerContext.response.body).toStrictEqual(error.buildBody());
  });

  it('should return correct error body on unexpected error in production mode', async (): Promise<void> => {
    const OLD_NODE_ENV = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';

    const apiRenderingFn = jest.fn().mockImplementationOnce(() => { throw new Error('Unexpected error!'); });
    const middleware = await renderApiResponse(apiRenderingFn);

    await middleware(<RouterContext><unknown>routerContext, next);

    expect(routerContext.response.status).toBe(500);
    expect(routerContext.response.body).toStrictEqual({ message: 'Internal Server Error', status: 500 });

    process.env.NODE_ENV = OLD_NODE_ENV;
  });

  it('should return correct error body on unexpected error in none-production mode', async (): Promise<void> => {
    const OLD_NODE_ENV = process.env.NODE_ENV;
    process.env.NODE_ENV = 'noneproduction';

    const apiRenderingFn = jest.fn().mockImplementationOnce(() => { throw new Error('Unexpected error!'); });
    const middleware = await renderApiResponse(apiRenderingFn);

    await middleware(<RouterContext><unknown>routerContext, next);

    expect(routerContext.response.status).toBe(500);
    expect(routerContext.response.body).toStrictEqual({ message: 'Unexpected error!', status: 500 });

    process.env.NODE_ENV = OLD_NODE_ENV;
  });
});
