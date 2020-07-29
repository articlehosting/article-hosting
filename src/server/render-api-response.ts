import { Middleware, RouterContext } from '@koa/router';
import { NOT_FOUND, OK } from 'http-status-codes';
import { Next } from 'koa';
import { Result } from 'true-myth';

export type ApiError = {
  type: 'not-found' | 'invalid-request',
  content?: string
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RenderApiResponse = (ctx?: RouterContext, body?: any) => Promise<string | Result<string, ApiError>>;

export default (
  getApiResponse: RenderApiResponse,
): Middleware => (
  async (ctx: RouterContext, next: Next): Promise<void> => {
    try {
      const params = {
        ...ctx.params,
        ...ctx.query,
      };
      ctx.response.type = 'application/json';

      const response = await getApiResponse(params, ctx.request.body);

      if (typeof response === 'string') {
        ctx.response.status = OK;
        ctx.response.body = response;
      } else {
        ctx.response.status = response.isOk() ? OK : NOT_FOUND;
        ctx.response.body = response.unwrapOrElse((error) => error.content as string);
      }

      await next();
    } catch (e) {
      console.log(e);
    }
  }
);
