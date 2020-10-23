import { AnyPointer } from 'clownface';
import { BlankNode, NamedNode } from 'rdf-js';
import {
  Article, ArticleAffiliations, ArticleContents,
  ArticleDate, ImageObjectContent,
} from './article';
import { CONTENT_FIGURE, CONTENT_IMAGEOBJECT } from './article-content';
import config from '../../config';
import { rdf, schema, stencila } from '../../rdf/namespaces';
import { literal } from '../../server/data-factory';

export const addRdfContentBlock = (
  node: AnyPointer<NamedNode<string> | BlankNode, any>,
  content?: ArticleContents | string,
  article?: Article,
  cellType?: string,
): void => {
  /* eslint-disable @typescript-eslint/no-use-before-define */
  if (!content) {
    return;
  }

  if (typeof content === 'string') {
    node.addOut(stencila(cellType ?? 'text'), content);

    return;
  }

  switch (content.type) {
    case CONTENT_FIGURE:
      addRdfArticleContent(node, content, article);
      break;
    case CONTENT_IMAGEOBJECT:
      addRdfArticleImageObjectContent(node, <ImageObjectContent>content);
      break;
    // case CONTENT_TABLE:
    //   addRdfArticleContent(node, content, article);
    //   break;
    default:
      node.addOut(stencila(content.type), (newNode) => {
        addRdfContentArray(newNode, content, article);
      });
      break;
  }
};

export const addRdfContentArray = (
  node: AnyPointer<NamedNode<string> | BlankNode, any>,
  content?: ArticleContents,
  article?: Article,
): void => {
  if (content && content.content) {
    content.content.forEach((c) => {
      if (typeof c === 'string') {
        return addRdfContentBlock(node, c, article);
      }

      return addRdfContentBlock(node, c, article, c.type);
    });
  }
};

export const addRdfArticleContent = (
  node: AnyPointer<NamedNode<string> | BlankNode, any>,
  content?: ArticleContents,
  article?: Article,
): void => {
  if (!content) {
    return;
  }

  if (content.id) {
    node.addOut(stencila.id, content.id);
  }

  if (content.caption && content.caption.length) {
    // console.log(content.caption);
    node.addOut(stencila.caption, (localNode) => {
      if (content.caption) {
        // @todo: check final type..
        content.caption.forEach((c) => addRdfContentBlock(localNode, c, article));
      }
    });
  }

  if (content.depth) {
    node.addOut(stencila.depth, content.depth);
  }

  if (content.label) {
    node.addOut(stencila.label, content.label);
  }

  if (content.relation) {
    node.addOut(stencila.relation, content.relation);
  }

  if (content.target) {
    node.addOut(stencila.target, content.target);
  }

  addRdfContentArray(node, content, article);
};

export const addRdfArticleImageObjectContent = (
  node: AnyPointer<NamedNode<string> | BlankNode, any>,
  content: ImageObjectContent,
): void => {
  node.addOut(stencila.ImageObject, (list) => {
    if (content.contentUrl) {
      list.addOut(stencila.contentUrl, content.contentUrl);
    }

    if (content.format) {
      list.addOut(stencila.format, content.format);
    }

    if (content.meta) {
      list.addOut(stencila.meta, (l) => {
        l.addOut(stencila.inline, content.meta.inline);
      });
    }
  });
};

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
