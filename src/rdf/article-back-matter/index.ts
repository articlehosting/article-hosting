import { AnyPointer } from 'clownface';
import { NamedNode } from 'rdf-js';
import {
  addDateNode,
  addRdfAboutContext,
  addRdfAuthorsContext,
} from '../../components/article/article-rdf';
import config from '../../config';
import { AppContext } from '../../server/context';
import getDb from '../../server/db';
import RdfError from '../../server/rdf-error';
import { articleDoi, stringify } from '../../utils';
import { rdf, schema } from '../namespaces';

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

  graph.addOut(rdf.type, schema.WebApi);
  graph.addOut(
    schema('name'),
    ctx.dataFactory.literal('Article Detail RDF Endpoint: List article', config.rdf.Language),
  );

  graph.addOut(schema(article.type), (articleNode) => {
    articleNode.addOut(schema.headline, stringify(article.title));

    addRdfAboutContext(articleNode, article);

    addRdfAuthorsContext(articleNode, article);

    addDateNode(articleNode, 'datePublished', article.datePublished);
    addDateNode(articleNode, 'dateAccepted', article.dateAccepted);
    addDateNode(articleNode, 'dateReceived', article.dateReceived);

    for (const file of article.files) {
      articleNode.addOut(schema('file'), (fileNode) => {
        fileNode.addOut(rdf.type, schema(file.type))
          .addOut(schema('name'), file.name)
          .addOut(schema('fileExtension'), file.extension)
          .addOut(schema('contentUrl'), file.contentUrl);
      });
    }

    for (const identifier of article.identifiers) {
      articleNode.addOut(schema('identifier'), (identifierNode) => {
        identifierNode.addOut(rdf.type, identifier.type)
          .addOut(schema('name'), identifier.name);
      });
    }

    if (article.keywords) {
      for (const keyword of article.keywords) {
        articleNode.addOut(schema('keywords'), keyword);
      }
    }

    for (const license of article.licenses) {
      articleNode.addOut(schema('license'), (licenseNode) => {
        licenseNode.addOut(rdf.type, schema(license.type))
          .addOut(schema('url'), license.url);
        // todo parse license content
      });
    }

    for (const reference of article.references) {
      articleNode.addOut(schema('citation'), (referenceNode) => {
        referenceNode.addOut(rdf.type, schema(reference.type))
          .addOut(rdf.id, reference.id);
        if (typeof reference.dataPublished === 'string') {
          referenceNode.addOut(schema('datePublished'), reference.datePublished);
        }
      });
    }
  });
};

export default articleBackMatterHandler;
