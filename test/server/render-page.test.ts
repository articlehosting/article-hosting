import { RouterContext } from '@koa/router';
import { Result } from 'true-myth';
import { MaybeMockedDeep } from 'ts-jest/dist/utils/testing';
import { mocked } from 'ts-jest/utils';
import { AppContext } from '../../src/server/context';
import renderPage from '../../src/server/render-page';

describe('render page', () => {
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
    const pageRenderingFn = jest.fn().mockResolvedValueOnce('page' as jest.ResolvedValue<string>);
    const middleware = await renderPage(pageRenderingFn);

    await middleware(routerContext as unknown as AppContext, next);

    expect(pageRenderingFn).toHaveBeenCalledWith({});
  });

  it('should set response type to html', async (): Promise<void> => {
    const pageRenderingFn = jest.fn().mockResolvedValueOnce('page' as jest.ResolvedValue<string>);
    const middleware = await renderPage(pageRenderingFn);

    await middleware(routerContext as unknown as AppContext, next);

    expect(routerContext.response.type).toBe('html');
  });

  // todo @todo: unskip

  it('should set status to OK when render page returns string', async (): Promise<void> => {
    const pageRenderingFn = jest.fn().mockResolvedValue(pageContent as jest.ResolvedValue<string>);
    const middleware = await renderPage(pageRenderingFn);

    await middleware(routerContext as unknown as AppContext, next);

    expect(routerContext.response.status).toBe(200);
    expect(routerContext.response.body).toContain(pageContent);
  });

  it('should set status to OK when render page returns truth value', async (): Promise<void> => {
    const pageRenderingFn = jest.fn().mockResolvedValueOnce(
      Result.ok(pageContent) as jest.ResolvedValue<Result<string, unknown>>,
    );
    const middleware = await renderPage(pageRenderingFn);

    await middleware(routerContext as unknown as AppContext, next);

    expect(routerContext.response.status).toBe(200);
    expect(routerContext.response.body).toContain(pageContent);
  });

  it('should set body to error content when render page returns truth value with error', async (): Promise<void> => {
    const pageRenderingFn = jest.fn().mockResolvedValueOnce(
      Result.err({ content: errorBody }) as jest.ResolvedValue<Result<string, unknown>>,
    );
    const middleware = await renderPage(pageRenderingFn);

    await middleware(routerContext as unknown as AppContext, next);

    expect(routerContext.response.status).toBe(404);
    expect(routerContext.response.body).toContain(errorBody);
  });

  it('should not set response status and body when render page throws error', async (): Promise<void> => {
    const pageRenderingFn = jest.fn().mockImplementationOnce(() => { throw new Error(); });
    const middleware = await renderPage(pageRenderingFn);

    await middleware(routerContext as unknown as AppContext, next);

    expect(routerContext.response.status).toBe(500);
    expect(routerContext.response.body).toBe('');
  });
});
