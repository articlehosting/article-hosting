import renderAboutPage from './about';
import renderHomePage from './home';

export interface Route {
  path: string,
  method: 'get' | 'post' | 'put' | 'head' | 'delete',
  handler: () => Promise<string>
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
