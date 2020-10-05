import downloadFileHandler from './download-file';
import rdfHandler from './entry-point';
import listArticlesHandler from './list-articles';
import Routes from './routes-enum';
import { RenderRdfResponse } from '../server/render-rdf-response';

export interface Route {
  path: string,
  method: 'get' | 'post' | 'put' | 'head' | 'delete',
  name: string,
  handler: RenderRdfResponse,
}

const routes: Array<Route> = [
  {
    path: '/rdf',
    method: 'get',
    name: Routes.EntryPoint,
    handler: rdfHandler,
  },
  {
    path: '/rdf/download-file',
    method: 'get',
    name: Routes.DownloadFile,
    handler: downloadFileHandler,
  },
  {
    path: '/rdf/list-articles',
    method: 'get',
    name: Routes.ListArticles,
    handler: listArticlesHandler,
  },
];

export default routes;
