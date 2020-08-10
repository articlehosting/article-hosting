import { Db } from 'mongodb';
import { Result } from 'true-myth';
import { Err } from 'true-myth/result';
import { mocked } from 'ts-jest';

jest.mock('@stencila/encoda');

const mockedInsertOne = jest.fn();
const mockedFindOne = jest.fn();
const mockedUpdate = jest.fn();

jest.mock('../../../src/server/db');

// eslint-disable-next-line import/first, import/order
import * as stencila from '@stencila/encoda';
// eslint-disable-next-line import/first, import/order
import db from '../../../src/server/db';
// eslint-disable-next-line import/first, import/order
import convertHandler from '../../../src/api/convert';
// eslint-disable-next-line import/first, import/order
import { ApiError } from '../../../src/server/render-api-response';
// eslint-disable-next-line import/first, import/order
import article from '../../../src/__fixtures__/article';

const mockedStencila = mocked(stencila);
const mockedDb = mocked(db);

describe('stencila conversion', () => {
  beforeEach(() => {
    mockedStencila.read.mockReset();
    mockedStencila.dump.mockReset();
    mockedDb.mockReset();
  });

  it('should invoke stencila read with jats format', async () => {
    await convertHandler(undefined, 'xml body');

    mockedStencila.read.mockResolvedValueOnce({ some: 'string' });

    expect(mockedStencila.read).toHaveBeenCalledWith(expect.any(String), 'jats');
  });

  it('should invoke stencila dump with json format', async () => {
    const id = 'doi';
    const body = `{ "identifiers": [{"name": "doi", "value": "${id}"}] }`;

    mockedStencila.read.mockResolvedValueOnce({ some: 'string' });
    mockedStencila.dump.mockResolvedValueOnce(body);
    mockedDb.mockResolvedValueOnce(<Db><unknown>{
      collection: jest.fn(() => ({
        insertOne: mockedInsertOne,
        findOne: mockedFindOne,
      })),
    });
    const response = await convertHandler(undefined, 'xml body');

    expect(mockedStencila.dump).toHaveBeenCalledWith({ some: 'string' }, 'json', expect.anything());
    expect(response).toBe(body);
  });

  it('should return true myth wrapped error if no body was provided', async () => {
    const result = await convertHandler();

    expect(result).toStrictEqual(Result.err({ type: 'invalid-request', content: 'body' }));
  });

  it('should return true myth wrapped error if stencila read throws', async () => {
    const errorObject = { error: true };
    mockedStencila.read.mockRejectedValueOnce(errorObject);
    const result = await convertHandler(undefined, 'test');

    expect(result).toStrictEqual(Result.err({ type: 'not-found', content: errorObject }));
  });

  it('should save article to db', async () => {
    const id = 'doi';
    const body = `{ "identifiers": [{"name": "doi", "value": "${id}"}] }`;

    mockedStencila.read.mockResolvedValueOnce({ some: 'string' });
    mockedStencila.dump.mockResolvedValueOnce(body);
    mockedDb.mockResolvedValueOnce(<Db><unknown>{
      collection: jest.fn(() => ({
        insertOne: mockedInsertOne,
        findOne: mockedFindOne,
      })),
    });

    const result = await convertHandler(undefined, body);

    expect(mockedFindOne).toHaveBeenCalledWith({ _id: id });
    expect(mockedInsertOne).toHaveBeenCalledWith({ ...(JSON.parse(body)), _id: id });
    expect(result).toBe(body);
  });

  it('should not save article to db if doi is missing', async () => {
    const id = 'doi';
    const body = `{ "identifiers": [{"name": "other", "value": "${id}"}] }`;

    mockedStencila.read.mockResolvedValueOnce({ some: 'string' });
    mockedStencila.dump.mockResolvedValueOnce(body);
    mockedDb.mockResolvedValueOnce(<Db><unknown>{
      collection: jest.fn(() => ({
        insertOne: mockedInsertOne,
        findOne: mockedFindOne,
      })),
    });

    const result = <Err<string, ApiError>><unknown>(await convertHandler(undefined, body));

    expect((<Error><unknown>result.error.content).message).toBe('PropertyValue \'doi\' was not found in the article!');
  });

  it('should not save article to db if doi is missing 2', async () => {
    const id = 'doi';
    const body = `{ "identifiers": [{"name": "doi", "value": "${id}"}] }`;

    mockedStencila.read.mockResolvedValueOnce({ some: 'string' });
    mockedStencila.dump.mockResolvedValueOnce(body);

    mockedDb.mockResolvedValueOnce(<Db><unknown>{
      collection: jest.fn(() => ({
        findOne: mockedFindOne,
        update: mockedUpdate,
      })),
    });

    mockedFindOne.mockResolvedValueOnce({ ...article, _id: id });

    const result = await convertHandler(undefined, body);

    expect(mockedUpdate).toHaveBeenCalledWith({ _id: id }, JSON.parse(body));
    expect(result).toBe(body);
  });
});
