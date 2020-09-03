import { Article } from './article';
import { CONTENT_IDENTIFIER_DOI, renderContentBlock } from './article-content';
import { getArticleIdentifier, renderDate } from '../../utils';

const renderArticleItem = (article: Article): string => {
  const doi = getArticleIdentifier(CONTENT_IDENTIFIER_DOI, article);
  const dataPublished = new Date(article.datePublished.value);

  return `
    <div class="item">
      <div class="content">
        <a class="header" href="/articles/${encodeURIComponent(doi ?? '')}">${article.title}</a>
        <div class="meta">
          <span>DOI: ${doi ?? ''}</span>
        </div>
        <div class="meta">
          Authors: ${article.authors.map((author) => `<a href="mailto:${author.emails.join(' ')}">${author.givenNames.join(' ')} ${author.familyNames.join(' ')}</a>`).join(', ')}
        </div>
        <div class="description">
          ${article.description.map((contentBlock) => renderContentBlock(contentBlock, { article })).join('')}
        </div>
        <div class="extra">
          Data Published: ${renderDate('mm dd, yy', 'long', dataPublished)}
        </div>
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
