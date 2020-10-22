import { AnyPointer } from 'clownface';
import { NamedNode } from 'rdf-js';
import { ArticleAffiliations } from '../../components/article/article';
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
