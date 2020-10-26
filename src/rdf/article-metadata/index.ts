import { AnyPointer } from 'clownface';
import { NamedNode } from 'rdf-js';
import {
  addDateNode,
  addRdfAboutContext,
  addRdfAuthorsContext,
  addRdfHeaderNodes,
} from '../../components/article/article-rdf';
import config from '../../config';
import { AppContext } from '../../server/context';
import getDb from '../../server/db';
import RdfError from '../../server/rdf-error';
import { articleDoi, stringify } from '../../utils';
import { stencila } from '../namespaces';

export interface ArticleMetadataParams{
  publisherId?: string,
  id?: string,
}

export const articleMetadataHandler = async (
  graph: AnyPointer<NamedNode, any>,
  ctx: AppContext,
  params: ArticleMetadataParams,
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

  addRdfHeaderNodes(graph, 'Article Metadata RDF Endpoint');

  graph.addOut(stencila(article.type), (articleNode) => {
    articleNode.addOut(stencila.title, stringify(article.title));

    addRdfAboutContext(articleNode, article);

    addRdfAuthorsContext(articleNode, article);

    if (article.isPartOf.type === 'Periodical') {
      articleNode.addOut(stencila.isPartOf, (isPartOfNode) => {
        isPartOfNode.addOut(stencila.type, article.isPartOf.type);

        for (const identifier of article.isPartOf.identifiers) {
          isPartOfNode.addOut(stencila.identifiers, (identifierNode) => {
            identifierNode
              .addOut(stencila.type, identifier.type)
              .addOut(stencila('name'), identifier.name)
              .addOut(stencila.propertyID, identifier.propertyID)
              .addOut(stencila.value, identifier.value);
          });
        }
        for (const issn of article.isPartOf.issns) {
          isPartOfNode.addOut(stencila.issns, (issnNode) => {
            issnNode.addOut(stencila.value, issn);
          });
        }

        isPartOfNode.addOut(stencila.publisher, (publisherNode) => {
          publisherNode
            .addOut(stencila.type, article.isPartOf.publisher.type)
            .addOut(stencila('name'), article.isPartOf.publisher.name);
        });
        isPartOfNode.addOut(stencila.title, article.isPartOf.title);
      });
    }

    addDateNode(articleNode, stencila.datePublished, article.datePublished);
    addDateNode(articleNode, stencila.dateAccepted, article.dateAccepted);
    addDateNode(articleNode, stencila.dateReceived, article.dateReceived);
  });
};

export default articleMetadataHandler;
