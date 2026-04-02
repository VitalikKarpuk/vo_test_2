export interface Post {
  id: string
  slug: string
  title: string
  excerpt: string
  date: string
  coverSrc?: string
  content: string
  author?: string
  categories?: string
}

const BASE_POSTS: Post[] = [
  {
    id: '1',
    slug: 'getting-started-with-nextjs',
    title: 'Getting Started with Next.js 16',
    excerpt:
      'Learn how to build modern web applications with the latest features in Next.js 16, including the new App Router and Server Components.',
    date: '2026-03-28T10:00:00Z',
    coverSrc: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=450&fit=crop',
    author: 'Sarah Chen',
    categories: 'Development',
    content: `Next.js 16 brings exciting new features that make building web applications easier than ever. In this guide, we'll explore the fundamentals and get you up and running quickly.

## Why Next.js?

Next.js is a React framework that provides a great developer experience with features like file-based routing, automatic code splitting, and built-in CSS support.

## Getting Started

To create a new Next.js project, run the following command:

\`\`\`bash
npx create-next-app@latest my-app
\`\`\`

This will set up a new project with all the necessary dependencies and configuration.

## The App Router

The App Router is the recommended way to build applications in Next.js. It uses a file-system based router where folders define routes.

## Conclusion

Next.js provides an excellent foundation for building modern web applications. Start experimenting with these features and see how they can improve your development workflow.`,
  },
  {
    id: '2',
    slug: 'mastering-tailwind-css',
    title: 'Mastering Tailwind CSS for Rapid UI Development',
    excerpt:
      'Discover how utility-first CSS can dramatically speed up your development workflow while maintaining consistent, beautiful designs.',
    date: '2026-03-25T14:30:00Z',
    coverSrc: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&h=450&fit=crop',
    author: 'Marcus Johnson',
    categories: 'Design',
    content: `Tailwind CSS has revolutionized how developers approach styling. Instead of writing custom CSS, you compose designs using pre-built utility classes.

## The Utility-First Approach

Rather than writing semantic class names like "card" or "button", you apply utilities directly in your HTML:

\`\`\`html
<div class="bg-white rounded-lg shadow-md p-6">
  <h2 class="text-xl font-bold text-gray-900">Hello World</h2>
</div>
\`\`\`

## Benefits

1. **No naming things** - Stop wasting time inventing class names
2. **Consistent spacing** - Use the built-in spacing scale
3. **Responsive design** - Built-in responsive modifiers
4. **Dark mode** - Easy dark mode support

## Conclusion

Tailwind CSS removes friction from the styling process, letting you focus on building great user experiences.`,
  },
  {
    id: '3',
    slug: 'typescript-best-practices',
    title: 'TypeScript Best Practices in 2026',
    excerpt:
      'Essential TypeScript patterns and practices that will make your code more maintainable, type-safe, and easier to refactor.',
    date: '2026-03-20T09:15:00Z',
    coverSrc: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=450&fit=crop',
    author: 'Emily Rodriguez',
    categories: 'Engineering',
    content: `TypeScript continues to evolve, and staying up-to-date with best practices is essential for writing maintainable code.

## Use Strict Mode

Always enable strict mode in your tsconfig.json:

\`\`\`json
{
  "compilerOptions": {
    "strict": true
  }
}
\`\`\`

## Prefer Type Inference

Let TypeScript infer types when possible:

\`\`\`typescript
// Good
const name = "John"

// Unnecessary
const name: string = "John"
\`\`\`

## Use Discriminated Unions

For complex state management, discriminated unions are powerful:

\`\`\`typescript
type State =
  | { status: 'loading' }
  | { status: 'success'; data: string }
  | { status: 'error'; error: Error }
\`\`\`

## Conclusion

These practices will help you write better TypeScript code that's easier to maintain and refactor.`,
  },
  {
    id: '4',
    slug: 'building-accessible-websites',
    title: 'Building Accessible Websites: A Practical Guide',
    excerpt:
      'Learn the fundamental principles of web accessibility and how to implement them in your projects to create inclusive experiences.',
    date: '2026-03-15T16:45:00Z',
    coverSrc: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&h=450&fit=crop',
    author: 'Alex Kim',
    categories: 'Accessibility',
    content: `Web accessibility ensures that websites are usable by everyone, including people with disabilities. It's not just a nice-to-have—it's essential.

## Why Accessibility Matters

- 15% of the world's population has some form of disability
- Accessible sites often have better SEO
- It's the right thing to do

## Key Principles

### Perceivable

Content must be presentable in ways users can perceive:
- Provide alt text for images
- Ensure sufficient color contrast
- Use proper heading hierarchy

### Operable

Users must be able to operate the interface:
- Keyboard navigation support
- Skip links for main content
- Clear focus indicators

## Conclusion

Accessibility benefits everyone. Start incorporating these practices into your workflow today.`,
  },
  {
    id: '5',
    slug: 'state-management-patterns',
    title: 'Modern State Management Patterns in React',
    excerpt:
      'Explore different approaches to state management in React applications, from useState to Zustand and beyond.',
    date: '2026-03-10T11:00:00Z',
    coverSrc: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=450&fit=crop',
    author: 'David Park',
    categories: 'React',
    content: `State management remains one of the most discussed topics in React development. Let's explore the options available in 2026.

## Local State with useState

For simple, component-level state:

\`\`\`tsx
const [count, setCount] = useState(0)
\`\`\`

## Server State with SWR

For data fetching and caching:

\`\`\`tsx
const { data, error } = useSWR('/api/user', fetcher)
\`\`\`

## Global State Options

### Context API
Good for low-frequency updates across the app.

### Zustand
Lightweight and flexible, great for most applications.

### Jotai
Atomic state management, excellent for fine-grained reactivity.

## Conclusion

Choose the right tool for your specific needs. Often, a combination of approaches works best.`,
  },
  {
    id: '6',
    slug: 'ai-transforming-development',
    title: 'How AI Is Transforming Software Development',
    excerpt:
      'Artificial intelligence is reshaping how developers write code, review PRs, and ship features faster than ever before.',
    date: '2026-03-08T08:00:00Z',
    coverSrc: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&h=450&fit=crop',
    author: 'Priya Nair',
    categories: 'AI',
    content: `AI-powered coding tools have gone from novelty to necessity in just a few years. Let's look at what's changed.

## Code Generation

Tools like GitHub Copilot and Cursor now generate entire functions, components, and tests based on natural language prompts.

## Code Review

AI models can now review pull requests, spot bugs, suggest improvements, and flag security issues automatically.

## Testing

Automated test generation means developers spend less time writing boilerplate and more time on logic.

## Conclusion

AI is not replacing developers—it's amplifying what a single developer can accomplish. The key is learning to work with these tools effectively.`,
  },
  {
    id: '7',
    slug: 'web-performance-optimization',
    title: 'Web Performance Optimization in 2026',
    excerpt:
      'Core Web Vitals, edge rendering, and modern bundling techniques that will make your site blazing fast.',
    date: '2026-03-05T13:00:00Z',
    coverSrc: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=450&fit=crop',
    author: 'Tom Nguyen',
    categories: 'Performance',
    content: `Performance is not a feature—it's a requirement. Here's how to make your web app as fast as possible.

## Core Web Vitals

Google's Core Web Vitals measure real-world user experience:
- **LCP** (Largest Contentful Paint) — loading performance
- **FID** / **INP** — interactivity
- **CLS** — visual stability

## Edge Rendering

Deploying to the edge brings your server closer to your users, dramatically reducing TTFB.

## Image Optimization

Use \`next/image\` for automatic format conversion, lazy loading, and responsive sizing.

## Conclusion

Every millisecond counts. Use profiling tools regularly and treat performance as an ongoing discipline.`,
  },
  {
    id: '8',
    slug: 'design-systems-at-scale',
    title: 'Building Design Systems at Scale',
    excerpt:
      'How to create a consistent, maintainable component library that grows with your product and team.',
    date: '2026-03-01T10:30:00Z',
    coverSrc: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&h=450&fit=crop',
    author: 'Lena Müller',
    categories: 'Design',
    content: `A design system is more than a component library—it's a shared language between design and engineering.

## Tokens First

Design tokens (colors, spacing, typography) should be the foundation of everything. They enable theming and consistency.

## Component Architecture

Build components with composition in mind. Small, focused primitives compose into complex patterns.

## Documentation

Every component needs clear documentation with usage examples, props table, and accessibility notes.

## Conclusion

A well-maintained design system pays dividends in consistency, velocity, and team alignment.`,
  },
  {
    id: '9',
    slug: 'serverless-architecture-patterns',
    title: 'Serverless Architecture Patterns That Scale',
    excerpt:
      'Modern patterns for building serverless applications that handle millions of requests without managing infrastructure.',
    date: '2026-02-25T09:00:00Z',
    coverSrc: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&h=450&fit=crop',
    author: 'Carlos Rivera',
    categories: 'Architecture',
    content: `Serverless computing lets you focus on code rather than infrastructure. Here are the patterns that work at scale.

## Function Composition

Chain small, single-purpose functions together to build complex workflows.

## Event-Driven Architecture

Use events to decouple services and enable asynchronous processing.

## Edge Functions

Run code at the network edge for ultra-low latency responses globally.

## Conclusion

Serverless is a paradigm shift, not just a deployment target. Design your systems to embrace its constraints and you'll build highly scalable applications.`,
  },
  {
    id: '10',
    slug: 'react-server-components-deep-dive',
    title: 'React Server Components: A Deep Dive',
    excerpt:
      'Understanding the mental model, trade-offs, and practical patterns behind React Server Components.',
    date: '2026-02-20T14:00:00Z',
    coverSrc: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&h=450&fit=crop',
    author: 'Sarah Chen',
    categories: 'React',
    content: `React Server Components (RSC) represent a fundamental shift in how we think about rendering. Let's explore what that means in practice.

## The Mental Model

Server Components run only on the server. They can access databases, file systems, and secrets directly—no API layer needed.

## Client vs Server Boundaries

The 'use client' directive marks the boundary between server and client trees. Data flows down; events flow up.

## Practical Patterns

- Fetch data directly in Server Components
- Keep Client Components small and focused
- Avoid prop-drilling by fetching data close to where it's needed

## Conclusion

RSC changes the performance profile of React apps dramatically. Embrace the model and your users will feel the difference.`,
  },
  {
    id: '11',
    slug: 'security-in-modern-web-apps',
    title: 'Security Best Practices for Modern Web Apps',
    excerpt:
      'From XSS and CSRF to supply chain attacks — a practical security checklist for every web developer.',
    date: '2026-02-15T11:00:00Z',
    coverSrc: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=450&fit=crop',
    author: 'Alex Kim',
    categories: 'Security',
    content: `Security vulnerabilities are costly. Here's a practical checklist for keeping your web application safe.

## Input Validation

Never trust user input. Validate on both client and server. Use parameterized queries to prevent SQL injection.

## Authentication

Use proven solutions (Supabase Auth, NextAuth.js) rather than rolling your own. Enable MFA where possible.

## Headers

Set security headers: CSP, HSTS, X-Frame-Options, X-Content-Type-Options.

## Dependencies

Audit your dependency tree regularly with \`npm audit\`. Subscribe to security advisories for packages you use.

## Conclusion

Security is a process, not a checkbox. Build it into your development workflow from day one.`,
  },
  {
    id: '12',
    slug: 'css-container-queries',
    title: 'CSS Container Queries Are Here — Use Them',
    excerpt:
      'Container queries finally let components respond to their own size, enabling truly reusable responsive design.',
    date: '2026-02-10T08:30:00Z',
    coverSrc: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&h=450&fit=crop',
    author: 'Lena Müller',
    categories: 'CSS',
    content: `Media queries respond to the viewport. Container queries respond to the component's container. This changes everything.

## Basic Usage

\`\`\`css
.card-wrapper {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card {
    display: flex;
    flex-direction: row;
  }
}
\`\`\`

## Why This Matters

Components can now be truly context-agnostic. A card can be full-width in a sidebar and two-column in a main area.

## Tailwind Support

Tailwind v4 has built-in container query support via the \`@container\` variant.

## Conclusion

Container queries are the missing piece of responsive design. Start using them today—browser support is excellent.`,
  },
  {
    id: '13',
    slug: 'database-design-for-saas',
    title: 'Database Design Patterns for SaaS Applications',
    excerpt:
      'Multi-tenancy, row-level security, and schema strategies that scale with your customer base.',
    date: '2026-02-05T10:00:00Z',
    coverSrc: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&h=450&fit=crop',
    author: 'Carlos Rivera',
    categories: 'Database',
    content: `SaaS applications have unique database requirements. Here are the patterns that work at scale.

## Multi-Tenancy Strategies

1. **Shared database, shared schema** — use a tenant_id column
2. **Shared database, separate schemas** — one schema per tenant
3. **Separate databases** — maximum isolation, higher cost

## Row-Level Security

Supabase and PostgreSQL make it easy to enforce tenant isolation at the database level with RLS policies.

## Indexing Strategy

Every tenant_id column should be indexed. Composite indexes (tenant_id, created_at) dramatically improve query performance.

## Conclusion

Choose your multi-tenancy strategy early—migrating later is painful. RLS is your friend for security and simplicity.`,
  },
  {
    id: '14',
    slug: 'deploying-with-vercel',
    title: 'Deploying Full-Stack Apps with Vercel',
    excerpt:
      'From preview deployments to production edge functions — everything you need to ship with confidence.',
    date: '2026-02-01T13:00:00Z',
    coverSrc: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&h=450&fit=crop',
    author: 'Tom Nguyen',
    categories: 'DevOps',
    content: `Vercel has made deployment a joy for frontend teams. Here's how to get the most out of the platform.

## Preview Deployments

Every pull request gets its own preview URL. Share it with stakeholders before merging.

## Environment Variables

Manage secrets per environment (development, preview, production) directly in the Vercel dashboard.

## Edge Functions

Run middleware and API routes at the edge for global, low-latency responses.

## Analytics

Vercel Analytics gives you real-world performance data with zero configuration.

## Conclusion

Vercel turns deployment into a workflow feature rather than a deployment nightmare. Set it up once and deploy with confidence.`,
  },
  {
    id: '15',
    slug: 'llm-fine-tuning-guide',
    title: 'A Practical Guide to Fine-Tuning LLMs',
    excerpt:
      'When to fine-tune, how to prepare your dataset, and what pitfalls to avoid when customizing large language models.',
    date: '2026-01-28T09:00:00Z',
    coverSrc: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&h=450&fit=crop',
    author: 'Priya Nair',
    categories: 'AI',
    content: `Fine-tuning lets you adapt a pre-trained model to your specific domain without training from scratch. Here's when and how to do it.

## When to Fine-Tune

- Your use case requires domain-specific vocabulary
- You need consistent output format or style
- Prompt engineering alone isn't cutting it

## Dataset Preparation

Quality over quantity. 1,000 high-quality examples beat 10,000 noisy ones. Format matters—match your expected input/output pairs precisely.

## Training Tips

- Start with a small learning rate
- Monitor validation loss, not just training loss
- Use LoRA for parameter-efficient fine-tuning

## Conclusion

Fine-tuning is powerful but not always necessary. Evaluate your use case carefully before investing in the process.`,
  },
]

// Triple the posts with unique IDs and slightly varied dates
function duplicatePosts(): Post[] {
  const result: Post[] = [...BASE_POSTS]

  for (let copy = 1; copy <= 2; copy++) {
    BASE_POSTS.forEach((post) => {
      const date = new Date(post.date)
      date.setDate(date.getDate() - copy * 30)
      result.push({
        ...post,
        id: `${post.id}-copy${copy}`,
        slug: `${post.slug}-v${copy + 1}`,
        date: date.toISOString(),
      })
    })
  }

  return result
}

export const MOCK_POSTS: Post[] = duplicatePosts()

export function getPostBySlug(slug: string): Post | undefined {
  return MOCK_POSTS.find((post) => post.slug === slug)
}

export function getAllPosts(): Post[] {
  return MOCK_POSTS.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}
