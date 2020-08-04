import { Article } from '../../../src/components/article/article';
import renderArticleContent, {
  CONTENT_CITE,
  CONTENT_EMPHASIS,
  CONTENT_HEADING,
  CONTENT_LINK,
  CONTENT_PARAGRAPH,
  CONTENT_SUPERSCRIPT,
  CONTENT_TABLE,
  CONTENT_TABLECELL,
  CONTENT_TABLEROW,
  renderCite,
  renderContentArray,
  renderContentBlock,
  renderEmphasis,
  renderHeader,
  renderLink,
  renderParagraph,
  renderSuperscript,
  renderTable,
  renderTableCell,
  renderTableRow,
} from '../../../src/components/article/article-content';

const article: Article = {
  type: 'Article',
  title: 'Gendered effects of the personal income tax: Evidence from a schedular system with individual filing in Uruguay',
  authors: [],
  datePublished: {
    type: 'Date',
    value: '2020-07-17',
  },
  isPartOf: {
    type: 'PublicationVolume',
    isPartOf: {
      type: 'Periodical',
      identifiers: [],
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
  identifiers: [],
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
  keywords: [],
  licenses: [],
};

describe('render article content', () => {
  it('should not throw', () => {
    expect(() => renderArticleContent(article)).not.toThrow();
  });

  describe('render article content headings', () => {
    it('should renderHeader with h tag', () => {
      expect(renderHeader({ type: CONTENT_HEADING, depth: 1, content: [''] })).toContain('<h1></h1>');
    });

    it('should renderHeader with h tag and ID if provided', () => {
      expect(renderHeader({
        type: CONTENT_HEADING, depth: 1, content: [''], id: 'test-id',
      })).toContain('<h1 id="test-id">');
    });

    it('should renderHeader with h1 tag if depth not provided', () => {
      expect(renderHeader({
        type: CONTENT_HEADING, content: [''],
      })).toContain('<h1>');
    });
  });

  describe('render article content generic block', () => {
    it('should return an empty string if content is missing', () => {
      expect(renderContentArray({ type: CONTENT_SUPERSCRIPT, content: undefined })).toBe('');
    });

    it('should just render the exact string if string provided', () => {
      expect(renderContentBlock('test-string')).toBe('test-string');
    });

    it('should ignore unknown element types', () => {
      expect(renderContentBlock({
        type: 'abrakadabra',
        content: [],
      })).toBe('');
    });
  });

  describe('render article content superscript', () => {
    it('should renderSuperscript with sup tag', () => {
      expect(renderSuperscript({ type: CONTENT_SUPERSCRIPT, content: ['Text'] })).toBe('<sup>Text</sup>');
    });
  });

  describe('render article content emphasis', () => {
    it('should renderEmphasis with i tag', () => {
      expect(renderEmphasis({ type: CONTENT_EMPHASIS, content: ['Text'] })).toBe('<i>Text</i>');
    });
  });

  describe('render article content paragraph', () => {
    it('should renderParagraph with p tag', () => {
      expect(renderParagraph({ type: CONTENT_PARAGRAPH, content: [''] })).toContain('<p></p>');
    });
  });

  describe('render article content link', () => {
    it('should renderLink with a tag', () => {
      expect(renderLink({ type: CONTENT_LINK, target: '#test', content: [''] })).toBe('<a href="#test"></a>');
    });

    it('should render link with missing target', () => {
      expect(renderLink({
        type: CONTENT_LINK,
        content: [],
      })).toBe('<a href="#"></a>');
    });
  });

  describe('render article content cite', () => {
    it('should renderCite with a tag', () => {
      expect(renderCite({ type: CONTENT_CITE, target: 'test', content: [''] })).toBe('<a href="#test"></a>');
    });

    it('should render cite with missing target', () => {
      expect(renderCite({
        type: CONTENT_CITE,
        content: [],
      })).toBe('<a href="#"></a>');
    });
  });

  describe('render article content table', () => {
    it('should renderTable with table tag', () => {
      expect(renderTable({
        type: CONTENT_TABLE,
        content: [''],
      })).toContain('<table>');
    });

    it('should renderTable with label', () => {
      expect(renderTable({
        type: CONTENT_TABLE,
        label: 'Table 1.',
        content: [''],
      })).toContain('<span>Table 1.</span>');
    });

    it('should renderTable without label', () => {
      expect(renderTable({
        type: CONTENT_TABLE,
        label: '',
        content: [''],
      })).toContain('<span></span>');
    });

    it('should renderTable with container specific id', () => {
      expect(renderTable({
        type: CONTENT_TABLE,
        id: 'table1',
        content: [''],
      })).toContain('<div id="table1">');
    });

    it('should renderTable without container specific id', () => {
      expect(renderTable({
        type: CONTENT_TABLE,
        id: '',
        content: [''],
      })).toContain('<div>');
    });

    it('should renderTable with caption', () => {
      expect(renderTable({
        type: CONTENT_TABLE,
        caption: [
          {
            type: 'Heading',
            depth: 3,
            content: [
              'Socio-demographic characteristics',
            ],
          },
        ],
        content: [''],
      })).toContain('<h3>Socio-demographic characteristics</h3>');
    });
  });

  describe('render article table content tablerow', () => {
    it('should renderTableRow with tr tag', () => {
      expect(renderTableRow({ type: CONTENT_TABLEROW, cells: [] })).toBe('<tr></tr>');
    });

    it('should render empty table row when content is missing', () => {
      expect(renderTableRow(undefined)).toBe('<tr></tr>');
    });
  });

  describe('render article tabel content tablecell', () => {
    it('should renderTableCell with th tag if rowtype is header', () => {
      expect(renderTableCell({ type: CONTENT_TABLECELL, content: [] }, true)).toBe('<th align=\'left\'></th>');
    });

    it('should renderTableCell with td tag if rowtype is not header', () => {
      expect(renderTableCell({ type: CONTENT_TABLECELL, content: [] }, false)).toBe('<td align=\'left\'></td>');
    });

    it('should renderTableCell with th tag if rowtype is header and rowspan provided', () => {
      expect(renderTableCell({ type: CONTENT_TABLECELL, content: [], rowSpan: 2 }, true)).toBe('<th align=\'left\' rowspan=\'2\'></th>');
    });

    it('should renderTableCell with th tag if rowtype is header and colspan provided', () => {
      expect(renderTableCell({ type: CONTENT_TABLECELL, content: [], colSpan: 4 }, true)).toBe('<th align=\'left\' colspan=\'4\'></th>');
    });

    it('should renderTableCell with td tag if rowtype is not provided and rowspan provided', () => {
      expect(renderTableCell({ type: CONTENT_TABLECELL, content: [], rowSpan: 2 }, false)).toBe('<td align=\'left\' rowspan=\'2\'></td>');
    });

    it('should renderTableCell with td tag if rowtype is not provided and colspan provided', () => {
      expect(renderTableCell({ type: CONTENT_TABLECELL, content: [], colSpan: 4 }, false)).toBe('<td align=\'left\' colspan=\'4\'></td>');
    });
  });
});
