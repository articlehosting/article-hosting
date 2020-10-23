import { AnyPointer } from 'clownface';
import { NamedNode } from 'rdf-js';
import { addRdfHeaderNodes } from '../../components/article/article-rdf';
import config from '../../config';
import { AppContext } from '../../server/context';
import getDb from '../../server/db';
import RdfError from '../../server/rdf-error';
import { articleDoi, stringify } from '../../utils';
import { stencila } from '../namespaces';

export interface ArticleBodyParams {
  publisherId?: string,
  id?: string,
}

export const ArticleBodyHandler = async (
  graph: AnyPointer<NamedNode, any>,
  ctx: AppContext,
  params: ArticleBodyParams,
): Promise<void> => {
  if (!params) {
    throw new RdfError('Missing endpoint params');
  }

  const { publisherId, id } = params;

  if (!publisherId) {
    throw new RdfError('Missing mandatory field "publisherId"');
  }

  if (!id) {
    throw new RdfError('Missing mandatory field "id"');
  }

  const db = await getDb();

  const a = await db.collection(config.db.collections.ARTICLES).findOne({ _id: articleDoi(publisherId, id) });

  if (!a) {
    throw new RdfError('Article not found');
  }

  addRdfHeaderNodes(graph, 'Article Content RDF Endpoint');

  graph.addOut(stencila(a.type), (articleNode) => {
    articleNode.addOut(stencila.title, stringify(a.title));
    articleNode.addOut(stencila.content, stringify(a.content));
    articleNode.addOut(stencila.description, stringify(a.description));
  });
};

export default ArticleBodyHandler;
