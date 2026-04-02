import Link from 'next/link'
import Image from 'next/image'
import type { MappedPost } from '@/lib/graphql/articles'
import CategoryBadge from '@/components/category-badge'

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
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

export default function FeaturedEditorial({ posts }: { posts: MappedPost[] }) {
  if (posts.length === 0) return null

  const [hero, ...others] = posts
  const sidePosts = others.slice(0, 3)
  const heroCategory = hero.categories?.split(',')[0]?.trim() ?? null
  const heroExcerpt = stripExcerpt(hero.excerpt ?? '')

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 lg:items-start">
      {/* Primary — ~7/12: крупный визуальный блок; картинка 16:9 по ширине колонки */}
      <article className="lg:col-span-7 xl:col-span-7 group ">
        <Link
          href={`/blog/${hero.slug}`}
          className="block rounded-2xl overflow-hidden bg-card border border-border/50 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-500"
        >
          <div className="relative w-full aspect-video overflow-hidden bg-muted">
            {hero.coverSrc ? (
              <Image
                src={hero.coverSrc}
                alt={hero.title}
                fill
                priority
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 60vw, 45rem"
              />
            ) : (
              <div className="absolute inset-0 ai-gradient opacity-90" />
            )}
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-70"
              aria-hidden
            />
          </div>

          <div className="p-5 md:p-7 lg:p-8">
            {heroCategory && (
              <div className="mb-4">
                <CategoryBadge category={heroCategory} variant="default" />
              </div>
            )}
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-3xl xl:text-4xl font-semibold text-foreground leading-[1.15] text-balance tracking-tight group-hover:text-primary transition-colors duration-300 mb-4">
              {hero.title}
            </h2>
            {heroExcerpt && (
              <p className="text-base text-muted-foreground leading-relaxed line-clamp-3 mb-6">
                {heroExcerpt}
              </p>
            )}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
              {hero.author && (
                <>
                  <span className="font-medium text-foreground">{hero.author}</span>
                  <span className="text-border" aria-hidden>
                    ·
                  </span>
                </>
              )}
              <time dateTime={hero.date}>{formatDate(hero.date)}</time>
              <span className="hidden sm:inline text-border mx-1" aria-hidden>
                ·
              </span>
              <span className="text-primary font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                Read article
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </div>
          </div>
        </Link>
      </article>

      {/* Secondary picks — same 16:9 ratio, editorial rail */}
      {sidePosts.length > 0 && (
        <aside className="lg:col-span-5 xl:col-span-5 flex flex-col gap-3">
          <div className="flex items-center gap-3 mb-0.5">
            <span className="h-px flex-1 bg-gradient-to-r from-primary/40 to-transparent max-w-16" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground shrink-0">
              Also featured
            </p>
          </div>

          <ul className="flex flex-col gap-2.5 list-none p-0 m-0">
            {sidePosts.map((post) => (
              <li key={post.id}>
                <SidePick post={post} />
              </li>
            ))}
          </ul>
        </aside>
      )}
    </div>
  )
}

function SidePick({ post }: { post: MappedPost }) {
  const category = post.categories?.split(',')[0]?.trim() ?? null

  return (
    <article className="group rounded-xl border border-border/40 bg-card/60 hover:bg-card backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-primary/25 hover:shadow-sm">
      <Link href={`/blog/${post.slug}`} className="flex gap-4 p-3 sm:p-3.5">
        <div className="relative w-[min(44%,11rem)] sm:w-36 lg:w-40 shrink-0 aspect-video rounded-lg overflow-hidden bg-muted">
          {post.coverSrc ? (
            <Image
              src={post.coverSrc}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 40vw, (max-width: 1024px) 9rem, 10rem"
            />
          ) : (
            <div className="absolute inset-0 ai-gradient opacity-85" />
          )}
        </div>
        <div className="flex flex-col justify-center min-w-0 flex-1 py-0.5">
          {category && (
            <div className="mb-1.5">
              <CategoryBadge category={category} variant="default" />
            </div>
          )}
          <h3 className="font-serif text-sm sm:text-[15px] font-medium text-foreground leading-snug line-clamp-2 text-balance group-hover:text-primary transition-colors">
            {post.title}
          </h3>
          <time className="mt-2 text-[11px] text-muted-foreground tabular-nums">{formatDate(post.date)}</time>
        </div>
      </Link>
    </article>
  )
}
