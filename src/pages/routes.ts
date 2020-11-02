import renderAboutPage from './about';
import renderArticleView from './articles';
import renderArticleFiguresView from './articles-figures';
import renderHomePage from './home';
import renderSubjectsView from './subjects';
import { PagesRoutes as Routes } from '../config/routes';
import { RenderPage } from '../server/render-page';

export interface Route {
  path: string,
  method: 'get' | 'post' | 'put' | 'head' | 'delete',
  name: string,
  handler: RenderPage
}

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
    name: Routes.ArticleView,
    handler: renderArticleView,
  },
  {
    path: '/articles/:publisherId/:id/figures',
    method: 'get',
    name: Routes.ArticleFiguresView,
    handler: renderArticleFiguresView,
  },
  {
    path: '/subjects/:subject',
    method: 'get',
    name: Routes.Subjects,
    handler: renderSubjectsView,
  },
];

export default routes;
