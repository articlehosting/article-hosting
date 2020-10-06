import { Article, ArticleAuthor } from './article';
import { CONTENT_IDENTIFIER_DOI, renderArticleTitle } from './article-content';
import config from '../../config';
import { getArticleIdentifier, renderDate } from '../../utils';

export const renderAuthors = (authors?: Array<ArticleAuthor>): string => {
  if (authors?.length) {
    const renderedAuthors: Array<string> = [];

    authors.forEach((author): void => {
      const name = `<li>${author.givenNames.join(' ')} ${author.familyNames.join(' ')}</li>`;

      renderedAuthors.push(name);
    });

    return renderedAuthors.join('');
  }

  return '';
};

export const renderArticleHeader = (article: Article): string => {
  if (article) {
    const doi = getArticleIdentifier(CONTENT_IDENTIFIER_DOI, article);

    if (doi) {
      const dateReceived = article.dateReceived ? new Date(article.dateReceived.value) : '';

      return `
        <header class="article-header">
          <h1 id="title">${renderArticleTitle(article)}</h1>
          <ol class="article-author-list" aria-label="Authors of this article" id="authors" role="list">${renderAuthors(article.authors)}</ol>
          <ul class="article-meta-data-list" role="list">
              <li>DOI <a href="${config.resources.doiResource}${doi}">${doi}</a></li>
              ${dateReceived ? `<li>Posted <time datetime="${article.datePublished.value}"></time>${renderDate('mm dd, yy', 'short', dateReceived)}</li>` : ''}
          </ul>
        </header>
      `;
    }
  }

  return '';
};

export default renderArticleHeader;
