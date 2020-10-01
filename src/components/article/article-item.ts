import { Article } from './article';
import { CONTENT_IDENTIFIER_DOI, renderContentBlock } from './article-content';
import { renderAuthors } from './article-header';
import { getArticleIdentifier, renderDate } from '../../utils';

const renderArticleItem = (article: Article): string => {
  const doi = getArticleIdentifier(CONTENT_IDENTIFIER_DOI, article);
  const dataPublished = new Date(article.datePublished.value);

  return `
    <div class="item">
      <div class="content">
        ${doi ? `<a class="header title" href="/articles/${doi}">${article.title}</a>` : ''}
        <div class="meta">
          <span>DOI: ${doi ?? ''}</span>
        </div>
        <div class="meta">
          Authors: ${renderAuthors(article.authors)}
        </div>
        <div class="description">
          ${article.description.map((contentBlock) => renderContentBlock(contentBlock, { article })).join('')}
        </div>
        ${dataPublished.getFullYear() ? `<div class="extra">
          Data Published: ${renderDate('mm dd, yy', 'long', dataPublished)}
        </div>` : ''}
        <div class="extra">
          <a href="#">{{Volume}}</a>
        </div>
        <div class="extra">
          <a href="#">{{Subject}}</a>
        </div>
      </div>
    </div>
  `;
};

export default renderArticleItem;
