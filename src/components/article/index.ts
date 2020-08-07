import renderArticleContent from './article-content';
import renderArticleHeader from './article-header';
import { renderArticleInfo } from './article-info';
import renderArticleReferences from './article-reference';

import demoArticle from '../../__fixtures__/article';

const renderArticle = (): string => `
${renderArticleHeader(demoArticle)}
${renderArticleContent(demoArticle)}
${renderArticleReferences(demoArticle)}
${renderArticleInfo(demoArticle)}
`;

export default renderArticle;
