import { NOT_FOUND, OK } from 'http-status-codes';
import { Next } from 'koa';
import { Result } from 'true-myth';
import mainPageTemplate from '../pages/templates/main-page-template';
import { AppContext, AppMiddleware } from '../rdf/types/context';

type RenderPageError = {
  type: 'not-found',
  content: string
};

export class PageContent {
  public readonly content: string;

  public readonly context?: any;

  constructor(content: string, context?: any) {
    this.content = content;
    this.context = context;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RenderPage = (ctx?: AppContext) => Promise<string | PageContent | Result<string, RenderPageError>>;

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
        ctx.response.body = mainPageTemplate(page);
      } else if (page instanceof PageContent) {
        ctx.response.status = OK;
        ctx.response.body = mainPageTemplate(page.content, page.context);
      } else {
        ctx.response.status = page.isOk() ? OK : NOT_FOUND;
        ctx.response.body = mainPageTemplate(page.unwrapOrElse((error) => error.content as string));
      }

      await next();
    } catch (e) {
      console.log(e);
    }
  }
);
