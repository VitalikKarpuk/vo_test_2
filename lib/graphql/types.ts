// Strapi GraphQL Types for Blog Articles

export interface StrapiImage {
  url: string
}

/** Raw Strapi categories: string, comma list, JSON array, or relation objects */
export type StrapiCategoriesField = unknown

export interface Article {
  documentId: string
  Title: string
  Description?: string
  Date: string
  Img?: StrapiImage
  Categories?: StrapiCategoriesField
  Category?: StrapiCategoriesField
  Article?: string
  Twitter_Url?: string
  Reddit_Url?: string
  Mirror_Url?: string
  Custom_Url?: string
}

// Blog Articles List Query
export interface BlogArticlesPageQuery {
  articles: Article[]
}

export interface PaginationArg {
  page?: number
  pageSize?: number
}

export interface BlogArticlesPageQueryVariables {
  sort?: string[]
  pagination?: PaginationArg
}

// Single Article Query
export interface SingleArticleQuery {
  article: Article | null
}

export interface SingleArticleQueryVariables {
  documentId: string
}

// Mapped type for UI components (to match existing UI structure)
export interface MappedPost {
  id: string
  slug: string
  title: string
  excerpt: string
  date: string
  coverSrc?: string
  content: string
  author?: string
  categories?: string
  socialLinks?: {
    twitter?: string
    reddit?: string
    mirror?: string
    custom?: string
  }
}

/** Normalize Strapi category field to a comma-separated string for the UI */
export function normalizeCategoriesField(value: unknown): string | undefined {
  if (value == null || value === '') return undefined
  if (typeof value === 'string') return value.trim() || undefined
  if (Array.isArray(value)) {
    if (value.length === 0) return undefined
    const parts = value.map((item) => {
      if (typeof item === 'string') return item.trim()
      if (item && typeof item === 'object') {
        const o = item as Record<string, unknown>
        if (typeof o.name === 'string') return o.name.trim()
        if (typeof o.Title === 'string') return o.Title.trim()
      }
      return String(item).trim()
    }).filter(Boolean)
    return parts.length ? parts.join(', ') : undefined
  }
  if (typeof value === 'object') {
    const o = value as Record<string, unknown>
    if (typeof o.name === 'string') return o.name.trim()
    if (typeof o.Title === 'string') return o.Title.trim()
  }
  return String(value).trim() || undefined
}

/** Make relative Strapi media paths absolute so <img> and markdown images load in the app */
export function rewriteStrapiMediaUrls(html: string, base: string): string {
  if (!html) return ''
  const b = base.replace(/\/$/, '')
  let out = html
  out = out.replace(/\]\(([^)]+)\)/g, (m, path) => {
    const p = path.trim()
    if (/^https?:\/\//i.test(p) || p.startsWith('//')) return m
    if (p.startsWith('/')) return `](${b}${p})`
    if (/^uploads\//i.test(p)) return `](${b}/${p})`
    return m
  })
  out = out.replace(/\bsrc=(["'])(\/[^"']*)/gi, (m, q, path) => {
    if (path.startsWith('//')) return m
    return `src=${q}${b}${path}`
  })
  out = out.replace(/\bhref=(["'])(\/[^"']*)/gi, (m, q, path) => {
    if (path.startsWith('//')) return m
    return `href=${q}${b}${path}`
  })
  return out
}

// Helper function to map Strapi article to UI post format
export function mapArticleToPost(article: Article, strapiBaseUrl: string): MappedPost {
  const imageUrl = article.Img?.url
    ? article.Img.url.startsWith('http')
      ? article.Img.url
      : `${strapiBaseUrl}${article.Img.url}`
    : undefined

  return {
    id: article.documentId,
    slug: article.documentId, // Using documentId as slug since Strapi doesn't have a slug field
    title: article.Title,
    excerpt: article.Description || '',
    date: article.Date,
    coverSrc: imageUrl,
    content: rewriteStrapiMediaUrls(article.Article || '', strapiBaseUrl),
    categories: normalizeCategoriesField(article.Categories ?? article.Category),
    socialLinks: {
      twitter: article.Twitter_Url,
      reddit: article.Reddit_Url,
      mirror: article.Mirror_Url,
      custom: article.Custom_Url,
    },
  }
}
