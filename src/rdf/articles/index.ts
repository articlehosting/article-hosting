import { AnyPointer } from 'clownface';
// import { addAll } from 'rdf-dataset-ext';
import { NamedNode } from 'rdf-js';
import { Article } from '../../components/article/article';
import { CONTENT_IDENTIFIER_DOI } from '../../components/article/article-content';
import config from '../../config';
import routes from '../../config/routes';
import { AppContext } from '../../server/context';
import { createNamedNode } from '../../server/data-factory';
import getDb from '../../server/db';
import { escapeHtml, getArticleIdentifier } from '../../utils';
import { hydra, rdf, schema } from '../namespaces';

const { ARTICLES } = config.db.collections;

export const articlesHandler = async (graph: AnyPointer<NamedNode, any>, ctx: AppContext): Promise<void> => {
  graph.addOut(rdf.type, schema.WebAPI);
  graph.addOut(schema('name'), ctx.dataFactory.literal('Article Hosting RDF Graph: List Articles', config.rdf.Language));

  const db = await getDb();
  const articles: Array<Article> = await db.collection(ARTICLES).find({}).toArray();

  for (const article of articles) {
    graph.addOut(schema(article.type), (articleNode) => {
      const doi = getArticleIdentifier(CONTENT_IDENTIFIER_DOI, article);
      if (doi) {
        const [publisherId, id] = doi.split(config.articleDoiSeparator);
        articleNode.addOut(hydra.member, doi);
        articleNode.addOut(hydra.Link,
          createNamedNode(ctx.router, ctx.request, routes.rdf.ArticleDetails, { publisherId, id }));
        articleNode.addOut(hydra.Link,
          createNamedNode(ctx.router, ctx.request, routes.pages.ArticleView, { publisherId, id }));
      }
      articleNode.addOut(schema('title'), escapeHtml(article.title));
    });
  }
};

export default articlesHandler;
