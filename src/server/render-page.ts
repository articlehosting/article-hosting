import { Middleware, RouterContext } from '@koa/router';
import { NOT_FOUND, OK } from 'http-status-codes';
import { Next } from 'koa';

export type RenderPage = (ctx?: RouterContext) => string;

export default (
  renderPage: RenderPage,
): Middleware => (
  async (ctx: RouterContext, next: Next): Promise<void> => {
    const params = {
      ...ctx.params,
      ...ctx.query,
    };
    ctx.response.type = 'html';

    const page = await renderPage(params);

    if (typeof page === 'string') {
      ctx.response.status = OK;
      ctx.response.body = page;
    } else {
      ctx.response.status = page.isOk() ? OK : NOT_FOUND;
      ctx.response.body = page.unwrapOrElse((error) => error.content as string);
    }

    await next();
  }
);
