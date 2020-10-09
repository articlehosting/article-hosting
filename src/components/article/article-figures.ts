import {
  Article, ArticleContents, ImageObjectContent, TableCellContent, TableContent, TableRowContent,
} from './article';
import {
  CONTENT_EMPHASIS,
  CONTENT_FIGURE, CONTENT_HEADING,
  CONTENT_IMAGEOBJECT,
  CONTENT_PARAGRAPH, CONTENT_STRONG, CONTENT_SUPERSCRIPT,
  CONTENT_TABLE,
  Context, renderEmphasis, renderHeader,
  renderImageObject,
  renderParagraph, renderStrong, renderSuperscript, renderTableDescription,
} from './article-content';

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
    case CONTENT_SUPERSCRIPT:
      return renderSuperscript(content, context);
    case CONTENT_STRONG:
      return renderStrong(content, context);
    case CONTENT_PARAGRAPH:
      return renderParagraph(content, context);
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

export const renderArticleFiguresContent = (article: Article): string => {
  const contentArray = (type: string): Array<string> =>
    article.content.filter((c) => c.type === type).map((contentBlock) => renderContentBlock(contentBlock, { article }));
  const renderContent = (type: string): string => `${contentArray(type).join('')}`;
  const files = article.files.filter((f) => !['tif', 'tiff', 'xml'].includes(f.extension.toLowerCase()));

  const tableContent = renderContent(CONTENT_TABLE);
  const figureContent = renderContent(CONTENT_FIGURE);

  return `
    <div class="main-content">
      <div class="message-bar ignored ui message">
        <b>${contentArray(CONTENT_FIGURE).length}</b> figures, <b>${contentArray(CONTENT_TABLE).length}</b> tables and <b>${files.length}</b> additional file
      </div>
      ${figureContent ? `
      <header>
        <h2>Figures</h2>
      </header>
      <section>
        ${figureContent}
      </section>` : ''}
      ${tableContent ? `
      <header>
        <h2>Tables.</h2>
      </header>
      <section>
        ${tableContent}
      </section>` : ''}
    </div>
  `;
};
