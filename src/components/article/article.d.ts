export interface Person {
  type: 'Person',
  familyNames: Array<string>,
  givenNames: Array<string>,
}

export interface ArticleAffiliations {
  type: string,
  address: {
    type: string,
    addressCountry: string,
    addressLocality?: string
  },
  name: string
}

export interface ArticleAuthor extends Person {
  affiliations: Array<ArticleAffiliations>
  emails?: Array<string>,
}

export interface ImageObjectContent {
  type: 'ImageObject',
  contentUrl: string,
  format: string,
  meta: {
    inline: boolean
  }
}

export interface TableCellContent {
  type: 'TableCell'
  content: Array<string | ArticleContents>
  rowspan? : string | number,
  colspan? : string | number,
}

export interface TableRowContent {
  type: 'TableRow'
  cells: Array<TableCellContent>
  rowType?: string,
}

export interface TableDescription {
  type?: string,
  id?: string,
  content: Array<string | ArticleContents>,
  meta?: ArticleMeta,
}

export interface TableContent {
  type: 'Table',
  id?: string,
  label: string,
  caption: Array<string | ArticleContents>,
  rows: Array<TableRowContent>,
  description?: Array<TableDescription>,
}

export interface ArticleContents {
  type: string,
  label?: string,
  content?: Array<string | ArticleContents | ImageObjectContent>,
  caption?: Array<string | ArticleContents>,
  id?: string,
  target?: string,
  relation?: string,
  depth?: number,
}

export interface ArticleDate {
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
  name?: string,
  issueNumber?: string | number,
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

export interface ArticleAbout {
  type: string,
  name: string,
}

export interface ArticleLicense {
  type: string,
  url: string,
  content: Array<ArticleContents>
}

export interface ArticleReference {
  type: string,
  id: string,
  title?: string,
  pageEnd?: number,
  pageStart?: number,
  datePublished: string | ArticleDate,
  authors: Array<Person>
  isPartOf?: ArticlePartOf
}

export interface ArticleMeta {
  authorNotes?: Array<string | ArticleContents>,
  footnoteType?: string,
}

export interface ArticleFile {
  type: string,
  name: string,
  extension: string,
  contentUrl: string,
}

export interface Article {
  type: string,
  title: string | Array<ArticleContents>,
  authors: Array<ArticleAuthor>,
  about: Array<ArticleAbout>,
  description: string | Array<string | ArticleContents>,
  content: Array<ArticleContents | TableContent | ImageObjectContent>,
  datePublished: ArticleDate,
  dateReceived?: ArticleDate,
  dateAccepted?: ArticleDate,
  isPartOf: ArticlePartOf,
  identifiers: Array<ArticleIdentifier>,
  keywords?: Array<string>,
  licenses: Array<ArticleLicense>
  references: Array<ArticleReference>,
  meta?: ArticleMeta,
  genre: Array<string>,
  pageStart: string | number,
  pageEnd: string | number,
  files: Array<ArticleFile>,
}
