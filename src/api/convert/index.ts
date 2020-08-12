import { RouterContext } from '@koa/router';
import { dump, read } from '@stencila/encoda';
import { BAD_REQUEST } from 'http-status-codes';

import { Article } from '../../components/article/article';
import config from '../../config';
import getDb from '../../server/db';
import ApiError from '../../server/error';

const { ARTICLES } = config.db.collections;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const convertHandler = async (params?: RouterContext, body?: any): Promise<string> => {
  if (!body) {
    throw new ApiError('Missing convertion content!', BAD_REQUEST);
  }

  const node = await read(body, config.stencila.format);

  const dumped = await dump(node, 'json', {
    isBundle: false, isStandalone: true, shouldZip: 'no', format: 'json',
  });

  const article = <Article>JSON.parse(dumped);

  const doi = article.identifiers.filter((identifier) => identifier.name === 'doi')[0];

  if (!doi || !doi.value) {
    throw new ApiError<Article>(
      'PropertyValue \'doi\' was not found in the article!',
      BAD_REQUEST,
      article,
    );
  }

  const id = doi.value;

  const db = await getDb();

  const actualArticle = await db.collection(ARTICLES).findOne({ _id: id });

  if (actualArticle) {
    await db.collection(ARTICLES).updateOne({ _id: id }, article);
  } else {
    await db.collection(ARTICLES).insertOne({ ...article, _id: id });
  }

  return dumped;
};

export default convertHandler;
