import { ChevronRight } from "lucide-react"
import Link from "next/link"

const categories = [
  "Woman's Fashion",
  "Men's Fashion",
  "Electronics",
  "Home & Lifestyle",
  "Medicine",
  "Sports & Outdoor",
  "Baby's & Toys",
  "Groceries & Pets",
  "Health & Beauty",
]

export default function CategoriesSidebar() {
  return (
    <nav className="w-64 flex-shrink-0 border-r border-border pr-8 py-6">
      <h3 className="text-lg font-semibold text-foreground mb-6">Categories</h3>
      <ul className="space-y-1">
        {categories.map((category, idx) => (
          <li key={idx}>
            <Link
              href={`/products?category=${encodeURIComponent(category)}`}
              className="flex items-center justify-between py-3 px-2 rounded-md text-foreground/80 transition-all duration-200 group"
            >
              <span className="text-sm font-medium group-hover:translate-x-1 transition-transform">
                {category}
              </span>
              {(idx === 0 || idx === 1) && (
                <ChevronRight className="w-4 h-4 text-foreground/40 group-hover:text-primary group-hover:translate-x-1 transition-all" />
              )}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}