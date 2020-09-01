import stream from 'stream';
import { RouterContext } from '@koa/router';
import S3 from 'aws-sdk/clients/s3';
import { BAD_REQUEST } from 'http-status-codes';

import config from '../../config';
import ApiError from '../../server/error';

export interface DownloadRouterContext extends RouterContext {
  article?: string,
  file?: string
}

const s3Client = new S3({
  ...config.aws.s3.options,
  params: { Bucket: config.aws.s3.bucketName },
});

const downloadHandler = async (params?: DownloadRouterContext): Promise<stream.Readable> => {
  if (!params) {
    throw new ApiError('Missing endpoint params', BAD_REQUEST);
  }

  const { article, file } = params;

  if (!article) {
    throw new ApiError('Missing mandatory field "article"', BAD_REQUEST);
  }

  if (!file) {
    throw new ApiError('Missing mandatory field "file"', BAD_REQUEST);
  }

  return s3Client.getObject({
    Bucket: config.aws.s3.bucketName,
    Key: `${article}/${file}`,
  })
    .createReadStream();
};

export default downloadHandler;
