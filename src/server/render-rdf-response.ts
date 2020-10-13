import clownface from 'clownface';
import { INTERNAL_SERVER_ERROR, OK } from 'http-status-codes';
import { Next } from 'koa';

import { AppContext, AppMiddleware } from './context';
import { createNamedNode } from './data-factory';
import config from '../config';
import { Routes } from '../pages/routes';
import { hydra, rdf, schema } from '../rdf/namespaces';
import { RenderRdfResponse, Route } from '../rdf/routes';

class RdfError extends Error {}

export default (
  getRdfResponse: RenderRdfResponse,
  route: Route,
): AppMiddleware => (
  async (ctx: AppContext, next: Next): Promise<void> => {
    const params = {
      ...ctx.query,
      ...ctx.params,
    };

    const {
      dataFactory: { literal },
    } = ctx;

    try {
      // @todo: investigate, how to perform erorrs with rdf
      const graph = clownface({
        dataset: ctx.response.dataset,
        term: createNamedNode(ctx.router, ctx.request, route.name),
      });

      await getRdfResponse(graph, ctx, params, ctx.request.body);

      graph.addOut(
        hydra.collection,
        createNamedNode(ctx.router, ctx.request, Routes.HomePage),
        (list): void => {
          list.addOut(rdf.type, hydra.Collection);
          list.addOut(schema('name'), config.name);
        },
      );

      graph.addOut(rdf.type, schema.EntryPoint);
      graph.addOut(schema('name'), literal('Article Hosting RDF Graph', config.rdf.Language));

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
