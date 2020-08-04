import { Article } from './article';
import renderArticleContent from './article-content';
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
      {
        type: 'Paragraph',
        content: [
          'Two additional issues enrich the discussion of the PIT from the feminist economic theory perspective. ',
          {
            type: 'Cite',
            target: 'bib23',
            content: [
              'Nelson (1991)',
            ],
          },
          ' claims that ignoring home production for the purpose of taxing personal income, not only discourages female participation in the labour market but has a negative effect on horizontal equity. Indeed, a dual earner couple has to purchase household services in the market or forgo leisure time compared with the traditional male breadwinner couple. Thus, a similar welfare level of a household may lead to a higher burden PIT for a dual than one earner couple. A similar argument holds when comparing male breadwinner and lone parent families. However, not all who advocate gender equity give support to taxes on home production because of distributive concerns, on the understanding that it would increase more the tax burden of low than high income households (',
          {
            type: 'Cite',
            target: 'bib19',
            content: [
              'Grown and Valodia, 2010',
            ],
          },
          ').',
        ],
      },
      {
        type: 'Paragraph',
        content: [
          'Another interesting point raised by ',
          {
            type: 'Cite',
            target: 'bib23',
            content: [
              'Nelson (1991)',
            ],
          },
          ' is that usually PIT does not consider dependents (people unable to support themselves) except children. This means an unfair treatment to a single taxpayer that supports a dependent (for example a disabled parent) compared to a one-earner couple that can benefit of the income-splitting allowed under joint taxation.',
        ],
      }, {
        type: 'Paragraph',
        content: [
          'Besides, under a global income tax, gender bias may arise from the rules governing the allocation of shared capital income and the gender differences in the asset ownership (a review of this literature is presented in ',
          {
            type: 'Cite',
            target: 'bib4',
            content: [
              'Apps and Rees, 2009',
            ],
          },
          ')',
        ],
      },
      {
        type: 'Paragraph',
        content: [
          'In this context, it is not surprising that feminist economics gives support to individual filing and an income tax regime that taxes every source separately (schedular income tax). However, ',
          {
            type: 'Cite',
            target: 'bib30',
            content: [
              'Stotsky, 1996',
            ],
          },
          ' and ',
          {
            type: 'Cite',
            target: 'bib13',
            content: [
              'Elson (2006)',
            ],
          },
          ' mention different source of gender bias that persist such as the rules governing the allocation of shared capital income, exemptions or other tax preferences. Besides, gender differences in labour market outcomes and assets ownership also produce gender bias in taxation.',
        ],
      },
      {
        type: 'Paragraph',
        content: [
          'In recent decades, there has been a trend in developed countries to reform their PIT systems to dual regimes (capital and labour taxed separately) with individual filing (',
          {
            type: 'Cite',
            target: 'bib17',
            content: [
              'Genser and Reutter, 2007',
            ],
          },
          '). It is expected that these reforms would diminish gender bias. However, gender tax burden differences may be observed even under individual filing and a schedular system as reported in several empirical studies (see ',
          {
            type: 'Cite',
            target: 'bib19',
            content: [
              'Grown and Valodia, 2010',
            ],
          },
          ', for a survey). For example, ',
          {
            type: 'Cite',
            target: 'bib28',
            content: [
              'Rodríguez Enriquez et al. (2010)',
            ],
          },
          ' find a gender gap in Argentina because women are more prone to be employed in occupations that are taxed at lower rates than occupations which tend to intensively employ males.',
        ],
      },
      {
        type: 'Paragraph',
        content: [
          'The purpose of this study is to analyse the gender differences in the PIT-to-income ratio in Uruguay. The PIT was created in 2007 when a left-coalition was running the administration for the first time in the Uruguayan history, and in 2013, it accounted for 10% of public revenue. The PIT was the result of a commitment during the campaign to improve the distributive effect of the tax system. The debate about tax reform did not raise issues related to gender equity and in fact, this is the first analysis that addresses it. However, the PIT design reflects the general spirit of the latest reforms in developed countries that help to mitigate gender biases. Labour income, pensions and capital income are subject to a differentiated schedule tax, with marginal progressive rates for the first and second sources and a flat rate for capital income. Individual filing is the norm but joint taxation is also allowed, and there are no explicit gender biases in the code.',
        ],
      }, {
        type: 'Paragraph',
        content: [
          'Our study builds on the work on gender and taxation for several countries collected in ',
          {
            type: 'Cite',
            target: 'bib19',
            content: [
              'Grown and Valodia (2010)',
            ],
          },
          ' and the comparative study by ',
          {
            type: 'Cite',
            target: 'bib18',
            content: [
              'Grown and Komatsu (2015)',
            ],
          },
          '. The main difference with the first of these studies is that we use actual data instead of simulations of representative agents. Compared to the second study, which uses survey data as in this paper, our main innovation is to use an econometric strategy for the analysis.',
        ],
      }, {
        type: 'Paragraph',
        content: [
          'We use the Household Survey carried out in 2013 by the Statistical Office in Uruguay. The survey reports post-tax income. Therefore, we simulate taxes and contributions using the statutory rates in force in 2013, and we add them to the reported income in order to have a proxy of gross income. We estimate the average tax rate of the household as PIT-to-gross income ratio taking into account paid taxes and income of all household earners. As we work with a database of individuals, we assign the same tax rate to all household members.',
        ],
      },
      {
        type: 'Paragraph',
        content: [
          'We classify the households according to a combination of dimensions: whether or not the household head has a partner, employment status of the head and partner (if any), and whether or not it is an extended household. We are particularly interested in comparing the average tax rate in three typical cases: a) households supported by a male worker and a housewife who is not engaged in paid employment, b) households in which both members of the couple participate in the labour market, and c) households in which a single woman works in the labour market. We also compare households of non-employed individuals, ie, pensioners. We assess the effect of household type on the average tax rate by estimating a zero-one inflated beta model (ZOIB). This model properly addresses the fact that the average tax rate is a proportion with presence of zeros.',
        ],
      },
      {
        type: 'Paragraph',
        content: [
          'We find that, given per capita household income, the PIT incidence is higher for male breadwinner households than for dual earner households. Following ',
          {
            type: 'Cite',
            target: 'bib13',
            content: [
              'Elson (2006)',
            ],
          },
          ' and ',
          {
            type: 'Cite',
            target: 'bib20',
            content: [
              'Grown (2010)',
            ],
          },
          ', we consider this result to be consistent with gender equality because it is in line with more equal gender time allocation within the family. However, male breadwinner households also bear a higher tax incidence than female breadwinner households with a dependent spouse. This gender difference mainly comes from their different structure of income sources. The households headed by a single female worker exhibit a lower PIT incidence mainly due to the high share of non-taxed sources in their household income. Finally, we do not find gender differences within pensioners.',
        ],
      },
      {
        type: 'Paragraph',
        content: [
          'These results are based on the assumption that everybody files taxes individually. This assumption is quite realistic because joint filing is rarely used. Joint filing has not been analysed in Uruguay and probably its non-use is partly due to lack of information. However, joint filing is preferable for households in which one spouse does not participate in the labour market and for a percentage of the households in which both members of the couple do. Thus, as a robustness check for the basic results, we estimate gender gaps under the assumption that households opt for joint filing when it allows them to pay lower taxes than under individual filing. Though gender equity is eroded, we come up with the same conclusions.',
        ],
      },
      {
        type: 'Paragraph',
        content: [
          'The main contributions of this work are a) the implementation of a new strategy to analyse the data in the study of gender and taxation and b) the presentation of evidence about the gendered differences in the PIT burden in a developing country which last decade passed a tax reform that follows the main guidelines of regimes in advanced economies.',
        ],
      },
      {
        type: 'Paragraph',
        content: [
          'The remainder of this study proceeds as follows. In the next section we provide a description of the Uruguayan economy, after that we present the data and methodology and then we report the main results of the analysis. In the final section we conclude.',
        ],
      },
    ],
  },
  {
    type: 'Heading',
    id: 's2',
    depth: 1,
    content: [
      '2. Traits of Uruguayan economy',
    ],
  },
  {
    type: 'Heading',
    id: 's2-1',
    depth: 2,
    content: [
      '2.1. A gendered socio-economic picture',
    ],
  },
  {
    type: 'Paragraph',
    content: [
      'At the beginning of the 20th century, the country had low fertility and high life expectancy compared to Latin American standards. Since then, fertility has decreased and life expectancy has increased, and Uruguay is now in an advanced stage of demographic transition. Around 14 per cent of the population is older than 64 years of age as compared to less than 7 per cent on average in Latin America (see ',
      {
        type: 'Link',
        relation: 'table',
        target: '#table1',
        content: [
          'Table 1',
        ],
      },
      ').',
    ],
  },
  {
    type: 'Table',
    id: 'table1',
    caption: [
      {
        type: 'Heading',
        depth: 3,
        content: [
          'Socio-demographic characteristics',
        ],
      },
    ],
    label: 'Table 1.',
    rows: [
      {
        type: 'TableRow',
        cells: [
          {
            type: 'TableCell',
            content: [],
            rowSpan: 2,
          },
          {
            type: 'TableCell',
            content: [
              'Uruguay',
            ],
            colSpan: 4,
          },
          {
            type: 'TableCell',
            content: [
              'Latin american average',
            ],
            colSpan: 4,
          },
        ],
        rowType: 'header',
      },
      {
        type: 'TableRow',
        cells: [
          {
            type: 'TableCell',
            content: [
              'All',
            ],
          },
          {
            type: 'TableCell',
            content: [
              'Women',
            ],
          },
          {
            type: 'TableCell',
            content: [
              'Men',
            ],
          },
          {
            type: 'TableCell',
            content: [
              'W/M',
            ],
          },
          {
            type: 'TableCell',
            content: [
              'All',
            ],
          },
          {
            type: 'TableCell',
            content: [
              'Women',
            ],
          },
          {
            type: 'TableCell',
            content: [
              'Men',
            ],
          },
          {
            type: 'TableCell',
            content: [
              'W/M',
            ],
          },
        ],
        rowType: 'header',
      },
      {
        type: 'TableRow',
        cells: [
          {
            type: 'TableCell',
            content: [
              'Children per woman ',
              {
                type: 'Superscript',
                content: [
                  {
                    type: 'Link',
                    relation: 'table-fn',
                    target: '#T1_FN1',
                    content: [
                      'a/',
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: 'TableCell',
            content: [],
          },
          {
            type: 'TableCell',
            content: [
              '2.04',
            ],
          },
          {
            type: 'TableCell',
            content: [],
          },
          {
            type: 'TableCell',
            content: [],
          },
          {
            type: 'TableCell',
            content: [],
          },
          {
            type: 'TableCell',
            content: [
              '2.14',
            ],
          },
          {
            type: 'TableCell',
            content: [],
          },
          {
            type: 'TableCell',
            content: [],
          },
        ],
      },
      {
        type: 'TableRow',
        cells: [
          {
            type: 'TableCell',
            content: [
              'Life expectancy ',
              {
                type: 'Superscript',
                content: [
                  {
                    type: 'Link',
                    relation: 'table-fn',
                    target: '#T1_FN1',
                    content: [
                      'a/',
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: 'TableCell',
            content: [
              '77.0',
            ],
          },
          {
            type: 'TableCell',
            content: [
              '80.5',
            ],
          },
          {
            type: 'TableCell',
            content: [
              '73.3',
            ],
          },
          {
            type: 'TableCell',
            content: [
              '1.1',
            ],
          },
          {
            type: 'TableCell',
            content: [
              '74.8',
            ],
          },
          {
            type: 'TableCell',
            content: [
              '78.1',
            ],
          },
          {
            type: 'TableCell',
            content: [
              '71.5',
            ],
          },
          {
            type: 'TableCell',
            content: [
              '1.1',
            ],
          },
        ],
      },
      {
        type: 'TableRow',
        cells: [
          {
            type: 'TableCell',
            content: [
              'Population older than 64 ',
              {
                type: 'Superscript',
                content: [
                  {
                    type: 'Link',
                    relation: 'table-fn',
                    target: '#T1_FN1',
                    content: [
                      'b/',
                    ],
                  },
                  {
                    type: 'Link',
                    relation: 'table-fn',
                    target: '#T1_FN1',
                    content: [
                      'c/',
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: 'TableCell',
            content: [
              '14.0',
            ],
          },
          {
            type: 'TableCell',
            content: [
              '16.5',
            ],
          },
          {
            type: 'TableCell',
            content: [
              '11.2',
            ],
          },
          {
            type: 'TableCell',
            content: [
              '1.5',
            ],
          },
          {
            type: 'TableCell',
            content: [
              '6.7',
            ],
          },
          {
            type: 'TableCell',
            content: [
              '7.5',
            ],
          },
          {
            type: 'TableCell',
            content: [
              '5.9',
            ],
          },
          {
            type: 'TableCell',
            content: [
              '1.3',
            ],
          },
        ],
      },
      {
        type: 'TableRow',
        cells: [
          {
            type: 'TableCell',
            content: [
              'Years of education ',
              {
                type: 'Superscript',
                content: [
                  {
                    type: 'Link',
                    relation: 'table-fn',
                    target: '#T1_FN1',
                    content: [
                      'b/',
                    ],
                  },
                  {
                    type: 'Link',
                    relation: 'table-fn',
                    target: '#T1_FN1',
                    content: [
                      'd/',
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: 'TableCell',
            content: [
              '9.8',
            ],
          },
          {
            type: 'TableCell',
            content: [
              '10.2',
            ],
          },
          {
            type: 'TableCell',
            content: [
              '9.5',
            ],
          },
          {
            type: 'TableCell',
            content: [
              '1.1',
            ],
          },
          {
            type: 'TableCell',
            content: [
              '8.7',
            ],
          },
          {
            type: 'TableCell',
            content: [
              '8.7',
            ],
          },
          {
            type: 'TableCell',
            content: [
              '8.8',
            ],
          },
          {
            type: 'TableCell',
            content: [
              '1.0',
            ],
          },
        ],
      },
      {
        type: 'TableRow',
        cells: [
          {
            type: 'TableCell',
            content: [
              'Participation rate ',
              {
                type: 'Superscript',
                content: [
                  {
                    type: 'Link',
                    relation: 'table-fn',
                    target: '#T1_FN1',
                    content: [
                      'b/',
                    ],
                  },
                  {
                    type: 'Link',
                    relation: 'table-fn',
                    target: '#T1_FN1',
                    content: [
                      'c/',
                    ],
                  },
                  {
                    type: 'Link',
                    relation: 'table-fn',
                    target: '#T1_FN1',
                    content: [
                      'e/',
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: 'TableCell',
            content: [
              '76.1',
            ],
          },
          {
            type: 'TableCell',
            content: [
              '66.9',
            ],
          },
          {
            type: 'TableCell',
            content: [
              '85.7',
            ],
          },
          {
            type: 'TableCell',
            content: [
              '0.8',
            ],
          },
          {
            type: 'TableCell',
            content: [
              '68.5',
            ],
          },
          {
            type: 'TableCell',
            content: [
              '54.8',
            ],
          },
          {
            type: 'TableCell',
            content: [
              '82.6',
            ],
          },
          {
            type: 'TableCell',
            content: [
              '0.7',
            ],
          },
        ],
      },
      {
        type: 'TableRow',
        cells: [
          {
            type: 'TableCell',
            content: [
              {
                type: 'Strong',
                content: [
                  'Households structure',
                ],
              },
              {
                type: 'Superscript',
                content: [
                  {
                    type: 'Link',
                    relation: 'table-fn',
                    target: '#T1_FN1',
                    content: [
                      'b/',
                    ],
                  },
                  {
                    type: 'Link',
                    relation: 'table-fn',
                    target: '#T1_FN1',
                    content: [
                      'f/',
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: 'TableRow',
        cells: [
          {
            type: 'TableCell',
            content: [
              'One person households',
            ],
          },
          {
            type: 'TableCell',
            content: [
              '21.9',
            ],
          },
          {
            type: 'TableCell',
            content: [],
          },
          {
            type: 'TableCell',
            content: [],
          },
          {
            type: 'TableCell',
            content: [],
          },
          {
            type: 'TableCell',
            content: [
              '11.0',
            ],
          },
          {
            type: 'TableCell',
            content: [],
          },
          {
            type: 'TableCell',
            content: [],
          },
          {
            type: 'TableCell',
            content: [],
          },
        ],
      },
      {
        type: 'TableRow',
        cells: [
          {
            type: 'TableCell',
            content: [
              'Couple without children',
            ],
          },
          {
            type: 'TableCell',
            content: [
              '17.2',
            ],
          },
          {
            type: 'TableCell',
            content: [],
          },
          {
            type: 'TableCell',
            content: [],
          },
          {
            type: 'TableCell',
            content: [],
          },
          {
            type: 'TableCell',
            content: [
              '9.0',
            ],
          },
          {
            type: 'TableCell',
            content: [],
          },
          {
            type: 'TableCell',
            content: [],
          },
          {
            type: 'TableCell',
            content: [],
          },
        ],
      },
      {
        type: 'TableRow',
        cells: [
          {
            type: 'TableCell',
            content: [
              'Couple with children',
            ],
          },
          {
            type: 'TableCell',
            content: [
              '33.2',
            ],
          },
          {
            type: 'TableCell',
            content: [],
          },
          {
            type: 'TableCell',
            content: [],
          },
          {
            type: 'TableCell',
            content: [],
          },
          {
            type: 'TableCell',
            content: [
              '39.9',
            ],
          },
          {
            type: 'TableCell',
            content: [],
          },
          {
            type: 'TableCell',
            content: [],
          },
          {
            type: 'TableCell',
            content: [],
          },
        ],
      },
      {
        type: 'TableRow',
        cells: [
          {
            type: 'TableCell',
            content: [
              'Lone-parent family',
            ],
          },
          {
            type: 'TableCell',
            content: [
              '12.0',
            ],
          },
          {
            type: 'TableCell',
            content: [],
          },
          {
            type: 'TableCell',
            content: [],
          },
          {
            type: 'TableCell',
            content: [],
          },
          {
            type: 'TableCell',
            content: [
              '11.9',
            ],
          },
          {
            type: 'TableCell',
            content: [],
          },
          {
            type: 'TableCell',
            content: [],
          },
          {
            type: 'TableCell',
            content: [],
          },
        ],
      },
      {
        type: 'TableRow',
        cells: [
          {
            type: 'TableCell',
            content: [
              'Extended households',
            ],
          },
          {
            type: 'TableCell',
            content: [
              '15.7',
            ],
          },
          {
            type: 'TableCell',
            content: [],
          },
          {
            type: 'TableCell',
            content: [],
          },
          {
            type: 'TableCell',
            content: [],
          },
          {
            type: 'TableCell',
            content: [
              '28.2',
            ],
          },
          {
            type: 'TableCell',
            content: [],
          },
          {
            type: 'TableCell',
            content: [],
          },
          {
            type: 'TableCell',
            content: [],
          },
        ],
      },
    ],
  },
  {
    type: 'Superscript',
    content: [
      {
        type: 'Link',
        relation: 'table-fn',
        target: '#T1_FN1',
        content: [
          'a/',
        ],
      },
    ],
  },
  {
    type: 'Emphasis',
    content: [
      'ind_file =1,277,210',
    ],
  },
  ],

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

const renderArticle = (): string => `
${renderArticleHeader(demoArticle)}
${renderArticleContent(demoArticle)}
`;
// ArticleBody

export default renderArticle;
