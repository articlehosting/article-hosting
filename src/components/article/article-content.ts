import { Article, ArticleContents } from './article';

export const renderContentBlock = (content: ArticleContents | string): string => {
  /* eslint-disable @typescript-eslint/no-use-before-define */
  if (typeof content === 'string') {
    return content;
  }
  if (content.type === 'Heading') {
    return renderHeader(content);
  }
  if (content.type === 'Paragraph') {
    return renderParagraph(content);
  }
  if (content.type === 'Cite') {
    return renderCite(content);
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

export default articleContent;
