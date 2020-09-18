import { RouterContext } from '@koa/router';
import { renderArticle } from '../../components/article';
import renderNotFound from '../../components/static/not-found';

import config from '../../config';
import getDb from '../../server/db';

const { ARTICLES } = config.db.collections;

export interface ArticeViewRouterContext extends RouterContext {
  id?: string,
}

async function renderArticleView(params?: ArticeViewRouterContext): Promise<string> {
  if (params && params.id) {
    const { id } = params;

    const db = await getDb();

    const article = await db.collection(ARTICLES).findOne({ _id: id });

    if (article) {
      return renderArticle(article);
    }
  }

  return renderNotFound();
}

export default renderArticleView;
