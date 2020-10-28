import { AnyPointer } from 'clownface';
import { NamedNode } from 'rdf-js';
import { toRdf } from 'rdf-literal';
import { addPropertyStencila } from '../../components/article/article-rdf';
import config from '../../config';
import routes from '../../config/routes';
import { AppContext } from '../../server/context';
import { createNamedNode, literal } from '../../server/data-factory';
import {
  hydra, owl, rdf, schema, stencila,
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
      name.addOut(hydra.title, literal('Name', config.rdf.language));
      name.addOut(hydra.property, schema('name'), (property): void => {
        property.addOut(rdf.type, rdf.Property);
      });
      name.addOut(hydra.required, true);
      name.addOut(hydra.readable, true);
      name.addOut(hydra.writeable, toRdf(false));
    });
  });

  graph.addOut(hydra.supportedClass, schema.Articles, (articlesNode): void => {
    articlesNode.addOut(rdf.type, hydra.Class);
    articlesNode.addOut(hydra.title, literal('Article Hosting RDF Graph: List Articles', 'en'));

    articlesNode.addOut(hydra.supportedOperation, (get): void => {
      get.addOut(rdf.type, hydra.Operation);
      get.addOut(rdf.type, schema(routes.rdf.Articles));
      get.addOut(hydra.title, literal('Get list of articles', config.rdf.language));
      get.addOut(hydra.method, literal('GET'));
      get.addOut(hydra.expects, owl.Nothing);
      get.addOut(hydra.returns, schema.Articles);
    });

    articlesNode.addOut(hydra.supportedProperty, (articleNode) => {
      articleNode.addOut(rdf.type, hydra.SupportedProperty);
      articleNode.addOut(hydra.title, literal('Article', config.rdf.language));
      articleNode.addOut(hydra.property, stencila.Article, (property): void => {
        property.addOut(rdf.type, rdf.Property);

        property.addOut(hydra.supportedProperty, (innerProperty) => {
          innerProperty.addOut(rdf.type, hydra.SupportedProperty);
          innerProperty.addOut(hydra.title, literal('Title', config.rdf.language));

          innerProperty.addOut(hydra.property, stencila.title, (p) => {
            p.addOut(rdf.type, rdf.Property);
          });

          innerProperty.addOut(hydra.required, true);
          innerProperty.addOut(hydra.readable, true);
          innerProperty.addOut(hydra.writeable, false);
        });
      });

      articleNode.addOut(hydra.required, true);
      articleNode.addOut(hydra.readable, true);
      articleNode.addOut(hydra.writeable, false);
    });

    articlesNode.addOut(hydra.supportedProperty, (name): void => {
      name.addOut(rdf.type, hydra.SupportedProperty);
      name.addOut(hydra.title, literal('Name', config.rdf.language));
      name.addOut(hydra.property, schema('name'), (property): void => {
        property.addOut(rdf.type, rdf.Property);
      });
      name.addOut(hydra.required, true);
      name.addOut(hydra.readable, true);
      name.addOut(hydra.writeable, true);
    });
  });

  graph.addOut(hydra.supportedClass, schema.ArticleMetadata, (article): void => {
    article.addOut(rdf.type, hydra.Class);
    article.addOut(hydra.title, literal('Article Hosting RDF Graph: List Articles', 'en'));

    article.addOut(hydra.supportedProperty, (name): void => {
      name.addOut(rdf.type, hydra.SupportedProperty);
      name.addOut(hydra.title, literal('Name', 'en'));

      name.addOut(hydra.property, schema('name'), (property): void => {
        property.addOut(rdf.type, rdf.Property);
      });

      name.addOut(hydra.required, true);
      name.addOut(hydra.readable, true);
      name.addOut(hydra.writeable, false);
    });

    addPropertyStencila(article, 'dateAccepted');
    addPropertyStencila(article, 'dateReceived');
    addPropertyStencila(article, 'isPartOf');
    addPropertyStencila(article, 'title');
    addPropertyStencila(article, 'datePublished');
    addPropertyStencila(article, 'about');
    addPropertyStencila(article, 'authors');
  });

  graph.addOut(hydra.supportedClass, schema.ArticleBody, (article): void => {
    article.addOut(rdf.type, hydra.Class);
    article.addOut(hydra.title, literal('Article Content RDF Endpoint', config.rdf.language));

    article.addOut(hydra.supportedProperty, (name): void => {
      name.addOut(rdf.type, hydra.SupportedProperty);
      name.addOut(hydra.title, literal('Name', config.rdf.language));

      name.addOut(hydra.property, schema('name'), (property): void => {
        property.addOut(rdf.type, rdf.Property);
      });

      name.addOut(hydra.required, true);
      name.addOut(hydra.readable, true);
      name.addOut(hydra.writeable, false);
    });

    addPropertyStencila(article, 'title');
    addPropertyStencila(article, 'ImageObject');
    addPropertyStencila(article, 'Paragraph');
    addPropertyStencila(article, 'Table');
    addPropertyStencila(article, 'caption');
    addPropertyStencila(article, 'depth');
    addPropertyStencila(article, 'description');
    addPropertyStencila(article, 'id');
    addPropertyStencila(article, 'label');
    addPropertyStencila(article, 'text');
    addPropertyStencila(article, 'List');
    addPropertyStencila(article, 'Emphasis');
    addPropertyStencila(article, 'MediaObject');
  });

  graph.addOut(hydra.supportedClass, schema.ArticleBackMatter, (article): void => {
    article.addOut(rdf.type, hydra.Class);
    article.addOut(hydra.title, literal('Article Back Matter RDF Endpoint', config.rdf.language));

    article.addOut(hydra.supportedProperty, (name): void => {
      name.addOut(rdf.type, hydra.SupportedProperty);
      name.addOut(hydra.title, literal('Name', config.rdf.language));

      name.addOut(hydra.property, schema('name'), (property): void => {
        property.addOut(rdf.type, rdf.Property);
      });

      name.addOut(hydra.required, true);
      name.addOut(hydra.readable, true);
      name.addOut(hydra.writeable, false);
    });

    addPropertyStencila(article, 'title');
    addPropertyStencila(article, 'about');
    addPropertyStencila(article, 'authors');
    addPropertyStencila(article, 'Paragraph');
    addPropertyStencila(article, 'datePublished');
    addPropertyStencila(article, 'identifiers');
    addPropertyStencila(article, 'keywords');
    addPropertyStencila(article, 'licenses');
    addPropertyStencila(article, 'references');
    addPropertyStencila(article, 'dateAccepted');
    addPropertyStencila(article, 'dateReceived');
  });

  graph.addOut(hydra.supportedClass, schema.ArticleFiles, (article): void => {
    article.addOut(rdf.type, hydra.Class);
    article.addOut(hydra.title, literal('Article Files RDF Endpoint: List article files', config.rdf.language));

    article.addOut(hydra.supportedProperty, (name): void => {
      name.addOut(rdf.type, hydra.SupportedProperty);
      name.addOut(hydra.title, literal('Name', config.rdf.language));

      name.addOut(hydra.property, schema('name'), (property): void => {
        property.addOut(rdf.type, rdf.Property);
      });

      name.addOut(hydra.required, true);
      name.addOut(hydra.readable, true);
      name.addOut(hydra.writeable, false);
    });

    graph.addOut(hydra.supportedProperty, (nodeProperty): void => {
      nodeProperty.addOut(rdf.type, hydra.SupportedProperty);
      nodeProperty.addOut(hydra.title, literal('file', config.rdf.language));
      nodeProperty.addOut(hydra.property, schema('file'), (property): void => {
        property.addOut(rdf.type, rdf.Property);
      });
      nodeProperty.addOut(hydra.required, true);
      nodeProperty.addOut(hydra.readable, true);
      nodeProperty.addOut(hydra.writeable, false);
    });
    addPropertyStencila(article, 'title');
  });
};

export default apiDocumentationHandler;
