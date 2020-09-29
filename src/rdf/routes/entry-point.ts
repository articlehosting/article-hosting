import url from 'url';
import clownface from 'clownface';
import { OK } from 'http-status-codes';
import { Next } from 'koa';
import config from '../../config';
import { rdf, schema } from '../namespaces';
import Routes from '../routes-enum';
import {
  NamedNode,
} from '../types';
import { AppContext, AppMiddleware } from '../types/context';

export default (): AppMiddleware => (
  async ({
    dataFactory: { literal, namedNode }, request, response, router,
  }: AppContext, next: Next): Promise<void> => {
    const createNamedNode = (route: Routes): NamedNode => namedNode(url.resolve(request.origin, router.url(route)));

    // console.log(router);

    const graph = clownface({
      dataset: response.dataset,
      term: createNamedNode(Routes.EntryPoint),
    });
    graph.addOut(rdf.type, schema.EntryPoint);
    graph.addOut(schema('name'), literal('Article Hosting RDF Graph', config.rdf.Language));
    // graph.addOut(hydra.collection, createNamedNode('articlesList'), (list: Clownface): void => {
    //   list.addOut(rdf.type, hydra.Collection);
    // });

    response.status = OK;

    await next();
  });
