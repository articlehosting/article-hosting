import { INTERNAL_SERVER_ERROR, NOT_FOUND, OK } from 'http-status-codes';
import { Next } from 'koa';
import { Result } from 'true-myth';
import { AppContext, AppMiddleware } from './context';
import logger from './logger';
import Level from '../config/logger-levels';
import mainPageTemplate from '../pages/templates/main-page-template';

type RenderPageError = {
  type: 'not-found',
  content: string
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RenderPage = (ctx?: AppContext) => Promise<string | PageContent | Result<string, RenderPageError>>;

export class PageContent {
  public readonly content: string;

  public readonly context?: any;

  constructor(content: string, context?: any) {
    this.content = content;
    this.context = context;
  }
}

export default (
  renderPage: RenderPage,
): AppMiddleware => (
  async (ctx: AppContext, next: Next): Promise<void> => {
    try {
      const params = {
        ...ctx.params,
        ...ctx.query,
      };
      ctx.response.type = 'html';

      const page = await renderPage(params);
      if (typeof page === 'string') {
        ctx.response.status = OK;
        ctx.response.body = mainPageTemplate(ctx, page);
      } else if (page instanceof PageContent) {
        ctx.response.status = OK;
        ctx.response.body = mainPageTemplate(ctx, page.content, page.context);
      } else {
        ctx.response.status = page.isOk() ? OK : NOT_FOUND;
        ctx.response.body = mainPageTemplate(ctx, page.unwrapOrElse((error) => error.content as string));
      }

      await next();
    } catch (e) {
      logger.log(Level.error, e.message, { status: INTERNAL_SERVER_ERROR, trace: e.stack });

      ctx.response.status = INTERNAL_SERVER_ERROR;
      ctx.response.body = process.env.NODE_ENV !== 'production' ? e.message : INTERNAL_SERVER_ERROR;
    }
  }
);
