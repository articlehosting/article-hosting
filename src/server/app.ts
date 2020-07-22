import Router from '@koa/router';
import Koa from 'koa';
import ping from './ping';
import renderPage from './render-page';
import pageRoutes from '../pages/routes';

const app = new Koa();
const router = new Router();

router.get('/ping', ping());
pageRoutes.forEach((route) => router[route.method](route.path, renderPage(route.handler)));

app
  .use(router.routes())
  .use(router.allowedMethods());

export default app;
