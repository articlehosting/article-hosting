// import { RouterContext } from '@koa/router';
import { BAD_REQUEST } from 'http-status-codes';
// import { mocked } from 'ts-jest';

// jest.mock('aws-sdk');
jest.mock('aws-sdk/clients/s3');

// eslint-disable-next-line import/first, import/order
// import S3, { GetObjectOutput } from 'aws-sdk/clients/s3';
// eslint-disable-next-line import/first, import/order
// import { AWSError, Request } from 'aws-sdk';
// eslint-disable-next-line import/first, import/order
import downloadHandler, { DownloadRouterContext } from '../../../src/api/download';
// eslint-disable-next-line import/first, import/order
import ApiError from '../../../src/server/error';

// const mockedS3 = mocked(S3);
// const mockedS3 = mocked(new S3());

describe('download files', () => {
  const file = 'somefile.pdf';
  const article = '00101';

  it('should rejects with error if params is missing', async () => {
    await expect(async () => downloadHandler()).rejects.toStrictEqual(new ApiError(
      'Missing endpoint params',
      BAD_REQUEST,
    ));
  });

  it('should rejects with error if article is not provided', async () => {
    const routerContext = <DownloadRouterContext>{ file };

    await expect(async () => downloadHandler(routerContext)).rejects.toStrictEqual(new ApiError(
      'Missing mandatory field "article"',
      BAD_REQUEST,
    ));
  });

  it('should rejects with error if file is not provided', async () => {
    const routerContext = <DownloadRouterContext>{ article };

    await expect(async () => downloadHandler(routerContext)).rejects.toStrictEqual(new ApiError(
      'Missing mandatory field "file"',
      BAD_REQUEST,
    ));
  });
});
