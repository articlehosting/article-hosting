import { Article } from './article';
import { CONTENT_HEADING, renderArticleDescription, renderContentBlock } from './article-content';
import { renderArticleInfo } from './article-info';
import renderArticleReferences from './article-reference';

export const renderArticleBody = (article: Article): string => {
  const sections = [];
  const headingIndexes: Array<number> = [];

  article.content.forEach((contentBlock, index) => {
    if ((contentBlock.type === CONTENT_HEADING) && (contentBlock.depth === 1)) {
      headingIndexes.push(index);
    }
  });

  for (let i = 0, k = article.content.length; i < headingIndexes.length; i += 1) {
    const currentIndex = headingIndexes[i];
    const nextIndex = headingIndexes[i + 1] ?? k;

    const section = article.content.slice(currentIndex, nextIndex)
      .map((contentBlock) => renderContentBlock(contentBlock, { article }))
      .join('');

    sections.push(`<section>${section}</section>`);
  }

  return `
    <div class="main-content">
      <section role="doc-abstract">
        ${['<h2>Abstract</h2>', renderArticleDescription(article)].join('')}
      </section>
      ${sections.join('')}
      <section>
          ${renderArticleReferences(article)}
      </section>
      <section>
          ${renderArticleInfo(article)}
      </section>
    </div>
  `;
};

export default renderArticleBody;
