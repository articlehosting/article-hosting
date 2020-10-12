import { RouterContext } from '@koa/router';
import { renderArticle } from '../../components/article';
import renderNotFound from '../../components/static/not-found';

import config from '../../config';
import getDb from '../../server/db';
import { PageContent } from '../../server/render-page';
import { articleDoi } from '../../utils';

const { ARTICLES } = config.db.collections;

export interface ArticeViewRouterContext extends RouterContext {
  publisherId?: string,
  id?: string,
}

async function renderArticleView(params?: ArticeViewRouterContext): Promise<PageContent | string> {
  if (params && params.publisherId && params.id) {
    const { id, publisherId } = params;

    const db = await getDb();

    const article = await db.collection(ARTICLES).findOne({ _id: articleDoi(publisherId, id) });

    if (article) {
      return new PageContent(renderArticle(article), { article });
    }
  }

  return renderNotFound();
}

export default renderArticleView;
