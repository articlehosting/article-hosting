import Router from '@koa/router';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import serve from 'koa-static';
import ping from './ping';
import renderApiResponse from './render-api-response';
import renderPage from './render-page';
import apiRoutes from '../api/routes';
import config from '../config';
import pageRoutes from '../pages/routes';
// import rdfRoutes from '../rdf/routes';
import dataFactory from '../rdf/data-factory';
import setDataFactory from '../rdf/middleware/data-factory';
import addDatasets from '../rdf/middleware/dataset';
import jsonld from '../rdf/middleware/jsonld';
import namespaces from '../rdf/namespaces';
// import entryPointRdf from '../rdf/routes/entry-point';
import { AppServiceContext, AppState } from '../rdf/types/context';

const app = new Koa<AppState, AppServiceContext>();
const router = new Router<AppState, AppServiceContext>();

app.context.router = router;

// @todo: check rest of routes to not be affected by rdf configs
router.get('/ping', ping());
pageRoutes.forEach((route) => router[route.method](route.name, route.path, renderPage(route.handler)));

// router.get('RdfEntry', config.rdf.routePrefix, entryPointRdf());
app.use(setDataFactory(dataFactory));
app.use(addDatasets());
app.use(jsonld({
  '@language': config.rdf.Language,
  ...namespaces,
}));

apiRoutes.forEach((route) => router[route.method](route.name, route.path, renderApiResponse(route.handler)));

app
  .use(bodyParser({
    enableTypes: ['json', 'xml'],
  }))
  .use(router.routes())
  .use(router.allowedMethods())
  .use(serve('./assets'));

export default app;
