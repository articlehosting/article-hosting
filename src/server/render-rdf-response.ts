import clownface from 'clownface';
import { INTERNAL_SERVER_ERROR, OK } from 'http-status-codes';
import { Next } from 'koa';

import { AppContext, AppMiddleware } from './context';
import { createNamedNode } from './data-factory';
import logger from './logger';
import RdfError from './rdf-error';
import Level from '../config/logger-levels';
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
      const { dataset } = ctx.dataFactory;
      const error = e instanceof RdfError
        ? e
        : new RdfError(
          process.env.NODE_ENV === 'production'
            ? 'Internal Server Error'
            : e.message,
          INTERNAL_SERVER_ERROR,
        );

      logger.log(Level.error, e.message, { status: error.status, trace: error.stack });

      ctx.response.status = error.status;
      ctx.response.dataset = dataset(error.buildQuads(ctx.dataFactory));
    }

    await next();
  }
);
