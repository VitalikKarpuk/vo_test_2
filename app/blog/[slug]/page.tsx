import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getArticleById, getAllArticles, type MappedPost } from '@/lib/graphql/articles'
import MDXRenderer from '@/components/blog/mdxRenderer'
import { ArrowLeft, Clock, Calendar, User, Link2, Share2 } from 'lucide-react'

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
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
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
  const relatedPosts = allPosts.filter((p) => p.slug !== post.slug).slice(0, 3)

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="mx-auto max-w-4xl px-6 h-16 flex items-center justify-between">
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

      {/* Article */}
      <article className="px-6 py-12 md:py-16">
        <div className="mx-auto max-w-3xl">
          {/* Meta */}
          <div className="flex items-center gap-4 mb-6 text-sm text-muted-foreground animate-fade-up">
            {category && (
              <span className="text-xs font-medium uppercase tracking-[0.15em] text-accent">
                {category}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {readingTime} min read
            </span>
          </div>

          {/* Title */}
          <h1 className="text-display text-3xl sm:text-4xl md:text-5xl text-foreground mb-8 animate-fade-up" style={{ animationDelay: '0.05s' }}>
            {post.title}
          </h1>

          {/* Author & Date */}
          <div className="flex items-center gap-6 pb-8 border-b border-border mb-10 animate-fade-up" style={{ animationDelay: '0.1s' }}>
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

          {/* Cover Image */}
          {post.coverSrc && (
            <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-muted mb-12 animate-fade-up" style={{ animationDelay: '0.15s' }}>
              <Image
                src={post.coverSrc}
                alt={post.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
          )}

          {/* Content */}
          <div
            className="article-body prose prose-neutral max-w-none animate-fade-up
              prose-headings:text-headline prose-headings:text-foreground prose-headings:font-medium
              prose-p:text-body prose-p:text-muted-foreground prose-p:leading-relaxed
              prose-a:text-accent prose-a:no-underline hover:prose-a:underline
              prose-strong:text-foreground prose-strong:font-medium
              prose-code:text-accent prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-normal
              prose-pre:bg-primary prose-pre:text-primary-foreground prose-pre:border-0 prose-pre:rounded-lg
              prose-blockquote:border-l-accent prose-blockquote:text-muted-foreground prose-blockquote:font-normal prose-blockquote:not-italic
              prose-img:rounded-lg
              prose-hr:border-border"
            style={{ animationDelay: '0.2s' }}
          >
            <MDXRenderer source={content} />
          </div>

          {/* Tags */}
          {category && (
            <div className="pt-10 flex flex-wrap gap-2 animate-fade-up" style={{ animationDelay: '0.25s' }}>
              {post.categories?.split(',').map((tag) => (
                <span
                  key={tag.trim()}
                  className="px-3 py-1.5 text-xs font-medium text-muted-foreground bg-secondary rounded-full hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer"
                >
                  {tag.trim()}
                </span>
              ))}
            </div>
          )}

          {/* Share */}
          <div className="pt-10 pb-10 border-b border-border animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Share this article</span>
              <div className="flex items-center gap-2">
                <button className="w-9 h-9 flex items-center justify-center rounded-full bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors" aria-label="Share on X">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </button>
                <button className="w-9 h-9 flex items-center justify-center rounded-full bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors" aria-label="Share on LinkedIn">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </button>
                <button className="w-9 h-9 flex items-center justify-center rounded-full bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors" aria-label="Copy link">
                  <Link2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Back link */}
          <div className="pt-8 animate-fade-up" style={{ animationDelay: '0.35s' }}>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Back to all articles
            </Link>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="px-6 py-16 md:py-20 border-t border-border bg-muted/30">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground mb-10">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((p, i) => (
                <RelatedCard key={p.id} post={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="mx-auto max-w-4xl px-6 py-10 flex items-center justify-between text-xs text-muted-foreground">
          <Link href="/blog" className="font-medium text-foreground hover:text-accent transition-colors">
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
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="relative aspect-[3/2] overflow-hidden rounded-lg bg-muted mb-4 image-zoom">
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
        {category && (
          <span className="inline-block text-xs font-medium uppercase tracking-[0.1em] text-accent mb-2">
            {category}
          </span>
        )}
        <h3 className="text-headline text-sm text-foreground line-clamp-2 group-hover:text-accent transition-colors">
          {post.title}
        </h3>
      </Link>
    </article>
  )
}
