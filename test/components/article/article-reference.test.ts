import article from '../../../src/__fixtures__/article';
import renderArticleReferences, {
  renderPersonScholar,
  renderReference,
  renderReferencePublication,
} from '../../../src/components/article/article-reference';

describe('render article references', () => {
  it('should render a semantic list', () => {
    expect(renderArticleReferences({ ...article, references: [] })).toContain('<ol class="reference-list"></ol>');
  });

  it('should render an h2 title', () => {
    expect(renderArticleReferences({ ...article, references: [] })).toContain('<h2>References</h2>');
  });
});

describe('render single reference', () => {
  it('should render a p header title', () => {
    expect(renderReference({
      type: 'Article',
      id: 'test',
      authors: [],
      datePublished: '2011',
      isPartOf: {
        type: 'PublicationVolume',
        volumeNumber: 3,
      },
      title: 'Gender-Based taxation and the division of family chores',
    }, 1)).toContain('<p class="m-b-0">Gender-Based taxation and the division of family chores</p>');
  });

  it('should render wrapper with reference id', () => {
    const id = 'test';

    expect(renderReference({
      type: 'Article',
      id,
      authors: [],
      datePublished: '2011',
      isPartOf: {
        type: 'PublicationVolume',
        volumeNumber: 3,
      },
      title: 'Gender-Based taxation and the division of family chores',
    }, 1)).toContain(`<div class="reference" id="${id}">`);
  });

  it('should render a p header title from partOf name when title is missing', () => {
    expect(renderReference({
      type: 'Article',
      id: 'test',
      authors: [],
      datePublished: '2011',
      isPartOf: {
        type: 'Article',
        name: 'testName',
      },
    }, 1)).toContain('<p class="m-b-0">testName</p>');
  });

  it('should render an empty string when title and partOf name is missing', () => {
    expect(renderReference({
      type: 'Article',
      id: 'test',
      authors: [],
      datePublished: '2011',
      isPartOf: {
        type: 'Article',
      },
    }, 1)).not.toContain('<li class="reference-list__item">');
    expect(renderReference({
      type: 'Article',
      id: 'test',
      authors: [],
      datePublished: '2011',
      isPartOf: {
        type: 'Article',
      },
    }, 1)).not.toContain('<p class="m-b-0"></p>');
  });

  it('should render date published like string', () => {
    expect(renderReference({
      type: 'Article',
      id: 'test',
      authors: [],
      datePublished: '2011',
      isPartOf: {
        type: 'Article',
      },
      title: 'Gender-Based taxation and the division of family chores',
    }, 1)).toContain('<li>&nbsp;(2011)</li>');
  });

  it('should render date published like type Date', () => {
    const datePublished = {
      type: 'Date',
      value: '2020-07-17',
    };

    expect(renderReference({
      type: 'Article',
      id: 'test',
      datePublished,
      authors: [],
      isPartOf: {
        type: 'Article',
      },
      title: 'Gender-Based taxation and the division of family chores',
    }, 1)).toContain('<li>&nbsp;(2020)</li>');
  });
});

describe('render persons scholars', () => {
  it('should render authors full name', () => {
    expect(renderPersonScholar({
      type: 'Person',
      familyNames: [
        'Alesina',
      ],
      givenNames: [
        'A',
      ],
    })).toContain('A Alesina');
  });

  it('should render persons full names', () => {
    expect(renderPersonScholar({
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
    expect(renderPersonScholar({
      type: 'Person',
      familyNames: [
        'Alesina',
      ],
      givenNames: [
        'A',
      ],
    })).toContain('<a href="https://scholar.google.com/scholar?q=%22author:A+Alesina%22">A Alesina</a>');
  });

  it('should render authors when is missing data', () => {
    expect(renderPersonScholar({
      type: 'Person',
      familyNames: [],
      givenNames: [],
    })).toBe('');
  });
});

describe('render reference publication', () => {
  it('should render i with name when isPartOf is received', () => {
    expect(renderReferencePublication({
      type: 'Article',
      id: 'test',
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
      id: 'test',
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
    })).toContain('<b>3</b>');
  });

  it('should render span tag with pageStart and pageEnd when isPartOf is nested', () => {
    const pageStart = 1;
    const pageEnd = 40;

    expect(renderReferencePublication({
      type: 'Article',
      id: 'test',
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
      id: 'test',
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
      id: 'test',
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
      id: 'test',
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
      id: 'test',
      authors: [],
      datePublished: '2011',
      isPartOf: {
        type: 'PublicationVolume',
        isPartOf: {
          type: 'Periodical',
        },
      },
    })).toContain('<b></b>');
  });

  it('should render empty string when startPage and endPage are missing', () => {
    expect(renderReferencePublication({
      type: 'Article',
      id: 'test',
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

  it('should render empty string when missing isPartOf', () => {
    expect(renderReferencePublication({
      type: 'Article',
      id: 'test',
      datePublished: '',
      authors: [],
    })).toBe('');
  });
});
