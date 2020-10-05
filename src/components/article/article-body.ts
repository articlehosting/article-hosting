import { Article } from './article';
import { renderArticleDescription, renderContentBlock } from './article-content';
import { renderArticleInfo } from './article-info';
import renderArticleReferences from './article-reference';
import renderArticleSidebar from './sidebar';

export const renderArticleBody = (article: Article): string => `<div class="ui ignored hidden divider"></div><div class="ui grid">
    ${renderArticleSidebar(article)}
    <div class="thirteen wide column">
      ${['<h1 class="ui header">Abstract</h1>', renderArticleDescription(article)].join('')}
      ${article.content.map((contentBlock) => renderContentBlock(contentBlock, { article })).join('')}
      ${renderArticleReferences(article)}
      ${renderArticleInfo(article)}
    </div>
  </div>`;

export default renderArticleBody;
