import { Article, ArticleAuthor } from './article';
import { CONTENT_IDENTIFIER_DOI, renderArticleTitle, renderReceivedDate } from './article-content';
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

export const renderAffiliations = (authors: Array<ArticleAuthor>): string => {
  if (authors.length) {
    const affiliations = authors?.map((author) => author.affiliations.map((affiliation) =>
      `${affiliation.name}, ${affiliation.address?.addressCountry}`)).flat(2);

    return [...new Set(affiliations)].map((item: string) => `<li class="content-header__institution_list_item">${item}</li>`).join('');
  }

  return '';
};

export const renderArticleHeader = (article: Article): string => {
  if (article) {
    const doi = getArticleIdentifier(CONTENT_IDENTIFIER_DOI, article);
    const date = new Date(renderReceivedDate(article));

    if (doi) {
      return `
        <header class="article-header">
          <h1 id="title">${renderArticleTitle(article)}</h1>
          ${article.authors.length ? `
            <ol class="article-author-list" aria-label="Authors of this article" id="authors" role="list">${renderAuthors(article.authors)}</ol>
            <ol class="content-header__institution_list" aria-label="Author institutions">${renderAffiliations(article.authors)}</ol>` : ''}
          <ul class="article-meta-data-list" role="list">
              <li>DOI <a href="${config.resources.doiResource}${doi}">${doi}</a></li>
              ${date ? `<li>Posted <time datetime="${renderReceivedDate(article)}"></time>${renderDate('mm dd, yy', 'short', date)}</li>` : ''}
          </ul>
        </header>
      `;
    }
  }

  return '';
};

export default renderArticleHeader;
