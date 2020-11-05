import {
  Article, ArticleAuthor, ArticleFile, ArticleMeta,
} from './article';
import { CONTENT_IDENTIFIER_DOI, renderContentBlock, renderReceivedDate } from './article-content';
import config from '../../config';
import { getArticleIdentifier, renderDate } from '../../utils';

export const renderAuthorEmails = (emails?: Array<string>): string => {
  let emailsHtml = '';
  if (emails?.length) {
    const renderedEmails = emails.map((email: string) => `<a href="mailto:${email}">${email}</a>`);

    emailsHtml = `${renderedEmails.join(', ')}`;
  }

  return emailsHtml;
};

export const renderAuthorDetails = (author: ArticleAuthor): string =>
  `<li>
    <div>
      <h4>${author.givenNames.join(' ')} ${author.familyNames.join(' ')}</h4>
      <section>
        <span>${author.affiliations.map((affiliation) => `<span>${affiliation.name}, ${affiliation.address.addressLocality?.concat(', ') ?? ''}${affiliation.address.addressCountry}</span>`).join()}</span>
      </section>
      ${renderAuthorEmails(author.emails).length ? `
      <section>
        <h5 class="author-details__heading">For correspondence: </h5>
        <span>${renderAuthorEmails(author.emails)}</span>
      </section>` : ''}
    </div>
  </li>`;

export const renderCopyright = (article: Article): string => {
  const names = article.authors.map((author) => author.familyNames.join(' '));

  return `
    <p>© ${new Date(renderReceivedDate(article)).getFullYear()}, ${names.length > 2 ? names.join(', ') : names.join(' and ')}</p>
  `;
};

export const renderLicenses = (article: Article): string => `
    ${article.licenses.map((license) => license.content.map((c) => renderContentBlock(c))).join()}
  `;

export const renderAdditionalDataItem = (article: Article, file: ArticleFile, index: number): string => {
  const fileLink = `/download/${getArticleIdentifier(CONTENT_IDENTIFIER_DOI, article) ?? ''}/${file.contentUrl}`;

  return `
  <dt id="scode${index}">
    <h6 class="caption-text-heading">Supplementary file ${index}</h6>
  </dt>
  <dd class="additional-asset__access">
    <a href="${fileLink}">https://${config.server.hostname}${fileLink}</a>
    <div>
      <a href="${fileLink}">Download ${file.name}.${file.extension}</a>
    </div>
  </dd>`;
};

export const renderAdditionalData = (article: Article): string => {
  const skip = ['tif', 'tiff', 'xml'];

  return `<dl class="additional-assets-list">
      ${article.files.filter((f) => !skip.includes(f.extension.toLowerCase())).map((file, index) => renderAdditionalDataItem(article, file, index + 1)).join('')}
    </dl>`;
};

export const renderMeta = (meta: ArticleMeta): string => {
  if (meta.authorNotes && meta.authorNotes.length) {
    return meta.authorNotes.map((authorNote) => (typeof authorNote === 'string'
      ? `<li class="authors-details__authors--meta">${authorNote}</li>`
      : `<li class="authors-details__authors--meta">${renderContentBlock(authorNote)}</li>`)).join('');
  }
  return '';
};

export const renderPublicationHistory = (article: Article): string => {
  const dateReceived = article.dateReceived ? new Date(article.dateReceived.value) : '';
  const dateAccepted = article.dateAccepted ? new Date(article.dateAccepted.value) : '';
  const datePublished = new Date(article.datePublished.value);

  return `<ul class="publication-details__history" aria-label="Publication history" role="list">
      ${dateReceived instanceof Date ? `<li>Received: <a href="#">${renderDate('mm dd, yy', 'long', dateReceived)}</a></li>` : ''}
      ${dateAccepted instanceof Date ? `<li>Accepted: <a href="#">${renderDate('mm dd, yy', 'long', dateAccepted)}</a></li>` : ''}
      ${datePublished.getFullYear() ? `<li>Version of Record published: <a href="#">${renderDate('mm dd, yy', 'long', datePublished)}</a></li>` : ''}
    </ul>`;
};

export const renderArticleInfo = (article: Article): string =>
  `<section>
    <h2>Additional files</h2>
    ${renderAdditionalData(article)}
  </section>
  <section class="m-b-0">
    <h2>Author details</h2>
    <ol class="article-author-list authors-details__authors" aria-label="Authors of this article details"  role="list">
      ${article.authors.map((author) => renderAuthorDetails(author)).join('')}
      ${article.meta ? renderMeta(article.meta) : ''}
    </ol>
  </section>
  <section>
    <h2>Publication history</h2>
    ${renderPublicationHistory(article)}
  </section>
  <section class="copyright">
    <h2>Copyright</h2>
    ${renderCopyright(article)}
    ${renderLicenses(article)}
  </section>
`;
