import stream from 'stream';
import { RouterContext } from '@koa/router';
import S3 from 'aws-sdk/clients/s3';
import { BAD_REQUEST } from 'http-status-codes';

import config from '../../config';
import ApiError from '../../server/error';
import { articleDoi } from '../../utils';

export interface DownloadRouterContext extends RouterContext {
  publisherId?: string,
  id?: string,
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

  const { publisherId, id, file } = params;

  if (!publisherId) {
    throw new ApiError('Missing mandatory field "publisherId"', BAD_REQUEST);
  }

  if (!id) {
    throw new ApiError('Missing mandatory field "id"', BAD_REQUEST);
  }

  if (!file) {
    throw new ApiError('Missing mandatory field "file"', BAD_REQUEST);
  }

  return s3Client.getObject({
    Bucket: config.aws.s3.bucketName,
    Key: `articles/${articleDoi(publisherId, id)}/${file}`,
  })
    .createReadStream();
};

export default downloadHandler;
