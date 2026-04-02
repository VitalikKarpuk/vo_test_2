import { gql } from '@apollo/client'

// Fragment for article attributes
export const ARTICLE_FRAGMENT = gql`
  fragment ArticleAttributes on Article {
    documentId
    Title
    Description
    Date
    Img {
      url
    }
    Categories
    Category
  }
`

// Fragment for full article (including content)
export const FULL_ARTICLE_FRAGMENT = gql`
  fragment FullArticleAttributes on Article {
    documentId
    Title
    Description
    Date
    Img {
      url
    }
    Categories
    Category
    Article
    Twitter_Url
    Reddit_Url
    Mirror_Url
    Custom_Url
  }
`

// Query for blog list page
export const BLOG_ARTICLES_QUERY = gql`
  ${ARTICLE_FRAGMENT}
  query BlogArticlesPage($sort: [String], $pagination: PaginationArg) {
    articles(sort: $sort, pagination: $pagination) {
      ...ArticleAttributes
    }
  }
`

export const PIECE_OF_NEWS_FRAGMENT = gql`
  fragment newsPieceAttributes on Article {
    Title
    Description
    Img {
      url
    }
    Article
    Date
    Categories
    Twitter_Url
    Reddit_Url
    Mirror_Url
    Custom_Url
  }
`;
// Query for single article page
export const SINGLE_ARTICLE_QUERY = gql`
  ${PIECE_OF_NEWS_FRAGMENT}
  query SingleNews($documentId: ID!) {
    article(documentId: $documentId) {
      ...newsPieceAttributes
    }
  }
`
