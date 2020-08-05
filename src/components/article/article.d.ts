export interface ArticleAuthor {
  type: string,
  affiliations: Array<{
    type: string,
    address: {
      type: string,
      addressCountry: string,
      addressLocality?: string
    },
    name: string
  }>
  emails: Array<string>,
  familyNames: Array<string>,
  givenNames: Array<string>,
}

export interface ArticleContents {
  type: string,
  label?: string,
  content?: Array<string | ArticleContents>,
  caption?: Array<string | ArticleContents>,
  id?: string,
  target?: string,
  relation?: string,
  depth?: number,
  rows?: Array<ArticleContents>,
  cells?: Array<ArticleContents>,
  rowType?: string,
  rowSpan? : string | number,
  colSpan? : string | number,
  /**
   * TODO consider creating separate types for ImageObject and Table and extending ArticleContents
    */
  contentUrl?: string,
  format?: string,
  meta?: {
    inline: boolean
  }
}

export interface ArticleDatePublished {
  type: string,
  value: string,
}

export interface ArticlePartOf {
  type: string,
  isPartOf?: ArticlePartOf,
  volumeNumber?: string | number,
  identifiers?: Array<ArticleIdentifier>,
  issns?: Array<string>,
  publisher?: ArticlePartOfPublisher,
  title?: string,
}

export interface ArticleIdentifier {
  type: string,
  name: string,
  propertyID: string,
  value: string
}

export interface ArticlePartOfPublisher {
  type: string,
  name: string,
}

export interface ArticleLicense {
  type: string,
  url: string,
  content: Array<ArticleContents>
}

export interface Article {
  type: string,
  title: string,
  authors: Array<ArticleAuthor>,
  description: Array<ArticleContents>,
  content: Array<ArticleContents>,
  datePublished: ArticleDatePublished,
  isPartOf: ArticlePartOf,
  identifiers: Array<ArticleIdentifier>,
  keywords: Array<string>,
  licenses: Array<ArticleLicense>
}
