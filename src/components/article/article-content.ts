import { Article, ArticleContents } from './article';

export const CONTENT_HEADING = 'Heading';
export const CONTENT_PARAGRAPH = 'Paragraph';
export const CONTENT_CITE = 'Cite';
export const CONTENT_LINK = 'Link';
export const CONTENT_SUPERSCRIPT = 'Superscript';

export const renderContentBlock = (content: ArticleContents | string): string => {
  /* eslint-disable @typescript-eslint/no-use-before-define */
  if (typeof content === 'string') {
    return content;
  }
  if (content.type === CONTENT_HEADING) {
    return renderHeader(content);
  }
  if (content.type === CONTENT_PARAGRAPH) {
    return renderParagraph(content);
  }
  if (content.type === CONTENT_CITE) {
    return renderCite(content);
  }
  if (content.type === CONTENT_LINK) {
    return renderLink(content);
  }
  if (content.type === CONTENT_SUPERSCRIPT) {
    return renderSuperscript(content);
  }
  return '';
};

export const renderHeader = (content: ArticleContents): string => `
  <h${content.depth ?? 1}${content.id ? ` id="${content.id}"` : ''}>${content.content.map((c) => renderContentBlock(c)).join('')}</h${content.depth ?? 1}>
`;

export const renderParagraph = (content: ArticleContents): string => `
  <p>${content.content.map((c) => renderContentBlock(c)).join('')}</p>
`;

export const renderCite = (content: ArticleContents): string => `
  <a href="#${content?.target ?? ''}">${content.content.map((c) => renderContentBlock(c)).join('')}</a>
`;

export const articleContent = (article: Article): string => `
  <div class="ui container left aligned">
    ${article.content.map((contentBlock) => renderContentBlock(contentBlock)).join('')}
  </div>
`;

export const renderLink = (content: ArticleContents): string => `
  <a href="${content?.target ?? '#'}">${content.content.map(c => renderContentBlock(c)).join('')}</a>
`;

export const renderSuperscript = (content: ArticleContents): string => `
  <sup>
    ${content.content.map(c => renderContentBlock(c)).join('')}
  </sup>
`;

export default articleContent;
