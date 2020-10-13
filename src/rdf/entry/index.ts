import { AnyPointer } from 'clownface';
import { NamedNode } from 'rdf-js';
import config from '../../config';
import { RdfRoutes } from '../../config/routes';
import { AppContext } from '../../server/context';
import { createNamedNode } from '../../server/data-factory';
import { hydra, rdf, schema } from '../namespaces';

export const entryHandler = async (graph: AnyPointer<NamedNode, any>, ctx: AppContext): Promise<void> => {
  graph.addOut(rdf.type, schema.EntryPoint);
  graph.addOut(schema('name'), ctx.dataFactory.literal('Article Hosting RDF Graph', config.rdf.Language));

  const articleList = createNamedNode(ctx.router, ctx.request, RdfRoutes.Articles);

  graph.addOut(hydra.collection, articleList, (list: AnyPointer): void => {
    list.addOut(rdf.type, hydra.Collection);
  });
};

export default entryHandler;
