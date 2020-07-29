import { RouterContext } from '@koa/router';
import { dump, read } from '@stencila/encoda';
import { Result } from 'true-myth';
import { ApiError } from '../../server/render-api-response';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const convertHandler = async (params?: RouterContext, body?: any): Promise<string | Result<string, ApiError>> => {
  try {
    if (!body) {
      return Promise.resolve(Result.err<string, ApiError>({ type: 'invalid-request', content: 'body' }));
    }
    const node = await read(body, 'jats');
    return await dump(node, 'json', {
      isBundle: false, isStandalone: true, shouldZip: 'no', format: 'json',
    });
  } catch (e) {
    console.log(e);
    return Promise.resolve(Result.err<string, ApiError>({ type: 'not-found', content: e }));
  }
};

export default convertHandler;
