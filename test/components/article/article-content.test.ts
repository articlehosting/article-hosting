import { Article } from '../../../src/components/article/article';
import renderArticleContent, {
  CONTENT_CITE,
  CONTENT_EMPHASIS, CONTENT_HEADING, CONTENT_LINK,
  CONTENT_PARAGRAPH, CONTENT_SUPERSCRIPT,
  renderCite,
  renderContentBlock, renderEmphasis, renderHeader, renderLink, renderParagraph, renderSuperscript,
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
});
