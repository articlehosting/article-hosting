import {
  Article,
  ArticleContents,
  ImageObjectContent,
  TableCellContent,
  TableContent,
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
  `<t${isHeader ? 'h' : 'd'} align='left'${content.rowSpan ? ` rowspan='${content.rowSpan}'` : ''}${content.colSpan ? ` colspan='${content.colSpan}'` : ''}>${renderContentArray(content, context)}</t${isHeader ? 'h' : 'd'}>`;

export const renderHeader = (content: ArticleContents, context?: Context): string =>
  `<h${content.depth ?? 1}${content.id ? ` id="${content.id}"` : ''} class="ui header">${renderContentArray(content, context)}</h${content.depth ?? 1}>`;

export const renderParagraph = (content: ArticleContents, context?: Context): string =>
  `<p>${renderContentArray(content, context)}</p>`;

export const renderStrong = (content: ArticleContents, context?: Context): string =>
  `<b>${renderContentArray(content, context)}</b>`;

export const renderCite = (content: ArticleContents, context?: Context): string =>
  `<a href="#${content?.target ?? ''}">${renderContentArray(content, context)}</a>`;

export const articleContent = (article: Article): string =>
  `<div class="ui container left aligned">
    ${['<h1 class="ui header">Abstract</h1>', ...article.description.map((contentBlock) => renderContentBlock(contentBlock, { article }))].join('')}
    ${article.content.map((contentBlock) => renderContentBlock(contentBlock, { article })).join('')}
  </div>`;

export const renderLink = (content: ArticleContents, context?: Context): string =>
  `<a href="${content?.target ?? '#'}">${renderContentArray(content, context)}</a>`;

export const renderSuperscript = (content: ArticleContents, context?: Context): string =>
  `<sup>${renderContentArray(content, context)}</sup>`;

export const renderEmphasis = (content: ArticleContents, context?: Context): string =>
  `<i>${renderContentArray(content, context)}</i>`;

export const renderTable = (content: TableContent, context?: Context): string =>
  `<div${content.id ? ` id="${content.id}"` : ''}>
    <span>${content.label}</span>${content.caption.map((c) => renderContentBlock(c, context)).join('')}
     <table class="ui celled structured table">
       <thead>${content.rows.map((row) => ((row.rowType && row.rowType === 'header') ? renderTableRow(row, context) : '')).join('')}</thead>
       <tbody>${content.rows.map((row) => ((!row.rowType || (row.rowType && row.rowType !== 'header')) ? renderTableRow(row, context) : '')).join('')}</tbody>
    </table>
  </div>
  `;

export const renderFigure = (content: ArticleContents, context?: Context): string =>
  `<div${content.id ? ` id="${content.id}"` : ''}>
    <div>
      <div><span>${content.label ?? ''}</span></div>
    </div>
    <figure>
      ${renderContentArray(content, context)}
      <figcaption>${content.caption?.map((c) => renderContentBlock(c, context)).join('') ?? ''}</figcaption>
    </figure>
  </div>
`;

export const renderImageObject = (content: ImageObjectContent, context?: Context): string => {
  const { contentUrl } = content;

  if (contentUrl && context && context.article) {
    const { article } = context;

    const publisherId = getArticleIdentifier(CONTENT_IDENTIFIER_PUBLISHERID, article);

    if (publisherId) {
      // todo: temporary image fix, should be done on stencilla convertion side.
      const dirtyUrl = contentUrl.split('/');
      const imgUrl = `articles/${publisherId}/${dirtyUrl[dirtyUrl.length - 1]}`;

      return `<a href="${renderImageUrl(`${imgUrl}`, { width: 1500 })}" class="ui image">
        <picture>
          <source srcset="${renderImageUrl(`${imgUrl}`, { width: 1234 })} 2x, ${renderImageUrl(`${imgUrl}`, { width: 617 })} 1x" type="image/jpeg">
          <img src="${renderImageUrl(`${imgUrl}`, { width: 1200 })}">
        </picture>
      </a>`;
    }
  }

  return '';
};

export default articleContent;
