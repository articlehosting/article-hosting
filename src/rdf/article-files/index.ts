import { AnyPointer } from 'clownface';
import { NamedNode } from 'rdf-js';
import { addRdfHeaderNodes } from '../../components/article/article-rdf';
import config from '../../config';
import routes from '../../config/routes';
import { AppContext } from '../../server/context';
import { createNamedNode } from '../../server/data-factory';
import getDb from '../../server/db';
import RdfError from '../../server/rdf-error';
import { articleDoi, stringify } from '../../utils';
import { hydra, rdf, schema } from '../namespaces';

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

  addRdfHeaderNodes(graph, 'Article Files RDF Endpoint: List article files', 'ArticleFiles');

  graph.addOut(schema(article.type), (articleNode) => {
    articleNode.addOut(schema('headline'), stringify(article.title));

    for (const file of article.files) {
      articleNode.addOut(schema('file'), (fileNode) => {
        fileNode.addOut(rdf.type, schema(file.type))
          .addOut(schema('name'), file.name)
          .addOut(schema('fileExtension'), file.extension)
          .addOut(schema('contentUrl'), file.contentUrl)
          .addOut(hydra.Link,
            createNamedNode(
              ctx.router, ctx.request, routes.api.DownloadFile,
              { publisherId, id, file: file.contentUrl },
            ),
            (articlePageNode) => {
              articlePageNode.addOut(hydra.title, file.name);
            });
      });
    }
  });
};

export default articleFilesHandler;
