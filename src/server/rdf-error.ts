import { INTERNAL_SERVER_ERROR } from 'http-status-codes';
import { DataFactory, DatasetCoreFactory, Quad } from 'rdf-js';
import config from '../config';
import { hydra, rdf } from '../rdf/namespaces';

export default class RdfError extends Error {
  private readonly statusCode: number;

  constructor(message: string, statusCode = INTERNAL_SERVER_ERROR) {
    super(message);
    this.statusCode = statusCode;
  }

  public get status(): number {
    return this.statusCode;
  }

  public buildQuads(
    { blankNode, literal, quad }: DataFactory<Quad> & DatasetCoreFactory<Quad>,
  ): Array<Quad> {
    const id = blankNode();

    return [
      quad(id, rdf.type, hydra.Status),
      quad(id, hydra.title, literal(this.message, config.rdf.language)),
      quad(id, hydra.description, literal(this.message, config.rdf.language)),
      quad(id, hydra.statusCode, literal(`${this.statusCode}`)),
    ];
  }
}
