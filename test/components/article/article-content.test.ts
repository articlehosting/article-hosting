import article from '../../../src/__fixtures__/article';
import { ArticleIdentifier } from '../../../src/components/article/article';
import renderArticleContent, {
  CONTENT_CITE,
  CONTENT_EMPHASIS,
  CONTENT_FIGURE,
  CONTENT_HEADING,
  CONTENT_IDENTIFIER_PUBLISHERID,
  CONTENT_IMAGEOBJECT,
  CONTENT_LINK,
  CONTENT_PARAGRAPH,
  CONTENT_STRONG,
  CONTENT_SUPERSCRIPT,
  CONTENT_TABLE,
  CONTENT_TABLECELL,
  CONTENT_TABLEROW,
  renderCite,
  renderContentArray,
  renderContentBlock,
  renderEmphasis,
  renderFigure,
  renderHeader,
  renderImageObject,
  renderLink,
  renderParagraph,
  renderStrong,
  renderSuperscript,
  renderTable,
  renderTableCell,
  renderTableRow,
} from '../../../src/components/article/article-content';

describe('render article content', () => {
  it('should not throw', () => {
    expect(() => renderArticleContent(article)).not.toThrow();
  });

  describe('render article content headings', () => {
    it('should renderHeader with h tag', () => {
      expect(renderHeader({ type: CONTENT_HEADING, depth: 1, content: [''] })).toBe('<h1 class="ui header"></h1>');
    });

    it('should renderHeader with h tag and ID if provided', () => {
      expect(renderHeader({
        type: CONTENT_HEADING, depth: 1, content: [''], id: 'test-id',
      })).toBe('<h1 id="test-id" class="ui header"></h1>');
    });

    it('should renderHeader with h1 tag if depth not provided', () => {
      expect(renderHeader({
        type: CONTENT_HEADING, content: [''],
      })).toBe('<h1 class="ui header"></h1>');
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

  describe('render article content strong', () => {
    it('should renderStrong with p tag', () => {
      expect(renderStrong({ type: CONTENT_STRONG, content: [''] })).toBe('<b></b>');
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
        label: '',
        caption: [],
        rows: [],
      })).toContain('<table class="ui celled structured table">');
    });

    it('should renderTable with label', () => {
      expect(renderTable({
        type: CONTENT_TABLE,
        label: 'Table 1.',
        caption: [],
        rows: [],
      })).toContain('<span>Table 1.</span>');
    });

    it('should renderTable without label', () => {
      expect(renderTable({
        type: CONTENT_TABLE,
        label: '',
        caption: [],
        rows: [],
      })).toContain('<span></span>');
    });

    it('should renderTable with container specific id', () => {
      expect(renderTable({
        type: CONTENT_TABLE,
        label: '',
        id: 'table1',
        caption: [],
        rows: [],
      })).toContain('<div id="table1">');
    });

    it('should renderTable without container specific id', () => {
      expect(renderTable({
        type: CONTENT_TABLE,
        id: '',
        label: '',
        caption: [],
        rows: [],
      })).toContain('<div>');
    });

    it('should renderTable with caption', () => {
      expect(renderTable({
        type: CONTENT_TABLE,
        label: '',
        caption: [
          {
            type: 'Heading',
            depth: 3,
            content: [
              'Socio-demographic characteristics',
            ],
          },
        ],
        rows: [],
      })).toContain('<h3 class="ui header">Socio-demographic characteristics</h3>');
    });

    it('should renderTable with table row in thead', () => {
      expect(renderTable({
        type: CONTENT_TABLE,
        label: '',
        caption: [],
        rows: [{
          type: CONTENT_TABLEROW,
          cells: [{
            type: CONTENT_TABLECELL,
            content: [''],
          }],
          rowType: 'header',
        }],
      })).toContain('<thead><tr><th align=\'left\'></th></tr></thead>');
    });

    it('should renderTable with table row in tbody', () => {
      expect(renderTable({
        type: CONTENT_TABLE,
        label: '',
        caption: [],
        rows: [{
          type: CONTENT_TABLEROW,
          cells: [{
            type: CONTENT_TABLECELL,
            content: [''],
          }],
        }],
      })).toContain('<tbody><tr><td align=\'left\'></td></tr></tbody>');
    });

    it('should renderTable with table row in tbody when rowType is provided', () => {
      expect(renderTable({
        type: CONTENT_TABLE,
        label: '',
        caption: [],
        rows: [{
          type: CONTENT_TABLEROW,
          cells: [{
            type: CONTENT_TABLECELL,
            content: [''],
          }],
        }],
      })).toContain('<tbody><tr><td align=\'left\'></td></tr></tbody>');
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
      expect(renderTableCell({
        type: CONTENT_TABLECELL,
        content: [],
        colSpan: 4,
      }, false)).toBe('<td align=\'left\' colspan=\'4\'></td>');
    });
  });

  describe('render article content figure', () => {
    it('should renderFigure with figure tag', () => {
      expect(renderFigure({ type: CONTENT_FIGURE, content: [''] })).toContain('<figure>');
    });

    it('should renderFigure with id if id is provided', () => {
      const id = 'fig1';

      expect(renderFigure({ type: CONTENT_FIGURE, id, content: [''] })).toContain('<div id="fig1">');
    });

    it('should renderFigure with id if id is not provided', () => {
      expect(renderFigure({ type: CONTENT_FIGURE, content: [''] }).replace(/[\r\n\t\s]/g, ''))
        .toContain('<div><div><div><span></span></div></div>');
    });

    it('should renderFigure with label if label is provided', () => {
      const label = 'Label';

      expect(renderFigure({ type: CONTENT_FIGURE, label, content: [''] }))
        .toContain(`<span>${label}</span>`);
    });

    it('should renderFigure with label if label is not provided', () => {
      expect(renderFigure({ type: CONTENT_FIGURE, content: [''] }))
        .toContain('<span></span>');
    });

    it('should renderFigure with figcaption if figcaption is provided', () => {
      expect(renderFigure({
        type: CONTENT_FIGURE,
        caption: [
          {
            type: 'Heading',
            depth: 3,
            content: [
              'Personal Income Tax burden by income for selected individual types.',
            ],
          },
        ],
        content: [''],
      })).toContain('<figcaption><h3 class="ui header">Personal Income Tax burden by income for selected individual types.</h3></figcaption>');
    });

    it('should renderFigure with figcaption if figcaption is not provided', () => {
      expect(renderFigure({
        type: CONTENT_FIGURE,
        content: [''],
      })).toContain('<figcaption></figcaption>');
    });
  });

  describe('render article content imageobject', () => {
    const cantaloupeHostname = 'http://127.0.0.1:8182';
    const publisherId = '00202';
    const contentUrl = '/ijm-00202-fig001.tif';
    const imagePath = encodeURIComponent(`${publisherId}${contentUrl}`);

    const identifiers = [
      {
        ...(article.identifiers[0]),
        name: CONTENT_IDENTIFIER_PUBLISHERID,
        value: publisherId,
      },
    ];

    const context = { article: { ...article, identifiers } };

    it('should renderImageObject with a tag', () => {
      const size = '1500';

      expect(renderImageObject({
        type: CONTENT_IMAGEOBJECT,
        contentUrl,
        format: '',
        meta: { inline: false },
      }, context)).toContain(`<a href="${cantaloupeHostname}/iiif/2/${imagePath}/full/${size},/0/default.jpg" class="ui image">`);
    });

    it('should renderImageObject with img tag', () => {
      const size = '1200';

      expect(renderImageObject({
        type: CONTENT_IMAGEOBJECT,
        contentUrl,
        format: '',
        meta: { inline: false },
      }, context)).toContain(`<img src="${cantaloupeHostname}/iiif/2/${imagePath}/full/${size},/0/default.jpg">`);
    });

    it('should renderImageObject with source tag', () => {
      const size2x = '1234';
      const size1x = '617';

      expect(renderImageObject({
        type: CONTENT_IMAGEOBJECT,
        contentUrl,
        format: '',
        meta: { inline: false },
      }, context)).toContain(`<source srcset="${cantaloupeHostname}/iiif/2/${imagePath}/full/${size2x},/0/default.jpg 2x, ${cantaloupeHostname}/iiif/2/${imagePath}/full/${size1x},/0/default.jpg 1x" type="image/jpeg">`);
    });

    it('should not renderImageObject if contentUrl is empty', () => {
      expect(renderImageObject({
        type: CONTENT_IMAGEOBJECT,
        contentUrl: '',
        format: '',
        meta: { inline: false },
      })).toBe('');
    });

    it('should not renderImageObject if article identifier publisher is not exists', () => {
      const localContext = {
        article: {
          ...article,
          identifiers: [
            {
              ...(article.identifiers[0]),
              name: 'some',
            },
          ],
        },
      };

      expect(renderImageObject({
        type: CONTENT_IMAGEOBJECT,
        contentUrl,
        format: '',
        meta: { inline: false },
      }, localContext)).toBe('');
    });

    it('should not renderImageObject if article identifier publisher value is not exists', () => {
      const localContext = {
        article: {
          ...article,
          identifiers: [
            <ArticleIdentifier>{
              type: 'sometype',
              propertyID: 'somepropertyid',
              name: CONTENT_IDENTIFIER_PUBLISHERID,
            },
          ],
        },
      };

      expect(renderImageObject({
        type: CONTENT_IMAGEOBJECT,
        contentUrl,
        format: '',
        meta: { inline: false },
      }, localContext)).toBe('');
    });
  });
});
