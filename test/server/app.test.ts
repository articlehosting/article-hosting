import request from 'supertest';
import app from '../../src/server/app';

describe('general app configuration', (): void => {
  const appCallback = app.callback();

  it('ping endpoint should return OK with pong body', async (): Promise<void> => {
    const response = await request(appCallback).get('/ping');

    expect(response.status).toBe(200);
    expect(response.text).toBe('pong');
  });

  it('hello world works', async (): Promise<void> => {
    const response = await request(appCallback).get('/');

    expect(response.status).toBe(200);
    expect(response.text).toContain('Hello World');
  });

  it('about page works', async (): Promise<void> => {
    const response = await request(appCallback).get('/about');

    expect(response.status).toBe(200);
    expect(response.text).toContain('About page');
  });
});
