import { AnyPointer } from 'clownface';
import { NamedNode } from 'rdf-js';
import { entryHandler } from './entry';
import { AppContext } from '../server/context';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RenderRdfResponse = (
  graph: AnyPointer<NamedNode, any>,
  ctx: AppContext,
  params: any,
  body?: any
) => Promise<void>;

export interface Route {
  name: string,
  path: string,
  method: 'get' | 'post' | 'put' | 'head' | 'delete',
  handler: RenderRdfResponse
}

export enum Routes {
  'Entry' = 'entry',
}

const routes: Array<Route> = [
  {
    path: '/rdf',
    method: 'get',
    name: Routes.Entry,
    handler: entryHandler,
  },
];

export default routes;
