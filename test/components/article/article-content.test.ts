import article from '../../../src/__fixtures__/article';
import { ArticleIdentifier, TableContent } from '../../../src/components/article/article';
import { renderArticleBody } from '../../../src/components/article/article-body';
import {
  CONTENT_CITE,
  CONTENT_EMPHASIS,
  CONTENT_FIGURE,
  CONTENT_HEADING, CONTENT_IDENTIFIER_DOI,
  CONTENT_IDENTIFIER_PUBLISHERID,
  CONTENT_IMAGEOBJECT,
  CONTENT_LINK,
  CONTENT_PARAGRAPH,
  CONTENT_STRONG,
  CONTENT_SUPERSCRIPT,
  CONTENT_TABLE,
  CONTENT_TABLECELL,
  CONTENT_TABLEROW, renderArticleDescription, renderArticleImageUrl,
  renderArticleTitle,
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
  renderTableCell, renderTableDescription,
  renderTableRow,
} from '../../../src/components/article/article-content';

describe('render article content', () => {
  it('should not throw', () => {
    expect(() => renderArticleBody(article)).not.toThrow();
  });

  describe('render article content headings', () => {
    it('should renderHeader with h tag', () => {
      expect(renderHeader({ type: CONTENT_HEADING, depth: 1, content: [''] })).toBe('<h2></h2>');
    });

    it('should renderHeader with h tag and ID if provided', () => {
      expect(renderHeader({
        type: CONTENT_HEADING, depth: 1, content: [''], id: 'test-id',
      })).toBe('<h2 id="test-id"></h2>');
    });

    it('should renderHeader with h1 tag if depth not provided', () => {
      expect(renderHeader({
        type: CONTENT_HEADING, content: [''],
      })).toBe('<h1></h1>');
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
    const contentTable: TableContent = {
      type: CONTENT_TABLE,
      label: '',
      caption: [],
      rows: [],
      description: [],
    };

    it('should renderTable with table tag', () => {
      expect(renderTable(contentTable)).toContain('<table class="ui celled structured table">');
    });

    it('should renderTable with label', () => {
      expect(renderTable({ ...contentTable, label: 'Table 1.' })).toContain('<strong>Table 1.</strong>');
    });

    it('should renderTable without label', () => {
      expect(renderTable(contentTable)).toContain('<strong></strong>');
    });

    it('should renderTable with container specific id', () => {
      expect(renderTable({ ...contentTable, id: 'table1' })).toContain('<div id="table1" class="article-table">');
    });

    it('should renderTable without container specific id', () => {
      expect(renderTable(contentTable)).toContain('<div class="article-table">');
    });

    it('should renderTable with caption', () => {
      expect(renderTable({
        ...contentTable,
        caption: [
          {
            type: 'Heading',
            depth: 3,
            content: [
              'Socio-demographic characteristics',
            ],
          },
        ],
      })).toContain('<h6>Socio-demographic characteristics</h6>');
    });

    it('should renderTable with table row in thead', () => {
      expect(renderTable({
        ...contentTable,
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
        ...contentTable,
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
        ...contentTable,
        rows: [{
          type: CONTENT_TABLEROW,
          cells: [{
            type: CONTENT_TABLECELL,
            content: [''],
          }],
        }],
      })).toContain('<tbody><tr><td align=\'left\'></td></tr></tbody>');
    });

    it('should renderTableDescription with id and content provided', () => {
      const content = renderTableDescription([
        {
          type: 'Paragraph',
          id: 'T1_FN1',
          meta: {
            footnoteType: 'general',
          },
          content: [
            {
              type: 'Emphasis',
              content: [
                'Notes',
              ],
            },
            ': testing.',
          ],
        },
      ]);

      expect(content).toContain('<li id="T1_FN1">');
      expect(content).toContain('<div class="table-footnote__text">');
      expect(content).toContain('<i>Notes</i>: testing.');
    });

    it('should renderTable with table two descriptions id and content provided', () => {
      const content = renderTableDescription([
        {
          type: 'Paragraph',
          id: 'T1_FN1',
          meta: {
            footnoteType: 'general',
          },
          content: [
            {
              type: 'Emphasis',
              content: [
                'Notes',
              ],
            },
            ': testing p one.',
          ],
        },
        {
          type: 'Paragraph',
          content: [
            {
              type: 'Emphasis',
              content: [
                'Source:',
              ],
            },
            ' testing p two.',
          ],
        },
      ]);

      expect(content).toContain('<li id="T1_FN1">');
      expect(content).toContain('<div class="table-footnote__text">');
      expect(content).toContain('<i>Notes</i>: testing p one.');
      expect(content).toContain('<i>Source:</i> testing p two.');
    });

    it('should renderTable with table description content only provided', () => {
      const content = renderTableDescription([
        {
          type: 'Paragraph',
          content: [
            {
              type: 'Emphasis',
              content: [
                'Source:',
              ],
            },
            ' testing.',
          ],
        },
      ]);

      expect(content).toContain('<li>');
      expect(content).toContain('<div class="table-footnote__text">');
      expect(content).toContain('<i>Source:</i> testing.');
    });

    it('should renderTable without table description', () => {
      const content = renderTableDescription([]);

      expect(content).not.toContain('<li>');
      expect(content).not.toContain('<div class="table-footnote__text">');
      expect(content).not.toContain('<i>');
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
      expect(renderTableCell({ type: CONTENT_TABLECELL, content: [], rowspan: 2 }, true)).toBe('<th align=\'left\' rowspan=\'2\'></th>');
    });

    it('should renderTableCell with th tag if rowtype is header and colspan provided', () => {
      expect(renderTableCell({ type: CONTENT_TABLECELL, content: [], colspan: 4 }, true)).toBe('<th align=\'left\' colspan=\'4\'></th>');
    });

    it('should renderTableCell with td tag if rowtype is not provided and rowspan provided', () => {
      expect(renderTableCell({ type: CONTENT_TABLECELL, content: [], rowspan: 2 }, false)).toBe('<td align=\'left\' rowspan=\'2\'></td>');
    });

    it('should renderTableCell with td tag if rowtype is not provided and colspan provided', () => {
      expect(renderTableCell({
        type: CONTENT_TABLECELL,
        content: [],
        colspan: 4,
      }, false)).toBe('<td align=\'left\' colspan=\'4\'></td>');
    });
  });

  describe('render article content figure', () => {
    it('should renderFigure with figure tag', () => {
      expect(renderFigure({ type: CONTENT_FIGURE, content: [''] })).toContain('<figure class="captioned-asset">');
    });

    it('should renderFigure with id if id is provided', () => {
      const id = 'fig1';

      expect(renderFigure({ type: CONTENT_FIGURE, id, content: [''] })).toContain('<div class="asset-viewer" id="fig1">');
    });

    it('should renderFigure with id if id is not provided', () => {
      expect(renderFigure({ type: CONTENT_FIGURE, content: [''] }))
        .toContain('<div class="asset-viewer">');
    });

    it('should renderFigure with label if label is provided', () => {
      const label = 'Label';

      expect(renderFigure({ type: CONTENT_FIGURE, label, content: [''] }))
        .toContain(`<span class="asset-viewer-inline-text-prominent">${label}</span>`);
    });

    it('should renderFigure with label if label is not provided', () => {
      expect(renderFigure({ type: CONTENT_FIGURE, content: [''] }))
        .toContain('<span class="asset-viewer-inline-text-prominent"></span>');
    });

    it('should renderFigure with figcaption if figcaption is provided', () => {
      const result = renderFigure({
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
      });

      expect(result).toContain('<figcaption class="figcaptioned-asset">');
      expect(result).toContain('<h6>Personal Income Tax burden by income for selected individual types.</h6>');
    });

    it('should renderFigure with figcaption if figcaption is not provided', () => {
      const result = renderFigure({
        type: CONTENT_FIGURE,
        content: [''],
      });

      expect(result).toContain('<figcaption class="figcaptioned-asset">');
      expect(result).not.toContain('<h6>');
      expect(result).not.toContain('<caption-text__body>');
    });
  });

  describe('render article content imageobject', () => {
    const identifiers = [
      {
        type: 'PropertyValue',
        name: 'doi',
        propertyID: 'https://registry.identifiers.org/registry/doi',
        value: '10.34196/ijm.00202',
      },
    ];

    const doi = identifiers[0].value;
    const imageFile = 'ijm-00202-fig001.tif';
    const contentUrl = `ijm-media/${imageFile}`;
    const imagePath = encodeURIComponent(`${doi}/${imageFile}`);

    const context = { article: { ...article, identifiers } };

    it('should renderImageObject with a tag', () => {
      const size = '1500';

      expect(renderImageObject({
        type: CONTENT_IMAGEOBJECT,
        contentUrl,
        format: '',
        meta: { inline: false },
      }, context)).toContain(`<a class="view-icon" href="/iiif/2/${imagePath}/full/${size},/0/default.jpg">`);
    });

    it('should renderImageObject with img tag', () => {
      const size = '1200';

      expect(renderImageObject({
        type: CONTENT_IMAGEOBJECT,
        contentUrl,
        format: '',
        meta: { inline: false },
      }, context)).toContain(`<img class="captioned-image" src="/iiif/2/${imagePath}/full/${size},/0/default.jpg">`);
    });

    it('should renderImageObject with source tag', () => {
      const size2x = '1234';
      const size1x = '617';

      expect(renderImageObject({
        type: CONTENT_IMAGEOBJECT,
        contentUrl,
        format: '',
        meta: { inline: false },
      }, context)).toContain(`<source srcset="/iiif/2/${imagePath}/full/${size2x},/0/default.jpg 2x, /iiif/2/${imagePath}/full/${size1x},/0/default.jpg 1x" type="image/jpeg">`);
    });

    it('should not renderImageObject if contentUrl is empty', () => {
      expect(renderImageObject({
        type: CONTENT_IMAGEOBJECT,
        contentUrl: '',
        format: '',
        meta: { inline: false },
      })).toBe('');
    });

    it('should not renderImageObject if article identifier publisher not exists', () => {
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

    it('should not renderImageObject if article identifier publisher value not exists', () => {
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

    it('should not renderArticleImageUrl if publisher identifier not exists', () => {
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

      const result = renderArticleImageUrl(localContext.article, contentUrl);

      expect(result).toBe('');
    });

    it('should renderArticleImageUrl normally', () => {
      const localContext = {
        article: {
          ...article,
          identifiers: [
            {
              ...(article.identifiers[0]),
              name: CONTENT_IDENTIFIER_DOI,
              value: doi,
            },
          ],
        },
      };

      const result = renderArticleImageUrl(localContext.article, contentUrl);

      expect(result).toBe(`${doi}/${imageFile}`);
    });

    it('should renderArticleDescription if description is string', () => {
      const localContext = {
        article: {
          ...article,
          description: 'test',
        },
      };

      const result = renderArticleDescription(localContext.article);

      expect(result).toContain('test');
    });

    it('should renderArticleDescription if description is html array', () => {
      const localContext = {
        article: {
          ...article,
          description: [
            {
              type: 'Paragraph',
              content: [
                'Test',
              ],
            },
          ],
        },
      };

      const result = renderArticleDescription(localContext.article);

      expect(result).toContain('<p>Test</p>');
    });

    it('should renderArticleDescription if description is string array', () => {
      const localContext = {
        article: {
          ...article,
          description: [
            'Test',
          ],
        },
      };

      const result = renderArticleDescription(localContext.article);

      expect(result).toContain('Test');
    });

    it('should renderArticleTitle if title is html array', () => {
      const localContext = {
        article: {
          ...article,
          title: [
            {
              type: 'Paragraph',
              content: [
                'Test',
              ],
            },
          ],
        },
      };

      const result = renderArticleTitle(localContext.article);

      expect(result).toContain('<p>Test</p>');
    });

    it('should renderArticleTitle if title is string array', () => {
      const localContext = {
        article: {
          ...article,
          title: ['Test'],
        },
      };

      const result = renderArticleTitle(localContext.article);

      expect(result).toContain('Test');
    });
  });
});
