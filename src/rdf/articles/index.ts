import { AnyPointer } from 'clownface';
// import { addAll } from 'rdf-dataset-ext';
import { NamedNode } from 'rdf-js';
import { Article } from '../../components/article/article';
import { CONTENT_IDENTIFIER_DOI } from '../../components/article/article-content';
import { addRdfHeaderNodes } from '../../components/article/article-rdf';
import config from '../../config';
import routes from '../../config/routes';
import { AppContext } from '../../server/context';
import { createNamedNode, literal } from '../../server/data-factory';
import getDb from '../../server/db';
import RdfError from '../../server/rdf-error';
import { getArticleIdentifier, stringify } from '../../utils';
import {
  hydra, rdf, schema, stencila,
} from '../namespaces';

const { ARTICLES } = config.db.collections;

export const articlesHandler = async (graph: AnyPointer<NamedNode, any>, ctx: AppContext): Promise<void> => {
  addRdfHeaderNodes(graph, 'Article Hosting RDF Graph: List Articles', 'Articles');

  const db = await getDb();
  const articles: Array<Article> = await db.collection(ARTICLES).find({}).toArray();

  for (const article of articles) {
    graph.addOut(stencila(article.type), (articleNode) => {
      const doi = getArticleIdentifier(CONTENT_IDENTIFIER_DOI, article);

      if (!doi) {
        throw new RdfError('Missing doi property');
      }

      const [publisherId, id] = doi.split(config.articleDoiSeparator);

      articleNode.addOut(stencila.title, stringify(article.title));
      articleNode.addOut(hydra.member, doi);

      articleNode.addOut(
        hydra.collection,
        createNamedNode(ctx.router, ctx.request, routes.rdf.ArticleMetadata, { publisherId, id }),
        (list) => {
          list.addOut(rdf.type, hydra.Collection);
          list.addOut(schema('name'), literal(`Article ${doi} Metadata RDF Node`));
        },
      );

      articleNode.addOut(
        hydra.collection,
        createNamedNode(ctx.router, ctx.request, routes.rdf.ArticleBody, { publisherId, id }),
        (list) => {
          list.addOut(rdf.type, hydra.Collection);
          list.addOut(schema('name'), literal(`Article ${doi} Body RDF Node`));
        },
      );

      articleNode.addOut(
        hydra.collection,
        createNamedNode(ctx.router, ctx.request, routes.rdf.ArticleBackMatter, { publisherId, id }),
        (list) => {
          list.addOut(rdf.type, hydra.Collection);
          list.addOut(schema('name'), literal(`Article ${doi} Back Matter RDF Node`));
        },
      );

      articleNode.addOut(
        hydra.collection,
        createNamedNode(ctx.router, ctx.request, routes.rdf.ArticleFiles, { publisherId, id }),
        (list) => {
          list.addOut(rdf.type, hydra.Collection);
          list.addOut(schema('name'), literal(`Article ${doi} Files RDF Node`));
        },
      );

      articleNode.addOut(
        hydra.collection,
        createNamedNode(ctx.router, ctx.request, routes.pages.ArticleView, { publisherId, id }),
        (list) => {
          list.addOut(rdf.type, hydra.Collection);
          list.addOut(schema('name'), literal(`Article ${doi} Details HTML Page`));
        },
      );
    });
  }

  graph.addOut(hydra.manages, (managesNode) => {
    managesNode
      .addOut(hydra.property, rdf.type)
      .addOut(hydra.object, schema.Article);
  });
};

export default articlesHandler;
