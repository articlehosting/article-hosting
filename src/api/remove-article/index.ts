import { RouterContext } from '@koa/router';
import { BAD_REQUEST } from 'http-status-codes';

import config from '../../config';
import getDb from '../../server/db';
import ApiError from '../../server/error';
import { articleDoi } from '../../utils';

export interface RemoveArticleRouterContext extends RouterContext {
  publisherId?: string,
  id?: string,
}

const deleteArticle = async (params?: RemoveArticleRouterContext): Promise<string> => {
  if (!params) {
    throw new ApiError('Missing endpoint params', BAD_REQUEST);
  }

  const { publisherId, id } = params;

  if (!publisherId) {
    throw new ApiError('Missing mandatory field "publisherId"', BAD_REQUEST);
  }

  if (!id) {
    throw new ApiError('Missing mandatory field "id"', BAD_REQUEST);
  }

  const db = await getDb();

  await db.collection(config.db.collections.ARTICLES).deleteOne({ _id: articleDoi(publisherId, id) });

  return 'removed';
};

export default deleteArticle;
