import renderArticleContent from './article-content';
import renderArticleHeader from './article-header';
import renderArticleReferences from './article-reference';

import demoArticle from '../../__fixtures__/article';

const renderArticle = (): string => `
${renderArticleHeader(demoArticle)}
${renderArticleContent(demoArticle)}
${renderArticleReferences(demoArticle)}
`;

export default renderArticle;
