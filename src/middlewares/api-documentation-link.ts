import url from 'url';
import formatLinkHeader from 'format-link-header';
import { ExtendableContext, Next } from 'koa';
import { Middleware } from 'koa-compose';

export default (path: string): Middleware<ExtendableContext> => (
  async ({ request, response }: ExtendableContext, next: Next): Promise<void> => {
    await next();

    let apiDocLink = url.resolve(request.origin, path);

    // @todo: rework it..
    if (process.env.NODE_ENV === 'production' && !/^https/.test(apiDocLink)) {
      apiDocLink = apiDocLink.replace(/^http/, 'https');
    }

    const link = {
      rel: 'http://www.w3.org/ns/hydra/core#apiDocumentation',
      url: apiDocLink,
    };

    response.append('Link', formatLinkHeader({ hydra: link }));
  }
);
