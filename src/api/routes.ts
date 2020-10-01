import citationHandler from './citation';
import downloadHandler from './download';
import deleteArticle from './remove-article';
import { RenderApiResponse } from '../server/render-api-response';

export interface Route {
  path: string,
  method: 'get' | 'post' | 'put' | 'head' | 'delete',
  name: string,
  handler: RenderApiResponse
}

export enum Routes {
  'DownloadFile' = 'download-file',
  'DownloadCitation' = 'download-citation',
  'DeleteArticle' = 'delete-article',
  'Rdf' = 'rdf',
}

const routes: Array<Route> = [
  {
    path: '/download/:publisherId/:id/:file',
    method: 'get',
    name: Routes.DownloadFile,
    handler: downloadHandler,
  },
  {
    path: '/citation/:publisherId/:id/:file',
    method: 'get',
    name: Routes.DownloadFile,
    handler: citationHandler,
  },
  {
    path: '/articles/:publisherId/:id',
    method: 'delete',
    name: Routes.DeleteArticle,
    handler: deleteArticle,
  },
];

export default routes;
