import React from "react"
import Link from "next/link"

interface BreadcrumbItem {
  label: string
  href?: string
}

interface CustomBreadcrumbProps {
  items: BreadcrumbItem[]
}

export default function CustomBreadcrumb({ items }: CustomBreadcrumbProps) {
  return (
    <nav className="py-6">
      <ol className="flex items-center gap-2 text-sm text-muted-foreground">
        {items.map((item, index) => (
          <React.Fragment key={index}>
            {index > 0 && <span>/</span>}
            {item.href ? (
              <Link href={item.href} className="hover:text-foreground transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-foreground">{item.label}</span>
            )}
          </React.Fragment>
        ))}
      </ol>
    </nav>
  )
}
