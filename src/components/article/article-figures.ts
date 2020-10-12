import { Article } from './article';
import {
  CONTENT_FIGURE,
  CONTENT_TABLE,
  renderContentBlock,
} from './article-content';
import { renderAdditionalData } from './article-info';

export const renderArticleFiguresContent = (article: Article): string => {
  const contentArray = (type: string): Array<string> =>
    article.content.filter((c) => c.type === type).map((contentBlock) => renderContentBlock(contentBlock, { article }));
  const renderContent = (type: string): string => `${contentArray(type).join('')}`;
  const files = article.files.filter((f) => !['tif', 'tiff', 'xml'].includes(f.extension.toLowerCase()));

  const tableContent = renderContent(CONTENT_TABLE);
  const figureContent = renderContent(CONTENT_FIGURE);

  return `
    <div class="main-content">
      <div class="message-bar ignored ui message">
        <b>${contentArray(CONTENT_FIGURE).length}</b> figures, <b>${contentArray(CONTENT_TABLE).length}</b> tables and <b>${files.length}</b> additional file
      </div>
      ${figureContent ? `
      <header>
        <h2>Figures</h2>
      </header>
      <section>
        ${figureContent}
      </section>` : ''}
      ${tableContent ? `
      <header>
        <h2>Tables.</h2>
      </header>
      <section>
        ${tableContent}
      </section>` : ''}
      <section>
      <h2>Additional files.</h2>
        ${renderAdditionalData(article)}
      </section>
    </div>
  `;
};

export default renderArticleFiguresContent;
