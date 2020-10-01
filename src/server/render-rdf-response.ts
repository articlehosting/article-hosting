import url from 'url';
import clownface from 'clownface';
import { OK } from 'http-status-codes';
import { Next } from 'koa';
import config from '../config';
import { hydra, rdf, schema } from '../rdf/namespaces';
import { NamedNode } from '../rdf/types';
import { AppContext, AppMiddleware } from '../rdf/types/context';

export type RenderRdfResponse = (ctx: AppContext) => Promise<Record<string, unknown>>;

function buildGraph(ctx: AppContext, data: Record<string, unknown>):void {
  const {
    dataFactory: { literal, namedNode }, request, response, router,
  } = ctx;
  const urlNamedNode = (route: string): NamedNode => namedNode(url.resolve(request.origin, router.url(route)));

  const graph = clownface({
    dataset: response.dataset,
    term: urlNamedNode(data.routeName as string),
  });

  graph.addOut(rdf.type, data.type as string);
  graph.addOut(schema('name'), literal(data.name as string, config.rdf.Language));

  graph.addOut(hydra.method, data.method as string);

  if (data.to && data.to instanceof Array) {
    const routeNames = data.to.map((x) => x.routeName as string);
    // routeNames.forEach((name) => {
    //   graph.addOut(hydra.Collection, namedNode(name))
    // });
    graph.addOut(hydra.Collection, (coll) => {
      // coll.addOut()
      coll.addOut(schema('WebAPI'), (webApi) => {
        // webApi.addOut(schema('url'), literal(routeNames[0]));
        webApi.addOut(schema('url'), urlNamedNode(routeNames[0]));
      });
    });
  }

  if (data.variables && data.variables instanceof Array) {
    const varNames = data.variables.map((x) => x as string);
    graph.addOut(hydra.Collection, (coll) => {
      varNames.forEach((varName) => {
        coll.addOut(hydra.variable, (variable) => {
          variable.addOut(schema('value'), literal(varName));
          variable.addOut(schema('type'), literal('string'));
        });
      });
    });
  }
}

export default (
  getRdfResponse: RenderRdfResponse,
): AppMiddleware => (
  async (ctx: AppContext, next: Next): Promise<void> => {
    try {
      const response = await getRdfResponse(ctx);
      buildGraph(ctx, response);

      ctx.response.status = OK;
    } catch (e) {
      // todo error handling
      console.error(e);
    }
    await next();
  });
