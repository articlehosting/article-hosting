import { AnyPointer } from 'clownface';
import { NamedNode } from 'rdf-js';
import {
  addDateNode,
  addRdfAboutContext,
  addRdfArticleArrayItems,
  addRdfAuthorsContext,
  addRdfHeaderNodes,
} from '../../components/article/article-rdf';
import config from '../../config';
import { AppContext } from '../../server/context';
import getDb from '../../server/db';
import RdfError from '../../server/rdf-error';
import { articleDoi, stringify } from '../../utils';
import { schema, stencila } from '../namespaces';

export interface ArticleBackMatterParams {
  publisherId?: string,
  id?: string,
}

export const articleBackMatterHandler = async (
  graph: AnyPointer<NamedNode, any>,
  ctx: AppContext,
  params: ArticleBackMatterParams,
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

  addRdfHeaderNodes(graph, 'Article Back Matter RDF Endpoint');

  graph.addOut(schema(article.type), (articleNode) => {
    articleNode.addOut(schema.headline, stringify(article.title));

    addRdfAboutContext(articleNode, article);

    addRdfAuthorsContext(articleNode, article);

    addDateNode(articleNode, stencila.datePublished, article.datePublished);
    addDateNode(articleNode, stencila.dateAccepted, article.dateAccepted);
    addDateNode(articleNode, stencila.dateReceived, article.dateReceived);

    for (const identifier of article.identifiers) {
      articleNode.addOut(stencila.identifiers, (identifierNode) => {
        identifierNode.addOut(stencila.type, identifier.type)
          .addOut(stencila('name'), identifier.name)
          .addOut(stencila.propertyID, identifier.propertyID)
          .addOut(stencila.value, identifier.value);
      });
    }

    addRdfArticleArrayItems(articleNode, stencila.keywords, article.keywords);

    for (const license of article.licenses) {
      articleNode.addOut(stencila.licenses, (licenseNode) => {
        licenseNode.addOut(stencila.type, license.type)
          .addOut(stencila.url, license.url);
        // todo parse license content
      });
    }

    for (const reference of article.references) {
      articleNode.addOut(stencila.references, (referenceNode) => {
        referenceNode.addOut(stencila.type, reference.type)
          .addOut(stencila.id, reference.id)
          .addOut(stencila.isPartOf, (isPartOfNode) => {
            isPartOfNode
              .addOut(stencila.type, article.isPartOf.type)
              .addOut(stencila.volumeNumber, article.isPartOf.volumeNumber);
            // todo check nested isPartOf rendering
            if (article.isPartOf.isPartOf) {
              isPartOfNode.addOut(stencila.isPartOf, (isPartOfIsPartOfNode) => {
                isPartOfIsPartOfNode.addOut(stencila.type, article.isPartOf.isPartOf.type);
                isPartOfIsPartOfNode.addOut(stencila('name'), article.isPartOf.isPartOf.name);
              });
            }
          });
        if (reference.pageStart) {
          referenceNode.addOut(stencila.pageStart, reference.pageStart);
        }
        if (reference.pageEnd) {
          referenceNode.addOut(stencila.pageEnd, reference.pageEnd);
        }
        if (reference.title) {
          referenceNode.addOut(stencila.title, reference.title);
        }
        addRdfAuthorsContext(articleNode, article);
        addDateNode(referenceNode, stencila.datePublished, reference.datePublished);
      });
    }
  });
};

export default articleBackMatterHandler;
