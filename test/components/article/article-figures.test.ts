import article from '../../../src/__fixtures__/article';
import { TableContent } from '../../../src/components/article/article';
import {
  CONTENT_FIGURE,
  CONTENT_SUPERSCRIPT,
  CONTENT_TABLE,
  CONTENT_TABLECELL,
  CONTENT_TABLEROW,
} from '../../../src/components/article/article-content';
import {
  renderArticleFiguresContent,
  renderContentArray,
  renderContentBlock,
  renderFigure,
  renderTable,
  renderTableCell,
  renderTableRow,
} from '../../../src/components/article/article-figures';

describe('render article figures content', () => {
  it('should not throw', () => {
    expect(() => renderArticleFiguresContent(article)).not.toThrow();
  });

  describe('render article figures content generic block', () => {
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

  describe('render article figures content table', () => {
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
      })).toContain('<h4>Socio-demographic characteristics</h4>');
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

  describe('render article figures content with figure', () => {
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
      })).toContain('<figcaption><h4>Personal Income Tax burden by income for selected individual types.</h4></figcaption>');
    });

    it('should renderFigure with figcaption if figcaption is not provided', () => {
      expect(renderFigure({
        type: CONTENT_FIGURE,
        content: [''],
      })).toContain('<figcaption></figcaption>');
    });
  });
});
