import convertHandler from './convert';
import { RenderApiResponse } from '../server/render-api-response';

export interface Route {
  path: string,
  method: 'get' | 'post' | 'put' | 'head' | 'delete',
  handler: RenderApiResponse
}

const routes: Array<Route> = [
  {
    path: '/convert',
    method: 'post',
    handler: convertHandler,
  },
];

export default routes;
