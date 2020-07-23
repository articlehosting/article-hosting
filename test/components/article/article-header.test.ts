import { Article } from '../../../src/components/article/article';
import renderArticleHeader from '../../../src/components/article/article-header';

const correctArticle: Article = {
  authors: [{
    type: 'Person',
    affiliations: [
      {
        type: 'Organization',
        address: {
          type: 'PostalAddress',
          addressCountry: 'Australia',
        },
        name: 'NATSEM, Institute of Governance and Policy Analysis University of Canberra',
      },
    ],
    emails: [
      'jinjing.li@canberra.edu.au',
    ],
    familyNames: [
      'Li',
    ],
    givenNames: [
      'Jinjing',
    ],
  }],
  content: [{
    type: 'Paragraph',
    content: [],
  }],
  title: 'Spatial microsimulation: A reference guide for users, by R. Tanton and K.L. Edwards (2012)',
  type: 'Article',
  datePublished: {
    type: 'Date',
    value: '2015-12-31',
  },
  isPartOf: {
    type: 'PublicationVolume',
    isPartOf: {
      type: 'Periodical',
      identifiers: [
        {
          type: 'PropertyValue',
          name: 'publisher-id',
          propertyID: 'https://registry.identifiers.org/registry/publisher-id',
          value: 'ijmicrosim',
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
    volumeNumber: '8',
  },
  identifiers: [
    {
      type: 'PropertyValue',
      name: 'publisher-id',
      propertyID: 'https://registry.identifiers.org/registry/publisher-id',
      value: '00124',
    },
    {
      type: 'PropertyValue',
      name: 'doi',
      propertyID: 'https://registry.identifiers.org/registry/doi',
      value: '10.34196/ijm.00124',
    },
  ],
};

describe('render article header', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('should render article header with correct article', () => {
    expect(() => renderArticleHeader(correctArticle)).not.toThrow();
  });

  it('should not render article header with missing article', () => {
    const wrongArticle = <Article><unknown>{};

    expect(() => renderArticleHeader(wrongArticle)).toThrow('Cannot read property \'map\' of undefined');
  });
});
