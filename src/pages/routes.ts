import renderAboutPage from './about';
import renderHomePage from './home';
import { RenderPage } from '../server/render-page';

export interface Route {
  path: string,
  method: 'get' | 'post' | 'put' | 'head' | 'delete',
  handler: RenderPage
}

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
];

export default routes;
