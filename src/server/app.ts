import Router from '@koa/router';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import ping from './ping';
import renderApiResponse from './render-api-response';
import renderPage from './render-page';
import apiRoutes from '../api/routes';
import pageRoutes from '../pages/routes';

const app = new Koa();
const router = new Router();

router.get('/ping', ping());
pageRoutes.forEach((route) => router[route.method](route.path, renderPage(route.handler)));
apiRoutes.forEach((route) => router[route.method](route.path, renderApiResponse(route.handler)));

app
  .use(bodyParser({
    enableTypes: ['json', 'xml'],
  }))
  .use(router.routes())
  .use(router.allowedMethods());

export default app;
