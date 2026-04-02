import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { MDXRemote } from 'next-mdx-remote/rsc'
import prettyCodePlugin from 'rehype-pretty-code'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'

type HeadingProps = ComponentPropsWithoutRef<'h2'> & { children?: ReactNode }
type CodeProps = ComponentPropsWithoutRef<'code'> & { inline?: boolean }

const components = {
  h2: ({ children, ...props }: HeadingProps) => {
    const id =
      typeof children === 'string'
        ? children
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
        : undefined

    return (
      <h2 id={id} className="scroll-mt-24 border-b border-border/50 pb-2 mt-10 mb-4" {...props}>
        {children}
      </h2>
    )
  },
  a: (props: ComponentPropsWithoutRef<'a'>) => (
    <a className="underline decoration-border underline-offset-4 hover:text-foreground" {...props} />
  ),
  pre: (props: ComponentPropsWithoutRef<'pre'>) => (
    <pre className="overflow-x-auto rounded-lg border border-border/50 bg-muted/30 p-4 text-sm" {...props} />
  ),
  code: ({ inline, className, ...props }: CodeProps) =>
    inline ? (
      <code className="rounded bg-muted px-1.5 py-0.5 text-[0.9em]" {...props} />
    ) : (
      <code className={className} {...props} />
    ),
  table: (props: ComponentPropsWithoutRef<'table'>) => (
    <div className="my-6 overflow-x-auto">
      <table className="w-full border-collapse text-sm" {...props} />
    </div>
  ),
}

type MDXRendererProps = {
  source: string
}

export default function MDXRenderer({ source }: MDXRendererProps) {
  return (
    <MDXRemote
      source={source}
      components={components}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            [
              rehypeRaw,
              {
                passThrough: [
                  'mdxjsEsm',
                  'mdxFlowExpression',
                  'mdxJsxFlowElement',
                  'mdxJsxTextElement',
                  'mdxTextExpression',
                ],
              },
            ],
            [prettyCodePlugin, { theme: 'github-light', keepBackground: false }],
          ],
        },
      }}
    />
  )
}
