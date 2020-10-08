import { Article, ArticleAbout } from './article';
import { CONTENT_IDENTIFIER_DOI, renderArticleDescription, renderArticleTitle } from './article-content';
import { renderAuthors } from './article-header';
import config from '../../config';
import { getArticleIdentifier, renderDate } from '../../utils';

const renderSubject = (about: ArticleAbout): string => `
  <li>
    <a href="#">${about.name}</a>
  </li>`;

const renderArticleItem = (article: Article): string => {
  const doi = getArticleIdentifier(CONTENT_IDENTIFIER_DOI, article);

  if (doi) {
    const dateReceived = article.dateReceived ? new Date(article.dateReceived.value) : '';

    return `
    <div class="home-page-article-item">
      <ul class="article-author-list">
        ${article.about.map((item) => renderSubject(item)).join('')}
      </ul>
      <header>
        <h4>
          <a class="header title" href="/articles/${doi}">${renderArticleTitle(article)}</a>
        </h4>
        <div>
          <ol class="article-author-list" role="list">${renderAuthors(article.authors)}</ol>
        </div>
      </header>
      <ul class="article-meta-data-list" role="list">
              <li>DOI <a href="${config.resources.doiResource}${doi}">${doi}</a></li>
              ${dateReceived ? `<li>Posted <time datetime="${article.datePublished.value}"></time>${renderDate('mm dd, yy', 'short', dateReceived)}</li>` : ''}
          </ul>
      <div>
        ${renderArticleDescription(article)}
      </div>
    </div>
  `;
  }

  return '';
};

export default renderArticleItem;
