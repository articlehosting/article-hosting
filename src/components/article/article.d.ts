export interface Person {
  type: 'Person',
  familyNames: Array<string>,
  givenNames: Array<string>,
}

export interface ArticleAuthor extends Person {
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
  rowSpan? : string | number,
  colSpan? : string | number,
}

export interface TableRowContent {
  type: 'TableRow'
  cells: Array<TableCellContent>
  rowType?: string,
}

export interface TableContent {
  type: 'Table',
  id?: string,
  label: string,
  caption: Array<string | ArticleContents>,
  rows: Array<TableRowContent>,
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
  name?: string,
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

export interface ArticleReference {
  type: string,
  id?: string,
  title?: string,
  pageEnd?: number,
  pageStart?: number,
  datePublished: string,
  authors: Array<Person>
  isPartOf: ArticlePartOf
}

export interface Article {
  type: string,
  title: string,
  authors: Array<ArticleAuthor>,
  description: Array<ArticleContents>,
  content: Array<ArticleContents | TableContent | ImageObjectContent>,
  datePublished: ArticleDatePublished,
  isPartOf: ArticlePartOf,
  identifiers: Array<ArticleIdentifier>,
  keywords: Array<string>,
  licenses: Array<ArticleLicense>
  references: Array<ArticleReference>,
  meta?: {
    authorNotes?: Array<string | ArticleContents>
  }
}
