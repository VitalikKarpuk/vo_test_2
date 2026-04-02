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
  const recentPosts = posts.slice(1, 4)
  const allPosts = posts.slice(4)

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
          <div className="mb-16 md:mb-20 text-center animate-fade-up">
            <h1 className="text-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-foreground mb-6">
              Stories & Insights
            </h1>
            <p className="text-body text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
              Exploring ideas at the intersection of technology, design, and human experience.
            </p>
          </div>

          {/* Featured Article */}
          {featuredPost && (
            <FeaturedArticle post={featuredPost} />
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

function FeaturedArticle({ post }: { post: MappedPost }) {
  const category = post.categories?.split(',')[0]?.trim()
  const excerpt = stripExcerpt(post.excerpt || '')

  return (
    <article className="group animate-fade-up" style={{ animationDelay: '0.1s' }}>
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Image */}
          <div className="relative aspect-[4/3] lg:aspect-square overflow-hidden rounded-lg bg-muted image-zoom">
            {post.coverSrc ? (
              <Image
                src={post.coverSrc}
                alt={post.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            ) : (
              <div className="absolute inset-0 bg-secondary" />
            )}
          </div>

          {/* Content */}
          <div className="lg:py-8">
            {category && (
              <span className="inline-block text-xs font-medium uppercase tracking-[0.15em] text-accent mb-4">
                {category}
              </span>
            )}
            <h2 className="text-headline text-2xl sm:text-3xl lg:text-4xl text-foreground mb-4 group-hover:text-accent transition-colors duration-300">
              {post.title}
            </h2>
            {excerpt && (
              <p className="text-body text-muted-foreground text-base lg:text-lg mb-6 line-clamp-3">
                {excerpt}
              </p>
            )}
            <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
              {post.author && (
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {post.author}
                </span>
              )}
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {formatDate(post.date)}
              </span>
            </div>
            <span className="inline-flex items-center gap-2 text-sm font-medium text-foreground group-hover:text-accent transition-colors">
              Read Article
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </Link>
    </article>
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
