import { AnyPointer } from 'clownface';
import { NamedNode } from 'rdf-js';
import { Article } from '../../components/article/article';
import config from '../../config';
import { AppContext } from '../../server/context';
import getDb from '../../server/db';
import { ah, rdf, schema } from '../namespaces';

const { ARTICLES } = config.db.collections;

export const articlesHandler = async (graph: AnyPointer<NamedNode, any>, ctx: AppContext): Promise<void> => {
  graph.addOut(rdf.type, schema.WebAPI);
  graph.addOut(schema('name'), ctx.dataFactory.literal('Article Hosting RDF Graph: List Articles', config.rdf.Language));

  const db = await getDb();
  const articles: Array<Article> = await db.collection(ARTICLES).find({}).toArray();

  for (const article of articles) {
    graph.addOut(schema(article.type), (articleNode) => {
      articleNode.addOut(schema('title'), article.title);

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

          author.emails?.forEach((email) => authorNode.addOut(schema('email'), email));

          author.familyNames?.forEach((familyName) => authorNode.addOut(schema('familyName'), familyName));

          author.affiliations.forEach((affiliation) => {
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

      articleNode.addOut(schema.datePublished, (datePublishedNode) => {
        datePublishedNode.addOut(rdf.type, article.datePublished.type)
          .addOut(rdf.value, article.datePublished.value);
      });

      // todo use fn below when parsing content
      // const isArticleContent = (object: any): object is ArticleContents => 'content' in object;
      const isString = (object: any): object is string => typeof object === 'string';

      for (const file of article.files) {
        articleNode.addOut(schema('file'), (fileNode) => {
          fileNode.addOut(rdf.type, schema(file.type))
            .addOut(schema('name'), file.name)
            .addOut(ah.fileExtension, file.extension)
            .addOut(schema('contentUrl'), file.contentUrl);
        });
      }

      for (const identifier of article.identifiers) {
        articleNode.addOut(schema('identifier'), (identifierNode) => {
          identifierNode.addOut(rdf.type, identifier.type)
            .addOut(schema('name'), identifier.name);
        });
      }

      for (const keyword of article.keywords) {
        articleNode.addOut(schema('keywords'), keyword);
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
          if (isString(reference.datePublished)) {
            referenceNode.addOut(schema('datePublished'), reference.datePublished);
          }
        });
      }
    });
  }
};

export default articlesHandler;

// todo use this as starting point for parsing content
//   let curr = 0;
//   while (article.description[curr] && isArticleContent(article.description[curr])) {
//     console.log(article.description[curr]);
//     curr += 1;
//     articleNode.addOut(schema('articleSection'), )
//   }
// });
