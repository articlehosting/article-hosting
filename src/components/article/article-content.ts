import path from 'path';
import {
  Article,
  ArticleContents,
  ImageObjectContent,
  TableCellContent,
  TableContent, TableDescription,
  TableRowContent,
} from './article';
import { getArticleIdentifier, renderImageUrl } from '../../utils';

export interface Context {
  article: Article,
}

export const CONTENT_HEADING = 'Heading';
export const CONTENT_PARAGRAPH = 'Paragraph';
export const CONTENT_STRONG = 'Strong';
export const CONTENT_CITE = 'Cite';
export const CONTENT_LINK = 'Link';
export const CONTENT_SUPERSCRIPT = 'Superscript';
export const CONTENT_EMPHASIS = 'Emphasis';
export const CONTENT_TABLE = 'Table';
export const CONTENT_TABLEROW = 'TableRow';
export const CONTENT_TABLECELL = 'TableCell';
export const CONTENT_FIGURE = 'Figure';
export const CONTENT_IMAGEOBJECT = 'ImageObject';
export const CONTENT_IDENTIFIER_PUBLISHERID = 'publisher-id';
export const CONTENT_IDENTIFIER_DOI = 'doi';

export const renderContentBlock = (content?: ArticleContents | string, context?: Context): string => {
  /* eslint-disable @typescript-eslint/no-use-before-define */
  if (!content) {
    return '';
  }
  if (typeof content === 'string') {
    return content;
  }

  switch (content.type) {
    case CONTENT_HEADING:
      return renderHeader(content, context);
    case CONTENT_PARAGRAPH:
      return renderParagraph(content, context);
    case CONTENT_STRONG:
      return renderStrong(content, context);
    case CONTENT_CITE:
      return renderCite(content, context);
    case CONTENT_LINK:
      return renderLink(content, context);
    case CONTENT_SUPERSCRIPT:
      return renderSuperscript(content, context);
    case CONTENT_EMPHASIS:
      return renderEmphasis(content, context);
    case CONTENT_TABLE:
      return renderTable(<TableContent>content, context);
    case CONTENT_FIGURE:
      return renderFigure(content, context);
    case CONTENT_IMAGEOBJECT:
      return renderImageObject(<ImageObjectContent>content, context);
    default:
      return '';
  }
};

export const renderContentArray = (content?: ArticleContents, context?: Context): string =>
  `${content?.content?.map((c) => renderContentBlock(c, context)).join('') ?? ''}`;

export const renderTableRow = (content?: TableRowContent, context?: Context): string =>
  `<tr>${content?.cells?.map((c) => renderTableCell(c, !!content?.rowType, context)).join('') ?? ''}</tr>`;

export const renderTableCell = (content: TableCellContent, isHeader?: boolean, context?: Context): string =>
  `<t${isHeader ? 'h' : 'd'} align='left'${content.rowspan ? ` rowspan='${content.rowspan}'` : ''}${content.colspan ? ` colspan='${content.colspan}'` : ''}>${renderContentArray(content, context)}</t${isHeader ? 'h' : 'd'}>`;

export const renderHeader = (content: ArticleContents, context?: Context): string => {
  const headerDepth = content.depth ? content.depth + 1 : 1;
  let c = renderContentArray(content, context);
  if (headerDepth === 2) {
    if (c === c.toUpperCase() && !Number(c.charAt(0))) {
      c = c.toLowerCase();
      c = c.charAt(0).toUpperCase() + c.slice(1);
    }
  }
  return `<h${headerDepth}${content.id ? ` id="${content.id}"` : ''}>${c}</h${headerDepth}>`;
};

export const renderParagraph = (content: ArticleContents, context?: Context): string =>
  `<p>${renderContentArray(content, context)}</p>`;

export const renderStrong = (content: ArticleContents, context?: Context): string =>
  `<b>${renderContentArray(content, context)}</b>`;

export const renderCite = (content: ArticleContents, context?: Context): string =>
  `<a href="#${content?.target ?? ''}">${renderContentArray(content, context)}</a>`;

export const renderArticleDescription = (article: Article): string => `
  ${(article.description && Array.isArray(article.description))
    ? article.description.map((contentBlock) => ((typeof contentBlock !== 'string') ? renderContentBlock(contentBlock, { article }) : [contentBlock])).join('')
    : article.description}`;

export const renderArticleTitle = (article: Article): string => `
  ${(article.title && Array.isArray(article.title))
    ? article.title.map((contentBlock) => ((typeof contentBlock !== 'string') ? renderContentBlock(contentBlock, { article }) : [contentBlock])).join('')
    : article.title}`;

export const renderReceivedDate = (article: Article): string =>
  (article.dateReceived ? article.dateReceived.value : article.datePublished.value);

export const renderLink = (content: ArticleContents, context?: Context): string =>
  `<a href="${content?.target ?? '#'}">${renderContentArray(content, context)}</a>`;

export const renderSuperscript = (content: ArticleContents, context?: Context): string =>
  `<sup>${renderContentArray(content, context)}</sup>`;

export const renderEmphasis = (content: ArticleContents, context?: Context): string =>
  `<i>${renderContentArray(content, context)}</i>`;

export const renderTableDescription = (content: Array<TableDescription> | undefined, context?: Context): string => {
  if (content?.length) {
    return `<ul class="article-meta-data-list" role="list">
    ${content.map((tableDescription) => `
      <li${tableDescription.id ? ` id="${tableDescription.id}"` : ''}>
        <div class="table-footnote__text">
          ${tableDescription.content.map((description) => renderContentBlock(description, context)).join('')}
        </div>
      </li>
    `).join('')}
  </ul>
  `;
  }

  return '';
};

export const renderTable = (content: TableContent, context?: Context): string => {
  const regex = /h[\d+]*>/g;

  return `<div${content.id ? ` id="${content.id}"` : ''} class="article-table">
    <strong>${content.label}</strong>
    <div class="ui divider"></div>
    ${content.caption?.map((c) => renderContentBlock(c, context)).join('').replace(regex, 'h6>')}
     <table class="ui celled structured table">
       <thead>${content.rows.map((row) => ((row.rowType && row.rowType === 'header') ? renderTableRow(row, context) : '')).join('')}</thead>
       <tbody>${content.rows.map((row) => ((!row.rowType || (row.rowType && row.rowType !== 'header')) ? renderTableRow(row, context) : '')).join('')}</tbody>
    </table>
    ${renderTableDescription(content.description, context)}
  </div>
  <div class="ui ignored hidden divider"></div>
  `;
};

export const renderFigure = (content: ArticleContents, context?: Context): string => {
  const regex = /h[\d+]*>/g;

  return `<div class="asset-viewer"${content.id ? ` id="${content.id}"` : ''}>
    <div class="asset-viewer-inline-text">
      <div><span class="asset-viewer-inline-text-prominent">${content.label ?? ''}</span></div>
    </div>
    <figure class="captioned-asset">
      ${renderContentArray(content, context)}
      <figcaption class="figcaptioned-asset">${content.caption?.map((c) => renderContentBlock(c, context)).join('').replace(regex, 'h6>') ?? ''}</figcaption>
    </figure>
  </div>
`;
};

export const renderArticleImageUrl = (article: Article, contentUrl: string): string => {
  const doi = getArticleIdentifier(CONTENT_IDENTIFIER_DOI, article);

  if (!doi) {
    return '';
  }

  const file = path.basename(contentUrl);

  return `${doi}/${file}`;
};

export const renderImageObject = (content: ImageObjectContent, context?: Context): string => {
  const { contentUrl } = content;

  if (contentUrl && context && context.article) {
    const imageUrl = renderArticleImageUrl(context.article, contentUrl);
    const doi = getArticleIdentifier(CONTENT_IDENTIFIER_DOI, context.article);
    const imageBaseName = path.basename(contentUrl);

    if (imageUrl) {
      return `
      <div class="asset-links-container">
          ${(doi && imageBaseName) ? `<a class="download-icon" href="/download/${doi}/${imageBaseName}"></a>` : ''}
          <a class="view-icon" href="${renderImageUrl(imageUrl, { width: 1500 })}"></a>
      </div>
      <div>
        <a href="${renderImageUrl(imageUrl, { width: 1500 })}">
          <picture class="captioned-asset__picture">
            <source srcset="${renderImageUrl(imageUrl, { width: 1234 })} 2x, ${renderImageUrl(imageUrl, { width: 617 })} 1x" type="image/jpeg">
            <img class="captioned-image" src="${renderImageUrl(imageUrl, { width: 1200 })}">
          </picture>
        </a>
      </div>
      `;
    }
  }

  return '';
};
