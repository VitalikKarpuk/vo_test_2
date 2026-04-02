import { cache } from 'react'
import { getApolloClient, STRAPI_URL } from '../apollo-client'
import { BLOG_ARTICLES_QUERY, SINGLE_ARTICLE_QUERY } from './queries'
import {
  type BlogArticlesPageQuery,
  type BlogArticlesPageQueryVariables,
  type SingleArticleQuery,
  type SingleArticleQueryVariables,
  type MappedPost,
  mapArticleToPost,
} from './types'

export type { MappedPost }

// Cached function to get all articles
export const getAllArticles = cache(async (): Promise<MappedPost[]> => {
  const client = getApolloClient()

  try {
    const { data, errors } = await client.query<
      BlogArticlesPageQuery,
      BlogArticlesPageQueryVariables
    >({
      query: BLOG_ARTICLES_QUERY,
      variables: {
        sort: ['Date:desc'],
        pagination: { page: 1, pageSize: 100 },
      },
    })

    if (errors) {
      console.error('[v0] GraphQL errors:', errors)
      return []
    }

    if (!data?.articles) {
      return []
    }

    return data.articles.map((article) => mapArticleToPost(article, STRAPI_URL))
  } catch (error) {
    console.error('[v0] Failed to fetch articles:', error)
    return []
  }
})

// Cached function to get a single article by documentId
export const getArticleById = cache(async (documentId: string): Promise<MappedPost | null> => {
  const client = getApolloClient()

  try {
    const { data, errors } = await client.query<SingleArticleQuery, SingleArticleQueryVariables>({
      query: SINGLE_ARTICLE_QUERY,
      variables: { documentId },
    })

    if (errors) {
      console.error('[v0] GraphQL errors:', errors)
      return null
    }

    if (!data?.article) {
      return null
    }

    return mapArticleToPost(data.article, STRAPI_URL)
  } catch (error) {
    console.error('[v0] Failed to fetch article:', error)
    return null
  }
})
