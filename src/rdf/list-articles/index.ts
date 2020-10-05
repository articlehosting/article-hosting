import config from '../../config';
import getDb from '../../server/db';
import { DataContext } from '../../server/render-rdf-response';
import Routes from '../routes-enum';

const { ARTICLES } = config.db.collections;

const listArticlesHandler = async (): Promise<DataContext> => {
  const db = await getDb();
  const articles = await db.collection(ARTICLES).find({}).toArray();
  // console.log(articles);
  return {
    routeName: Routes.ListArticles,
    type: 'WebAPI',
    name: 'Article Hosting: List articles',
    method: 'GET',
    articles,
  };
};

export default listArticlesHandler;
