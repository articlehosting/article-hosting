import { AnyPointer } from 'clownface';
import { NamedNode } from 'rdf-js';
import config from '../../config';
import { AppContext } from '../../server/context';
import getDb from '../../server/db';
import RdfError from '../../server/rdf-error';
import { articleDoi } from '../../utils';
import { rdf, schema } from '../namespaces';

export interface ArticleDetailsParams {
  publisherId?: string,
  id?: string,
}

export const articleDetailsHandler = async (
  graph: AnyPointer<NamedNode, any>,
  ctx: AppContext,
  params: ArticleDetailsParams,
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

  const article = await db.collection(config.db.collections.ARTICLES).findOne({ _id: articleDoi(publisherId, id) });

  if (!article) {
    throw new RdfError('Article not found');
  }

  graph.addOut(rdf.type, schema.WebApi);
  graph.addOut(schema('name'), ctx.dataFactory.literal('Article Detail RDF Endpoint', config.rdf.Language));
};

export default articleDetailsHandler;
