import { renderHome } from '../../components/home';
import config from '../../config';
import getDb from '../../server/db';

const { ARTICLES } = config.db.collections;

async function renderHomePage(): Promise<string> {
  const db = await getDb();

  const articles = await db.collection(ARTICLES).find({}).toArray();

  return renderHome(articles);
}

export default renderHomePage;
