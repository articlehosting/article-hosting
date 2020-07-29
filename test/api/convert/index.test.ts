import { Result } from 'true-myth';
import { mocked } from 'ts-jest';

jest.mock('@stencila/encoda');

// eslint-disable-next-line import/first, import/order
import * as stencila from '@stencila/encoda';
// eslint-disable-next-line import/first
import convertHandler from '../../../src/api/convert';

const mockedStencila = mocked(stencila);

describe('stencila conversion', () => {
  beforeEach(() => {
    mockedStencila.read.mockReset();
    mockedStencila.dump.mockReset();
  });

  it('should invoke stencila read with jats format', async () => {
    await convertHandler(undefined, 'xml body');

    mockedStencila.read.mockResolvedValueOnce({ some: 'string' });

    expect(mockedStencila.read).toHaveBeenCalledWith(expect.any(String), 'jats');
  });

  it('should invoke stencila dump with json format', async () => {
    mockedStencila.read.mockResolvedValueOnce({ some: 'string' });
    mockedStencila.dump.mockResolvedValueOnce('stringified value returned by dump');
    const response = await convertHandler(undefined, 'xml body');

    expect(mockedStencila.dump).toHaveBeenCalledWith({ some: 'string' }, 'json', expect.anything());
    expect(response).toBe('stringified value returned by dump');
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
});
