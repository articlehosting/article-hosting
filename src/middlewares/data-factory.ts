import { DefaultContextExtends, Next } from 'koa';
import { Middleware } from 'koa-compose';
import { BaseQuad, DataFactory } from 'rdf-js';

export default (dataFactory: DataFactory<BaseQuad>): Middleware<DefaultContextExtends> => (
  async (context: DefaultContextExtends, next: Next): Promise<void> => {
    Object.assign(context, { dataFactory });

    await next();
  }
);
