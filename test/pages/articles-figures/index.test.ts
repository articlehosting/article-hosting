import { Db } from 'mongodb';
import { mocked } from 'ts-jest';

import demoArticle from '../../../src/__fixtures__/article';

// eslint-disable-next-line import/first, import/order
import db from '../../../src/server/db';
// eslint-disable-next-line import/first, import/order
import { ArticeViewRouterContext } from '../../../src/pages/articles';
import renderArticleFiguresView from '../../../src/pages/articles-figures';
import { PageContent } from '../../../src/server/render-page';

const mockedFindOne = jest.fn(() => demoArticle);

jest.mock('../../../src/server/db');

const mockedDb = mocked(db);

describe('render article view template', () => {
  const params = <ArticeViewRouterContext>{ id: 'id', publisherId: 'publisherId' };
  const wrongParams = <ArticeViewRouterContext>{};

  beforeEach(() => {
    mockedDb.mockReset();
  });

  it('should render article view template with content', async () => {
    mockedDb.mockResolvedValueOnce(<Db><unknown>{
      collection: jest.fn(() => ({
        findOne: mockedFindOne,
      })),
    });
    const result = await renderArticleFiguresView(params);

    expect((<PageContent>result).content).toContain(demoArticle.title);
  });

  it('should render not found if params is wrong', async () => {
    const result = await renderArticleFiguresView(wrongParams);

    expect(result).toContain('Not Found');
  });

  it('should render not found if article not exists', async () => {
    mockedDb.mockResolvedValueOnce(<Db><unknown>{
      collection: jest.fn(() => ({
        findOne: jest.fn(() => null),
      })),
    });

    const result = await renderArticleFiguresView(params);

    expect(result).toContain('Not Found');
  });
});
