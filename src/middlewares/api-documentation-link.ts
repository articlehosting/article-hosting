import url from 'url';
import formatLinkHeader from 'format-link-header';
import { ExtendableContext, Next } from 'koa';
import { Middleware } from 'koa-compose';

export default (path: string): Middleware<ExtendableContext> => (
  async ({ request, response }: ExtendableContext, next: Next): Promise<void> => {
    await next();

    const apiDocLink = url.resolve(request.origin, path);

    const link = {
      rel: 'http://www.w3.org/ns/hydra/core#apiDocumentation',
      url: apiDocLink,
    };

    response.append('Link', formatLinkHeader({ hydra: link }));
  }
);
