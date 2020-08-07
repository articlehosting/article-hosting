import { RouterContext } from '@koa/router';
import { dump, read } from '@stencila/encoda';
import { Result } from 'true-myth';

import { Article } from '../../components/article/article';
import db from '../../server/db';
import { ApiError } from '../../server/render-api-response';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const convertHandler = async (params?: RouterContext, body?: any): Promise<string | Result<string, ApiError>> => {
  try {
    if (!body) {
      return Promise.resolve(Result.err<string, ApiError>({ type: 'invalid-request', content: 'body' }));
    }
    const node = await read(body, 'jats');

    const dumped = await dump(node, 'json', {
      isBundle: false, isStandalone: true, shouldZip: 'no', format: 'json',
    });

    const article = <Article><unknown> JSON.parse(dumped);

    await db()
      .then(async (d) => d.collection('articles').insertOne({ ...article, _id: article.identifiers[1].value }));

    return dumped;
  } catch (e) {
    console.log(e);
    return Promise.resolve(Result.err<string, ApiError>({ type: 'not-found', content: e }));
  }
};

export default convertHandler;
