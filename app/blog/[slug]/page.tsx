import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getArticleById, getAllArticles, type MappedPost } from '@/lib/graphql/articles'
import MDXRenderer from '@/components/blog/mdxRenderer'
import { ArrowLeft, Clock, Calendar, Link2, Share2 } from 'lucide-react'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getArticleById(slug)
  if (!post) return { title: 'Post Not Found | Journal' }
  return {
    title: `${post.title} | Journal`,
    description: post.excerpt,
  }
}

export async function generateStaticParams() {
  const posts = await getAllArticles()
  return posts.map((post) => ({ slug: post.slug }))
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })
}

function getReadingTime(content: string): number {
  const words = content.split(/\s+/).length
  return Math.ceil(words / 200)
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await getArticleById(slug)
  if (!post) notFound()

  const content = (post.excerpt ?? '').replace(/<br>/g, '<br />')
  const category = post.categories?.split(',')[0]?.trim() || null
  const readingTime = getReadingTime(content)

  const allPosts = await getAllArticles()
  const relatedPosts = allPosts.filter((p) => p.slug !== post.slug).slice(0, 4)

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Journal
          </Link>

          <button className="p-2 text-muted-foreground hover:text-foreground transition-colors" aria-label="Share">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Article Header - Full Width */}
      <div className="px-6 pt-10 md:pt-14">
        <div className="mx-auto max-w-7xl">
          {/* Meta */}
          <div className="flex items-center gap-4 mb-6 text-sm text-muted-foreground animate-fade-up">
            {category && (
              <span className="inline-block px-2.5 py-1 text-xs font-medium uppercase tracking-wider text-primary bg-primary/10 rounded-md">
                {category}
              </span>
            )}
            <span className="flex items-center gap-1.5 text-foreground/60">
              <Clock className="w-4 h-4" />
              {readingTime} min read
            </span>
          </div>

          {/* Title */}
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-semibold text-foreground leading-tight mb-8 animate-fade-up max-w-4xl"
            style={{ animationDelay: '0.05s' }}
          >
            {post.title}
          </h1>

          {/* Author & Date */}
          <div
            className="flex items-center gap-6 pb-8 mb-8 animate-fade-up"
            style={{ animationDelay: '0.1s' }}
          >
            {post.author && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                  <span className="text-sm font-medium">{post.author[0]}</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{post.author}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Cover Image - Full Width */}
          {post.coverSrc && (
            <div
              className="relative aspect-video overflow-hidden rounded-xl bg-muted animate-fade-up"
              style={{ animationDelay: '0.15s' }}
            >
              <Image
                src={post.coverSrc}
                alt={post.title}
                fill
                priority
                loading="eager"
                className="object-cover"
                sizes="(max-width: 1280px) 100vw, 1280px"
              />
            </div>
          )}
        </div>
      </div>

      {/* Main Content with Sidebar - Below Image */}
      <div className="px-6 py-10 md:py-14">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10 lg:gap-12">
            {/* Article Content */}
            <article>
              {/* Content */}
              <div
                className="article-body prose prose-neutral max-w-none animate-fade-up
                  prose-headings:text-foreground prose-headings:font-semibold
                  prose-p:text-foreground/80 prose-p:leading-relaxed
                  prose-a:text-link prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-foreground prose-strong:font-medium
                  prose-code:text-primary prose-code:bg-primary/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-normal
                  prose-pre:bg-secondary prose-pre:text-secondary-foreground prose-pre:border-0 prose-pre:rounded-xl
                  prose-blockquote:border-l-primary prose-blockquote:text-foreground/70 prose-blockquote:font-normal prose-blockquote:not-italic
                  prose-img:rounded-xl
                  prose-hr:border-border"
                style={{ animationDelay: '0.2s' }}
              >
                <MDXRenderer source={content} />
              </div>

              {/* Tags */}
              {category && (
                <div className="pt-8 flex flex-wrap gap-2 animate-fade-up" style={{ animationDelay: '0.25s' }}>
                  {post.categories?.split(',').map((tag) => (
                    <span
                      key={tag.trim()}
                      className="px-3 py-1.5 text-xs font-medium text-foreground/70 bg-card border border-border rounded-full hover:bg-primary/10 hover:text-primary hover:border-primary/20 transition-colors cursor-pointer"
                    >
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              )}

              {/* Share */}
              <div className="pt-8 pb-8 border-b border-border animate-fade-up" style={{ animationDelay: '0.3s' }}>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-foreground/60">Share this article</span>
                  <div className="flex items-center gap-2">
                    <button
                      className="w-9 h-9 flex items-center justify-center rounded-full bg-card border border-border text-foreground/70 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
                      aria-label="Share on X"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </button>
                    <button
                      className="w-9 h-9 flex items-center justify-center rounded-full bg-card border border-border text-foreground/70 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
                      aria-label="Share on LinkedIn"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </button>
                    <button
                      className="w-9 h-9 flex items-center justify-center rounded-full bg-card border border-border text-foreground/70 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
                      aria-label="Copy link"
                    >
                      <Link2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Back link */}
              <div className="pt-6 animate-fade-up" style={{ animationDelay: '0.35s' }}>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-sm font-medium text-foreground/60 hover:text-primary transition-colors group"
                >
                  <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                  Back to all articles
                </Link>
              </div>
            </article>

            {/* Sidebar - Related Articles (sticky) */}
            {relatedPosts.length > 0 && (
              <aside className="hidden lg:block">
                <div className="sticky top-24">
                  <h2 className="text-sm font-medium uppercase tracking-[0.15em] text-foreground/50 mb-6">
                    Related Articles
                  </h2>
                  <div className="flex flex-col gap-5">
                    {relatedPosts.map((p, i) => (
                      <RelatedCard key={p.id} post={p} index={i} />
                    ))}
                  </div>
                </div>
              </aside>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="lg:hidden px-6 py-10 border-t border-border">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-sm font-medium uppercase tracking-[0.15em] text-foreground/50 mb-6">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {relatedPosts.slice(0, 2).map((p, i) => (
                <RelatedCard key={p.id} post={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-8 flex items-center justify-between text-xs text-foreground/50">
          <Link href="/blog" className="font-medium text-foreground hover:text-primary transition-colors">
            Journal
          </Link>
          <p>Built with care and attention to detail.</p>
        </div>
      </footer>
    </main>
  )
}

function RelatedCard({ post, index }: { post: MappedPost; index: number }) {
  const category = post.categories?.split(',')[0]?.trim()

  return (
    <article className="group animate-fade-up opacity-0" style={{ animationDelay: `${0.1 + index * 0.05}s` }}>
      <Link href={`/blog/${post.slug}`} className="flex gap-3">
        <div className="relative w-20 aspect-video shrink-0 overflow-hidden rounded-lg bg-muted">
          {post.coverSrc ? (
            <Image
              src={post.coverSrc}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="80px"
            />
          ) : (
            <div className="absolute inset-0 bg-secondary" />
          )}
        </div>
        <div className="flex flex-col min-w-0">
          {category && (
            <span className="text-[10px] font-medium uppercase tracking-wider text-primary mb-1">
              {category}
            </span>
          )}
          <h3 className="text-sm font-medium text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors">
            {post.title}
          </h3>
        </div>
      </Link>
    </article>
  )
}
