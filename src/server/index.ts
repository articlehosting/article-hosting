import { createServer } from 'http';
import Router from '@koa/router';
import Koa from 'koa';
import renderPage from './render-page';
import pageRoutes from '../pages/routes';

const app = new Koa();
const router = new Router();

pageRoutes.forEach((route) => router[route.method](route.path, renderPage(route.handler)));

const server = createServer(app.callback());
server.on('listening', (): void => console.debug('debug', 'Server running'));

server.listen(80);
