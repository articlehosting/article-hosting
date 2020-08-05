import { Article } from '../components/article/article';

const article: Article = {
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
    type: 'Paragraph',
    content: [
      'Also, the level of education of women, their labour force participation and their marital status have undergone a substantial change since the middle of the 20',
      {
        type: 'Superscript',
        content: [
          'th',
        ],
      },
      ' century. Uruguay is among Latin American countries in which these processes are in the most advanced stage, in part because of differences in initial conditions. Uruguayan women have on average 10.2 years of schooling and their participation rate is 67 per cent whereas the Latin American averages are respectively 8.7 years and 55 per cent (see ',
      {
        type: 'Link',
        relation: 'table',
        target: '#table1',
        content: [
          'Table 1',
        ],
      },
      '). Note that in Uruguay, female level of education is higher than male; this difference is even larger among workers because female labour participation increases with education. The socio-demographic changes have impacted household structures to the extent that they are substantially different from the Latin American average. Since the aging process is more advanced in Uruguay, there is a relatively high incidence of one person households (mostly elderly) and couples without children, as reported in ',
      {
        type: 'Link',
        relation: 'table',
        target: '#table1',
        content: [
          'Table 1',
        ],
      },
      '. Another relevant characteristic is that the share of extended households is relatively low. In this paper we focus on non-extended households (84 per cent of all households). Single-parent households, majoritarily headed by an adult woman, are 12 per cent of total households.',
    ],
  },
  {
    type: 'Paragraph',
    content: [
      'In sum, this brief picture shows that women are very much involved in the economy, and thus they were affected by the creation of the Personal Income Tax. However, the effect of PIT is different for women and men if there are gender differences in factors such as labour market outcomes and evasion.',
    ],
  },
  {
    type: 'Paragraph',
    content: [
      'The average labour income is lower for men than women. Between 2006 and 2013, the gender gap ranged between 47% and 56% of male labour income (',
      {
        type: 'Cite',
        target: 'bib8',
        content: [
          'Bucheli and Lara, 2018',
        ],
      },
      '). Part of it is due to gender differences in time spent in labour market: working hours per week were on average 32 for women and more than 40 for men. Other portion is related to gender differences in labour income per hour: in 2006–2013, the average value of (post-tax) per hour labour income gender gap oscillated around 6% of male labour income. Previous studies for Uruguay show that the gender gap subsists after controlling individual observable characteristics and that the discrimination measures have been stable in the last two decades (',
      {
        type: 'Cite',
        target: 'bib3',
        content: [
          'Amarante et al., 2004',
        ],
      },
      '; ',
      {
        type: 'Cite',
        target: 'bib9',
        content: [
          'Bucheli and Sanromán, 2005',
        ],
      },
      '; ',
      {
        type: 'Cite',
        target: 'bib14',
        content: [
          'Espino, 2013',
        ],
      },
      '; ',
      {
        type: 'Cite',
        target: 'bib15',
        content: [
          'Espino et al., 2014',
        ],
      },
      '). These works find that the portion of the gender gap that is not explained by observable productive attributes (which is usually interpreted as a measure of discrimination) is on average more than 100% of the wage gap, and that there is evidence of a glass ceiling phenomena for the most educated women.',
    ],
  },
  {
    type: 'Paragraph',
    content: [
      'Part of the wage gap that is not explained by observable attributes is due to occupational segregation. However, a considerable wage gap subsists when job characteristics are controlled. According to ',
      {
        type: 'Cite',
        target: 'bib15',
        content: [
          'Espino et al. (2014)',
        ],
      },
      ', also the level of segregation has been stable in the last decades. In 2006–2013, women were less than 10% of employment in the construction sector, mining and manufacture of machinery and equipment whereas they were more than 90% in garment sector and more than 70% in health care, education and personal services. Besides salary work is higher among women than men (74% and 69% of female and male employment, respectively) whereas self-employment is lower (20% and 24%).',
    ],
  },
  {
    type: 'Paragraph',
    content: [
      'Finally, an important question as regards the PIT burden is to examine gender differences in evasion patterns. We have information about the incidence of non-contribution to social security among workers. As contributions are compulsory for all workers, lack of contribution is a good proxy of PIT evasion. The incidence of non-contribution declined from 35% to 26% of employment between 2006 and 2013. This decline may be explained by the combination of growth and the strengthening of controls of the Administration. During all the period, the incidence of lack of contribution was similar for women and men.',
    ],
  },
  {
    type: 'Heading',
    id: 's2-2',
    depth: 2,
    content: [
      '2.2. The Personal Income Tax',
    ],
  },
  {
    type: 'Paragraph',
    content: [
      'In 2004, for the first time in Uruguayan history, national elections were won by a left coalition. The new administration that entered into office in 2005 was strongly committed with the reduction of inequality and poverty, and to carry out reforms of the tax and benefits system. One of the main pledges during the political campaign was to increase tax progressivity without changing the average tax burden. In 2007 the government passed a Tax Reform that increased the weight of progressive direct taxes at the expense of indirect taxes. Besides introducing changes in the indirect tax system, the reform created a Personal Income Tax that reflected the spirit of the latest reforms that were proposed and debated in developed countries.',
    ],
  },
  {
    type: 'Paragraph',
    content: [
      'First, it was designed as an individual filing system without explicit gender bias. The possibility to opt for joint taxation was introduced in 2009 and is only allowed for labour income received by married couples or those in a consensual union. Though there is no information about the percentage of couples that choose this option, administrative records make it possible to estimate it. The Tax Office provides information of the number of tax units registered as taxpayers (including exempted and non-exempted ones) of the PIT labour income component. These tax units include workers that choose individual filing (',
      {
        type: 'Emphasis',
        content: [
          'ind_file =1,277,210',
        ],
      },
      ' in 2013) and couples that choose joint filing (',
      {
        type: 'Emphasis',
        content: [
          'joint_file =22,567',
        ],
      },
      ' in 2013). The number of individuals involved in the records was 1,332,344 (',
      {
        type: 'Emphasis',
        content: [
          '= ind_file +2*joint_file',
        ],
      },
      ') in 2013. According to the Household Survey of 2013, 63% of workers lived with a partner. If we apply this proportion to Tax Office information we may estimate that in 2013 the records involved 416,538 (',
      {
        type: 'Emphasis',
        content: [
          '=(ind_file +2*joint_file)*0.63/2',
        ],
      },
      ') couples. So, we estimate that only 5.4% of couples chose joint filing in 2013.',
    ],
  },
  {
    type: 'Paragraph',
    content: [
      'Second, PIT was conceived as a dual tax under which capital income was taxed at a flat rate whereas labour income and pensions were subjected to progressive rates. Some months after its introduction, litigious issues led to taking out pensions and creating a progressive tax specific to them. In this study we refer to the PIT, including on pensions. The government justified the dual income tax because of the difficulties of tracing non-domestic sources of income, the prevention of lobbying activities and the high risk of evasion (',
      {
        type: 'Cite',
        target: 'bib7',
        content: [
          'Barreix and Roca, 2007',
        ],
      },
      '). At the same time, it facilitates tax administration relating to ownership and splitting treatments (for pros and cons of dual income taxes, see ',
      {
        type: 'Cite',
        target: 'bib17',
        content: [
          'Genser and Reutter, 2007',
        ],
      },
      '). With regard to the topic of concern in this study, a relevant characteristic of the dual structure is that a flat rate on capital income eliminates the incentive for capital income splitting between the household members, which has potential gender consequences.',
    ],
  },
  {
    type: 'Paragraph',
    content: [
      'Capital gains (derived from sales) and holding income (derived from the possession of assets) are taxed at a flat rate that varies between 3 per cent and 12 per cent depending on the source (interests, profits, etc.). Deductions are allowed for bad debts, real estate taxes, and the cost of renting. In most of the cases, there is a withholding agent. If not, advance payments and annual filings are required.',
    ],
  },
  {
    type: 'Paragraph',
    content: [
      'Pensions are subject to individual progressive taxation and there is no option for joint taxation. There are four marginal rates that range from zero to 25 per cent. Tenants are allowed to subtract 6 per cent of their rent and no other deductions are allowed. The agencies that administer the Social Security System are the withholding agents responsible for collection and payment of the tax. When receiving pensions from different agencies, the taxpayer must do an annual filing.',
    ],
  },
  {
    type: 'Paragraph',
    content: [
      'Taxes on labour income have to be paid monthly in the case of employees (held at source) and bimonthly in the case of the self-employed. An annual filing is required except in the case of employees with only one job and eventual disparities should be closed out. The tax is equal to a primary tax minus tax credits.',
    ],
  },
  {
    type: 'Paragraph',
    content: [
      'The primary tax is calculated by applying the rate on the gross earnings of wage earners and on 70 per cent of gross income of the self-employed. The tax schedule has seven marginal rates ranging from zero to 30 per cent.',
    ],
  },
  {
    type: 'Paragraph',
    content: [
      'The tax credits are comprised of worker contributions and taxes levied on labour income, a fixed amount per child (higher in the case of a disabled child) and mortgage payments when the house is used for permanent residence and its cost is lower than a threshold. The tax credit for children can be distributed between parents. When parents are divorced and they do not agree about this distribution, each one can deduct 50 per cent. In order to calculate the amount of the tax credit, a progressive rate schedule applies that ranges from 10 per cent in the first bracket to 30 per cent in the sixth. After subtracting these tax credits, tenants are allowed to additionally subtract 6 per cent of their rent. If this deduction generates a surplus, this surplus is not refunded by the tax office and cannot be transferred to the following year.',
    ],
  },
  {
    type: 'Paragraph',
    content: [
      'In ',
      {
        type: 'Link',
        relation: 'fig',
        target: '#fig1',
        content: [
          'Figure 1',
        ],
      },
      ' we show the tax burden by monthly income according to the statutory rates under individual filing. We graph the cases of pensioners and four types of workers, in order to take into account that the tax-to-labour income ratio depends on the feasibility of using tax credits. We only show the tax burden for income below US$ 8000, although this amount falls inside the fifth bracket of the primary tax on labour earnings. A level of income (wage or pension) over US$ 8,000 is rarely observed as shown by the overlapped vertical lines. Dotted lines indicate the 75th, 90th and 99th percentiles of the distribution of pensions and continuous lines indicate the same percentiles of the distribution of labour income.',
      {
        type: 'Superscript',
        content: [
          '[',
          {
            type: 'Link',
            relation: 'fn',
            target: '#fn1',
            content: [
              '1',
            ],
          },
          ']',
        ],
      },
    ],
  },
  {
    type: 'Figure',
    id: 'fig1',
    caption: [
      {
        type: 'Heading',
        depth: 3,
        content: [
          'Personal Income Tax burden by income for selected individual types.',
        ],
      },
    ],
    label: 'Figure 1.',
    content: [
      {
        type: 'ImageObject',
        contentUrl: '/ijm-00202-fig001.tif',
        format: '',
        meta: {
          inline: false,
        },
      },
    ],
  },
  {
    type: 'Paragraph',
    content: [
      'As shown in ',
      {
        type: 'Link',
        relation: 'fig',
        target: '#fig1',
        content: [
          'Figure 1',
        ],
      },
      ', pensioners are exempt up to about US$ 1,000 per month. The labour earnings schedule starts after a tax-free allowance of about US$ 900 but a single worker (who faces the highest burden among workers) pays taxes only when gross earnings exceed US$ 1,100 because of tax credits. The actual applicability of these thresholds can be observed in the vertical lines. According to estimations by ',
      {
        type: 'Cite',
        target: 'bib11',
        content: [
          'Burdín et al. (2015)',
        ],
      },
      ' based on tax records, in 2012 only 20.1 per cent of pensioners and 33.6 per cent of workers paid the PIT.',
    ],
  },
  {
    type: 'Paragraph',
    content: [
      'For most income levels, the tax burden is higher for pensioners than workers because tax credits are allowed for labour earnings but there is no tax-free threshold for pensions. Among workers, the highest burden corresponds to a single person without children followed by a single person with one child. To calculate the tax burden of a single parent worker with one child we assumed that he/she makes 100 per cent use of the child deduction. The tax burden is a bit lower when the parent of a child is married or in union. Although there are no explicit legal differences, the single worker pays a higher share of income as PIT because contributions to the health system (eligible for tax credits) are lower for them than for married people. Finally, the lowest burden corresponds to a married worker with a child who is paying a mortgage equal to the maximum permitted value for the tax credit.',
    ],
  },
  {
    type: 'Paragraph',
    content: [
      'Source: author’s calculations based on tax schedule rates.',
    ],
  },
  {
    type: 'Paragraph',
    content: [
      'Note: Dotted vertical lines indicate the 75th, 90th and 99th percentiles of the distribution of pensions and solid vertical lines indicate the same percentiles of the distribution of labor income',
    ],
  },
  {
    type: 'Paragraph',
    content: [
      'To analyse joint filing we calculated the tax burden for selected couples. Specifically, we calculated taxes that would be paid under joint and under individual filing for couples with same labour market income but different participation of each spouse in its generation. We assumed that there are no children or mortgage credits. In ',
      {
        type: 'Link',
        relation: 'fig',
        target: '#fig2',
        content: [
          'Figure 2',
        ],
      },
      ' we show the average tax rate paid by the couple for chosen income levels (which are indicated close to the curves) that reflect different position in the labour income distribution of couples: US$ 1,200 (close to percentile 12), 1,800 (22), 3,000 (43), 4,800 (66), 7,200 (83), 10,200 (92), 15,000 (97).',
    ],
  },
  {
    type: 'Figure',
    id: 'fig2',
    caption: [
      {
        type: 'Heading',
        depth: 3,
        content: [
          'Personal Income Tax-to-income ratio for selected couples by participation of one spouse in generating labour income.',
        ],
      },
    ],
    label: 'Figure 2.',
    content: [
      {
        type: 'ImageObject',
        contentUrl: '/ijm-00202-fig002.tif',
        format: '',
        meta: {
          inline: false,
        },
      },
    ],
  },
  {
    type: 'Paragraph',
    content: [
      'The solid lines depict the path of the tax burden under individual filing as the participation of one spouse in labour market income generation rises. Participation ranges from 0 to 50 per cent, so unsurprisingly the curves are decreasing (or at least non-increasing), reflecting the advantages of sharing labour market activities between spouses.',
    ],
  },
  {
    type: 'Paragraph',
    content: [
      'Source: author’s calculations based on schedule rates.',
    ],
  },
  {
    type: 'Paragraph',
    content: [
      'Note: The tax burden is calculated for different levels of couples’ labour income: US$ 1,200 (close to percentile 12 of the labor income distribution of couples), 1,800 (22), 3,000 (43), 4,800 (66), 7,200 (83), 10,200 (92), 15,000 (97). Dotted lines represent the tax burden under joint filing; solid lines represent the tax burden under individual filing.',
    ],
  },
  {
    type: 'Paragraph',
    content: [
      'The dotted lines show the pattern of the tax burden with one spouse generating labour income under joint filing. We observe that all the joint filing curves show a one-step fall. This is easily explained. The tax schedule under joint filing distinguishes two cases: one is applied when the earnings of at least one spouse are below a threshold (12 times annual minimum wage) and the other one when earnings of both spouses exceed the threshold.',
    ],
  },
  {
    type: 'Paragraph',
    content: [
      'For all levels of labour income of the couples, when only one spouse participates in the labour market, the tax burden of the couple is lower under joint than individual filing. As seen in ',
      {
        type: 'Link',
        relation: 'fig',
        target: '#fig2',
        content: [
          'Figure 2',
        ],
      },
      ', this holds for the lowest values of the x-axis.',
    ],
  },
  {
    type: 'Paragraph',
    content: [
      'Although the figure does not reflect all possible situations, a first look suggests that the code does not encourage uneven labour market participation between spouses to reach a level of income. Indeed, the most interesting aspect of the curves is that if the couple chooses the least burdensome option (given income), the resulting curve is non-increasing, reflecting that there are advantages to sharing labour market time between spouses, or at least that there are not disadvantages.',
    ],
  },
  {
    type: 'Paragraph',
    content: [
      {
        type: 'Link',
        relation: 'fig',
        target: '#fig2',
        content: [
          'Figure 2',
        ],
      },
      ' also helps to illustrate a gender related issue discussed by ',
      {
        type: 'Cite',
        target: 'bib23',
        content: [
          'Nelson (1991)',
        ],
      },
      ': dedication of women to household services may be encouraged because of the non-recognition of home production as a taxable income. When only one spouse participates in the labour market, household services are provided by the other spouse without facing a burden tax. Meanwhile, the two-earner couple can reach higher levels of labour income and therefore bear a higher burden tax, though it would need for money to pay for market goods to replace home production. For all the income levels reported in ',
      {
        type: 'Link',
        relation: 'fig',
        target: '#fig2',
        content: [
          'Figure 2',
        ],
      },
      ', we find that the tax burden faced by a one earner couple under joint taxation is lower than the burden faced a by two-earner couple that generates twice as much as the former.',
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

export default article;
