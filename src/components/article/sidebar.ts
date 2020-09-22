import { Article } from './article';
import { getArticleIdentifier } from '../../utils';

const items = [
  {
    title: 'Article',
    path: '/',
  },
  {
    title: 'Figures and data',
    path: '/figures',
  },
];

const articleSidebar = (article: Article): string => {
  const doi: string | null = getArticleIdentifier('doi', article);
  const renderItems: Array<string> = items.map((item) => (doi ? `<div class="item">
      <a href="/articles/${encodeURIComponent(doi)}${item.path}" ><strong>${item.title}</strong></a>
    </div>` : ''));

  return `
    <div class="three wide column">
      <div class="ui link list large" data-behaviour="ViewSelector" data-behaviour-initialised="true">
          ${renderItems.map((item: string) => item).join('')}
      </div>
    </div>`;
};

export default articleSidebar;
