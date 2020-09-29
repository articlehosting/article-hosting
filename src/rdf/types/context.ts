import Router, { RouterContext } from '@koa/router';
import Koa, { DefaultState, Middleware } from 'koa';
import { DatasetContext } from '../middleware/dataset';

export type AppState = DefaultState;
export type AppServiceContext = DatasetContext<{
  router: Router<AppState, AppServiceContext>,
}>;
export type AppContext = RouterContext<AppState, AppServiceContext>;
export type AppMiddleware = Middleware<AppState, AppContext>;

export type App = Koa<AppState, AppContext>;
