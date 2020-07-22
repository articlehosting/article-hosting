import { Article } from './article';
import renderArticleHeader from './article-header';

const demoArticle: Article = {
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
};

const renderArticle = (): string => `${renderArticleHeader(demoArticle)}`;
// ArticleBody

export default renderArticle;
