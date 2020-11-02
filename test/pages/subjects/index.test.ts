import { Db } from 'mongodb';
import { mocked } from 'ts-jest';
import demoArticle from '../../../src/__fixtures__/article';
import renderSubjectsView, { ArticeViewRouterContext } from '../../../src/pages/subjects';
import db from '../../../src/server/db';

jest.mock('../../../src/server/db');

const mockedDb = mocked(db);

const mockedToArray = jest.fn(() => [demoArticle]);

describe('render subjects view template', () => {
  const params = <ArticeViewRouterContext><unknown>{ id: 'id', subject: 'Taxes and benefits' };

  beforeEach(() => {
    mockedDb.mockReset();
  });

  it('should render subjects view template with content', async () => {
    mockedDb.mockResolvedValue(<Db><unknown>{
      collection: jest.fn(() => ({
        find: jest.fn(() => ({
          toArray: mockedToArray,
        })),
      })),
    });

    const result = await renderSubjectsView(params);

    expect(result).toContain(demoArticle.title);
  });
});
