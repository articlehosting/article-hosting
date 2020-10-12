import { Result } from 'true-myth';
import renderAboutPage from './about';
import renderArticleView from './articles';
import renderArticleFiguresView from './articles-figures';
import renderHomePage from './home';

import { AppContext } from '../server/context';

type RenderPageError = {
  type: 'not-found',
  content: string
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RenderPage = (ctx?: AppContext) => Promise<string | Result<string, RenderPageError>>;

export interface Route {
  path: string,
  method: 'get' | 'post' | 'put' | 'head' | 'delete',
  name: string,
  handler: RenderPage
}

export enum Routes {
  'HomePage' = 'home-page',
  'About' = 'about',
}

// todo append name of routes
const routes: Array<Route> = [
  {
    path: '/',
    method: 'get',
    name: Routes.HomePage,
    handler: renderHomePage,
  },
  {
    path: '/about',
    method: 'get',
    name: Routes.About,
    handler: renderAboutPage,
  },
  {
    path: '/articles/:publisherId/:id',
    method: 'get',
    name: 'ArticleView',
    handler: renderArticleView,
  },
  {
    path: '/articles/:publisherId/:id/figures',
    method: 'get',
    name: 'ArticleFiguresView',
    handler: renderArticleFiguresView,
  },
];

export default routes;
