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
  content: Array<string>
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

export interface Article {
  type: string,
  title: string,
  authors: Array<ArticleAuthor>,
  content: Array<ArticleContents>,
  datePublished: ArticleDatePublished,
  isPartOf: ArticlePartOf,
  identifiers: Array<ArticleIdentifier>
}
