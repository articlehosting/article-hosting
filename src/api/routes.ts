import citationHandler from './citation';
import downloadHandler from './download';
import deleteArticle from './remove-article';
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
  {
    path: '/citation/:doi/:file',
    method: 'get',
    handler: citationHandler,
  },
  {
    path: '/articles/:id',
    method: 'delete',
    handler: deleteArticle,
  },
];

export default routes;
