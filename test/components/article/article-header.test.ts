import article from '../../../src/__fixtures__/article';
import { Article, ArticleAuthor } from '../../../src/components/article/article';
import { renderArticleHeader, renderAuthors } from '../../../src/components/article/article-header';

describe('render article header', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  const frstAuthorFamilyName = 'John';
  const frstAuthorGivenName = 'Smith';
  const frstEmail = `${frstAuthorFamilyName}.${frstAuthorGivenName}@test.edu.uy`;

  const secAuthorFamilyName = 'Elizabeth';
  const secAuthorGivenName = 'Terner';
  const secEmail = `${secAuthorFamilyName}.${secAuthorGivenName}@com`;

  const authors: Array<ArticleAuthor> = [
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
          name: 'Organization test',
        },
      ],
      emails: [frstEmail],
      familyNames: [
        frstAuthorFamilyName,
      ],
      givenNames: [
        frstAuthorGivenName,
      ],
    },
    {
      type: 'Person',
      affiliations: [
        {
          type: 'Organization',
          address: {
            type: 'PostalAddress',
            addressCountry: 'Moldova',
            addressLocality: 'Montevideo',
          },
          name: 'Organization test 2',
        },
      ],
      emails: [secEmail],
      familyNames: [
        secAuthorFamilyName,
      ],
      givenNames: [
        secAuthorGivenName,
      ],
    },
  ];

  it('should render article header with correct article', () => {
    expect(() => renderArticleHeader(article)).not.toThrow();
  });

  it('should not render article header with missing article', () => {
    const wrongArticle = <Article><unknown>null;

    const result = renderArticleHeader(wrongArticle);

    expect(result).toBe('');
  });

  it('should render article header in container', () => {
    expect(renderArticleHeader(article)).toContain('<div class="ui container">');
  });

  it('should render article header with title', () => {
    const title = 'Article testing title';

    expect(renderArticleHeader({
      ...article,
      title,
    })).toContain(`<h1 class="ui center aligned header" id="title">${title}</h1>`);
  });

  it('should render article header with authors link', () => {
    const authorsEmails = [
      `<a href="mailto:${frstEmail}">${frstAuthorGivenName} ${frstAuthorFamilyName}</a>`,
      `<a href="mailto:${secEmail}">${secAuthorGivenName} ${secAuthorFamilyName}</a>`,
    ];

    expect(renderArticleHeader({
      ...article,
      authors,
    })).toContain(`<p class="ui center aligned header" id="authors">${authorsEmails.join(', ')}</p>`);
  });

  it('should render article header without authors link', () => {
    const authorsEmails = [
      `${frstAuthorGivenName} ${frstAuthorFamilyName}`,
      `${secAuthorGivenName} ${secAuthorFamilyName}`,
    ];
    const authorsWithoutEmails = authors.map(({ emails, ...author }) => author);

    expect(renderArticleHeader({
      ...article,
      authors: authorsWithoutEmails,
    })).toContain(`<p class="ui center aligned header" id="authors">${authorsEmails.join(', ')}</p>`);
  });

  it('should render article header without authors', () => {
    expect(renderAuthors()).toBe('');
  });

  it('should render article header with author affiliation', () => {
    expect(renderArticleHeader({
      ...article,
      authors,
    })).toContain(`<p class="ui center aligned header">${authors.map((author) => author.affiliations.map((affiliation) => `${affiliation.name}, ${affiliation.address?.addressCountry}`).join(';')).join(';')}</p>`);
  });

  it('should render article header with cite as', () => {
    expect(renderArticleHeader({
      ...article,
      authors,
    })).toContain(`<span>CITE AS: ${authors.map((author) => `<span>${author.givenNames.join(' ')} ${author.familyNames.join(' ')}<span/>`).join()};</span>`);
  });

  it('should render article header with published date', () => {
    const datePublished = {
      type: 'Date',
      value: '2020-07-17',
    };

    expect(renderArticleHeader({
      ...article,
      datePublished,
    })).toContain(`<span>${new Date(datePublished.value).getFullYear()};</span>`);
  });

  it('should render article header with isPartOf title', () => {
    const isPartOf = {
      type: 'PublicationIssue',
      isPartOf: {
        type: 'PublicationVolume',
        isPartOf: {
          type: 'Periodical',
          title: 'Testing Journal of Microsimulation',
        },
      },
    };

    expect(renderArticleHeader({
      ...article,
      isPartOf,
    })).toContain(`<span>${isPartOf.isPartOf?.isPartOf?.title};</span>`);
  });

  it('should render empty string when missing isPartOf title', () => {
    const isPartOf = {
      type: 'PublicationIssue',
      isPartOf: {
        type: 'PublicationVolume',
        isPartOf: {
          type: 'Periodical',
        },
      },
    };

    expect(renderArticleHeader({
      ...article,
      isPartOf,
    })).toContain('<span>;</span>');
  });

  it('should render article header with isPartOf volume number and issue number', () => {
    const isPartOf = {
      type: 'PublicationIssue',
      isPartOf: {
        type: 'PublicationVolume',
        isPartOf: {
          type: 'Periodical',
          title: 'International Journal of Microsimulation',
        },
        volumeNumber: '12',
      },
      issueNumber: '2',
    };

    const volumeNumber = isPartOf.isPartOf?.volumeNumber ?? '';
    const issueNumber = isPartOf.issueNumber ?? '';

    expect(renderArticleHeader({
      ...article,
      isPartOf,
    })).toContain(`<span>${volumeNumber}(${issueNumber}); ${article.pageStart}-${article.pageEnd}.</span>`);
  });

  it('should render empty string when missing isPartOf volume number', () => {
    const isPartOf = {
      type: 'PublicationIssue',
      isPartOf: {
        type: 'PublicationVolume',
        isPartOf: {
          type: 'Periodical',
        },
      },
    };

    expect(renderArticleHeader({
      ...article,
      isPartOf,
    })).toContain(`<span>(); ${article.pageStart}-${article.pageEnd}.</span>`);
  });

  it('should render render article header with identifier doi', () => {
    const identifiers = [
      {
        type: 'PropertyValue',
        name: 'publisher-id',
        propertyID: 'https://registry.identifiers.org/registry/publisher-id',
        value: '001123',
      },
      {
        type: 'PropertyValue',
        name: 'doi',
        propertyID: 'https://registry.identifiers.org/registry/doi',
        value: '1033.123321/ijm.123321',
      },
    ];

    expect(renderArticleHeader({
      ...article,
      identifiers,
    })).toContain('<span>DOI: 1033.123321/ijm.123321</span>');
  });

  it('should render article header with article download pdf link', () => {
    const identifiers = [
      {
        type: 'PropertyValue',
        name: 'publisher-id',
        propertyID: 'https://registry.identifiers.org/registry/publisher-id',
        value: '001123',
      },
      {
        type: 'PropertyValue',
        name: 'doi',
        propertyID: 'https://registry.identifiers.org/registry/doi',
        value: '1033.123321/ijm.123321',
      },
    ];

    expect(renderArticleHeader({
      ...article,
      identifiers,
    })).toContain(`download/${identifiers[0].value}/ijm-${identifiers[0].value}.pdf`);
  });

  it('should render article header without article download pdf link', () => {
    const identifiers = [
      {
        type: 'PropertyValue',
        name: 'not-publisher-id',
        propertyID: 'https://registry.identifiers.org/registry/publisher-id',
        value: '001123',
      },
      {
        type: 'PropertyValue',
        name: 'doi',
        propertyID: 'https://registry.identifiers.org/registry/doi',
        value: '1033.123321/ijm.123321',
      },
    ];

    expect(renderArticleHeader({
      ...article,
      identifiers,
    })).not.toContain('Article PDF');
  });
});
