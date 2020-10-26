import { AnyPointer } from 'clownface';
import { NamedNode } from 'rdf-js';
import { Article } from '../../components/article/article';
import { CONTENT_PERIODICAL } from '../../components/article/article-content';
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

  const article = <Article>(
    await db.collection(config.db.collections.ARTICLES)
      .findOne({ _id: articleDoi(publisherId, id) })
  );

  if (!article) {
    throw new RdfError('Article not found');
  }

  addRdfHeaderNodes(graph, 'Article Metadata RDF Endpoint');

  graph.addOut(stencila.title, stringify(article.title));

  addRdfAboutContext(graph, article.about);
  addRdfAuthorsContext(graph, article.authors);

  if (article.isPartOf.type === CONTENT_PERIODICAL) {
    graph.addOut(stencila.isPartOf, (isPartOfNode) => {
      isPartOfNode.addOut(stencila.type, article.isPartOf.type);

      if (article.isPartOf.identifiers && article.isPartOf.identifiers.length) {
        for (const identifier of article.isPartOf.identifiers) {
          isPartOfNode.addOut(stencila.identifiers, (identifierNode) => {
            identifierNode.addOut(stencila.type, identifier.type);
            identifierNode.addOut(stencila('name'), identifier.name);
            identifierNode.addOut(stencila.propertyID, identifier.propertyID);
            identifierNode.addOut(stencila.value, identifier.value);
          });
        }
      }

      if (article.isPartOf.issns && article.isPartOf.issns.length) {
        for (const issn of article.isPartOf.issns) {
          isPartOfNode.addOut(stencila.issns, (issnNode) => {
            issnNode.addOut(stencila.value, issn);
          });
        }
      }

      if (article.isPartOf.publisher) {
        isPartOfNode.addOut(stencila.publisher, (publisherNode) => {
          if (article.isPartOf.publisher) {
            publisherNode.addOut(stencila.type, article.isPartOf.publisher.type);
            publisherNode.addOut(stencila('name'), article.isPartOf.publisher.name);
          }
        });
      }

      if (article.isPartOf.title) {
        isPartOfNode.addOut(stencila.title, article.isPartOf.title);
      }
    });
  }

  addDateNode(graph, stencila.datePublished, article.datePublished);
  addDateNode(graph, stencila.dateAccepted, article.dateAccepted);
  addDateNode(graph, stencila.dateReceived, article.dateReceived);
};

export default articleMetadataHandler;
