import renderHomepageContent from './home-content';

import { Article } from '../article/article';

export const renderHome = (articles: Array<Article>): string => `
  ${renderHomepageContent(articles)}
`;

export default renderHome;
