'use client'

interface CategoryBadgeProps {
  category: string
  variant?: 'default' | 'featured' | 'outline'
  className?: string
}

export default function CategoryBadge({ 
  category, 
  variant = 'default',
  className = '',
}: CategoryBadgeProps) {
  const baseClasses = 'inline-flex items-center justify-center px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider rounded-md transition-all duration-300'
  
  const variantClasses = {
    default: 'bg-primary/10 text-primary border border-primary/20 hover:bg-primary/15 hover:border-primary/30 hover:-translate-y-0.5',
    featured: 'ai-gradient text-white shadow-sm hover:shadow-md hover:-translate-y-0.5',
    outline: 'bg-transparent text-primary border border-primary/30 hover:bg-primary/5 hover:border-primary/40 hover:-translate-y-0.5'
  }

  return (
    <span className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {category}
    </span>
  )
}
