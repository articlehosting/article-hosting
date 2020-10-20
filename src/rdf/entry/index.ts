import { AnyPointer } from 'clownface';
import { NamedNode } from 'rdf-js';
import config from '../../config';
import routes from '../../config/routes';
import { AppContext } from '../../server/context';
import { createNamedNode } from '../../server/data-factory';
import { hydra, rdf, schema } from '../namespaces';

export const entryHandler = async (graph: AnyPointer<NamedNode, any>, ctx: AppContext): Promise<void> => {
  graph.addOut(rdf.type, schema.EntryPoint);
  graph.addOut(schema('name'), ctx.dataFactory.literal('Article Hosting RDF Graph', config.rdf.Language));

  graph.addOut(hydra.collection, createNamedNode(ctx.router, ctx.request, routes.rdf.Articles), (linkNode) => {
    linkNode.addOut(rdf.type, hydra.Collection);
    linkNode.addOut(hydra.title, 'List of RDF Articles');
  });

  graph.addOut(hydra.Link, createNamedNode(ctx.router, ctx.request, routes.pages.HomePage), (homePageNode) => {
    homePageNode.addOut(hydra.title, 'List articles HTML Home page');
  });
};

export default entryHandler;
