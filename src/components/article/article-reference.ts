import querystring from 'querystring';
import {
  Article, ArticleDate, ArticleReference, Person,
} from './article';

export const renderScholar = (body: string, url: string): string => `<a href="https://scholar.google.com/${url}">${body}</a>`;

export const renderPersonScholar = (person: Person): string => {
  if (person && person.givenNames && person.familyNames) {
    if (person.familyNames.length && person.familyNames.length) {
      const body = `${person.givenNames.join(' ')} ${person.familyNames.join(' ')}`;
      const pathSegment = `${person.givenNames.join('+')}+${person.familyNames.join('')}`;

      return `<li>${renderScholar(body, `scholar?q=%22author:${pathSegment}%22`)}</li>`;
    }
  }

  return '';
};

export const renderReferenceScholar = (articleReference: ArticleReference): string => {
  if (articleReference) {
    const q: {
      title?: string,
      author?: string,
      published_year?: string,
      journal?: string,
      volume?: string | number,
      pages?: string,
    } = {};

    if (articleReference.title) {
      q.title = articleReference.title;
    }

    if (Array.isArray(articleReference.authors) && articleReference.authors.length) {
      articleReference.authors.forEach((person: Person) => {
        if (person && person.givenNames && person.familyNames) {
          if (person.familyNames.length && person.familyNames.length) {
            q.author = `${person.givenNames.join(' ')} ${person.familyNames.join(' ')}`;
          }
        }
      });
    }

    if (articleReference.datePublished) {
      q.published_year = typeof articleReference.datePublished !== 'string'
        ? articleReference.datePublished.value
        : articleReference.datePublished;
    }

    if (articleReference.isPartOf) {
      if (articleReference.isPartOf.isPartOf) {
        if (articleReference.isPartOf.isPartOf.name) {
          q.journal = articleReference.isPartOf.isPartOf.name;
        }
      }

      if (articleReference.isPartOf.volumeNumber) {
        q.volume = articleReference.isPartOf.volumeNumber;
      }
    }

    if (articleReference.pageStart && articleReference.pageEnd) {
      q.pages = `${articleReference.pageStart}-${articleReference.pageEnd}`;
    }

    const pathSegment = `scholar_lookup?${querystring.encode(q)}`;

    return renderScholar('Google Scholar', pathSegment);
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
        ${reference.authors.map((a) => renderPersonScholar(a)).join('')}
        <li>&nbsp;(${renderArticleReferenceDatePublished(reference.datePublished)})</li>
      </ol>
      <div>${renderReferencePublication(reference)}</div>
      <div>${renderReferenceScholar(reference)}</div>
    </div>
  </li>` : ''}
  `;

const renderArticleReferences = (article: Article): string =>
  `<h2>References</h2>
    <ol class="reference-list">${article.references.map((ref, index) => renderReference(ref, index + 1)).join('')}</ol>
  `;

export default renderArticleReferences;
