import Router, { RouterContext } from '@koa/router';
import Koa, {
  DefaultContextExtends, DefaultState, Middleware, Request, Response,
} from 'koa';
import {
  BaseQuad, DataFactory, DatasetCore, DatasetCoreFactory, Quad,
} from 'rdf-js';

export type DataFactoryContext<Context extends DefaultContextExtends = DefaultContextExtends,
  Factory extends DataFactory<BaseQuad> = DataFactory> = Context & { dataFactory: Factory };

export type WithDataset<T extends Request | Response, Q extends BaseQuad = Quad> = T & { dataset: DatasetCore<Q> };

export type ExtendedDataFactory<Q extends BaseQuad = Quad> = DataFactory<Q> & DatasetCoreFactory<Q>;

export type DatasetContext<
  Context extends DefaultContextExtends = DefaultContextExtends, Q extends BaseQuad = Quad> = DataFactoryContext<
  Context & { request: WithDataset<Request, Q>; response: WithDataset<Response, Q> }, ExtendedDataFactory<Q>>;

export type AppState = DefaultState;
export type AppServiceContext = DatasetContext<{
  router: Router<AppState, AppServiceContext>,
}>;
export type AppContext = RouterContext<AppState, AppServiceContext>;
export type AppMiddleware = Middleware<AppState, AppContext>;

export type App = Koa<AppState, AppContext>;
