import { Article, ArticleAuthor, ArticleDatePublished } from './article';
import { renderContentBlock } from './article-content';
import { renderDate } from '../../utils';

export const renderAuthorEmails = (emails?: Array<string>): string => {
  let emailsHtml = '';
  if (emails?.length) {
    const renderedEmails = emails.map((email: string) => `<a href="mailto:${email}">${email}</a>`);

    emailsHtml = `<h5 class="ui header">For correspondence: <span>${renderedEmails.join(', ')}</span></h5>`;
  }

  return emailsHtml;
};

export const renderAuthorDetails = (author: ArticleAuthor): string =>
  `<div>
    <h4 class="ui header">${author.givenNames.join(' ')} ${author.familyNames.join(' ')}</h4>
    <div>${author.affiliations.map((affiliation) => `<span>${affiliation.name}, ${affiliation.address.addressLocality?.concat(', ') ?? ''}${affiliation.address.addressCountry}</span>`).join()}</div>
    ${renderAuthorEmails(author.emails)}
    <div><a href="#">{orcid}</a></div>
</div>`;

export const renderCopyright = (article: Article): string => {
  const names = article.authors.map((author) => author.familyNames.join(' '));

  return `
    <h3>Copyright</h3>
    <p>© ${new Date(article.datePublished.value).getFullYear()}, ${names.length > 2 ? names.join(', ') : names.join(' and ')}</p>
    <div>${article.licenses.map((license) => license.content.map((c) => renderContentBlock(c))).join()}</div>
  `;
};

export const renderVersion = (datePublished: ArticleDatePublished): string => {
  const d = new Date(datePublished.value);
  return `<div>Version of Record published: <a href="#">${renderDate('mm dd, yy', 'long', d)} (version 1)</a></div>`;
};

export const renderArticleInfo = (article: Article): string =>
  `<div class="ui container left aligned">
    <h3 class="ui header">Author details</h3>
    <div>
      ${article.authors.map((author) => renderAuthorDetails(author)).join()}
    </div>
    <h3 class="ui header">Publication history</h3>
    ${renderVersion(article.datePublished)}
    ${renderCopyright(article)}
  </div>
`;
