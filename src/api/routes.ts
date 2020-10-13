import stream from 'stream';
import citationHandler from './citation';
import downloadHandler from './download';
import deleteArticle from './remove-article';
import { ApiRoutes as Routes } from '../config/routes';
import { AppContext } from '../server/context';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RenderApiResponse = (ctx?: AppContext, body?: any) => Promise<string | stream.Readable | void>;

export interface Route {
  path: string,
  method: 'get' | 'post' | 'put' | 'head' | 'delete',
  name: string,
  handler: RenderApiResponse
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
