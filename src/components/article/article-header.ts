import { Article, ArticleAuthor } from './article';
import { CONTENT_IDENTIFIER_DOI } from './article-content';
import { getArticleIdentifier } from '../../utils';

export const renderAuthors = (authors?: Array<ArticleAuthor>): string => {
  if (authors?.length) {
    const renderedAuthors: Array<string> = [];

    authors.forEach((author): void => {
      const name = `${author.givenNames.join(' ')} ${author.familyNames.join(' ')}`;

      if (author.emails) {
        renderedAuthors.push(`<a href="mailto:${author.emails.join(' ')}">${name}</a>`);
      } else {
        renderedAuthors.push(name);
      }
    });

    return renderedAuthors.join(', ');
  }

  return '';
};

export const renderArticleHeader = (article: Article): string => {
  // @todo: treat if publisherId undefined display rest of data
  if (article) {
    // todo: get article files names from db.
    const volumeNumber = article.isPartOf.isPartOf?.volumeNumber ?? '';
    const issueNumber = article.isPartOf.issueNumber ?? '';
    const affiliations = article.authors.map((author) => author.affiliations.map((affiliation) => `${affiliation.name}, ${affiliation.address?.addressCountry}`).join(';'));
    const titleSource = article.isPartOf.isPartOf?.isPartOf?.title;
    const doi = getArticleIdentifier(CONTENT_IDENTIFIER_DOI, article);
    const datePublished = new Date(article.datePublished.value).getFullYear();
    return `
      <div class="ui container">
        <h1 class="ui center aligned header" id="title">${article.title}</h1>
        <p class="ui center aligned header" id="authors">${renderAuthors(article.authors)}</p>
        <p class="ui center aligned header">${[...new Set(affiliations)].join(';')}</p>
        <p class="ui center aligned header">
          <span>CITE AS: </span>
          ${article.authors.length ? `<span>${article.authors.map((author) => `${author.givenNames.join(' ')} ${author.familyNames.join(' ')}`).join(', ')};</span>` : ''}
          ${datePublished ? `<span>${datePublished};</span>` : ''}
          ${titleSource ? `<span>${titleSource ?? ''};</span>` : ''}
          ${volumeNumber ? `<span>${volumeNumber}</span>` : ''}
          ${issueNumber ? `<span>(${issueNumber});</span>` : ''}
          ${(article.pageStart && article.pageEnd) ? `<span>${article.pageStart}-${article.pageEnd}.</span>` : ''}
          ${doi ? `<span>DOI: ${doi}</span>` : ''}
        </p>
      </div>
    `;
  }

  return '';
};

export default renderArticleHeader;
