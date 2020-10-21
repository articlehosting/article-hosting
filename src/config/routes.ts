export enum RdfRoutes {
  'Entry' = 'entry',
  'Articles' = 'articles',
  'ArticleBackMatter' = 'article-back-matter',
  'ArticleFiles' = 'article-files',
}

export enum ApiRoutes {
  'DownloadFile' = 'download-file',
  'DownloadCitation' = 'download-citation',
  'DeleteArticle' = 'delete-article',
}

export enum PagesRoutes {
  'HomePage' = 'home-page',
  'About' = 'about',
  'Subjects' = 'subjects',
  'ArticleView' = 'article-view',
  'ArticleFiguresView' = 'article-figures-view'
}

export default {
  rdf: RdfRoutes,
  api: ApiRoutes,
  pages: PagesRoutes,
};
