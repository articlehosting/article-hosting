import { Article, ArticleReference, Person } from './article';

export const renderScholar = (person: Person): string => {
  const personFullName = `${person.givenNames.join(' ')} ${person.familyNames.join(' ')}`;
  return `<a href="https://scholar.google.com/scholar?q=%22author:${personFullName}%22">${personFullName}</a>`;
};

export const renderReferencePublication = (part: ArticleReference): string => {
  if (part.isPartOf.isPartOf) {
    return `<i>${part.isPartOf.isPartOf.name ?? ''}</i>
      <strong>${part.isPartOf.volumeNumber ?? ''}</strong>
      ${(part.pageStart && part.pageEnd && `<span class="pages">: ${part.pageStart} - ${part.pageEnd}</span>`) ?? ''}
    `;
  }
  return `${part.isPartOf.name ?? ''}`;
};

export const renderReference = (reference: ArticleReference): string =>
  `<div class="item">
    <div class="content">
      <p class="header">${reference.title ?? reference.isPartOf.name ?? ''}</p>
      <div class="description">${reference.authors.map((a) => renderScholar(a)).join(', ')} (${reference.datePublished})</div>
      <div class="description">${renderReferencePublication(reference)}</div>
    </div>
  </div>`;

const renderArticleReferences = (article: Article): string =>
  `<div class="ui segment left aligned">
    <h2 class="ui header">References</h2>
    <div class="ui ordered relaxed list">${article.references.map((ref) => renderReference(ref)).join('')}</div>
  </div>`;

export default renderArticleReferences;
