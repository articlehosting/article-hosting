import { RouterContext } from '@koa/router';
import { renderHome } from '../../components/home';
import renderNotFound from '../../components/static/not-found';

import config from '../../config';
import getDb from '../../server/db';
import { PageContent } from '../../server/render-page';

const { ARTICLES } = config.db.collections;

export interface ArticeViewRouterContext extends RouterContext {
  subject?: string,
}

async function renderSubjectsView(params?: ArticeViewRouterContext): Promise<PageContent | string> {
  if (params && params.subject) {
    const { subject } = params;

    const db = await getDb();

    const articles = await db.collection(ARTICLES).find({
      'about.name': {
        $all: [subject],
      },
    }).toArray();

    if (articles) {
      return renderHome(articles);
    }
  }

  return renderNotFound();
}

export default renderSubjectsView;
