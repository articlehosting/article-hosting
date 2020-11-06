import { RouterContext } from '@koa/router';
import clownface from 'clownface';
import { Db } from 'mongodb';
import { MaybeMockedDeep } from 'ts-jest/dist/utils/testing';
import { mocked } from 'ts-jest/utils';
import demoArticle from '../../../src/__fixtures__/article';

import { articleBackMatterHandler, ArticleBackMatterParams } from '../../../src/rdf/article-back-matter';
import { stencila } from '../../../src/rdf/namespaces';
import { AppContext } from '../../../src/server/context';
import dataFactory, { namedNode } from '../../../src/server/data-factory';
import db from '../../../src/server/db';

jest.mock('../../../src/server/db');

const mockedFindOne = jest.fn(() => demoArticle);

const mockedDb = mocked(db);

describe('render back matter rdf', () => {
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

  it('should call articleBackMatterHandler and pass', async () => {
    mockedDb.mockResolvedValueOnce(<Db><unknown>{
      collection: jest.fn(() => ({
        findOne: mockedFindOne,
      })),
    });
    const ctx = <AppContext><unknown>routerContext;
    const graph = clownface({
      dataset: ctx.response.dataset,
      term: namedNode('test'),
    });

    await articleBackMatterHandler(graph, ctx, <ArticleBackMatterParams>{
      publisherId: 'test',
      id: 'test',
    });

    expect(graph.has(stencila.title).out(stencila.title).values).not.toHaveLength(0);
  });
});
