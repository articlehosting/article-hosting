import { AnyPointer } from 'clownface';
import { NamedNode } from 'rdf-js';
import config from '../../config';
import { AppContext } from '../../server/context';
import { rdf, schema } from '../namespaces';

export const articleDetailHandler = async (graph: AnyPointer<NamedNode, any>, ctx: AppContext): Promise<void> => {
  graph.addOut(rdf.type, schema.WebApi);
  graph.addOut(schema('name'), ctx.dataFactory.literal('Article Detail RDF Endpoint', config.rdf.Language));
};

export default articleDetailHandler;
