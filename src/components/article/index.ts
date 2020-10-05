import { Article } from './article';
import { renderArticleBody } from './article-body';
import { renderArticleFiguresContent } from './article-figures';
import { renderArticleHeader } from './article-header';

const renderArticle = (article: Article): string => `
${renderArticleHeader(article)}
${renderArticleBody(article)}
`;

const renderArticleFigures = (article: Article): string => `
${renderArticleHeader(article)}
${renderArticleFiguresContent(article)}
`;

export { renderArticle, renderArticleFigures };
