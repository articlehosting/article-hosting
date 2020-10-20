import { AnyPointer } from 'clownface';
import { NamedNode } from 'rdf-js';
import config from '../../config';
import { AppContext } from '../../server/context';
import getDb from '../../server/db';
import RdfError from '../../server/rdf-error';
import { articleDoi, escapeHtml } from '../../utils';
import { ah, rdf, schema } from '../namespaces';

export interface ArticleFilesParams {
  publisherId?: string,
  id?: string,
}

export const articleFilesHandler = async (
  graph: AnyPointer<NamedNode, any>,
  ctx: AppContext,
  params: ArticleFilesParams,
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
  graph.addOut(schema('name'), ctx.dataFactory.literal('Article Files RDF Endpoint: List article files', config.rdf.Language));

  graph.addOut(schema(article.type), (articleNode) => {
    articleNode.addOut(schema('title'), escapeHtml(article.title));

    for (const file of article.files) {
      articleNode.addOut(schema('file'), (fileNode) => {
        fileNode.addOut(rdf.type, schema(file.type))
          .addOut(schema('name'), file.name)
          .addOut(ah.fileExtension, file.extension)
          .addOut(schema('contentUrl'), file.contentUrl);
      });
    }
  });
};

export default articleFilesHandler;
