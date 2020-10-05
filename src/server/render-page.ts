import { NOT_FOUND, OK } from 'http-status-codes';
import { Next } from 'koa';
import { Result } from 'true-myth';
import mainPageTemplate from '../pages/templates/main-page-template';
import { AppContext, AppMiddleware } from '../rdf/rdf-types/context';

type RenderPageError = {
  type: 'not-found',
  content: string
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RenderPage = (ctx?: AppContext) => Promise<string | Result<string, RenderPageError>>;

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
