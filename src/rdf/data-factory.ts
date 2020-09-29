import dataFactory from '@rdfjs/data-model';
import createDataset from 'rdf-dataset-indexed';
import { ExtendedDataFactory } from './middleware/dataset';
import { DatasetCore, Quad } from './types';

const extendedDataFactory: ExtendedDataFactory = {
  ...dataFactory,
  dataset: (quads?: Array<Quad>): DatasetCore => createDataset(quads, extendedDataFactory),
};

export const {
  dataset, blankNode, namedNode, literal, quad,
} = extendedDataFactory;

export default extendedDataFactory;
