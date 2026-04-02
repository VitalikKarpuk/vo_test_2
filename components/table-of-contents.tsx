'use client'

import { useEffect, useState, useRef } from 'react'

interface Heading {
  id: string
  text: string
  level: number
}

interface Props {
  contentSelector?: string
}

export default function TableOfContents({ contentSelector = '.article-body' }: Props) {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string>('')
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const container = document.querySelector(contentSelector)
    if (!container) return

    const elements = Array.from(
      container.querySelectorAll('h2, h3, h4'),
    ) as HTMLHeadingElement[]

    const parsed: Heading[] = elements.map((el, i) => {
      if (!el.id) el.id = `heading-${i}`
      return {
        id: el.id,
        text: el.textContent ?? '',
        level: parseInt(el.tagName[1]),
      }
    })

    setHeadings(parsed)
    if (parsed.length > 0) setActiveId(parsed[0].id)

    observerRef.current?.disconnect()
    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
            break
          }
        }
      },
      { rootMargin: '-10% 0px -70% 0px', threshold: 0 },
    )

    elements.forEach((el) => observerRef.current?.observe(el))
    return () => observerRef.current?.disconnect()
  }, [contentSelector])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (!el) return
    const offset = 96 // top-24 = 6rem = 96px
    const top = el.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top, behavior: 'smooth' })
    setActiveId(id)
  }

  if (headings.length === 0) return null

  return (
    <aside className="w-full sticky top-24">
      <div className="sticky top-24">
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-4 rounded-full bg-primary shrink-0" />
          <span className="text-xs font-bold uppercase tracking-widest text-foreground">
            On this page
          </span>
        </div>

        {/* Nav list */}
        <nav aria-label="Table of contents">
          <ul className="space-y-0.5">
            {headings.map((h) => {
              const isActive = h.id === activeId
              const indent =
                h.level === 2 ? 'pl-1' : h.level === 3 ? 'pl-3' : 'pl-5'

              return (
                <li key={h.id}>
                  <a
                    href={`#${h.id}`}
                    onClick={(e) => handleClick(e, h.id)}
                    className={[
                      'group flex items-start gap-2 py-1.5 text-sm leading-snug rounded-lg px-2 transition-all duration-200',
                      indent,
                      isActive
                        ? 'text-primary font-medium bg-primary/6'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/60',
                    ].join(' ')}
                  >
                    {/* Active indicator dot */}
                    <span
                      className={[
                        'mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 transition-all duration-200',
                        isActive
                          ? 'bg-primary scale-125'
                          : 'bg-border group-hover:bg-muted-foreground',
                      ].join(' ')}
                    />
                    <span className="line-clamp-2">{h.text}</span>
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Divider + progress */}
        <div className="mt-5 pt-4 border-t border-border/40">
          <ScrollProgress />
        </div>
      </div>
    </aside>
  )
}

function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0)
    }
    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1 rounded-full bg-border overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}
