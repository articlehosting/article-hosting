import article from '../../../src/__fixtures__/article';
import { ArticleAuthor } from '../../../src/components/article/article';
import {
  renderArticleInfo,
  renderAuthorDetails,
  renderAuthorEmails,
  renderCopyright,
  renderVersion,
} from '../../../src/components/article/article-info';

describe('render article copyright', () => {
  it('should not throw', () => {
    expect(() => renderArticleInfo(article)).not.toThrow();
  });

  describe('should renderArticleInfo container', () => {
    it('should renderArticleInfo with container', () => {
      expect(renderArticleInfo(article)).toContain('<div class="ui container left aligned">');
    });

    it('should renderArticleInfo title with h3 tag', () => {
      expect(renderArticleInfo(article)).toContain('<h2>Author details</h2>');
    });
  });

  describe('should renderAuthorDetails in article', () => {
    const person: ArticleAuthor = {
      type: 'Person',
      familyNames: [],
      givenNames: [],
      affiliations: [],
      emails: [''],
    };

    it('should renderAuthorDetails with container', () => {
      const familyNames = ['John'];
      const givenNames = ['Smith'];

      expect(renderAuthorDetails({
        ...person,
        familyNames,
        givenNames,
      })).toContain(`<h4 class="ui header">${givenNames[0]} ${familyNames[0]}</h4>`);
    });

    it('should renderAuthorDetails with affiliation', () => {
      const affiliations = [{
        type: 'Organization',
        address: {
          type: 'PostalAddress',
          addressCountry: 'Uruguay',
          addressLocality: 'Montevideo',
        },
        name: 'Some organization',
      }];

      expect(renderAuthorDetails({
        ...person,
        affiliations,
      })).toContain(`<span>${affiliations[0].name}, ${affiliations[0].address.addressLocality}, ${affiliations[0].address.addressCountry}</span>`);
    });

    it('should renderAuthorDetails with affiliation and missing addressLocality', () => {
      const affiliations = [{
        type: 'Organization',
        address: {
          type: 'PostalAddress',
          addressCountry: 'Uruguay',
        },
        name: 'Some organization',
      }];

      expect(renderAuthorDetails({
        ...person,
        affiliations,
      })).toContain(`<span>${affiliations[0].name}, ${affiliations[0].address.addressCountry}</span>`);
    });

    it('should renderAuthorDetails with correspondence email', () => {
      const emails = ['test@test.com'];

      expect(renderAuthorDetails({
        ...person,
        emails,
      })).toContain(`<h5 class="ui header">For correspondence: <span><a href="mailto:${emails[0]}">${emails[0]}</a></span></h5>`);
    });

    it('should renderAuthorDetails with ocid', () => {
      expect(renderAuthorDetails(person)).toContain('<div><a href="#">{orcid}</a></div>');
    });
  });

  describe('should renderCopyright in article', () => {
    it('should renderCopyright with title', () => {
      expect(renderCopyright(article)).toContain('<h3>Copyright</h3>');
    });

    it('should renderCopyright with date and authors with single authors', () => {
      expect(renderCopyright({
        ...article,
        authors: [{
          type: 'Person',
          affiliations: [
            {
              type: 'Organization',
              address: {
                type: 'PostalAddress',
                addressCountry: 'Uruguay',
                addressLocality: 'Montevideo',
              },
              name: 'Some organization',
            },
          ],
          emails: [
            'test@test.com',
          ],
          familyNames: [
            'John',
          ],
          givenNames: [
            'Smith',
          ],
        }],
      })).toContain('<p>© 2020, John</p>');
    });

    it('should renderCopyright with date and authors with 2 authors', () => {
      expect(renderCopyright({
        ...article,
        authors: article.authors,
      })).toContain('<p>© 2020, Bucheli and Olivieri</p>');
    });

    it('should renderCopyright with date and authors with 3 authors', () => {
      expect(renderCopyright({
        ...article,
        authors: [...article.authors, {
          type: 'Person',
          affiliations: [
            {
              type: 'Organization',
              address: {
                type: 'PostalAddress',
                addressCountry: 'Uruguay',
                addressLocality: 'Montevideo',
              },
              name: 'Some organization',
            },
          ],
          emails: [
            'test@test.com',
          ],
          familyNames: [
            'John',
          ],
          givenNames: [
            'Smith',
          ],
        }],
      })).toContain('<p>© 2020, Bucheli, Olivieri, John</p>');
    });

    it('should renderCopyright with content', () => {
      expect(renderCopyright({
        ...article,
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
      })).toContain('<div><p>This article is distributed under the terms of the <a href="http://creativecommons.org/licenses/by/4.0/">Creative Commons');
    });
  });

  describe('should renderVersion in article', () => {
    it('should renderVersion with title', () => {
      expect(renderVersion({
        type: 'Date',
        value: '2020-07-17',
      })).toContain('<div>Version of Record published: <a href="#">July 17, 2020 (version 1)</a></div>');
    });
  });

  describe('should renderAuthorEmails in article', () => {
    it('should renderAuthorEmails missing emails', () => {
      expect(renderAuthorEmails()).toBe('');
    });

    it('should renderAuthorEmails with emails', () => {
      const emails = ['test@test.com'];

      expect(renderAuthorEmails(emails)).toContain(`<h5 class="ui header">For correspondence: <span><a href="mailto:${emails.join(', ')}">${emails.join(', ')}</a></span></h5>`);
    });
  });
});
