import { AnyPointer } from 'clownface';
import { NamedNode } from 'rdf-js';
import { apiDocumentationHandler } from './api-documentation';
import { articleBackMatterHandler } from './article-back-matter';
import { ArticleBodyHandler } from './article-body';
import { articleFilesHandler } from './article-files';
import { articleMetadataHandler } from './article-metadata';
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
    path: '/rdf/doc',
    method: 'get',
    name: Routes.ApiDocumentation,
    handler: apiDocumentationHandler,
  },
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
    path: '/rdf/articles/:publisherId/:id/metadata',
    method: 'get',
    name: Routes.ArticleMetadata,
    handler: articleMetadataHandler,
  },
  {
    path: '/rdf/articles/:publisherId/:id/body',
    method: 'get',
    name: Routes.ArticleBody,
    handler: ArticleBodyHandler,
  },
  {
    path: '/rdf/articles/:publisherId/:id/back-matter',
    method: 'get',
    name: Routes.ArticleBackMatter,
    handler: articleBackMatterHandler,
  },
  {
    path: '/rdf/articles/:publisherId/:id/files',
    method: 'get',
    name: Routes.ArticleFiles,
    handler: articleFilesHandler,
  },
];

export default routes;
