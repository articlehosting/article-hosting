import { AnyPointer } from 'clownface';
import { NamedNode } from 'rdf-js';
import config from '../../config';
import { Routes } from '../../pages/routes';
import { AppContext } from '../../server/context';
import { hydra, rdf, schema } from '../namespaces';

export const rdfHandler = async (
  { graph, createNamedNode }: { graph: AnyPointer<NamedNode, any>, createNamedNode: (route: string) => NamedNode },
  ctx: AppContext,
): Promise<void> => {
  graph.addOut(hydra.collection, createNamedNode(Routes.HomePage), (list): void => {
    list.addOut(rdf.type, hydra.Collection);
    list.addOut(schema('name'), 'Article Hosting');
  });

  graph.addOut(rdf.type, schema.EntryPoint);
  graph.addOut(schema('name'), ctx.dataFactory.literal('Article Hosting RDF Graph', config.rdf.Language));
};

export default rdfHandler;
