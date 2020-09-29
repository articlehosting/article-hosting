import { OK } from 'http-status-codes';
import { Next } from 'koa';
import { AppContext, AppMiddleware } from '../rdf/types/context';

export default (): AppMiddleware => (
  async ({ response }: AppContext, next: Next): Promise<void> => {
    response.set('Cache-Control', 'no-store, must-revalidate');
    response.status = OK;
    response.body = 'pong';

    await next();
  }
);
