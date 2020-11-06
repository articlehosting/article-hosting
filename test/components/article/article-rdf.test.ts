import { RouterContext } from '@koa/router';
import clownface from 'clownface';
import { MaybeMockedDeep } from 'ts-jest/dist/utils/testing';
import { mocked } from 'ts-jest/utils';

import article from '../../../src/__fixtures__/article';
import { ArticleContents } from '../../../src/components/article/article';
import { addRdfContentBlock } from '../../../src/components/article/article-rdf';
import { stencila } from '../../../src/rdf/namespaces';
import { AppContext } from '../../../src/server/context';
import dataFactory, { namedNode } from '../../../src/server/data-factory';

describe('render article rdf', () => {
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
    } as unknown as RouterContext, true);
  });

  it('should addRdfContentBlock add article content', () => {
    const ctx = <AppContext><unknown>routerContext;
    const graph = clownface({
      dataset: ctx.response.dataset,
      term: namedNode('test'),
    });

    article.content.forEach((content: ArticleContents) => addRdfContentBlock(graph, content, article));

    expect(graph.has(stencila.Paragraph).out(stencila.Paragraph).values).not.toHaveLength(0);
  });
});
