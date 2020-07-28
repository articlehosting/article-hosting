import { RouterContext } from '@koa/router';
import { Result } from 'true-myth';
import { MaybeMockedDeep } from 'ts-jest/dist/util/testing';
import { mocked } from 'ts-jest/utils';
import renderApiResponse from '../../src/server/render-api-response';

describe('render api response', () => {
  let routerContext: MaybeMockedDeep<RouterContext>;
  const pageContent = 'page';
  const errorBody = 'error body';
  const next = jest.fn();

  beforeEach(() => {
    next.mockReset();
    routerContext = mocked({
      params: {},
      response: jest.fn(),
    } as unknown as RouterContext, true);
  });

  it('call passed rendering function', async (): Promise<void> => {
    const pageRenderingFn = jest.fn().mockResolvedValueOnce('api' as jest.ResolvedValue<string>);
    const middleware = await renderApiResponse(pageRenderingFn);

    await middleware(routerContext as unknown as RouterContext, next);

    expect(pageRenderingFn).toHaveBeenCalledWith({});
  });

  it('should set response type to application/json', async (): Promise<void> => {
    const pageRenderingFn = jest.fn().mockResolvedValueOnce('page' as jest.ResolvedValue<string>);
    const middleware = await renderApiResponse(pageRenderingFn);

    await middleware(routerContext as unknown as RouterContext, next);

    expect(routerContext.response.type).toBe('application/json');
  });

  it('should set status to OK when render api response returns string', async (): Promise<void> => {
    const pageRenderingFn = jest.fn().mockResolvedValueOnce(pageContent as jest.ResolvedValue<string>);
    const middleware = await renderApiResponse(pageRenderingFn);

    await middleware(routerContext as unknown as RouterContext, next);

    expect(routerContext.response.status).toBe(200);
    expect(routerContext.response.body).toContain(pageContent);
  });

  it('should set status to OK when render page returns truth value', async (): Promise<void> => {
    const pageRenderingFn = jest.fn().mockResolvedValueOnce(
      Result.ok(pageContent) as jest.ResolvedValue<Result<string, unknown>>,
    );
    const middleware = await renderApiResponse(pageRenderingFn);

    await middleware(routerContext as unknown as RouterContext, next);

    expect(routerContext.response.status).toBe(200);
    expect(routerContext.response.body).toContain(pageContent);
  });

  it('should set body to error content when render page returns truth value with error', async (): Promise<void> => {
    const pageRenderingFn = jest.fn().mockResolvedValueOnce(
      Result.err({ content: errorBody }) as jest.ResolvedValue<Result<string, unknown>>,
    );
    const middleware = await renderApiResponse(pageRenderingFn);

    await middleware(routerContext as unknown as RouterContext, next);

    expect(routerContext.response.status).toBe(404);
    expect(routerContext.response.body).toContain(errorBody);
  });

  it('should not set response status and body when render page throws', async (): Promise<void> => {
    const pageRenderingFn = jest.fn().mockImplementationOnce(() => { throw new Error(); });
    const middleware = await renderApiResponse(pageRenderingFn);

    await middleware(routerContext as unknown as RouterContext, next);

    expect(routerContext.response.status).toBeUndefined();
    expect(routerContext.response.body).toBeUndefined();
  });
});
