jest.mock('@stencila/encoda');

// eslint-disable-next-line import/first
import * as stencila from '@stencila/encoda';
// eslint-disable-next-line import/first
import { mocked } from 'ts-jest';
// eslint-disable-next-line import/first
import convertHandler from '../../../src/api/convert';

const mockedStencila = mocked(stencila);

describe('stencila conversion', () => {
  beforeEach(() => {
    mockedStencila.read.mockReset();
    mockedStencila.dump.mockReset();
  });

  it('should invoke stencila read with jats format', async () => {
    await convertHandler();

    mockedStencila.read.mockResolvedValueOnce({ some: 'string' });

    expect(mockedStencila.read).toHaveBeenCalledWith(expect.any(String), 'jats');
  });

  it('should invoke stencila dump with json format', async () => {
    mockedStencila.read.mockResolvedValueOnce({ some: 'string' });
    mockedStencila.dump.mockResolvedValueOnce('stringified value returned by dump');
    const response = await convertHandler();

    expect(mockedStencila.dump).toHaveBeenCalledWith({ some: 'string' }, 'json', expect.anything());
    expect(response).toBe('stringified value returned by dump');
  });
});
