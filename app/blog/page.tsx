import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getAllArticles, type MappedPost } from '@/lib/graphql/articles'
import FeaturedSlider from '@/components/featured-slider'
import CategoryBadge from '@/components/category-badge'
import CategoryFilter from '@/components/category-filter'

export const metadata: Metadata = {
  title: 'AI Blog | Latest Articles on Artificial Intelligence',
  description: 'Discover the latest insights, tutorials, and news about AI, machine learning, and technology.',
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default async function BlogPage() {
  const posts = await getAllArticles()

  // Extract unique categories from all posts (sorted alphabetically)
  const allCategories = Array.from(
    new Set(
      posts
        .flatMap((p) => (p.categories ? p.categories.split(',').map((c) => c.trim()) : []))
        .filter(Boolean)
    )
  ).sort()

  // Split posts: first 5 go to slider, rest to grids
  const sliderPosts = posts.slice(0, 5)
  const latestPosts = posts.slice(5, 11)
  const remainingPosts = posts.slice(11)

  if (posts.length === 0) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <section className="mx-auto max-w-7xl px-4 py-20">
          <EmptyState />
        </section>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Featured Slider */}
      {sliderPosts.length > 0 && (
        <section className="px-4 pt-8 pb-10 animate-fade-up">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              color="primary"
              label="Featured"
            />
            <FeaturedSlider posts={sliderPosts} />
          </div>
        </section>
      )}

      {/* Latest Articles — 3-column grid */}
      {latestPosts.length > 0 && (
        <section className="px-4 py-10 animate-fade-up" style={{ animationDelay: '0.1s' }}>
          <div className="mx-auto max-w-7xl">
            <SectionHeading color="primary" label="Latest Articles" />

            {/* Category filter row */}
            <div className="mb-7">
              <CategoryFilter categories={allCategories} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestPosts.map((post, index) => (
                <PostCard key={post.id} post={post} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* More to Explore — 4-column grid */}
      {remainingPosts.length > 0 && (
        <section className="px-4 py-10 bg-muted/30 animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <div className="mx-auto max-w-7xl">
            <SectionHeading color="link" label="More to Explore" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {remainingPosts.map((post, index) => (
                <PostCard key={post.id} post={post} index={index} compact />
              ))}
            </div>
          </div>
        </section>
      )}


      <Footer />
    </main>
  )
}

// ─── Sub-components ────────────────────────────────────────────────────────────

function SectionHeading({ label, color }: { label: string; color: 'primary' | 'link' }) {
  const colorClass =
    color === 'primary'
      ? 'bg-primary text-primary'
      : 'bg-[hsl(var(--link))] text-[hsl(var(--link))]'
  const gradientClass =
    color === 'primary'
      ? 'from-primary/30'
      : 'from-[hsl(var(--link))]/30'

  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="flex items-center gap-2">
        <span className={`w-2 h-2 rounded-full ${colorClass.split(' ')[0]} animate-pulse-glow`} />
        <h2 className={`text-sm font-semibold uppercase tracking-widest ${colorClass.split(' ')[1]}`}>
          {label}
        </h2>
      </div>
      <div className={`flex-1 h-px bg-gradient-to-r ${gradientClass} to-transparent`} />
    </div>
  )
}

function PostCard({
  post,
  index,
  compact = false,
}: {
  post: MappedPost
  index: number
  compact?: boolean
}) {
  const category = post.categories?.split(',')[0]?.trim() || null

  // Strip MDX/markdown syntax for plain text excerpt
  const plainExcerpt = (post.excerpt || '')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]+`/g, '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/#{1,6}\s+/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/!\[[^\]]*\]\([^)]+\)/g, '')
    .replace(/\n+/g, ' ')
    .trim()

  return (
    <article
      className="group ai-card rounded-2xl overflow-hidden bg-card border border-border/50 animate-fade-up flex flex-col"
      style={{ animationDelay: `${0.05 + index * 0.04}s` }}
    >
      <Link href={`/blog/${post.slug}`} className="flex flex-col flex-1">
        {/* 16:9 image — no overlay, no badge on top */}
        <div className="relative w-full aspect-video overflow-hidden">
          {post.coverSrc ? (
            <Image
              src={post.coverSrc}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted/50" />
          )}
        </div>

        {/* Text content */}
        <div className="p-4 md:p-5 flex flex-col flex-1">
          {/* Category badge inside text block, above title */}
          {category && (
            <div className="mb-2">
              <CategoryBadge category={category} variant="default" />
            </div>
          )}

          <h3 className="font-serif text-base font-medium text-foreground leading-snug line-clamp-2 text-balance group-hover:text-primary transition-colors mb-2">
            {post.title}
          </h3>

          {!compact && plainExcerpt && (
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3 flex-1">
              {plainExcerpt}
            </p>
          )}

          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-auto pt-3 border-t border-border/40">
            {post.author && (
              <>
                <span className="font-medium text-foreground">{post.author}</span>
                <span>·</span>
              </>
            )}
            <time>{formatDate(post.date)}</time>
          </div>
        </div>
      </Link>
    </article>
  )
}

function Header() {
  return (
    <header className="sticky top-0 z-50 glass-card border-b border-border/30">
      <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
        <Link href="/blog" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg ai-gradient flex items-center justify-center group-hover:animate-pulse-glow transition-all">
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
              />
            </svg>
          </div>
          <span className="font-serif text-xl font-semibold tracking-tight text-foreground">
            AI Blog
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {['Articles', 'Tutorials', 'News', 'Research'].map((item) => (
            <Link
              key={item}
              href="/blog"
              className="text-sm text-muted-foreground transition-colors hover:text-primary relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button
            className="p-2 text-muted-foreground transition-colors hover:text-primary"
            aria-label="Search"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
          <button className="btn-primary text-sm py-2 px-4 rounded-xl hidden sm:block">
            Subscribe
          </button>
        </div>
      </div>
    </header>
  )
}

function EmptyState() {
  return (
    <div className="text-center py-20 animate-fade-up">
      <div className="mx-auto w-20 h-20 rounded-2xl ai-gradient flex items-center justify-center mb-6 animate-float">
        <svg
          className="w-10 h-10 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
          />
        </svg>
      </div>
      <h3 className="font-serif text-2xl font-medium text-foreground mb-3">No articles yet</h3>
      <p className="text-muted-foreground max-w-md mx-auto">
        Check back soon for new content about AI and technology, or make sure your backend is
        connected.
      </p>
    </div>
  )
}

function Footer() {
  return (
    <footer className="border-t border-border/30 bg-muted/20">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <Link href="/blog" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg ai-gradient flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
                  />
                </svg>
              </div>
              <span className="font-serif text-xl font-semibold text-foreground">AI Blog</span>
            </Link>

          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Categories</h4>
            <ul className="space-y-3">
              {['Machine Learning', 'Deep Learning', 'NLP', 'Computer Vision'].map((item) => (
                <li key={item}>
                  <Link
                    href="/blog"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Connect</h4>
            <ul className="space-y-3">
              {['Twitter', 'GitHub', 'LinkedIn', 'Discord'].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">Built with AI and attention to detail</p>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <span>Powered by</span>
            <span className="ai-gradient-text font-semibold">Next.js</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
