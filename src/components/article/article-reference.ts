import { Article, ArticleReference, Person } from './article';

export const renderScholar = (person: Person): string => {
  if (person && person.givenNames && person.familyNames) {
    const personFullName = `${person.givenNames.join(' ')} ${person.familyNames.join(' ')}`;
    return `<a href="https://scholar.google.com/scholar?q=%22author:${personFullName}%22">${personFullName}</a>`;
  }

  return '';
};

export const renderReferencePublication = (part: ArticleReference): string => {
  if (part.isPartOf) {
    if (part.isPartOf.isPartOf) {
      return `<i>${part.isPartOf.isPartOf.name ?? ''}</i>
        <strong>${part.isPartOf.volumeNumber ?? ''}</strong>
        ${(part.pageStart && part.pageEnd && `<span class="pages">: ${part.pageStart} - ${part.pageEnd}</span>`) ?? ''}
      `;
    }

    return `${part.isPartOf.name ?? ''}`;
  }

  return '';
};

export const renderReference = (reference: ArticleReference): string =>
  `<div class="item" id="${reference.id}">
    <div class="content">
      <p class="header">${reference.title ?? (reference.isPartOf && reference.isPartOf.name) ?? ''}</p>
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
