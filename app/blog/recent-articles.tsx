'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface Post {
  id: string
  slug: string
  title: string
  coverSrc?: string | null
  categories?: string | null
  author?: string | null
  date: string
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  })
}

export function RecentArticles({ posts }: { posts: Post[] }) {
  const [activeCategory, setActiveCategory] = React.useState<string | null>(null)
  
  // Extract unique categories from posts
  const categories = React.useMemo(() => {
    const cats = new Set<string>()
    posts.forEach(post => {
      const cat = post.categories?.split(',')[0]?.trim()
      if (cat) cats.add(cat)
    })
    return Array.from(cats)
  }, [posts])

  // Filter posts by category (placeholder - returns all for now)
  const filteredPosts = posts

  return (
    <div>
      {/* Category Filter Tabs */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto scrollbar-none pb-2">
        <button
          onClick={() => setActiveCategory(null)}
          className={`
            relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 whitespace-nowrap
            ${activeCategory === null 
              ? 'bg-secondary text-secondary-foreground shadow-sm' 
              : 'bg-card text-muted-foreground hover:text-foreground hover:bg-muted border border-border'
            }
          `}
        >
          <span className="relative z-10">All</span>
          {activeCategory === null && (
            <span className="absolute inset-0 rounded-full bg-secondary/50 animate-[pulse_2s_ease-in-out_infinite]" />
          )}
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`
              relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 whitespace-nowrap overflow-hidden
              ${activeCategory === cat 
                ? 'bg-primary text-primary-foreground shadow-sm' 
                : 'bg-card text-muted-foreground hover:text-foreground hover:bg-muted border border-border'
              }
            `}
          >
            <span className="relative z-10">{cat}</span>
            {activeCategory === cat && (
              <span className="absolute inset-0 rounded-full bg-primary/50 animate-[pulse_2s_ease-in-out_infinite]" />
            )}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {filteredPosts.map((post, i) => (
          <ArticleCard key={post.id} post={post} index={i} />
        ))}
      </div>
    </div>
  )
}

function ArticleCard({ post, index }: { post: Post; index: number }) {
  const category = post.categories?.split(',')[0]?.trim()
  const formattedDate = formatDate(post.date)

  return (
    <article
      className="group animate-fade-up opacity-0"
      style={{ animationDelay: `${0.1 + index * 0.05}s` }}
    >
      <Link href={`/blog/${post.slug}`} className="block">
        {/* Image 16:9 */}
        <div className="relative aspect-video overflow-hidden rounded-xl bg-muted mb-3 image-zoom">
          {post.coverSrc ? (
            <Image
              src={post.coverSrc}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 bg-secondary" />
          )}
        </div>

        {/* Content */}
        <div className="space-y-2">
          {category && (
            <span className="inline-block px-2.5 py-1 text-xs font-medium uppercase tracking-wider text-primary bg-primary/10 rounded-md">
              {category}
            </span>
          )}
          <h3 className="text-base font-semibold text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors duration-300">
            {post.title}
          </h3>
          <div className="flex items-center gap-3 text-xs text-muted-foreground pt-1">
            {post.author && <span className="font-medium text-foreground/70">{post.author}</span>}
            {post.author && <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />}
            <time suppressHydrationWarning>{formattedDate}</time>
          </div>
        </div>
      </Link>
    </article>
  )
}
