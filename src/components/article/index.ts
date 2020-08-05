import renderArticleContent from './article-content';
import renderArticleHeader from './article-header';

import demoArticle from '../../__fixtures__/article';

const renderArticle = (): string => `
${renderArticleHeader(demoArticle)}
${renderArticleContent(demoArticle)}
`;

export default renderArticle;
