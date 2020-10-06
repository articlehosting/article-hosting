import path from 'path';
import stream from 'stream';
import { RouterContext } from '@koa/router';
import { BAD_REQUEST, NOT_FOUND } from 'http-status-codes';
import {
  Article, ArticleAuthor, ArticleDate,
} from '../../components/article/article';
import { CONTENT_IDENTIFIER_DOI, renderArticleDescription } from '../../components/article/article-content';
import config from '../../config';
import getDb from '../../server/db';
import ApiError from '../../server/error';
import { articleDoi, getArticleIdentifier, renderDate } from '../../utils';

export interface CitationRouterContext extends RouterContext {
  publisherId?: string,
  id?: string,
  file?: string
}

const BIB = '.bib';
const RIS = '.ris';
const { ARTICLES } = config.db.collections;
// const PDF = 'pdf';

const issueNumber = ({ isPartOf }: Article): string | number => isPartOf.issueNumber ?? '';
const volumeNumber = ({ isPartOf }: Article): string | number => isPartOf.isPartOf?.volumeNumber ?? '';
const fpagelpage = (pageStart: string | number, pageEnd: string | number): string => `${pageStart}-${pageEnd}`;
const datePublished = (date: ArticleDate): Date => new Date(date.value);

const renderBib = (article: Article): stream.Readable => {
  const doi = getArticleIdentifier(CONTENT_IDENTIFIER_DOI, article);
  let issn = '';
  let publisher = config.name;

  if (article.isPartOf.isPartOf && article.isPartOf.isPartOf.isPartOf) {
    if (article.isPartOf.isPartOf.isPartOf.issns) {
      issn = article.isPartOf.isPartOf.isPartOf.issns.join('');
    }
    if (article.isPartOf.isPartOf.isPartOf.title) {
      publisher = article.isPartOf.isPartOf.isPartOf.title;
    }
  }

  const generatedBibTex = `@article {${doi ?? ''},
article_type = {${article.type}},
title = {${article.title}},
author = {${article.authors.map((author: ArticleAuthor) => `${author.givenNames ? author.givenNames.join(' ') : ''} ${author.familyNames ? author.familyNames.join(' ') : ''}`).join(', ')}},
volume = ${volumeNumber(article)},
number = ${issueNumber(article)},
year = ${datePublished(article.datePublished).getFullYear()},
month = {${renderDate('mm', 'short', datePublished(article.datePublished)).toLowerCase()}},
pub_date = {${article.datePublished.value}},
pages = {${fpagelpage(article.pageStart, article.pageEnd)}},
citation = {{TYPE_ARTICLE} ${datePublished(article.datePublished).getFullYear()};${volumeNumber(article)}(${issueNumber(article)}):${fpagelpage(article.pageStart, article.pageEnd)}},
doi = {${doi ?? ''}},
url = {https://doi.org/${doi ?? ''}},
abstract = {${renderArticleDescription(article)}},
keywords = {${article.keywords ? article.keywords.join(', ') : ''}},
journal = {{TYPE_ARTICLE}},
issn = {${issn}},
publisher = {${publisher}},
}`;

  return stream.Readable.from([generatedBibTex]);
};

const renderRis = (article: Article): stream.Readable => {
  const doi = getArticleIdentifier(CONTENT_IDENTIFIER_DOI, article);
  let issn = '';
  let publisher = config.name;

  if (article.isPartOf.isPartOf && article.isPartOf.isPartOf.isPartOf) {
    if (article.isPartOf.isPartOf.isPartOf.issns) {
      issn = article.isPartOf.isPartOf.isPartOf.issns.join('');
    }
    if (article.isPartOf.isPartOf.isPartOf.title) {
      publisher = article.isPartOf.isPartOf.isPartOf.title;
    }
  }

  const generatedRisTex = `TY  - ${article.type}
TI  - ${article.title}
${article.authors.map((author: ArticleAuthor) => `AU  - ${author.givenNames ? author.givenNames.join(' ') : ''} ${author.familyNames ? author.familyNames.join(' ') : ''}`).join('\n')}
VL  - ${volumeNumber(article)}
IS  - ${issueNumber(article)}
PY  - ${datePublished(article.datePublished).getFullYear()}
DA  - ${article.datePublished.value.split('-').join('/')}
SP  - ${fpagelpage(article.pageStart, article.pageEnd)}
C1  - {TYPE_ARTICLE} ${datePublished(article.datePublished).getFullYear()};${volumeNumber(article)}(${issueNumber(article)}):${fpagelpage(article.pageStart, article.pageEnd)}
DO  - ${doi ?? ''}
UR  - https://doi.org/${doi ?? ''}
AB  - ${renderArticleDescription(article)}
${article.keywords ? article.keywords.map((key: string) => `KW  - ${key}`).join('\n') : ''}
JF  - {TYPE_ARTICLE}
SN  - ${issn}
PB  - ${publisher}
ER  -
  `;

  return stream.Readable.from([generatedRisTex]);
};

const citationHandler = async (params?: CitationRouterContext): Promise<stream.Readable> => {
  if (!params) {
    throw new ApiError('Missing endpoint params', BAD_REQUEST);
  }

  const { publisherId, id, file } = params;

  if (!publisherId) {
    throw new ApiError('Missing mandatory field "publisherId"', BAD_REQUEST);
  }

  if (!id) {
    throw new ApiError('Missing mandatory field "id"', BAD_REQUEST);
  }

  if (!file) {
    throw new ApiError('Missing mandatory field "file"', BAD_REQUEST);
  }
  const db = await getDb();
  const article = await db.collection(ARTICLES).findOne({ _id: articleDoi(publisherId, id) });

  if (!article) {
    throw new ApiError('Article not found', NOT_FOUND);
  }

  const type = path.extname(file);

  switch (type) {
    case BIB:
      return renderBib(article);
    case RIS:
      return renderRis(article);
    default:
      throw new ApiError('File not found', NOT_FOUND);
  }
};

export default citationHandler;
