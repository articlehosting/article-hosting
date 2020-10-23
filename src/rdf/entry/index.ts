import { literal } from '@rdfjs/data-model';
import { AnyPointer } from 'clownface';
import { NamedNode } from 'rdf-js';
import config from '../../config';
import routes from '../../config/routes';
import { AppContext } from '../../server/context';
import { createNamedNode } from '../../server/data-factory';
import {
  hydra, rdf, schema,
} from '../namespaces';

export const entryHandler = async (graph: AnyPointer<NamedNode, any>, ctx: AppContext): Promise<void> => {
  graph.addOut(rdf.type, schema.EntryPoint);
  graph.addOut(schema('name'), literal(config.name, config.rdf.Language));

  graph.addOut(hydra.collection, createNamedNode(ctx.router, ctx.request, routes.rdf.Articles), (list): void => {
    list.addOut(rdf.type, hydra.Collection);
  });
};

export default entryHandler;
