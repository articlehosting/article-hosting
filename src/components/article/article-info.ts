import { Article, ArticleAuthor } from './article';
import { renderContentBlock } from './article-content';
import { renderDate } from '../../utils';

export const renderAuthorDetails = (author: ArticleAuthor): string =>
  `<div>
    <h4 class="ui header">${author.givenNames.join(' ')} ${author.familyNames.join(' ')}</h4>
    <div>${author.affiliations.map((affiliation) => `<span>${affiliation.name}, ${affiliation.address.addressLocality ?? ''}, ${affiliation.address.addressCountry}</span>`).join()}</div>
    <h5 class="ui header">For correspondence: <span>${author.emails.map((email) => `<a href="mailto:${email}">${email}</a>`).join(', ')}</span></h5>
    <div><a href="#">{orcid}</a></div>
</div>`;

export const renderCopyright = (article: Article): string => {
  const names = article.authors.map((author) => author.familyNames.join(' '));

  return `
    <h3>Copyright</h3>
    <p>© ${new Date(article.datePublished.value).getFullYear()}, ${article.authors.length > 2 ? names.join(', ') : names.join(' and ')}</p>
    <div>${article.licenses.map((license) => license.content.map((c) => renderContentBlock(c))).join()}</div>
  `;
};

export const renderVersion = (article: Article): string => {
  const d = new Date(article.datePublished.value);
  return `<div>Version of Record published: <a href="#">${renderDate('mm dd, yy', 'long', 'four', d)} (version 1)</a></div>`;
};

export const renderArticleInfo = (article: Article): string =>
  `<div class="ui container left aligned">
    <h3 class="ui header">Author details</h3>
    <div>
      ${article.authors.map((author) => renderAuthorDetails(author)).join()}
    </div>
    <h3 class="ui header">Publication history</h3>
    ${renderVersion(article)}
    ${renderCopyright(article)}
  </div>
`;
