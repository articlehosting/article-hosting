import { Article } from './article';
import renderArticleContent from './article-content';
import renderArticleHeader from './article-header';
import { renderArticleInfo } from './article-info';
import renderArticleReferences from './article-reference';

const renderArticle = (article: Article): string => `
${renderArticleHeader(article)}
${renderArticleContent(article)}
${renderArticleReferences(article)}
${renderArticleInfo(article)}
`;

export default renderArticle;
