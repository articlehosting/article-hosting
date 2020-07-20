import renderHomePage from './homepage';

export interface Route {
  path: string,
  method: 'get' | 'post' | 'put' | 'head' | 'delete',
  handler: () => string
}

const routes: Array<Route> = [
  {
    path: '/',
    method: 'get',
    handler: renderHomePage,
  },
];

export default routes;
