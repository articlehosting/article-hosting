import { Article, ArticleContents, ImageObjectContent } from './article';
import { Context, renderImageObject } from './article-content';

export const CONTENT_TABLE = 'Table';
export const CONTENT_FIGURE = 'Figure';
export const CONTENT_IMAGEOBJECT = 'ImageObject';

export const renderContentBlock = (content?: ArticleContents | string, context?: Context): string => {
  /* eslint-disable @typescript-eslint/no-use-before-define */
  if (!content) {
    return '';
  }
  if (typeof content === 'string') {
    return content;
  }

  switch (content.type) {
    // case CONTENT_TABLE:
    //   return renderTable(<TableContent>content, context);
    case CONTENT_FIGURE:
      return renderImages(content, context);
    case CONTENT_IMAGEOBJECT:
      return renderImageObject(<ImageObjectContent>content, context);
    default:
      return '';
  }
};

export const renderContentArray = (content?: ArticleContents, context?: Context): string =>
  `${content?.content?.map((c) => renderContentBlock(c, context)).join('') ?? ''}`;

export const renderImages = (content: ArticleContents, context?: Context): string =>
  `<div${content.id ? ` id="${content.id}"` : ''}>
    <div>
      <div><span>${content.label ?? ''}</span></div>
    </div>
    <figure>
      ${renderContentArray(content, context)}
      <figcaption>${content.caption?.map((c) => renderContentBlock(c, context)).join('') ?? ''}</figcaption>
    </figure>
  </div>`;

export const renderArticleFiguresContent = (article: Article): string => `
${renderImages(article)}`;

export default renderArticleFiguresContent;
