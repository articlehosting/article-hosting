import { AnyPointer } from 'clownface';
// import { addAll } from 'rdf-dataset-ext';
import { NamedNode } from 'rdf-js';
import { Article, ArticleContents } from '../../components/article/article';
import config from '../../config';
import routes from '../../config/routes';
import { AppContext } from '../../server/context';
import { createNamedNode } from '../../server/data-factory';
import getDb from '../../server/db';
import { getDoi } from '../../utils';
import { hydra, rdf, schema } from '../namespaces';

const { ARTICLES } = config.db.collections;

const isArticleContent = (object: any): object is ArticleContents => 'content' in object;
const isString = (object: any): object is string => typeof object === 'string';

export const articlesHandler = async (graph: AnyPointer<NamedNode, any>, ctx: AppContext): Promise<void> => {
  graph.addOut(rdf.type, schema.WebAPI);
  graph.addOut(schema('name'), ctx.dataFactory.literal('Article Hosting RDF Graph: List Articles', config.rdf.Language));

  const db = await getDb();
  const articles: Array<Article> = await db.collection(ARTICLES).find({}).toArray();

  const normalizeTitle = (title: string | Array<ArticleContents | string>) : string => {
    if (Array.isArray(title)) {
      let normalized = '';
      for (const chunk of title) {
        if (isString(chunk)) {
          normalized += chunk;
        } else if (isArticleContent(chunk)) {
          if (chunk.content) {
            normalized += chunk.content[0];
          }
        }
      }
      return normalized;
    }
    return (<string>title);
  };
  for (const article of articles) {
    graph.addOut(schema(article.type), (articleNode) => {
      const doi = getDoi(article);
      if (doi) {
        console.log(doi, typeof doi);
        articleNode.addOut(hydra.member, doi);
        articleNode.addOut(hydra.Link,
          createNamedNode(ctx.router, ctx.request, routes.rdf.ArticleDetail, { doi }));
      }
      articleNode.addOut(schema('title'), normalizeTitle(article.title));
    });
  }
};

export default articlesHandler;
