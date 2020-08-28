import stream from 'stream';
import { Middleware, RouterContext } from '@koa/router';
import { INTERNAL_SERVER_ERROR, OK } from 'http-status-codes';
import { Next } from 'koa';

import ApiError from './error';
import { DownloadRouterContext } from '../api/download';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RenderApiResponse = (ctx?: RouterContext, body?: any) => Promise<string | stream.Readable>;

export default (
  getApiResponse: RenderApiResponse,
): Middleware => (
  async (ctx: RouterContext, next: Next): Promise<void> => {
    const params = {
      ...ctx.query,
      ...ctx.params,
    };

    ctx.response.type = 'application/json';
    try {
      const response = await getApiResponse(params, ctx.request.body);

      if (typeof response === 'string') {
        ctx.response.status = OK;
        ctx.response.body = response;
      } else if (response instanceof stream.Readable) {
        ctx.response.body = response;
        ctx.response.attachment((<DownloadRouterContext>params).file);
      } else {
        throw new Error(`Unsupported response type ${typeof response}`);
      }
    } catch (e) {
      // todo: implement logging here.
      console.log(e);

      if (e instanceof ApiError) {
        ctx.response.status = e.status;
        ctx.response.body = e.buildBody();
      } else {
        ctx.response.status = INTERNAL_SERVER_ERROR;
        ctx.response.body = {
          message: process.env.NODE_ENV === 'production' ? 'Internal Server Error' : e.message,
          status: INTERNAL_SERVER_ERROR,
        };
      }
    }

    await next();
  }
);
