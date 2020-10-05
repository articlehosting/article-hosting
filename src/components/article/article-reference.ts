import {
  Article, ArticleFile, ArticleReference, Person,
} from './article';
import { CONTENT_IDENTIFIER_DOI } from './article-content';
import config from '../../config';
import { getArticleIdentifier } from '../../utils';

export const renderScholar = (person: Person): string => {
  if (person && person.givenNames && person.familyNames) {
    if (person.familyNames.length && person.familyNames.length) {
      const personFullName = `${person.givenNames.join(' ')} ${person.familyNames.join(' ')}`;
      return `<a href="https://scholar.google.com/scholar?q=%22author:${personFullName}%22">${personFullName}</a>`;
    }
  }

  return '';
};

export const renderArticleReferenceDatePublished = (reference: ArticleReference): string => {
  if (reference.datePublished) {
    if (typeof reference.datePublished === 'string') {
      return reference.datePublished;
    }

    return reference.datePublished.value;
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

const renderAdditionalDataItem = (article: Article, file: ArticleFile, index: number): string => {
  const fileLink = `/download/${getArticleIdentifier(CONTENT_IDENTIFIER_DOI, article) ?? ''}/${file.contentUrl}`;

  return `<div class="item">
    <div class="content">
      <div class="header">Supplementary file ${index}</div>
      <div class="description"><a href="${fileLink}">${config.server.hostname}${fileLink}</a></div>
      <div class="description"><a href="${fileLink}">Download ${file.name}.${file.extension}</a></div>
    </div>
  </div>`;
};

export const renderReference = (reference: ArticleReference): string =>
  `<div class="item" id="${reference.id}">
    <div class="content">
      <p class="header">${reference.title ?? (reference.isPartOf && reference.isPartOf.name) ?? ''}</p>
      <div class="description">${reference.authors.map((a) => renderScholar(a)).join(', ')} (${renderArticleReferenceDatePublished(reference)})</div>
      <div class="description">${renderReferencePublication(reference)}</div>
    </div>
  </div>`;

export const renderAdditionalData = (article: Article): string => {
  const skip = ['tif', 'tiff', 'xml'];

  return `<h2 class="ui header">Additional files</h2>
    <div class="ui list">
      ${article.files.filter((f) => !skip.includes(f.extension.toLowerCase())).map((file, index) => renderAdditionalDataItem(article, file, index + 1)).join('')}
    </div>`;
};

const renderArticleReferences = (article: Article): string =>
  `<div class="ui segment left aligned">
    <h2 class="ui header">References</h2>
    <div class="ui ordered relaxed list">${article.references.map((ref) => renderReference(ref)).join('')}</div>
    ${renderAdditionalData(article)}
  </div>`;

export default renderArticleReferences;
