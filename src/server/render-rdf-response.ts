import clownface from 'clownface';
import { INTERNAL_SERVER_ERROR, OK } from 'http-status-codes';
import { Next } from 'koa';

import { AppContext, AppMiddleware } from './context';
import { createNamedNode } from './data-factory';
import RdfError from './rdf-error';
import { RenderRdfResponse, Route } from '../rdf/routes';

export default (
  getRdfResponse: RenderRdfResponse,
  route: Route,
): AppMiddleware => (
  async (ctx: AppContext, next: Next): Promise<void> => {
    const params = {
      ...ctx.query,
      ...ctx.params,
    };

    try {
      const graph = clownface({
        dataset: ctx.response.dataset,
        term: createNamedNode(ctx.router, ctx.request, route.name, params),
      });

      await getRdfResponse(graph, ctx, params, ctx.request.body);

      ctx.response.status = OK;
    } catch (e) {
      // @todo: implement logging here..
      console.log(e.message, e);

      const { dataset } = ctx.dataFactory;
      const error = e instanceof RdfError ? e : new RdfError(e.message, INTERNAL_SERVER_ERROR);

      ctx.response.status = error.status;
      ctx.response.dataset = dataset(error.buildQuads(ctx.dataFactory));
    }

    await next();
  }
);
