import url from 'url';
import clownface from 'clownface';
import { INTERNAL_SERVER_ERROR, OK } from 'http-status-codes';
import { Next } from 'koa';
import { NamedNode } from 'rdf-js';

import { AppContext, AppMiddleware } from './context';
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
      dataFactory: { literal, namedNode }, request, response, router,
    } = ctx;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    const createNamedNode = (r: string): NamedNode => namedNode(url.resolve(request.origin, router.url(r)));

    try {
      // @todo: investigate, how to perform erorrs with rdf
      const graph = clownface({
        dataset: response.dataset,
        term: createNamedNode(route.name),
      });

      await getRdfResponse({ graph, createNamedNode }, params, ctx.request.body);

      graph.addOut(
        hydra.collection,
        createNamedNode(Routes.HomePage),
        (list): void => {
          list.addOut(rdf.type, hydra.Collection);
          list.addOut(schema('name'), 'Article Hosting');
        },
      );

      graph.addOut(rdf.type, schema.EntryPoint);
      graph.addOut(schema('name'), literal('Article Hosting RDF Graph', config.rdf.Language));

      response.status = OK;
    } catch (e) {
      console.log(e.message, e);

      // @todo: do in hypermedia format..
      if (e instanceof RdfError) {
        response.status = 500;
      } else {
        response.status = INTERNAL_SERVER_ERROR;
      }
    }

    await next();
  }
);
