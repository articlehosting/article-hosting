import downloadHandler from './download';
import { RenderApiResponse } from '../server/render-api-response';

export interface Route {
  path: string,
  method: 'get' | 'post' | 'put' | 'head' | 'delete',
  handler: RenderApiResponse
}

const routes: Array<Route> = [
  {
    path: '/download/:article/:file',
    method: 'get',
    handler: downloadHandler,
  },
];

export default routes;
