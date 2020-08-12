import { Db } from 'mongodb';
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
import article from '../../../src/__fixtures__/article';
// eslint-disable-next-line import/first, import/order
import ApiError from '../../../src/server/error';
// eslint-disable-next-line import/first, import/order
import { BAD_REQUEST } from 'http-status-codes';

const mockedStencila = mocked(stencila);
const mockedDb = mocked(db);

describe('stencila conversion', () => {
  const id = 'doi';

  beforeEach(() => {
    mockedStencila.read.mockReset();
    mockedStencila.dump.mockReset();
    mockedDb.mockReset();
  });

  it('should invoke stencila read with jats format', async () => {
    const body = `{ "identifiers": [{"name": "doi", "value": "${id}"}] }`;

    mockedStencila.read.mockResolvedValueOnce({ some: 'string' });
    mockedStencila.dump.mockResolvedValueOnce(body);
    mockedDb.mockResolvedValueOnce(<Db><unknown>{
      collection: jest.fn(() => ({
        insertOne: mockedInsertOne,
        findOne: mockedFindOne,
      })),
    });

    await convertHandler(undefined, 'xml body');

    expect(mockedStencila.read).toHaveBeenCalledWith(expect.any(String), 'jats');
  });

  it('should invoke stencila dump with json format', async () => {
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

  it('should rejects with error if no body was provided', async () => {
    await expect(async () => convertHandler()).rejects.toStrictEqual(new ApiError(
      'Missing convertion content!',
      BAD_REQUEST,
    ));
  });

  it('should rejects with error if stencila read throws', async () => {
    const errorObject = { error: true };

    mockedStencila.read.mockRejectedValueOnce(errorObject);

    await expect(async () => convertHandler(undefined, 'test')).rejects.toStrictEqual(errorObject);
  });

  it('should save article to db', async () => {
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
    const body = `{ "identifiers": [{"name": "other", "value": "${id}"}] }`;

    mockedStencila.read.mockResolvedValueOnce({ some: 'string' });
    mockedStencila.dump.mockResolvedValueOnce(body);

    await expect(async () => convertHandler(undefined, body)).rejects.toStrictEqual(
      new ApiError(
        'PropertyValue \'doi\' was not found in the article!',
        BAD_REQUEST,
        body,
      ),
    );
  });

  it('should update article if article already exists', async () => {
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
