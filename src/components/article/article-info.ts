import {
  Article, ArticleAuthor, ArticleDate, ArticleFile,
} from './article';
import { CONTENT_IDENTIFIER_DOI, renderContentBlock } from './article-content';
import config from '../../config';
import { getArticleIdentifier, renderDate } from '../../utils';

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

export const renderVersion = (datePublished: ArticleDate): string => {
  const d = new Date(datePublished.value);
  return d.getFullYear() ? `<div>Version of Record published: <a href="#">${renderDate('mm dd, yy', 'long', d)} (version 1)</a></div>` : '';
};

const renderAdditionalDataItem = (article: Article, file: ArticleFile, index: number): string => {
  const fileLink = `/download/${getArticleIdentifier(CONTENT_IDENTIFIER_DOI, article) ?? ''}/${file.contentUrl}`;

  return `<div class="item">
    <div class="content">
      <div class="header">Supplementary file ${index}</div>
      <div class="description"><a href="${fileLink}">${config.server.hostname}${fileLink}</a></div>
      <div class="description"><a href="${fileLink}">Download ${file.name}.${file.extension}</a></div>
    </div>
  </div>`;
};

export const renderAdditionalData = (article: Article): string => {
  const skip = ['tif', 'tiff', 'xml'];

  return `<h2>Additional files</h2>
    <div class="ui list">
      ${article.files.filter((f) => !skip.includes(f.extension.toLowerCase())).map((file, index) => renderAdditionalDataItem(article, file, index + 1)).join('')}
    </div>`;
};

export const renderArticleInfo = (article: Article): string =>
  `${renderAdditionalData(article)}
  <div class="ui container left aligned">
    <h2>Author details</h2>
    <div>
      ${article.authors.map((author) => renderAuthorDetails(author)).join()}
    </div>
    <h3 class="ui header">Publication history</h3>
    ${renderVersion(article.datePublished)}
    ${renderCopyright(article)}
  </div>
`;
