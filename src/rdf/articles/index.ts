import { AnyPointer } from 'clownface';
// import { addAll } from 'rdf-dataset-ext';
import { NamedNode } from 'rdf-js';
import { Article } from '../../components/article/article';
import { renderArticleTitle } from '../../components/article/article-content';
import config from '../../config';
import routes from '../../config/routes';
import { AppContext } from '../../server/context';
import { createNamedNode } from '../../server/data-factory';
import getDb from '../../server/db';
import { getDoi } from '../../utils';
import { hydra, rdf, schema } from '../namespaces';

const { ARTICLES } = config.db.collections;

export const articlesHandler = async (graph: AnyPointer<NamedNode, any>, ctx: AppContext): Promise<void> => {
  graph.addOut(rdf.type, schema.WebAPI);
  graph.addOut(schema('name'), ctx.dataFactory.literal('Article Hosting RDF Graph: List Articles', config.rdf.Language));

  const db = await getDb();
  const articles: Array<Article> = await db.collection(ARTICLES).find({}).toArray();

  for (const article of articles) {
    graph.addOut(schema(article.type), (articleNode) => {
      const doi = getDoi(article);
      if (doi) {
        console.log(doi, typeof doi);
        articleNode.addOut(hydra.member, doi);
        articleNode.addOut(hydra.Link,
          createNamedNode(ctx.router, ctx.request, routes.rdf.ArticleDetail, { doi }));
      }
      articleNode.addOut(schema('title'), renderArticleTitle(article));
    });
  }
};

export default articlesHandler;
