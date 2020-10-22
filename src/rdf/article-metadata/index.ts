import { AnyPointer } from 'clownface';
import { NamedNode } from 'rdf-js';
import { ArticleAffiliations } from '../../components/article/article';
import config from '../../config';
import { AppContext } from '../../server/context';
import getDb from '../../server/db';
import RdfError from '../../server/rdf-error';
import { articleDoi, stringify } from '../../utils';
import { rdf, schema } from '../namespaces';

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

  graph.addOut(rdf.type, schema.WebApi);
  graph.addOut(schema('name'), ctx.dataFactory.literal('Article Detail RDF Endpoint: List article', config.rdf.Language));

  graph.addOut(schema(article.type), (articleNode) => {
    articleNode.addOut(schema('headline'), stringify(article.title));

    for (const about of article.about) {
      articleNode.addOut(schema('about'), (aboutNode) => {
        aboutNode
          .addOut(rdf.type, schema(about.type))
          .addOut(schema('name'), about.name);
      });
    }
    if (article.isPartOf.type === 'Periodical') {
      articleNode.addOut(schema('isPartOf'), (isPartOfNode) => {
        isPartOfNode.addOut(rdf.type, schema(article.isPartOf.type));

        for (const identifier of article.isPartOf.identifiers) {
          isPartOfNode.addOut(schema('identifiers'), (identifierNode) => {
            identifierNode
              .addOut(rdf.type, schema(identifier.type))
              .addOut(schema('name'), identifier.name)
              .addOut(schema('propertyID'), identifier.propertyID)
              .addOut(schema('value'), identifier.value);
          });
        }
        for (const issn of article.isPartOf.issns) {
          isPartOfNode.addOut(schema('issn'), (issnNode) => {
            issnNode.addOut(schema('value'), issn);
          });
        }

        isPartOfNode.addOut(schema('publisher'), (publisherNode) => {
          publisherNode
            .addOut(rdf.type, schema(article.isPartOf.publisher.type))
            .addOut(schema('name'), article.isPartOf.publisher.name);
        });
        isPartOfNode.addOut(schema('title'), article.isPartOf.title);
      });
    }

    for (const author of article.authors) {
      articleNode.addOut(schema('author'), (authorNode) => {
        authorNode.addOut(rdf.type, author.type);

        author.emails?.forEach((email: Array<string>) => authorNode.addOut(schema('email'), email));

        author.familyNames?.forEach((familyName: Array<string>) => authorNode.addOut(schema('familyName'), familyName));

        author.affiliations.forEach((affiliation: ArticleAffiliations) => {
          authorNode.addOut(schema('affiliation'), (affiliationNode) => {
            affiliationNode
              .addOut(rdf.type, affiliation.type)
              .addOut(schema('name'), affiliation.name);

            if (affiliation.address) {
              affiliationNode.addOut(schema('address'), (addressNode) => {
                addressNode
                  .addOut(rdf.type, affiliation.address.type)
                  .addOut(schema('addressCountry'), affiliation.address.addressCountry);
                if (affiliation.address.addressLocality) {
                  addressNode.addOut(schema('addressLocality'), affiliation.address.addressLocality);
                }
              });
            }
          });
        });
      });
    }

    const addDateNode = (field: string): void => {
      articleNode.addOut(schema[field], (datePublishedNode) => {
        datePublishedNode.addOut(rdf.type, article[field].type)
          .addOut(rdf.value, article[field].value);
      });
    };

    addDateNode('datePublished');
    if (article.dateAccepted) {
      addDateNode('dateAccepted');
    }
    if (article.dateReceived) {
      addDateNode('dateReceived');
    }
  });
};

export default articleMetadataHandler;
