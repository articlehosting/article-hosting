import { ExtendableContext, Next } from 'koa';
import { Middleware } from 'koa-compose';
import { BaseQuad } from 'rdf-js';
import { DataFactoryContext, ExtendedDataFactory } from '../server/context';

export default (): Middleware<DataFactoryContext<ExtendableContext, ExtendedDataFactory<BaseQuad>>> => (
  async (context: DataFactoryContext<ExtendableContext, ExtendedDataFactory<BaseQuad>>, next: Next): Promise<void> => {
    Object.assign(context.request, { dataset: context.dataFactory.dataset() });
    Object.assign(context.response, { dataset: context.dataFactory.dataset() });

    await next();
  }
);
