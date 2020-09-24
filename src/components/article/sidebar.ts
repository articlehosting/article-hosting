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

const renderArticleSidebar = (article: Article): string => {
  const prefix = 'ijm';
  const doi: string | null = getArticleIdentifier('doi', article);
  const publisherId = getArticleIdentifier('publisher-id', article) ?? '';
  const renderItems: Array<string> = items.map((item) => (doi ? `<div class="item">
    <a href="/articles/${encodeURIComponent(doi)}${item.path}"><strong>${item.title}</strong></a>
  </div>` : ''));

  return `
    <div class="three wide column">
      <div class="ui link list large" data-behaviour="ViewSelector" data-behaviour-initialised="true">
          ${renderItems.map((item: string) => item).join('')}
          <div class="ui ignored hidden divider"></div>
          ${publisherId ? `<div class="item">
            <a href="/download/${publisherId}/${prefix}-${publisherId}.pdf"><strong>Download PDF</strong></a>
          </div>` : ''}
          ${doi && publisherId ? `<div class="item">
            <a href="/citation/${encodeURIComponent(doi)}/${publisherId}.bib"><strong>Download BibTex</strong></a>
          </div>` : ''}
          ${doi && publisherId ? `<div class="item">
            <a href="/citation/${encodeURIComponent(doi)}/${publisherId}.ris"><strong>Download RIS</strong></a>
          </div>
          ` : ''}
      </div>
    </div>`;
};

export default renderArticleSidebar;
