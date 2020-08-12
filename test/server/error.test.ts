import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from 'http-status-codes';

import ApiError from '../../src/server/error';

describe('api error', (): void => {
  const internalServerErrorMsg = 'Internal Server Error';
  const badRequestErrorMsg = 'Bad Request';

  const internalServerBody = {
    message: internalServerErrorMsg,
    status: INTERNAL_SERVER_ERROR,
  };

  const badRequestBody = {
    message: badRequestErrorMsg,
    status: BAD_REQUEST,
  };

  it('should build api error as internal server error', async () => {
    const error = new ApiError(internalServerErrorMsg, INTERNAL_SERVER_ERROR);

    expect(error.message).toBe(internalServerErrorMsg);
    expect(error.status).toBe(INTERNAL_SERVER_ERROR);
    expect(error.buildBody()).toStrictEqual(internalServerBody);
  });

  it('should build api error as bad request', async () => {
    const error = new ApiError(badRequestErrorMsg, BAD_REQUEST);

    expect(error.message).toBe(badRequestErrorMsg);
    expect(error.status).toBe(BAD_REQUEST);
    expect(error.buildBody()).toStrictEqual(badRequestBody);
  });

  it('should build api error as any error without status', async () => {
    const anyErrorMsg = 'Some error';
    const error = new ApiError(anyErrorMsg);

    expect(error.message).toBe(anyErrorMsg);
    expect(error.status).toBe(BAD_REQUEST);
    expect(error.buildBody()).toStrictEqual({
      ...badRequestBody,
      message: anyErrorMsg,
    });
  });

  it('should build api error as bad request with data', async () => {
    const data = { some: 'name' };

    const error = new ApiError(badRequestErrorMsg, BAD_REQUEST, data);

    expect(error.message).toBe(badRequestErrorMsg);
    expect(error.status).toBe(BAD_REQUEST);
    expect(error.buildBody()).toStrictEqual({
      ...badRequestBody,
      data,
    });
  });
});
