import article from '../../../src/__fixtures__/article';
import renderArticleReferences, { renderReference, renderReferencePublication, renderScholar } from '../../../src/components/article/article-reference';

describe('render article references', () => {
  it('should render a semantic list', () => {
    expect(renderArticleReferences({ ...article, references: [] })).toContain('<div class="ui ordered relaxed list">');
  });

  it('should render an h2 title', () => {
    expect(renderArticleReferences({ ...article, references: [] })).toContain('<h2 class="ui header">References</h2>');
  });
});

describe('render single reference', () => {
  it('should render a p header title', () => {
    expect(renderReference({
      type: 'Article',
      authors: [],
      datePublished: '2011',
      isPartOf: {
        type: 'PublicationVolume',
        volumeNumber: 3,
      },
      title: 'Gender-Based taxation and the division of family chores',
    })).toContain('<p class="header">Gender-Based taxation and the division of family chores</p>');
  });

  it('should render a p header title from partOf name when title is missing', () => {
    expect(renderReference({
      type: 'Article',
      authors: [],
      datePublished: '2011',
      isPartOf: {
        type: 'Article',
        name: 'testName',
      },
    })).toContain('<p class="header">testName</p>');
  });

  it('should render an empty string when title and partOf name is missing', () => {
    expect(renderReference({
      type: 'Article',
      authors: [],
      datePublished: '2011',
      isPartOf: {
        type: 'Article',
      },
    })).toContain('<p class="header"></p>');
  });

  it('should render date published', () => {
    expect(renderReference({
      type: 'Article',
      authors: [],
      datePublished: '2011',
      isPartOf: {
        type: 'Article',
      },
    })).toContain('<div class="description"> (2011)</div>');
  });
});

describe('render scholars', () => {
  it('should render authors full name', () => {
    expect(renderScholar({
      type: 'Person',
      familyNames: [
        'Alesina',
      ],
      givenNames: [
        'A',
      ],
    })).toContain('A Alesina');
  });

  it('should render authors full names', () => {
    expect(renderScholar({
      type: 'Person',
      familyNames: [
        'Alesina',
        'Jay',
      ],
      givenNames: [
        'A',
      ],
    })).toContain('A Alesina Jay');
  });

  it('should render a link to google scholar authors', () => {
    expect(renderScholar({
      type: 'Person',
      familyNames: [
        'Alesina',
      ],
      givenNames: [
        'A',
      ],
    })).toContain('<a href="https://scholar.google.com/scholar?q=%22author:A Alesina%22">A Alesina</a>');
  });
});

describe('render reference publication', () => {
  it('should render i with name when isPartOf is received', () => {
    expect(renderReferencePublication({
      type: 'Article',
      authors: [],
      datePublished: '2011',
      isPartOf: {
        type: 'PublicationVolume',
        isPartOf: {
          type: 'Periodical',
          name: 'American Economic Journal: Economic Policy',
        },
      },
    })).toContain('<i>American Economic Journal: Economic Policy</i>');
  });

  it('should render strong tag with volume number when isPartOf is nested', () => {
    const volumeNumber = 3;

    expect(renderReferencePublication({
      type: 'Article',
      authors: [],
      datePublished: '2011',
      isPartOf: {
        type: 'PublicationVolume',
        isPartOf: {
          type: 'Periodical',
          name: 'American Economic Journal: Economic Policy',
        },
        volumeNumber,
      },
      pageEnd: 40,
      pageStart: 1,
    })).toContain('<strong>3</strong>');
  });

  it('should render span tag with pageStart and pageEnd when isPartOf is nested', () => {
    const pageStart = 1;
    const pageEnd = 40;

    expect(renderReferencePublication({
      type: 'Article',
      authors: [],
      datePublished: '2011',
      isPartOf: {
        type: 'PublicationVolume',
        isPartOf: {
          type: 'Periodical',
          name: 'American Economic Journal: Economic Policy',
        },
        volumeNumber: 3,
      },
      pageEnd,
      pageStart,
    })).toContain(`<span class="pages">: ${pageStart} - ${pageEnd}</span>`);
  });

  it('should render name when isPartOf is not nested', () => {
    const name = 'American Economic Journal: Economic Policy';

    expect(renderReferencePublication({
      type: 'Article',
      authors: [],
      datePublished: '2011',
      isPartOf: {
        type: 'Periodical',
        name,
      },
    })).toContain(name);
  });

  it('should render empty string when name is missing', () => {
    expect(renderReferencePublication({
      type: 'Article',
      authors: [],
      datePublished: '2011',
      isPartOf: {
        type: 'Periodical',
      },
    })).toBe('');
  });

  it('should render empty string when isPartOf is missing', () => {
    expect(renderReferencePublication({
      type: 'Article',
      authors: [],
      datePublished: '2011',
      isPartOf: {
        type: 'PublicationVolume',
        isPartOf: {
          type: 'Periodical',
        },
      },
    })).toContain('<i></i>');
  });

  it('should render empty string when volume number is missing', () => {
    expect(renderReferencePublication({
      type: 'Article',
      authors: [],
      datePublished: '2011',
      isPartOf: {
        type: 'PublicationVolume',
        isPartOf: {
          type: 'Periodical',
        },
      },
    })).toContain('<strong></strong>');
  });

  it('should render empty string when startPage and endPage are missing', () => {
    expect(renderReferencePublication({
      type: 'Article',
      authors: [],
      datePublished: '2011',
      isPartOf: {
        type: 'PublicationVolume',
        isPartOf: {
          type: 'Periodical',
        },
      },
    })).not.toContain('<span class="pages">');
  });
});
