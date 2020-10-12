import { Article, ArticleAbout } from './article';
import {
  CONTENT_IDENTIFIER_DOI,
  renderArticleTitle,
  renderReceivedDate,
} from './article-content';
import { renderAuthors } from './article-header';
import config from '../../config';
import { getArticleIdentifier, renderDate } from '../../utils';

const renderSubject = (about: ArticleAbout): string => `
  <li>
    <a href="#">${about.name}</a>
  </li>`;

const renderArticleItem = (article: Article): string => {
  const doi = getArticleIdentifier(CONTENT_IDENTIFIER_DOI, article);
  const date = new Date(renderReceivedDate(article));

  if (doi) {
    return `
    <div class="home-page-article-item border-bottom p-b-1">
      <ul class="article-author-list">
        ${article.about.map((item) => renderSubject(item)).join('')}
      </ul>
      <header>
        <h4 class="m-b-0 article-title">
          ${renderArticleTitle(article)}
        </h4>
        <ol class="article-author-list m-y-0" role="list">${renderAuthors(article.authors)}</ol>
      </header>
      <ul class="article-meta-data-list" role="list">
        <li>DOI <a href="${config.resources.doiResource}${doi}">${doi}</a></li>
        ${date ? `<li>Posted <time datetime="${renderReceivedDate(article).toString()}"></time>${renderDate('mm dd, yy', 'short', date)}</li>` : ''}
      </ul>
      <a class="article-call-to-action-link" href="/articles/${doi}">Read the full article</a>
    </div>
  `;
  }

  return '';
};

export default renderArticleItem;
