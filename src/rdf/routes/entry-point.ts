import url from 'url';
import clownface from 'clownface';
import { OK } from 'http-status-codes';
import { Next } from 'koa';
import config from '../../config';
import { Routes } from '../../pages/routes';
import { hydra, rdf, schema } from '../namespaces';
import {
  NamedNode,
} from '../types';
import { AppContext, AppMiddleware } from '../types/context';

export default (): AppMiddleware => (
  async ({
    dataFactory: { literal, namedNode }, request, response, router,
  }: AppContext, next: Next): Promise<void> => {
    const createNamedNode = (route: string): NamedNode => namedNode(url.resolve(request.origin, router.url(route)));

    const graph = clownface({
      dataset: response.dataset,
      term: createNamedNode('RdfEntry'),
    });
    graph.addOut(hydra.collection, createNamedNode(Routes.HomePage), (list): void => {
      list.addOut(rdf.type, hydra.Collection);
      list.addOut(schema('name'), 'Article Hosting');
    });

    graph.addOut(rdf.type, schema.EntryPoint);
    graph.addOut(schema('name'), literal('Article Hosting RDF Graph', config.rdf.Language));

    response.status = OK;

    await next();
  });
