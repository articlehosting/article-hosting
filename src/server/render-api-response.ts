import stream from 'stream';
import { INTERNAL_SERVER_ERROR, OK } from 'http-status-codes';
import { Next } from 'koa';

import { AppContext, AppMiddleware } from './context';
import ApiError from './error';
import logger from './logger';
import { DownloadRouterContext } from '../api/download';
import { RenderApiResponse } from '../api/routes';
import Level from '../config/logger-levels';

export default (
  getApiResponse: RenderApiResponse,
): AppMiddleware => (
  async (ctx: AppContext, next: Next): Promise<void> => {
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
        ctx.response.status = OK;
        ctx.response.body = response;
        ctx.response.attachment((<DownloadRouterContext>params).file);
      } else {
        throw new Error(`Unsupported response type ${typeof response}`);
      }
    } catch (e) {
      const error = e instanceof ApiError
        ? e
        : new ApiError(
          process.env.NODE_ENV === 'production'
            ? 'Internal Server Error'
            : e.message,
          INTERNAL_SERVER_ERROR,
        );

      logger.log(Level.error, e.message, { status: error.status, trace: error.stack });

      ctx.response.status = error.status;
      ctx.response.body = error.buildBody();
    }

    await next();
  }
);
