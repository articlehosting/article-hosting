import url from 'url';
import Router from '@koa/router';
import dataFactory from '@rdfjs/data-model';
import { Request } from 'koa';
import createDataset from 'rdf-dataset-indexed';
import { DatasetCore, NamedNode, Quad } from 'rdf-js';
import { ExtendedDataFactory } from './context';
import { ApiRoutes, PagesRoutes, RdfRoutes } from '../config/routes';

const extendedDataFactory: ExtendedDataFactory = {
  ...dataFactory,
  dataset: (quads?: Array<Quad>): DatasetCore => createDataset(quads, extendedDataFactory),
};

export const {
  dataset, blankNode, namedNode, literal, quad,
} = extendedDataFactory;

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
export const createNamedNode = (
  router: Router,
  request: Request,
  route: RdfRoutes | PagesRoutes | ApiRoutes,
  params?: any,
): NamedNode =>
  namedNode(url.resolve(request.origin, router.url(route, params)));

export default extendedDataFactory;
