import ParserJsonld from '@rdfjs/parser-jsonld';
import SerializerJsonld from '@rdfjs/serializer-jsonld-ext';
import { format as formatContentType } from 'content-type';
import { Context } from 'jsonld/jsonld-spec';
import { Next, Response } from 'koa';
import { Middleware } from 'koa-compose';
import pEvent from 'p-event';
import { fromStream, toStream } from 'rdf-dataset-ext';
import { DatasetContext } from './dataset';
import config from '../config';

// @todo: figure out why check response.status as NO_CONTENT
const responseHasContent = (response: Response): boolean => response.body as boolean;

// todo move to src/middleware and rename as middlewares
export default (context: Context = {}): Middleware<DatasetContext> => {
  const parser = new ParserJsonld();
  const serializer = new SerializerJsonld({ compact: true, flatten: false, context });
  return async ({ request, response }: DatasetContext, next: Next): Promise<void> => {
    if (request.is(config.rdf.ldJson.requestType)) {
      await fromStream(request.dataset, parser.import(request.req));
    }

    await next();

    if (responseHasContent(response) || !response.dataset.size) {
      return;
    }

    response.body = await pEvent(serializer.import(toStream(response.dataset)), 'data');

    const contentType = {
      type: config.rdf.ldJson.type,
      parameters: { profile: config.rdf.ldJson.profile },
    };
    response.set('Content-Type', formatContentType(contentType));
  };
};
