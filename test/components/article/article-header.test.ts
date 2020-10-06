import article from '../../../src/__fixtures__/article';
import { Article, ArticleAuthor } from '../../../src/components/article/article';
import { renderArticleHeader, renderAuthors } from '../../../src/components/article/article-header';
import config from '../../../src/config';

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
    expect(renderArticleHeader(article)).toContain('<header class="article-header">');
  });

  it('should render article header with title', () => {
    const title = 'Article testing title';

    expect(renderArticleHeader({
      ...article,
      title,
    })).toContain(`${title}</h1>`);
  });

  it('should render article header with authors link', () => {
    const authorsEmails = [
      `<li>${frstAuthorGivenName} ${frstAuthorFamilyName}</li>`,
      `<li>${secAuthorGivenName} ${secAuthorFamilyName}</li>`,
    ];

    expect(renderArticleHeader({
      ...article,
      authors,
    })).toContain(`<ol class="article-author-list" aria-label="Authors of this article" id="authors" role="list">${authorsEmails.join('')}</ol>`);
  });

  it('should render article header without authors', () => {
    expect(renderAuthors()).toBe('');
  });

  it('should render article header with date', () => {
    const humanReadDate = 'Jul 17, 2020';

    const dateReceived = {
      type: 'Date',
      value: '2020-07-17',
    };

    expect(renderArticleHeader({
      ...article,
      dateReceived,
    })).toContain(`<li>Posted <time datetime="${dateReceived.value}"></time>${humanReadDate}</li>`);
  });

  it('should render render article header with identifier doi', () => {
    const doi = '1033.123321/ijm.123321';
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
        value: doi,
      },
    ];

    expect(renderArticleHeader({
      ...article,
      identifiers,
    })).toContain(`<li>DOI <a href="${config.resources.doiResource}${doi}">${doi}</a></li>`);
  });
});
