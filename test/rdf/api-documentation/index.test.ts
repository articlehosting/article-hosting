import { RouterContext } from '@koa/router';
import clownface from 'clownface';
import { MaybeMockedDeep } from 'ts-jest/dist/utils/testing';
import { mocked } from 'ts-jest/utils';

import { apiDocumentationHandler } from '../../../src/rdf/api-documentation';
import { hydra } from '../../../src/rdf/namespaces';
import { AppContext } from '../../../src/server/context';
import dataFactory, { namedNode } from '../../../src/server/data-factory';

describe('render api documentation rdf', () => {
  let routerContext: MaybeMockedDeep<RouterContext>;
  const next = jest.fn();

  beforeEach(() => {
    next.mockReset();
    routerContext = mocked({
      params: {},
      response: {
        // eslint-disable-next-line import/no-named-as-default-member
        dataset: dataFactory.dataset(),
      },
      request: {
        origin: 'http://localhost',
      },
      router: {
        url: jest.fn(() => 'test/'),
      },
    } as unknown as RouterContext, true);
  });

  it('should call apiDocumentationHandler and pass', async () => {
    const ctx = <AppContext><unknown>routerContext;
    const graph = clownface({
      dataset: ctx.response.dataset,
      term: namedNode('test'),
    });

    await apiDocumentationHandler(graph, ctx);

    expect(graph.has(hydra.supportedProperty).out(hydra.supportedProperty).values).not.toHaveLength(0);
  });
});
