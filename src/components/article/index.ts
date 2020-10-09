import { Article } from './article';
import { renderArticleBody } from './article-body';
import { renderArticleFiguresContent } from './article-figures';
import { renderArticleHeader } from './article-header';
import renderArticleSidebar from './sidebar';

const renderArticle = (article: Article): string => `
<article class="hive-grid hive-grid--article">
${renderArticleHeader(article)}
${renderArticleBody(article)}
${renderArticleSidebar(article)}
</article>
`;

const renderArticleFigures = (article: Article): string => `
<article class="hive-grid hive-grid--article">
  ${renderArticleHeader(article)}
  ${renderArticleFiguresContent(article)}
  ${renderArticleSidebar(article)}
</article>
`;

export { renderArticle, renderArticleFigures };
