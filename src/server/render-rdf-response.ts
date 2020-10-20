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
      // @todo: investigate, how to perform erorrs with rdf
      const graph = clownface({
        dataset: ctx.response.dataset,
        term: createNamedNode(ctx.router, ctx.request, route.name, params),
      });
      await getRdfResponse(graph, ctx, params, ctx.request.body);

      // @todo: uncomment below, if you want that entry point to be present on each rdf endpoint
      // const entryPoint = createNamedNode(ctx.router, ctx.request, Routes.Entry);

      // graph.addOut(hydra.collection, entryPoint, (list): void => {
      //   list.addOut(rdf.type, hydra.Collection);
      //   list.addOut(schema('name'), config.name);
      // });

      ctx.response.status = OK;
    } catch (e) {
      console.log(e.message, e);

      // @todo: do in hypermedia format..
      if (e instanceof RdfError) {
        ctx.response.status = 400;
      } else {
        ctx.response.status = INTERNAL_SERVER_ERROR;
      }
    }

    await next();
  }
);
