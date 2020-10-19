export enum RdfRoutes {
  'Entry' = 'entry',
  'Articles' = 'articles',
  'ArticleDetail' = 'articleDetail'
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
}

export default {
  rdf: RdfRoutes,
  api: ApiRoutes,
  pages: PagesRoutes,
};
