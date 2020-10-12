import {
  Article, ArticleDate, ArticleReference, Person,
} from './article';

export const renderScholar = (person: Person): string => {
  if (person && person.givenNames && person.familyNames) {
    if (person.familyNames.length && person.familyNames.length) {
      const personFullName = `${person.givenNames.join(' ')} ${person.familyNames.join(' ')}`;
      return `<li><a href="https://scholar.google.com/scholar?q=%22author:${personFullName}%22">${personFullName}</a></li>`;
    }
  }

  return '';
};

export const renderArticleReferenceDatePublished = (date: string | ArticleDate): string => {
  if (date) {
    if (typeof date === 'string') {
      return date;
    }
    return new Date(date.value).getFullYear().toString();
  }

  return '';
};

export const renderReferencePublication = (part: ArticleReference): string => {
  if (part.isPartOf) {
    if (part.isPartOf.isPartOf) {
      return `<i>${part.isPartOf.isPartOf.name ?? ''}</i>
        <b>${part.isPartOf.volumeNumber ?? ''}</b>
        ${(part.pageStart && part.pageEnd && `<span class="pages">: ${part.pageStart} - ${part.pageEnd}</span>`) ?? ''}
      `;
    }

    return `${part.isPartOf.name ?? ''}`;
  }

  return '';
};

export const renderReference = (reference: ArticleReference, index: number): string =>
  `${reference.title ?? (reference.isPartOf && reference.isPartOf.name) ? `<li class="reference-list__item">
    <span class="reference-list__ordinal_number">${index}</span>
    <div class="reference" id="${reference.id}">
      <p class="m-b-0">${reference.title ?? (reference.isPartOf && reference.isPartOf.name) ?? ''}</p>
      <ol class="article-author-list" role="list">
        ${reference.authors.map((a) => renderScholar(a)).join('')}
        <li>&nbsp;(${renderArticleReferenceDatePublished(reference.datePublished)})</li>
      </ol>
      <div>${renderReferencePublication(reference)}</div>
    </div>
  </li>` : ''}
  `;

const renderArticleReferences = (article: Article): string =>
  `<h2>References</h2>
    <ol class="reference-list">${article.references.map((ref, index) => renderReference(ref, index + 1)).join('')}</ol>
  `;

export default renderArticleReferences;
