import { Readable } from 'stream';
import { BAD_REQUEST, NOT_FOUND } from 'http-status-codes';
import { Db } from 'mongodb';
import { mocked } from 'ts-jest';
import article from '../../../src/__fixtures__/article';
import citationHandler, { CitationRouterContext } from '../../../src/api/citation';
import ApiError from '../../../src/server/error';
import { getArticleIdentifier } from '../../../src/utils';

// eslint-disable-next-line import/first, import/order
import db from '../../../src/server/db';

const mockedFindOne = jest.fn(() => article);
jest.mock('../../../src/server/db');

const mockedDb = mocked(db);

async function streamToString(stream: Readable): Promise<string> {
  return new Promise((resolve) => {
    const chunks: Array<string> = [];
    stream.on('data', (chunk) => {
      chunks.push(chunk.toString());
    });
    stream.on('end', () => {
      resolve(chunks.join(''));
    });
  });
}

describe('create bib and ris file', () => {
  it('should throw error when params are missing', async () => {
    const error = new ApiError('Missing endpoint params', BAD_REQUEST);

    await expect(citationHandler()).rejects.toStrictEqual(error);
  });

  it('should throw error when publisherId is missing', async () => {
    const params = <CitationRouterContext>{ file: '.bib', id: 'test' };
    const error = new ApiError('Missing mandatory field "publisherId"', BAD_REQUEST);

    await expect(citationHandler(params)).rejects.toStrictEqual(error);
  });

  it('should throw error when id is missing', async () => {
    const params = <CitationRouterContext>{ file: '.bib', publisherId: getArticleIdentifier('doi', article) };
    const error = new ApiError('Missing mandatory field "id"', BAD_REQUEST);

    await expect(citationHandler(params)).rejects.toStrictEqual(error);
  });

  it('should throw error when file is missing', async () => {
    const params = <CitationRouterContext>{ publisherId: getArticleIdentifier('doi', article), id: 'test' };
    const error = new ApiError('Missing mandatory field "file"', BAD_REQUEST);

    await expect(citationHandler(params)).rejects.toStrictEqual(error);
  });

  it('should create BIB readable', async () => {
    const params = <CitationRouterContext>{ publisherId: getArticleIdentifier('doi', article), id: 'test', file: 'file.bib' };

    mockedDb.mockResolvedValueOnce(<Db><unknown>{
      collection: jest.fn(() => ({
        findOne: mockedFindOne,
      })),
    });
    const result = await citationHandler(params);

    expect(result).toBeInstanceOf(Readable);
  });

  it('should create RIS readable', async () => {
    const params = <CitationRouterContext>{ publisherId: getArticleIdentifier('doi', article), id: 'test', file: 'file.ris' };

    mockedDb.mockResolvedValueOnce(<Db><unknown>{
      collection: jest.fn(() => ({
        findOne: mockedFindOne,
      })),
    });
    const result = await citationHandler(params);

    expect(result).toBeInstanceOf(Readable);
  });

  it('should return error when article is missing', async () => {
    const params = <CitationRouterContext>{ publisherId: getArticleIdentifier('doi', article), id: 'test', file: 'file.ris' };

    mockedDb.mockResolvedValueOnce(<Db><unknown>{
      collection: jest.fn(() => ({
        findOne: jest.fn(),
      })),
    });
    const error = new ApiError('Article not found', NOT_FOUND);

    await expect(citationHandler(params)).rejects.toStrictEqual(error);
  });

  it('should return error when file type is missing', async () => {
    const params = <CitationRouterContext>{ publisherId: getArticleIdentifier('doi', article), id: 'test', file: 'file.ristext' };

    mockedDb.mockResolvedValueOnce(<Db><unknown>{
      collection: jest.fn(() => ({
        findOne: mockedFindOne,
      })),
    });
    const error = new ApiError('File not found', NOT_FOUND);

    await expect(citationHandler(params)).rejects.toStrictEqual(error);
  });

  it('should return empty string when article is missing issueNumber', async () => {
    const params = <CitationRouterContext>{ publisherId: getArticleIdentifier('doi', article), id: 'test', file: 'file.ris' };
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

    mockedDb.mockResolvedValueOnce(<Db><unknown>{
      collection: jest.fn(() => ({
        findOne: jest.fn(() => ({
          ...article,
          isPartOf,
        })),
      })),
    });

    const result = await citationHandler(params);

    expect(result).toBeInstanceOf(Readable);
  });

  it('should return empty string when article is missing doi for ris', async () => {
    const params = <CitationRouterContext>{ publisherId: getArticleIdentifier('doi', article), id: 'test', file: 'file.ris' };
    const identifiers = [
      {
        type: 'PropertyValue',
        name: 'publisher-id',
        propertyID: 'https://registry.identifiers.org/registry/publisher-id',
        value: '00202',
      },
    ];

    mockedDb.mockResolvedValueOnce(<Db><unknown>{
      collection: jest.fn(() => ({
        findOne: jest.fn(() => ({
          ...article,
          identifiers,
        })),
      })),
    });

    const result = await citationHandler(params);

    expect(result).toBeInstanceOf(Readable);
  });

  it('should return empty string when article is missing doi for bibtex', async () => {
    const params = <CitationRouterContext>{ publisherId: getArticleIdentifier('doi', article), id: 'test', file: 'file.bib' };
    const identifiers = [
      {
        type: 'PropertyValue',
        name: 'publisher-id',
        propertyID: 'https://registry.identifiers.org/registry/publisher-id',
        value: '00202',
      },
    ];

    mockedDb.mockResolvedValueOnce(<Db><unknown>{
      collection: jest.fn(() => ({
        findOne: jest.fn(() => ({
          ...article,
          identifiers,
        })),
      })),
    });

    const result = await citationHandler(params);

    expect(result).toBeInstanceOf(Readable);
  });

  it('should return empty string when article is missing issns and title for ris', async () => {
    const params = <CitationRouterContext>{ publisherId: getArticleIdentifier('doi', article), id: 'test', file: 'file.ris' };
    const isPartOf = {
      type: 'PublicationIssue',
      isPartOf: {
        type: 'PublicationVolume',
        isPartOf: {
          type: 'Periodical',
        },
      },
    };

    mockedDb.mockResolvedValueOnce(<Db><unknown>{
      collection: jest.fn(() => ({
        findOne: jest.fn(() => ({
          ...article,
          isPartOf,
        })),
      })),
    });

    const result = await citationHandler(params);

    expect(result).toBeInstanceOf(Readable);
  });

  it('should return empty string when article is missing issns and title for bibtex', async () => {
    const params = <CitationRouterContext>{ publisherId: getArticleIdentifier('doi', article), id: 'test', file: 'file.bib' };
    const isPartOf = {
      type: 'PublicationIssue',
      isPartOf: {
        type: 'PublicationVolume',
        isPartOf: {
          type: 'Periodical',
        },
      },
    };

    mockedDb.mockResolvedValueOnce(<Db><unknown>{
      collection: jest.fn(() => ({
        findOne: jest.fn(() => ({
          ...article,
          isPartOf,
        })),
      })),
    });

    const result = await citationHandler(params);

    expect(result).toBeInstanceOf(Readable);
  });

  it('should not add issn if not deep enough isPartOf', async () => {
    const params = <CitationRouterContext>{ publisherId: getArticleIdentifier('doi', article), id: 'test', file: 'file.bib' };
    const isPartOf = {
      type: 'PublicationIssue',
      isPartOf: {
        type: 'PublicationVolume',
      },
    };

    mockedDb.mockResolvedValueOnce(<Db><unknown>{
      collection: jest.fn(() => ({
        findOne: jest.fn(() => ({
          ...article,
          isPartOf,
        })),
      })),
    });

    const result = await citationHandler(params);

    expect(await streamToString(result)).toContain('issn = {}');
  });

  it('should not add given name to citations, if not present on article', async () => {
    const params = <CitationRouterContext>{ publisherId: getArticleIdentifier('doi', article), id: 'test', file: 'file.bib' };
    const authors = [
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
            name: 'Universidad de la República',
          },
        ],
        emails: [
          'marisa.bucheli@cienciassociales.edu.uy',
        ],
        familyNames: [
          'Bucheli',
        ],
      },
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
            name: 'Universidad de la República',
          },
        ],
        emails: [
          'cecilia.olivieri@cienciassociales.edu.uy',
        ],
        familyNames: [
          'Olivieri',
        ],
      },
    ];

    mockedDb.mockResolvedValueOnce(<Db><unknown>{
      collection: jest.fn(() => ({
        findOne: jest.fn(() => ({
          ...article,
          authors,
        })),
      })),
    });

    const result = await citationHandler(params);

    expect(await streamToString(result)).toContain('author = { Bucheli,  Olivieri}');
  });

  it('should not add family name to citations, if not present on article', async () => {
    const params = <CitationRouterContext>{ publisherId: getArticleIdentifier('doi', article), id: 'test', file: 'file.bib' };
    const authors = [
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
            name: 'Universidad de la República',
          },
        ],
        emails: [
          'marisa.bucheli@cienciassociales.edu.uy',
        ],
        givenNames: [
          'Marisa',
        ],
      },
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
            name: 'Universidad de la República',
          },
        ],
        emails: [
          'cecilia.olivieri@cienciassociales.edu.uy',
        ],
        givenNames: [
          'Cecilia',
        ],
      },
    ];

    mockedDb.mockResolvedValueOnce(<Db><unknown>{
      collection: jest.fn(() => ({
        findOne: jest.fn(() => ({
          ...article,
          authors,
        })),
      })),
    });

    const result = await citationHandler(params);

    expect(await streamToString(result)).toContain('author = {Marisa , Cecilia }');
  });
});
