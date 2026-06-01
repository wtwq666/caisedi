import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

export type BreadcrumbItem = {
  label: string
  to?: string
}

type PageBreadcrumbProps = {
  items: BreadcrumbItem[]
}

export default function PageBreadcrumb({ items }: PageBreadcrumbProps) {
  if (items.length === 0) return null

  return (
    <nav aria-label="面包屑" className="page-breadcrumb flex items-center flex-wrap gap-1 text-xs text-muted-foreground mb-3">
      {items.map((item, index) => {
        const isLast = index === items.length - 1
        return (
          <span key={`${item.label}-${index}`} className="flex items-center gap-1">
            {index > 0 && <ChevronRight size={12} className="text-[#D9D9D9] shrink-0" />}
            {item.to && !isLast ? (
              <Link to={item.to} className="hover:text-primary transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? 'text-[#595959]' : undefined}>{item.label}</span>
            )}
          </span>
        )
      })}
    </nav>
  )
}
