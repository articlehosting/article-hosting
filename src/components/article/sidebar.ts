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
    <a href="/articles/${doi}${item.path}"><strong>${item.title}</strong></a>
  </div>` : ''));

  return `
    <div class="three wide column">
      <div class="ui link list large" data-behaviour="ViewSelector" data-behaviour-initialised="true">
          ${renderItems.map((item: string) => item).join('')}
          <div class="ui ignored hidden divider"></div>
          ${(doi && pdfFile) ? `<div class="item">
            <a href="/download/${doi}/${pdfFile.contentUrl}"><strong>Download PDF</strong></a>
          </div>` : ''}
          ${(doi && publisherId) ? `<div class="item">
            <a href="/citation/${doi}/${publisherId}.bib"><strong>Download BibTex</strong></a>
          </div>` : ''}
          ${(doi && publisherId) ? `<div class="item">
            <a href="/citation/${doi}/${publisherId}.ris"><strong>Download RIS</strong></a>
          </div>
          ` : ''}
      </div>
    </div>`;
};

export default renderArticleSidebar;
