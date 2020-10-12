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
  const doi: string | null = getArticleIdentifier('doi', article);
  const pdfFile = article.files.find((file) => file.extension === 'pdf');
  const [, publisherId] = doi ? doi.split('/') : [];
  const renderItems: Array<string> = items.map((item) => (doi ? `<div class="item">
    <a href="/articles/${doi}${item.path}"><span>${item.title}</span></a>
  </div>` : ''));

  return `
    <div class="article-sidebar">
      <div class="ui list large" data-behaviour="ViewSelector" data-behaviour-initialised="true">
          ${renderItems.map((item: string) => item).join('')}
          <div class="ui ignored divider"></div>
          ${(doi && pdfFile) ? `<div class="item">
            <a href="/download/${doi}/${pdfFile.contentUrl}"><span>Download PDF</span></a>
          </div>` : ''}
          <div class="ui ignored divider"></div>
          ${(doi && publisherId) ? `<div class="item">
            <a href="/citation/${doi}/${publisherId}.bib"><span>Download BibTex</span></a>
          </div>` : ''}
          ${(doi && publisherId) ? `<div class="item">
            <a href="/citation/${doi}/${publisherId}.ris"><span>Download RIS</span></a>
          </div>
          ` : ''}
      </div>
    </div>`;
};

export default renderArticleSidebar;
