import { Article } from '../article/article';
import renderArticleItem from '../article/article-item';

export const renderNoContent = (): string => `
  <div class="ui vertical left aligned segment">
    <h4>No articles.</h4>
  </div>
`;

export const renderHomePageContent = (articles: Array<Article>): string => {
  if (!articles.length) {
    return renderNoContent();
  }

  return `
    <div class="ui list items vertical left aligned segment">
      <h2 class="ui header">Latest research</h2>
      ${articles.map((article) => renderArticleItem(article)).join('')}
    </div>
  `;
};

export default renderHomePageContent;
