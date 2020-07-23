import { Article } from './article';

const renderArticleHeader = (article: Article): string => `
    <h1 class="ui center aligned header">${article.title}</h1>
    <p class="ui center aligned header">
     ${article.authors.map((author) => `<span>${author.givenNames.join(' ')} ${author.familyNames.join(' ')}</span>`).join()}
    </p>
    <p class="ui center aligned header">
      ${article.authors.map((author) => author.affiliations.map((affiliation) => `${affiliation.name}, ${affiliation.address!.addressCountry}`).join(';')).join(';')}
    </p>
  `;

export default renderArticleHeader;
