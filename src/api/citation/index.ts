import stream from 'stream';
import { RouterContext } from '@koa/router';
import { BAD_REQUEST, NOT_FOUND } from 'http-status-codes';
import { Article, ArticleAuthor } from '../../components/article/article';
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
// const RIS = 'ris';
const { ARTICLES } = config.db.collections;
// const PDF = 'pdf';

const getAuthors = (authors?: Array<ArticleAuthor>): string => {
  if (authors?.length) {
    const renderedAuthors: Array<string> = [];

    authors.forEach((author): void => {
      renderedAuthors.push(`${author.givenNames.join(' ')} ${author.familyNames.join(' ')}`);
    });

    return renderedAuthors.join(', ');
  }
  return '';
};

const renderBib = (article: Article): stream.Readable => {
  const issueNumber = article.isPartOf.issueNumber ?? '';
  const volumeNumber = article.isPartOf.isPartOf?.volumeNumber ?? '';
  const fpagelpage = `${article.pageStart}-${article.pageEnd}`;
  const doi = getArticleIdentifier(CONTENT_IDENTIFIER_DOI, article) ?? '';
  const abstract = article.description.map((desc) => desc.content?.join('')).join('');

  const generatedBibTex = `@article {10.34196/ijm.00214,
    article_type = ${article.type},
    title = ${article.title},
    author = {${getAuthors(article.authors)}},
    volume = ${volumeNumber},
    number = ${issueNumber},
    year = ${new Date(article.datePublished.value).getFullYear()},
    month = {${renderDate('mm', 'short', new Date(article.datePublished.value))}},
    pub_date = {${article.datePublished.value}},
    pages = {${fpagelpage}},
    citation = {IJM 2020;${volumeNumber}(${issueNumber}):${fpagelpage}(${issueNumber})},
    doi = {${doi}},
    url = {https://doi.org/${doi}},
    abstract = {${abstract}},
    keywords = {${article.keywords.join(', ')}},
    journal = {IJM},
    issn = {${article.isPartOf.isPartOf?.isPartOf?.issns?.join('') ?? ''}},
    publisher = {${article.isPartOf.isPartOf?.isPartOf?.title ?? ''},
    }
  `;

  return stream.Readable.from([generatedBibTex]);
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
    // case RIS:
    //   return renderRis(article);
    default:
      throw new ApiError('File not found', NOT_FOUND);
  }
};

export default citationHandler;
