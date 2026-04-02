import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getAllArticles, type MappedPost } from '@/lib/graphql/articles'
import { ArrowRight, Calendar, User } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Blog | Insights & Stories',
  description: 'Discover the latest insights, tutorials, and stories about technology and innovation.',
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

function stripExcerpt(raw: string): string {
  return raw
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]+`/g, '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/#{1,6}\s+/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/!\[[^\]]*\]\([^)]+\)/g, '')
    .replace(/\n+/g, ' ')
    .trim()
}

export default async function BlogPage() {
  const posts = await getAllArticles()

  const featuredPost = posts[0]
  const featuredFollowing = posts.slice(1, 3)
  const recentPosts = posts.slice(3, 6)
  const allPosts = posts.slice(6)

  if (posts.length === 0) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <EmptyState />
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="px-6 pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="mx-auto max-w-6xl">

          {/* Featured Article */}
          {featuredPost && (
            <FeaturedArticle post={featuredPost} followingPosts={featuredFollowing} />
          )}
        </div>
      </section>

      {/* Recent Articles */}
      {recentPosts.length > 0 && (
        <section className="px-6 py-16 md:py-20 border-t border-border">
          <div className="mx-auto max-w-6xl">
            <SectionHeader title="Recent" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 stagger">
              {recentPosts.map((post, i) => (
                <ArticleCard key={post.id} post={post} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Articles */}
      {allPosts.length > 0 && (
        <section className="px-6 py-16 md:py-20 border-t border-border bg-muted/30">
          <div className="mx-auto max-w-6xl">
            <SectionHeader title="Archive" />
            <div className="space-y-0 divide-y divide-border">
              {allPosts.map((post, i) => (
                <ArticleListItem key={post.id} post={post} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  )
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-4 mb-10 md:mb-12">
      <h2 className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
        {title}
      </h2>
      <div className="flex-1 h-px bg-border" />
    </div>
  )
}

function FeaturedArticle({ post, followingPosts }: { post: MappedPost; followingPosts: MappedPost[] }) {
  const category = post.categories?.split(',')[0]?.trim()
  const secondaryPosts = followingPosts.slice(0, 2)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4">
      {/* Main Featured - left side */}
      <article 
        className="group relative animate-fade-up"
        style={{ animationDelay: '0.1s' }}
      >
        <Link href={`/blog/${post.slug}`} className="block relative aspect-video overflow-hidden rounded-xl bg-muted">
          {post.coverSrc ? (
            <Image
              src={post.coverSrc}
              alt={post.title}
              fill
              priority
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 66vw"
            />
          ) : (
            <div className="absolute inset-0 bg-secondary" />
          )}
          
          {/* Content block with transparent background - bottom only */}
          <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
            <div className="bg-black/40 backdrop-blur-md rounded-lg p-4 md:p-5">
              {category && (
                <span className="inline-block px-2.5 py-1 text-xs font-medium uppercase tracking-wider text-white bg-primary rounded-md mb-3">
                  {category}
                </span>
              )}
              <h2 className="text-xl sm:text-2xl font-semibold text-white leading-tight mb-2 line-clamp-2 group-hover:text-white/90 transition-colors">
                {post.title}
              </h2>
              <div className="flex items-center gap-3 text-xs text-white/80">
                {post.author && <span>{post.author}</span>}
                {post.author && <span className="w-1 h-1 rounded-full bg-white/60" />}
                <time>{formatDate(post.date)}</time>
              </div>
            </div>
          </div>
        </Link>
      </article>

      {/* Secondary posts - right column stacked (2 posts) */}
      <div className="flex flex-col gap-4">
        {secondaryPosts.map((p, i) => {
          const cat = p.categories?.split(',')[0]?.trim()
          return (
            <article
              key={p.id}
              className="group relative flex-1 animate-fade-up opacity-0"
              style={{ animationDelay: `${0.15 + i * 0.08}s` }}
            >
              <Link href={`/blog/${p.slug}`} className="block relative h-full overflow-hidden rounded-xl bg-muted">
                {p.coverSrc ? (
                  <Image
                    src={p.coverSrc}
                    alt={p.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                ) : (
                  <div className="absolute inset-0 bg-secondary" />
                )}
                
                {/* Content block with transparent background - bottom only */}
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <div className="bg-black/40 backdrop-blur-md rounded-lg p-3">
                    {cat && (
                      <span className="inline-block px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-white bg-primary rounded mb-1.5">
                        {cat}
                      </span>
                    )}
                    <h3 className="text-sm font-medium text-white leading-snug line-clamp-2 group-hover:text-white/90 transition-colors">
                      {p.title}
                    </h3>
                  </div>
                </div>
              </Link>
            </article>
          )
        })}
      </div>
    </div>
  )
}

function ArticleCard({ post, index }: { post: MappedPost; index: number }) {
  const category = post.categories?.split(',')[0]?.trim()
  const excerpt = stripExcerpt(post.excerpt || '')

  return (
    <article
      className="group animate-fade-up opacity-0"
      style={{ animationDelay: `${0.1 + index * 0.05}s` }}
    >
      <Link href={`/blog/${post.slug}`} className="block">
        {/* Image */}
        <div className="relative aspect-[3/2] overflow-hidden rounded-lg bg-muted mb-5 image-zoom">
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
        {category && (
          <span className="inline-block text-xs font-medium uppercase tracking-[0.15em] text-accent mb-3">
            {category}
          </span>
        )}
        <h3 className="text-headline text-lg text-foreground mb-2 line-clamp-2 group-hover:text-accent transition-colors duration-300">
          {post.title}
        </h3>
        {excerpt && (
          <p className="text-body text-sm text-muted-foreground line-clamp-2 mb-4">
            {excerpt}
          </p>
        )}
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          {post.author && <span>{post.author}</span>}
          {post.author && <span className="w-1 h-1 rounded-full bg-border" />}
          <time>{formatDate(post.date)}</time>
        </div>
      </Link>
    </article>
  )
}

function ArticleListItem({ post, index }: { post: MappedPost; index: number }) {
  const category = post.categories?.split(',')[0]?.trim()

  return (
    <article
      className="group py-6 first:pt-0 last:pb-0 animate-slide-up opacity-0"
      style={{ animationDelay: `${index * 0.03}s` }}
    >
      <Link href={`/blog/${post.slug}`} className="flex items-start justify-between gap-6 md:gap-12">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-4 mb-2">
            {category && (
              <span className="text-xs font-medium uppercase tracking-[0.1em] text-accent">
                {category}
              </span>
            )}
            <time className="text-xs text-muted-foreground tabular-nums">
              {formatDate(post.date)}
            </time>
          </div>
          <h3 className="text-headline text-base md:text-lg text-foreground group-hover:text-accent transition-colors duration-300 line-clamp-2">
            {post.title}
          </h3>
        </div>
        <ArrowRight className="w-5 h-5 text-muted-foreground shrink-0 mt-1 transition-all group-hover:text-accent group-hover:translate-x-1" />
      </Link>
    </article>
  )
}

function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <Link href="/blog" className="text-lg font-medium tracking-tight text-foreground hover:text-accent transition-colors">
          Journal
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {['Articles', 'Topics', 'About'].map((item) => (
            <Link
              key={item}
              href="/blog"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors link-underline"
            >
              {item}
            </Link>
          ))}
        </nav>

        <button className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
          Subscribe
        </button>
      </div>
    </header>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6 animate-fade-up">
      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-6">
        <Calendar className="w-8 h-8 text-muted-foreground" />
      </div>
      <h2 className="text-headline text-2xl text-foreground mb-3">No articles yet</h2>
      <p className="text-body text-muted-foreground max-w-md">
        Check back soon for new content, or ensure your backend connection is configured.
      </p>
    </div>
  )
}

function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <Link href="/blog" className="text-lg font-medium tracking-tight text-foreground mb-4 block">
              Journal
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm">
              Thoughtful writing about technology, design, and the future we are building together.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground mb-4">
              Explore
            </h4>
            <ul className="space-y-3">
              {['Latest', 'Popular', 'Topics', 'Authors'].map((item) => (
                <li key={item}>
                  <Link href="/blog" className="text-sm text-foreground/80 hover:text-foreground transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground mb-4">
              Connect
            </h4>
            <ul className="space-y-3">
              {['Twitter', 'LinkedIn', 'GitHub', 'RSS'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm text-foreground/80 hover:text-foreground transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>Built with care and attention to detail.</p>
          <p>Powered by Next.js</p>
        </div>
      </div>
    </footer>
  )
}
