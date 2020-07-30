import { Article } from '../../../src/components/article/article';
import renderArticleHeader from '../../../src/components/article/article-header';

const correctArticle: Article = {
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
  description: [
    {
      type: 'Paragraph',
      content: [
        'This article analyses the gender differences in the Personal Income Tax in Uruguay. Although the tax code does not explicitly specify gender differences, the average tax rate varies among gendered household types. Using post-tax income data, we simulate the average tax rate of the household and estimate a zero-one inflated beta model -which properly addresses the fact that the average tax rate includes many zero data points- to analyse it. We find that household supported by a one-earner couple bear a higher tax burden than the ones supported by a dual-earner couple or a single parent. We interpret that these findings suggest that the tax serves as somewhat of an incentive towards equal gender time allocation within the family, which is consistent with gender equity. However the strengths of the tax system from the gender perspective are eroded by the possibility to opt for a (rarely used) joint filing.',
      ],
    },
  ],
  content: [{
    type: 'Heading',
    id: 's1',
    depth: 1,
    content: [
      '1. Introduction',
    ],
  },
  {
    type: 'Paragraph',
    content: [
      'A strand of the literature on gender equity studies the role of public policies in mitigating or reinforcing asymmetrical gender behaviour. ',
      {
        type: 'Cite',
        target: 'bib30',
        content: [
          'Stotsky (1996)',
        ],
      },
      ' defined and identified explicit and implicit gender bias in tax policies, which are particularly relevant in the Personal Income Tax (PIT). Explicit bias arises from the tax code when it identifies and treats men and women differently. Implicit forms of gender bias refer to provisions in the tax systems that tend to generate different incentives for men than for women, due to the culture or socioeconomic arrangements.',
    ],
  },
  {
    type: 'Paragraph',
    content: [
      'Many of the empirical studies focus on the presence of implicit bias when the tax is assessed on the combined income of the couple, through joint filing (',
      {
        type: 'Cite',
        target: 'bib34',
        content: [
          'Andrienko et al., 2015',
        ],
      },
      '). Under this rule, the second earner (typically women) effectively pays a higher tax (on her income) than if she was taxed individually, because of increasing marginal rates. This pattern is criticized for different reasons. For example, it is at odds with policy recommendations derived from the optimal taxation perspective, in which individuals with higher labour supply elasticity should be less taxed. As married women have a more elastic labour supply than their spouses, tax rates on labour income should be lower for women than for men (',
      {
        type: 'Cite',
        target: 'bib1',
        content: [
          'Alesina et al., 2011',
        ],
      },
      '). Also, from a gender equity perspective, joint taxation discourages the participation of married women in the labour market and men’s participation in unpaid domestic work, creating gender biases (',
      {
        type: 'Cite',
        target: 'bib5',
        content: [
          'Apps and Rees, 2010',
        ],
      },
      '; ',
      {
        type: 'Cite',
        target: 'bib6',
        content: [
          'Bach et al., 2013',
        ],
      },
      '; ',
      {
        type: 'Cite',
        target: 'bib21',
        content: [
          'Guner et al., 2012',
        ],
      },
      ').',
    ],
  }],
  keywords: [
    'C63',
    'H22',
    'H24',
    'H31',
    'J16',
    'microsimulation',
    'tax incidence',
    'income tax',
    'gender',
  ],
  licenses: [
    {
      type: 'CreativeWork',
      url: 'http://creativecommons.org/licenses/by/4.0/',
      content: [
        {
          type: 'Paragraph',
          content: [
            'This article is distributed under the terms of the ',
            {
              type: 'Link',
              target: 'http://creativecommons.org/licenses/by/4.0/',
              content: [
                'Creative Commons Attribution License',
              ],
            },
            ', which permits unrestricted use and redistribution provided that the original author and source are credited.',
          ],
        },
      ],
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
