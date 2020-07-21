import { createServer } from 'http';
import Router from '@koa/router';
import Koa from 'koa';
import renderPage from './render-page';
import pageRoutes from '../pages/routes';

const app = new Koa();
const router = new Router();

pageRoutes.forEach((route) => router[route.method](route.path, renderPage(route.handler)));

app
  .use(router.routes())
  .use(router.allowedMethods());

const server = createServer(app.callback());

export default server;
