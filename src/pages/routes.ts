import renderHomePage from './homepage';

const routes = [
  {
    path: '/',
    method: 'get',
    handler: renderHomePage,
  },
];

export default routes;
