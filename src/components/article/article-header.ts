import { Article, ArticleAuthor } from './article';
import { CONTENT_IDENTIFIER_PUBLISHERID } from './article-content';
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
    const publisherId = getArticleIdentifier(CONTENT_IDENTIFIER_PUBLISHERID, article);
    // todo: get article files names from db.
    const prefix = 'ijm';

    return `
      <div class="ui container">
        <h1 class="ui center aligned header" id="title">${article.title}</h1>
        <p class="ui center aligned header" id="authors">${renderAuthors(article.authors)}</p>
        <p class="ui center aligned header">${article.authors.map((author) => author.affiliations.map((affiliation) => `${affiliation.name}, ${affiliation.address?.addressCountry}`).join(';')).join(';')}</p>
        <p class="ui center aligned header">
          <span>CITE AS: ${article.authors.map((author) => `<span>${author.givenNames.join(' ')} ${author.familyNames.join(' ')}<span/>`).join()};</span>
          <span>${new Date(article.datePublished.value).getFullYear()};</span>
          <span>${article.isPartOf.isPartOf?.title ?? ''};</span>
          <span>${article.isPartOf.volumeNumber ?? ''}({issueNr}); {fPage}-{lPage}.</span>
          <span>DOI: ${article.identifiers.filter((identifier) => identifier.name === 'doi')[0].value}</span>
        </p>
        ${publisherId ? `
          <p class="ui center aligned header">
            <a href="/download/${publisherId}/${prefix}-${publisherId}.pdf">Article PDF</a>
          </p>
        ` : ''}
      </div>
    `;
  }

  return '';
};

export default renderArticleHeader;
