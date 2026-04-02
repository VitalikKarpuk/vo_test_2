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
  formattedDate?: string
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
      <div className="flex items-center gap-2 mb-5 overflow-x-auto scrollbar-none pb-2 -mx-1 px-1">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {filteredPosts.map((post, i) => (
          <ArticleCard key={post.id} post={post} index={i} hideOnDesktop={i < 2} />
        ))}
      </div>
    </div>
  )
}

function ArticleCard({ post, index, hideOnDesktop }: { post: Post; index: number; hideOnDesktop?: boolean }) {
  const category = post.categories?.split(',')[0]?.trim()

  return (
    <article
      className={`group animate-fade-up opacity-0 ${hideOnDesktop ? 'lg:hidden' : ''}`}
      style={{ animationDelay: `${0.05 + index * 0.04}s` }}
    >
      <Link href={`/blog/${post.slug}`} className="block">
        {/* Image 16:9 */}
        <div className="relative aspect-video overflow-hidden rounded-xl bg-muted mb-3">
          {post.coverSrc ? (
            <Image
              src={post.coverSrc}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 bg-secondary" />
          )}
        </div>

        {/* Content */}
        <div className="space-y-1.5">
          {category && (
            <span className="inline-block px-2 py-0.5 text-[11px] font-medium uppercase tracking-wider text-primary bg-primary/10 rounded">
              {category}
            </span>
          )}
          <h3 className="text-sm sm:text-base font-semibold text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors duration-300">
            {post.title}
          </h3>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            {post.author && <span className="font-medium text-foreground/70">{post.author}</span>}
            {post.author && <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />}
            <time>{post.formattedDate}</time>
          </div>
        </div>
      </Link>
    </article>
  )
}
