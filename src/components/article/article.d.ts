export interface ArticleAuthor {
  type: string,
  affiliations: Array<{
    type: string,
    address: {
      type: string,
      addressCountry: string
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

export interface Article {
  type: string,
  title: string,
  authors: Array<ArticleAuthor>,
  content: Array<ArticleContents>
}
