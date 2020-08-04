import { Article, ArticleContents } from './article';

export const CONTENT_HEADING = 'Heading';
export const CONTENT_PARAGRAPH = 'Paragraph';
export const CONTENT_CITE = 'Cite';
export const CONTENT_LINK = 'Link';
export const CONTENT_SUPERSCRIPT = 'Superscript';
export const CONTENT_EMPHASIS = 'Emphasis';
export const CONTENT_TABLE = 'Table';
export const CONTENT_TABLEROW = 'TableRow';

export const renderContentBlock = (content?: ArticleContents | string): string => {
  /* eslint-disable @typescript-eslint/no-use-before-define */
  if (!content) {
    return '';
  }
  if (typeof content === 'string') {
    return content;
  }

  switch (content.type) {
    case CONTENT_HEADING:
      return renderHeader(content);
    case CONTENT_PARAGRAPH:
      return renderParagraph(content);
    case CONTENT_CITE:
      return renderCite(content);
    case CONTENT_LINK:
      return renderLink(content);
    case CONTENT_SUPERSCRIPT:
      return renderSuperscript(content);
    case CONTENT_EMPHASIS:
      return renderEmphasis(content);
    case CONTENT_TABLE:
      return renderTable(content);
    case CONTENT_TABLEROW:
      return renderTableRow(content);
    default:
      return '';
  }
};

export const renderContentArray = (content?: ArticleContents): string =>
  `${content?.content?.map((c) => renderContentBlock(c)).join('') ?? ''}`;

export const renderTableRow = (content?: ArticleContents): string =>
  `${content?.cells?.map((c) => renderContentBlock(c)).join('') ?? ''}`;

export const renderHeader = (content: ArticleContents): string =>
  `<h${content.depth ?? 1}${content.id ? ` id="${content.id}"` : ''}>${renderContentArray(content)}</h${content.depth ?? 1}>`;

export const renderParagraph = (content: ArticleContents): string =>
  `<p>${renderContentArray(content)}</p>`;

export const renderCite = (content: ArticleContents): string =>
  `<a href="#${content?.target ?? ''}">${renderContentArray(content)}</a>`;

export const articleContent = (article: Article): string =>
  `<div class="ui container left aligned">
    ${article.content.map((contentBlock) => renderContentBlock(contentBlock)).join('')}
  </div>`;

export const renderLink = (content: ArticleContents): string =>
  `<a href="${content?.target ?? '#'}">${renderContentArray(content)}</a>`;

export const renderSuperscript = (content: ArticleContents): string =>
  `<sup>${renderContentArray(content)}</sup>`;

export const renderEmphasis = (content: ArticleContents) : string =>
  `<i>${renderContentArray(content)}</i>`;

export const renderTable = (content: ArticleContents): string =>
  `<div${content.id ? ` id="${content.id}"` : ''}>
    <span>${content.label ?? ''}</span>${content.caption?.map((c) => renderContentBlock(c)).join('') ?? ''}
     <table>
       <thead>${content.rows?.map((row) => ((row.rowType && row.rowType === 'header') ? renderTableRow(row) : '')).join('') ?? ''}</thead>
       <tbody></tbody>
    </table>
  </div>
  `;

export default articleContent;
