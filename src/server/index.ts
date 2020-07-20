import { createServer, Server } from 'http';
import Router from '@koa/router';
import Koa, { ExtendableContext, Next } from 'koa';
import pageRoutes from '../pages/routes';

const app = new Koa();
const router = new Router();

pageRoutes.forEach((route) => router[route.method](route.path, route.handler));

const server = createServer(app.callback());
server.on('listening', (): void => adapters.logger('debug', 'Server running'));

server.listen(80);
