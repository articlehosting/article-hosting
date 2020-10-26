import { AnyPointer } from 'clownface';
import { NamedNode } from 'rdf-js';
import { owl } from '../../../../article-store/src/namespaces';
import routes from '../../config/routes';
import { AppContext } from '../../server/context';
import { createNamedNode, literal } from '../../server/data-factory';
import {
  hydra, rdf, schema,
} from '../namespaces';

export const apiDocumentationHandler = async (graph: AnyPointer<NamedNode, any>, ctx: AppContext): Promise<void> => {
  graph.addOut(rdf.type, hydra.ApiDocumentation);
  graph.addOut(hydra.entrypoint, createNamedNode(ctx.router, ctx.request, routes.rdf.Entry));

  graph.addOut(hydra.supportedClass, schema.EntryPoint, (entryPoint): void => {
    entryPoint.addOut(rdf.type, hydra.Class);
    entryPoint.addOut(hydra.title, literal('API entry point', 'en'));

    entryPoint.addOut(hydra.supportedOperation, (get): void => {
      get.addOut(rdf.type, hydra.Operation);
      get.addOut(rdf.type, schema.DownloadAction);
      get.addOut(hydra.title, literal('Get the entry point', 'en'));
      get.addOut(hydra.method, literal('GET'));
      get.addOut(hydra.expects, owl.Nothing);
      get.addOut(hydra.returns, schema.EntryPoint);
    });

    entryPoint.addOut(hydra.supportedProperty, (name): void => {
      name.addOut(rdf.type, hydra.SupportedProperty);
      name.addOut(hydra.title, literal('Name', 'en'));
      name.addOut(hydra.property, schema('name'), (property): void => {
        property.addOut(rdf.type, rdf.Property);
      });
      name.addOut(hydra.required, true);
      name.addOut(hydra.readable, true);
    });
  });
};

export default apiDocumentationHandler;
