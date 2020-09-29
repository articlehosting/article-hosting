import { RouterContext } from '@koa/router';
import { renderArticleFigures } from '../../components/article';
import { Article } from '../../components/article/article';
import renderNotFound from '../../components/static/not-found';

import config from '../../config';
import getDb from '../../server/db';
import { articleDoi } from '../../utils';

const { ARTICLES } = config.db.collections;

export interface ArticeFiguresViewRouterContext extends RouterContext {
  publisherId?: string,
  id?: string,
}

async function renderArticleFiguresView(params?: ArticeFiguresViewRouterContext): Promise<string> {
  if (params && params.publisherId && params.id) {
    const { id, publisherId } = params;

    const db = await getDb();

    const article: Article | null = await db.collection(ARTICLES).findOne({ _id: articleDoi(publisherId, id) });

    if (article) {
      return renderArticleFigures(article);
    }
  }

  return renderNotFound();
}

export default renderArticleFiguresView;
