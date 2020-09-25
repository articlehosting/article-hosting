import stream from 'stream';
import { RouterContext } from '@koa/router';
import { BAD_REQUEST, NOT_FOUND } from 'http-status-codes';
import {
  Article, ArticleAuthor, ArticleContents, ArticleDatePublished,
} from '../../components/article/article';
import { CONTENT_IDENTIFIER_DOI } from '../../components/article/article-content';
import config from '../../config';
import getDb from '../../server/db';
import ApiError from '../../server/error';
import { getArticleIdentifier, renderDate } from '../../utils';

export interface CitationRouterContext extends RouterContext {
  doi?: string,
  file?: string
}

const BIB = 'bib';
const RIS = 'ris';
const { ARTICLES } = config.db.collections;
// const PDF = 'pdf';

const issueNumber = ({ isPartOf }: Article): string | number => isPartOf.issueNumber ?? '';
const volumeNumber = ({ isPartOf }: Article): string | number => isPartOf.isPartOf?.volumeNumber ?? '';
const fpagelpage = (pageStart: string | number, pageEnd: string | number): string => `${pageStart}-${pageEnd}`;
const abstract = (description: Array<ArticleContents>): string => description.map((desc) => desc.content?.join('')).join('');
const datePublished = (date: ArticleDatePublished): Date => new Date(date.value);

const renderBib = (article: Article): stream.Readable => {
  const generatedBibTex = `@article {10.34196/ijm.00214,
    article_type = {${article.type}},
    title = {${article.title}},
    author = {${article.authors.map((author: ArticleAuthor) => `${author.givenNames.join(' ')} ${author.familyNames.join(' ')}`).join(', ')}},
    volume = ${volumeNumber(article)},
    number = ${issueNumber(article)},
    year = ${datePublished(article.datePublished).getFullYear()},
    month = {${renderDate('mm', 'short', datePublished(article.datePublished)).toLowerCase()}},
    pub_date = {${article.datePublished.value}},
    pages = {${fpagelpage(article.pageStart, article.pageEnd)}},
    citation = {{TYPE_ARTICLE} ${datePublished(article.datePublished).getFullYear()};${volumeNumber(article)}(${issueNumber(article)}):${fpagelpage(article.pageStart, article.pageEnd)}},
    doi = {${getArticleIdentifier(CONTENT_IDENTIFIER_DOI, article) ?? ''}},
    url = {https://doi.org/${getArticleIdentifier(CONTENT_IDENTIFIER_DOI, article) ?? ''}},
    abstract = {${abstract(article.description)}},
    keywords = {${article.keywords.join(', ')}},
    journal = {{TYPE_ARTICLE}},
    issn = {${article.isPartOf.isPartOf?.isPartOf?.issns?.join('') ?? ''}},
    publisher = {${article.isPartOf.isPartOf?.isPartOf?.title ?? config.name}},
    }`;

  return stream.Readable.from([generatedBibTex]);
};

const renderRis = (article: Article): stream.Readable => {
  const generatedRisTex = `TY  - ${article.type}
TI  - ${article.title}
${article.authors.map((author: ArticleAuthor) => `AU  - ${author.familyNames.join(' ')}, ${author.givenNames.join(' ')}`).join('\n')}
VL  - ${volumeNumber(article)}
IS  - ${issueNumber(article)}
PY  - ${datePublished(article.datePublished).getFullYear()}
DA  - ${article.datePublished.value.split('-').join('/')}
SP  - ${fpagelpage(article.pageStart, article.pageEnd)}
C1  - {TYPE_ARTICLE} ${datePublished(article.datePublished).getFullYear()};${volumeNumber(article)}(${issueNumber(article)}):${fpagelpage(article.pageStart, article.pageEnd)}
DO  - ${getArticleIdentifier(CONTENT_IDENTIFIER_DOI, article) ?? ''}
UR  - https://doi.org/${getArticleIdentifier(CONTENT_IDENTIFIER_DOI, article) ?? ''}
AB  - ${abstract(article.description)}
${article.keywords.map((key: string) => `KW  - ${key}`).join('\n')}
JF  - {TYPE_ARTICLE}
SN  - ${article.isPartOf.isPartOf?.isPartOf?.issns?.join('') ?? ''}
PB  - ${article.isPartOf.isPartOf?.isPartOf?.title ?? config.name}
ER  -
  `;

  return stream.Readable.from([generatedRisTex]);
};

const citationHandler = async (params?: CitationRouterContext): Promise<stream.Readable> => {
  if (!params) {
    throw new ApiError('Missing endpoint params', BAD_REQUEST);
  }

  const { doi, file } = params;

  if (!doi) {
    throw new ApiError('Missing mandatory field "DOI"', BAD_REQUEST);
  }

  if (!file) {
    throw new ApiError('Missing mandatory field "file"', BAD_REQUEST);
  }
  const db = await getDb();
  const article = await db.collection(ARTICLES).findOne({ _id: doi });

  if (!article) {
    throw new ApiError('Article not found', NOT_FOUND);
  }

  const [, type] = file.split('.');

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
