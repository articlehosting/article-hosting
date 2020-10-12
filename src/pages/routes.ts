import renderAboutPage from './about';
import renderArticleView from './articles';
import renderArticleFiguresView from './articles-figures';
import renderHomePage from './home';

import { RenderPage } from '../server/render-page';

export interface Route {
  path: string,
  method: 'get' | 'post' | 'put' | 'head' | 'delete',
  handler: RenderPage,
}

// todo append name of routes
const routes: Array<Route> = [
  {
    path: '/',
    method: 'get',
    handler: renderHomePage,
  },
  {
    path: '/about',
    method: 'get',
    handler: renderAboutPage,
  },
  {
    path: '/articles/:publisherId/:id',
    method: 'get',
    handler: renderArticleView,
  },
  {
    path: '/articles/:publisherId/:id/figures',
    method: 'get',
    handler: renderArticleFiguresView,
  },
];

export default routes;
