import Link from "next/link"
import ProductCard from "@/components/ui/product-card"
import SectionHeader from "@/components/ui/section-header"
import { bestSellingProducts } from "@/lib/data"

export default function BestSelling() {
  return (
    <section className="container py-16 border-b border-border">
      <div className="flex items-end justify-between mb-10">
        <SectionHeader label="This Month" title="Best Selling Products" />
        <Link
          href="/products"
          className="bg-primary text-background px-8 py-3 rounded font-medium hover:bg-primary-hover transition-colors"
        >
          View All
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {bestSellingProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        <span className="mb-20 block border-border"/>
      </div>
    </section>
  )
}
