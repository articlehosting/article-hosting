import { Db } from 'mongodb';
import request from 'supertest';
import { mocked } from 'ts-jest';

import demoArticle from '../../src/__fixtures__/article';

const mockedToArray = jest.fn(() => [demoArticle]);

jest.mock('../../src/server/db');

// eslint-disable-next-line import/first, import/order
import db from '../../src/server/db';
// eslint-disable-next-line import/first, import/order
import app from '../../src/server/app';

const mockedDb = mocked(db);

describe('general app configuration', (): void => {
  const appCallback = app.callback();

  beforeEach(() => {
    mockedDb.mockReset();
  });

  it('ping endpoint should return OK with pong body', async (): Promise<void> => {
    const response = await request(appCallback).get('/ping');

    expect(response.status).toBe(200);
    expect(response.text).toBe('pong');
  });

  it('hello world works', async (): Promise<void> => {
    mockedDb.mockResolvedValueOnce(<Db><unknown>{
      collection: jest.fn(() => ({
        find: jest.fn(() => ({
          toArray: mockedToArray,
        })),
      })),
    });

    const response = await request(appCallback).get('/');

    expect(response.status).toBe(200);
    expect(response.text).toContain('Article Hosting');
    expect(mockedToArray).toHaveBeenCalledWith();
  });

  it('about page works', async (): Promise<void> => {
    const response = await request(appCallback).get('/about');

    expect(response.status).toBe(200);
    expect(response.text).toContain('About page');
  });

  it('article-view page works', async (): Promise<void> => {
    mockedDb.mockResolvedValueOnce(<Db><unknown>{
      collection: jest.fn(() => ({
        findOne: jest.fn(() => demoArticle),
      })),
    });

    const response = await request(appCallback).get('/articles/demoArticle');

    expect(response.status).toBe(200);
    expect(response.text).toContain('Gendered effects of the personal income');
  });
});
