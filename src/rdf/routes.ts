import { AnyPointer } from 'clownface';
import { NamedNode } from 'rdf-js';
import { articleDetailsHandler } from './article-details';
import { articlesHandler } from './articles';
import { entryHandler } from './entry';
import { RdfRoutes as Routes } from '../config/routes';
import { AppContext } from '../server/context';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RenderRdfResponse = (
  graph: AnyPointer<NamedNode, any>,
  ctx: AppContext,
  params: any,
  body?: any
) => Promise<void>;

export interface Route {
  name: Routes,
  path: string,
  method: 'get' | 'post' | 'put' | 'head' | 'delete',
  handler: RenderRdfResponse
}

const routes: Array<Route> = [
  {
    path: '/rdf',
    method: 'get',
    name: Routes.Entry,
    handler: entryHandler,
  },
  {
    path: '/rdf/articles',
    method: 'get',
    name: Routes.Articles,
    handler: articlesHandler,
  },
  {
    path: '/rdf/articles/:publisherId/:id',
    method: 'get',
    name: Routes.ArticleDetails,
    handler: articleDetailsHandler,
  },
];

export default routes;
