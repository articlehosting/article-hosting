import { AnyPointer } from 'clownface';
import { BlankNode, NamedNode } from 'rdf-js';
import {
  Article, ArticleAbout,
  ArticleAffiliations, ArticleAuthor,
  ArticleContents,
  ArticleDate,
  ArticleMeta,
  ImageObjectContent,
  Person,
  TableCellContent,
  TableContent,
  TableDescription,
  TableRowContent,
} from './article';
import {
  CONTENT_CITE,
  CONTENT_FIGURE,
  CONTENT_HEADING,
  CONTENT_IMAGEOBJECT,
  CONTENT_LINK,
  CONTENT_TABLE,
  CONTENT_TABLECELL,
  CONTENT_TABLEROW,
} from './article-content';
import config from '../../config';
import {
  hydra, rdf, schema, stencila,
} from '../../rdf/namespaces';
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
    case CONTENT_HEADING:
    case CONTENT_LINK:
    case CONTENT_FIGURE:
    case CONTENT_CITE:
      addRdfArticleContent(node, content, article);
      break;
    case CONTENT_TABLE:
      addRdfArticleTableContent(node, <TableContent>content, article);
      break;
    case CONTENT_TABLEROW:
      addRdfArticleTableRowContent(node, <TableRowContent>content, article);
      break;
    case CONTENT_TABLECELL:
      addRdfArticleTableCellContent(node, <TableCellContent>content, article);
      break;
    case CONTENT_IMAGEOBJECT:
      addRdfArticleImageObjectContent(node, <ImageObjectContent>content);
      break;
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

export const addRdfArticleElement = (
  node: AnyPointer<NamedNode<string> | BlankNode, any>,
  nodeName: NamedNode<string>,
  item?: any,
): void => {
  if (item) {
    node.addOut(nodeName, item);
  }
};

export const addRdfArticleArrayElement = (
  node: AnyPointer<NamedNode<string> | BlankNode, any>,
  nodeName: NamedNode<string>,
  arrayElement?: Array<any>,
  article?: Article,
): void => {
  if (arrayElement && arrayElement.length) {
    node.addOut(nodeName, (localNode) => {
      arrayElement.forEach((c) => addRdfContentBlock(localNode, c, article));
    });
  }
};

export const addRdfArticleList = (
  node: AnyPointer<NamedNode<string> | BlankNode, any>,
  nodeName: NamedNode<string>,
  list?: Array<any>,
): void => {
  if (list && list.length) {
    for (const item of list) {
      addRdfArticleElement(node, nodeName, item);
    }
  }
};

export const addRdfArticleMeta = (
  node: AnyPointer<NamedNode<string> | BlankNode, any>,
  meta?: ArticleMeta,
  article?: Article,
): void => {
  if (meta) {
    node.addOut(stencila.meta, (metaNode) => {
      if (meta.footnoteType) {
        metaNode.addOut(schema('footnoteType'), meta.footnoteType);
      }

      if (meta.authorNotes) {
        addRdfArticleArrayElement(metaNode, schema('authorNotes'), meta.authorNotes, article);
      }
    });
  }
};

export const addRdfArticleDescription = (
  node: AnyPointer<BlankNode, any>,
  description?: Array<ArticleContents | TableDescription> | string,
  article?: Article,
): void => {
  if (typeof description === 'string') {
    addRdfArticleElement(node, stencila.description, description);
    return;
  }

  addRdfArticleArrayElement(node, stencila.description, description, article);
};

export const addRdfArticleContent = (
  node: AnyPointer<NamedNode<string> | BlankNode, any>,
  content?: ArticleContents,
  article?: Article,
): void => {
  if (!content) {
    return;
  }

  addRdfArticleArrayElement(node, stencila.caption, content.caption, article);
  addRdfArticleElement(node, stencila.id, content.id);
  addRdfArticleElement(node, stencila.depth, content.depth);
  addRdfArticleElement(node, stencila.label, content.label);
  addRdfArticleElement(node, stencila.relation, content.relation);
  addRdfArticleElement(node, stencila.target, content.target);
  addRdfContentArray(node, content, article);
};

export const addRdfArticleImageObjectContent = (
  node: AnyPointer<NamedNode<string> | BlankNode, any>,
  content: ImageObjectContent,
): void => {
  node.addOut(stencila.ImageObject, (imageObjectNode) => {
    addRdfArticleElement(imageObjectNode, stencila.contentUrl, content.contentUrl);
    addRdfArticleElement(imageObjectNode, stencila.format, content.format);

    if (content.meta) {
      imageObjectNode.addOut(stencila.meta, (l) => {
        l.addOut(stencila.inline, content.meta.inline);
      });
    }
  });
};

export const addRdfArticleTableContent = (
  node: AnyPointer<NamedNode<string> | BlankNode, any>,
  content: TableContent,
  article?: Article,
): void => {
  node.addOut(stencila.Table, (tableNode) => {
    addRdfArticleElement(tableNode, stencila.id, content.id);
    addRdfArticleElement(tableNode, stencila.label, content.label);
    addRdfArticleArrayElement(tableNode, stencila.caption, content.caption, article);
    addRdfArticleArrayElement(tableNode, stencila.rows, content.rows, article);
    addRdfArticleDescription(tableNode, content.description, article);
  });
};

export const addRdfArticleTableRowContent = (
  node: AnyPointer<NamedNode<string> | BlankNode, any>,
  content: TableRowContent,
  article?: Article,
): void => {
  node.addOut(stencila.TableRow, (tableRowNode) => {
    addRdfArticleElement(tableRowNode, stencila.rowType, content.rowType);
    addRdfArticleArrayElement(tableRowNode, stencila.cells, content.cells, article);
  });
};

export const addRdfArticleTableCellContent = (
  node: AnyPointer<NamedNode<string> | BlankNode, any>,
  content: TableCellContent,
  article?: Article,
): void => {
  node.addOut(stencila.TableCell, (tableCellNode) => {
    addRdfArticleElement(tableCellNode, stencila.colspan, content.colspan);
    addRdfArticleElement(tableCellNode, stencila.rowspan, content.rowspan);
    addRdfArticleArrayElement(tableCellNode, stencila.content, content.content, article);
  });
};

export const addRdfAboutContext = (
  articleNode: AnyPointer<NamedNode<string> | BlankNode, any>,
  articleAbout: Array<ArticleAbout>,
): void => {
  for (const about of articleAbout) {
    articleNode.addOut(stencila.about, (aboutNode) => {
      aboutNode.addOut(stencila.type, about.type);
      aboutNode.addOut(stencila('name'), about.name);
    });
  }
};

export const addDateNode = (
  node: AnyPointer<NamedNode<string> | BlankNode, any>,
  nodeName: NamedNode<string>,
  data?: ArticleDate | string,
): void => {
  if (data) {
    if (typeof data === 'string') {
      node.addOut(nodeName, data);
    } else {
      node.addOut(nodeName, (dateNode) => {
        dateNode.addOut(stencila.type, data.type);
        dateNode.addOut(stencila.value, data.value);
      });
    }
  }
};

export const addRdfAuthorsContext = (
  articleNode: AnyPointer<NamedNode<string> | BlankNode, any>,
  authors: Array<ArticleAuthor | Person>,
): void => {
  for (const author of authors) {
    articleNode.addOut(stencila.authors, (authorNode) => {
      authorNode.addOut(stencila.type, author.type);

      addRdfArticleList(authorNode, stencila.familyNames, author.familyNames);
      addRdfArticleList(authorNode, stencila.givenNames, author.givenNames);

      if ((<ArticleAuthor>author).affiliations) {
        (<ArticleAuthor>author).affiliations.forEach((affiliation: ArticleAffiliations) => {
          authorNode.addOut(stencila.affiliations, (affiliationNode) => {
            affiliationNode.addOut(stencila.type, affiliation.type);
            affiliationNode.addOut(stencila('name'), affiliation.name);

            if (affiliation.address) {
              affiliationNode.addOut(stencila.address, (addressNode) => {
                addressNode.addOut(stencila.type, affiliation.address.type);
                addressNode.addOut(stencila.addressCountry, affiliation.address.addressCountry);

                if (affiliation.address.addressLocality) {
                  addressNode.addOut(stencila.addressLocality, affiliation.address.addressLocality);
                }
              });
            }
          });
        });
      }

      if ((<ArticleAuthor>author).emails) {
        addRdfArticleList(authorNode, stencila.emails, (<ArticleAuthor>author).emails);
      }
    });
  }
};

export const addRdfHeaderNodes = (graph: AnyPointer<NamedNode<string>, any>, name: string, title: string): void => {
  graph.addOut(rdf.type, schema(title));
  graph.addOut(
    schema('name'),
    literal(name, config.rdf.language),
  );
};

export const addPropertyStencila = (graph: AnyPointer<NamedNode<string>, any>, title: string, val?: string): void => {
  graph.addOut(hydra.supportedProperty, (nodeProperty): void => {
    nodeProperty.addOut(rdf.type, hydra.SupportedProperty);
    nodeProperty.addOut(hydra.title, literal(title, config.rdf.language));
    nodeProperty.addOut(hydra.property, stencila(val ?? title), (property): void => {
      property.addOut(rdf.type, rdf.Property);
    });
    nodeProperty.addOut(hydra.required, true);
    nodeProperty.addOut(hydra.readable, true);
    nodeProperty.addOut(hydra.writeable, false);
  });
};
