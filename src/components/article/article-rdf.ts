// import { ArticleContents, ImageObjectContent, TableContent } from './article';
// import {
//   CONTENT_CITE, CONTENT_EMPHASIS, CONTENT_FIGURE,
//   CONTENT_HEADING, CONTENT_IMAGEOBJECT, CONTENT_LINK,
//   CONTENT_PARAGRAPH,
//   CONTENT_STRONG, CONTENT_SUPERSCRIPT, CONTENT_TABLE,
// } from './article-content';
//
// const renderRdfContentBlock = (content?: ArticleContents | string, context?: Context): string => {
//   /* eslint-disable @typescript-eslint/no-use-before-define */
//   if (!content) {
//     return '';
//   }
//   if (typeof content === 'string') {
//     return content;
//   }
//
//   switch (content.type) {
//     case CONTENT_HEADING:
//       return renderHeader(content, context);
//     case CONTENT_PARAGRAPH:
//       return renderParagraph(content, context);
//     case CONTENT_STRONG:
//       return renderStrong(content, context);
//     case CONTENT_CITE:
//       return renderCite(content, context);
//     case CONTENT_LINK:
//       return renderLink(content, context);
//     case CONTENT_SUPERSCRIPT:
//       return renderSuperscript(content, context);
//     case CONTENT_EMPHASIS:
//       return renderEmphasis(content, context);
//     case CONTENT_TABLE:
//       return renderTable(<TableContent>content, context);
//     case CONTENT_FIGURE:
//       return renderFigure(content, context);
//     case CONTENT_IMAGEOBJECT:
//       return renderImageObject(<ImageObjectContent>content, context);
//     default:
//       return '';
//   }
// };

import { AnyPointer } from 'clownface';
import { BlankNode, NamedNode } from 'rdf-js';
import {
  Article, ArticleAffiliations, ArticleDate,
} from './article';
import config from '../../config';
import { rdf, schema, stencila } from '../../rdf/namespaces';
import { literal } from '../../server/data-factory';

export const addRdfAboutContext = (articleNode: AnyPointer<BlankNode, any>, article: Article): void => {
  for (const about of article.about) {
    articleNode.addOut(stencila.about, (aboutNode) => {
      aboutNode
        .addOut(stencila.type, about.type)
        .addOut(stencila('name'), about.name);
    });
  }
};

export const addRdfArticleCollections = (
  node: AnyPointer<BlankNode, any>,
  nodeName: string,
  collection?: Array<any>,
): void => {
  if (collection) {
    for (const item of collection) {
      node.addOut(stencila(nodeName), item);
    }
  }
};

export const addDateNode = (
  node: AnyPointer<BlankNode, any>,
  nodeName: string,
  data?: ArticleDate,
): void => {
  if (data) {
    if (typeof data === 'string') {
      node.addOut(stencila[nodeName], data);
    } else {
      node.addOut(stencila[nodeName], (dateNode) => {
        dateNode
          .addOut(stencila.type, data.type)
          .addOut(stencila.value, data.value);
      });
    }
  }
};

export const addRdfAuthorsContext = (articleNode: AnyPointer<BlankNode, any>, article: Article): void => {
  for (const author of article.authors) {
    articleNode.addOut(stencila.authors, (authorNode) => {
      authorNode.addOut(stencila.type, author.type);

      addRdfArticleCollections(authorNode, 'familyNames', author.familyNames);
      addRdfArticleCollections(authorNode, 'givenNames', author.givenNames);
      if (author.affiliations) {
        author.affiliations.forEach((affiliation: ArticleAffiliations) => {
          authorNode.addOut(stencila.affiliations, (affiliationNode) => {
            affiliationNode
              .addOut(stencila.type, affiliation.type)
              .addOut(stencila('name'), affiliation.name);

            if (affiliation.address) {
              affiliationNode.addOut(stencila.address, (addressNode) => {
                addressNode
                  .addOut(stencila.type, affiliation.address.type)
                  .addOut(stencila.addressCountry, affiliation.address.addressCountry);
                if (affiliation.address.addressLocality) {
                  addressNode.addOut(stencila.addressLocality, affiliation.address.addressLocality);
                }
              });
            }
          });
        });
      }
      if (author.emails) {
        addRdfArticleCollections(authorNode, 'emails', author.emails);
      }
    });
  }
};

export const addRdfHeaderNodes = (graph: AnyPointer<NamedNode<string>, any>, name: string): void => {
  graph.addOut(rdf.type, schema.WebApi);
  graph.addOut(
    schema('name'),
    literal(name, config.rdf.Language),
  );
};
