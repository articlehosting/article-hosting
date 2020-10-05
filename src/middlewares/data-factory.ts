import { DefaultContextExtends, Next } from 'koa';
import { Middleware } from 'koa-compose';
// eslint-disable-next-line import/no-extraneous-dependencies
import { BaseQuad, DataFactory } from '../rdf/rdf-types';

export type DataFactoryContext<Context extends DefaultContextExtends = DefaultContextExtends,
Factory extends DataFactory<BaseQuad> = DataFactory> = Context & { dataFactory: Factory };

export default (dataFactory: DataFactory<BaseQuad>): Middleware<DefaultContextExtends> => (
  async (context: DefaultContextExtends, next: Next): Promise<void> => {
    Object.assign(context, { dataFactory });

    await next();
  }
);
