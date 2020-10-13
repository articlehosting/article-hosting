import { AnyPointer } from 'clownface';
import { NamedNode } from 'rdf-js';
import config from '../../config';
import { AppContext } from '../../server/context';
import { rdf, schema } from '../namespaces';

export const articlesHandler = async (graph: AnyPointer<NamedNode, any>, ctx: AppContext): Promise<void> => {
  graph.addOut(rdf.type, schema.EntryPoint);
  graph.addOut(schema('name'), ctx.dataFactory.literal('Article Hosting RDF Graph', config.rdf.Language));
};

export default articlesHandler;
