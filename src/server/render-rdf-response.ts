import url from 'url';
import clownface from 'clownface';
import { OK } from 'http-status-codes';
import { Next } from 'koa';
import config from '../config';
import { rdf, schema } from '../rdf/namespaces';
import { NamedNode } from '../rdf/types';
import { AppContext, AppMiddleware } from '../rdf/types/context';

export type RenderRdfResponse = (ctx: AppContext) => Promise<Record<string, unknown>>;

function buildGraph(ctx: AppContext, data: Record<string, unknown>):void {
  const {
    dataFactory: { literal, namedNode }, request, response, router,
  } = ctx;
  const createNamedNode = (route: string): NamedNode => namedNode(url.resolve(request.origin, router.url(route)));
  const graph = clownface({
    dataset: response.dataset,
    term: createNamedNode(data.root as string),
  });

  graph.addOut(rdf.type, data.type as string);
  graph.addOut(schema('name'), literal(data.name as string, config.rdf.Language));

  // todo parse data and construct rest of representation
}

export default (
  getRdfResponse: RenderRdfResponse,
): AppMiddleware => (
  async (ctx: AppContext, next: Next): Promise<void> => {
    try {
      const response = await getRdfResponse(ctx);
      buildGraph(ctx, response);

      ctx.response.status = OK;
      // todo make graph
    } catch (e) {
      // todo error handling
      console.error(e);
    }
    await next();
  });
