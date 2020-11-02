import { Db } from 'mongodb';
import { mocked } from 'ts-jest';
import demoArticle from '../../../src/__fixtures__/article';
import renderSubjectsView, { ArticeViewRouterContext } from '../../../src/pages/subjects';
import db from '../../../src/server/db';

jest.mock('../../../src/server/db');

const mockedDb = mocked(db);

const mockedToArray = jest.fn(() => [demoArticle]);
const mockedNullToArray = jest.fn(() => null);

describe('render subjects view template', () => {
  const params = <ArticeViewRouterContext><unknown>{ id: 'id', subject: 'Taxes and benefits' };
  const wrongParams = <ArticeViewRouterContext>{};

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

  it('should render not found if params is wrong', async () => {
    const result = await renderSubjectsView(wrongParams);

    expect(result).toContain('Not Found');
  });

  it('should render not found if article not exists', async () => {
    mockedDb.mockResolvedValueOnce(<Db><unknown>{
      collection: jest.fn(() => ({
        find: jest.fn(() => ({
          toArray: mockedNullToArray,
        })),
      })),
    });

    const result = await renderSubjectsView(params);

    expect(result).toContain('Not Found');
  });
});
