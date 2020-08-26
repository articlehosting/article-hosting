import stream from 'stream';
import { RouterContext } from '@koa/router';
import AWS from 'aws-sdk';
import { BAD_REQUEST, NOT_FOUND } from 'http-status-codes';

import config from '../../config';
import ApiError from '../../server/error';

export interface DownloadRouterContext extends RouterContext {
  article?: string,
  file?: string
}

const s3Client = new AWS.S3({
  ...config.aws.s3.options,
  params: { Bucket: config.aws.s3.bucketName },
});

const downloadHandler = async (params?: DownloadRouterContext): Promise<stream.Readable> => {
  if (!params) {
    throw new ApiError('Missing endpoint params', BAD_REQUEST);
  }

  const { article, file } = params;

  if (!article) {
    throw new ApiError('Missing mandatory field \'article\'', BAD_REQUEST);
  }

  if (!file) {
    throw new ApiError('Missing mandatory field \'file\'', BAD_REQUEST);
  }

  try {
    return s3Client.getObject({
      Bucket: config.aws.s3.bucketName,
      Key: `${article}/${file}`,
    })
      .createReadStream();
  } catch (e) {
    throw new ApiError('Missing file', NOT_FOUND);
  }
};

export default downloadHandler;
