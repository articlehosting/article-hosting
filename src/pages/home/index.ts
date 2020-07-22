import renderArticle from '../../components/article';

async function renderHomePage(): Promise<string> {
  // await article list
  // article list map and render article list item
  return renderArticle();
}

export default renderHomePage;
