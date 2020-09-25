import { RouterContext } from '@koa/router';
import { BAD_REQUEST } from 'http-status-codes';

import config from '../../config';
import getDb from '../../server/db';
import ApiError from '../../server/error';

export interface RemoveArticleRouterContext extends RouterContext {
  id?: string,
}

const deleteArticle = async (params?: RemoveArticleRouterContext): Promise<string> => {
  if (!params) {
    throw new ApiError('Missing endpoint params', BAD_REQUEST);
  }

  const { id } = params;

  if (!id) {
    throw new ApiError('Missing mandatory field "id"', BAD_REQUEST);
  }

  const db = await getDb();

  await db.collection(config.db.collections.ARTICLES).deleteOne({ _id: id });

  return 'removed';
};

export default deleteArticle;
