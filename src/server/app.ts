import Router from '@koa/router';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import serve from 'koa-static';
import ping from './ping';
import renderApiResponse from './render-api-response';
import renderPage from './render-page';
import renderRdfResponse from './render-rdf-response';
import apiRoutes from '../api/routes';
import config from '../config';
import setDataFactory from '../middlewares/data-factory';
import addDatasets from '../middlewares/dataset';
import jsonld from '../middlewares/jsonld';
import pageRoutes from '../pages/routes';
import { AppServiceContext, AppState } from '../rdf/rdf-types/context';
import dataFactory from '../rdf/rdf-types/data-factory';
import namespaces from '../rdf/rdf-types/namespaces';
import rdfRoutes from '../rdf/routes';

const app = new Koa<AppState, AppServiceContext>();
const router = new Router<AppState, AppServiceContext>();

app.context.router = router;

// @todo: check rest of routes to not be affected by rdf configs
router.get('/ping', ping());
pageRoutes.forEach((route) => router[route.method](route.name, route.path, renderPage(route.handler)));
apiRoutes.forEach((route) => router[route.method](route.name, route.path, renderApiResponse(route.handler)));

// router.get('RdfEntry', config.rdf.routePrefix, entryPointRdf());
app.use(setDataFactory(dataFactory));
app.use(addDatasets());
app.use(jsonld({
  '@language': config.rdf.Language,
  ...namespaces,
}));

rdfRoutes.forEach((route) => router[route.method](route.name, route.path, renderRdfResponse(route.handler)));

app
  .use(bodyParser({
    enableTypes: ['json', 'xml'],
  }))
  .use(router.routes())
  .use(router.allowedMethods())
  .use(serve('./assets'));

export default app;
