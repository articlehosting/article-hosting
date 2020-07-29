import { Article } from './article';
import renderArticleHeader from './article-header';

const demoArticle: Article = {
  type: 'Article',
  title: 'Gendered effects of the personal income tax: Evidence from a schedular system with individual filing in Uruguay',
  authors: [
    {
      type: 'Person',
      affiliations: [
        {
          type: 'Organization',
          address: {
            type: 'PostalAddress',
            addressCountry: 'Uruguay',
            addressLocality: 'Montevideo',
          },
          name: 'Universidad de la República',
        },
      ],
      emails: [
        'marisa.bucheli@cienciassociales.edu.uy',
      ],
      familyNames: [
        'Bucheli',
      ],
      givenNames: [
        'Marisa',
      ],
    },
    {
      type: 'Person',
      affiliations: [
        {
          type: 'Organization',
          address: {
            type: 'PostalAddress',
            addressCountry: 'Uruguay',
            addressLocality: 'Montevideo',
          },
          name: 'Universidad de la República',
        },
      ],
      emails: [
        'cecilia.olivieri@cienciassociales.edu.uy',
      ],
      familyNames: [
        'Olivieri',
      ],
      givenNames: [
        'Cecilia',
      ],
    },
  ],
  datePublished: {
    type: 'Date',
    value: '2020-07-17',
  },
  isPartOf: {
    type: 'PublicationVolume',
    isPartOf: {
      type: 'Periodical',
      identifiers: [
        {
          type: 'PropertyValue',
          name: 'nlm-ta',
          propertyID: 'https://registry.identifiers.org/registry/nlm-ta',
          value: 'ijm',
        },
        {
          type: 'PropertyValue',
          name: 'publisher-id',
          propertyID: 'https://registry.identifiers.org/registry/publisher-id',
          value: 'ijm',
        },
      ],
      issns: [
        '1747-5864',
      ],
      publisher: {
        type: 'Organization',
        name: 'International Microsimulation Association',
      },
      title: 'International Journal of Microsimulation',
    },
    volumeNumber: '12',
  },
  identifiers: [
    {
      type: 'PropertyValue',
      name: 'publisher-id',
      propertyID: 'https://registry.identifiers.org/registry/publisher-id',
      value: '00202',
    },
    {
      type: 'PropertyValue',
      name: 'doi',
      propertyID: 'https://registry.identifiers.org/registry/doi',
      value: '10.34196/ijm.00202',
    },
  ],
  content: [{
    type: 'Paragraph',
    content: [],
  }],
};

const renderArticle = (): string => `${renderArticleHeader(demoArticle)}`;
// ArticleBody

export default renderArticle;
