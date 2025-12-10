"use client"

import { useState } from "react"
import Link from "next/link"
import ProductCard from "@/components/ui/product-card"
import SectionHeader from "@/components/ui/section-header"
import { exploreProducts } from "@/lib/data"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function ExploreProducts() {
  const [currentPage, setCurrentPage] = useState(0)
  const productsPerPage = 8
  const totalPages = Math.ceil(exploreProducts.length / productsPerPage)

  const currentProducts = exploreProducts.slice(currentPage * productsPerPage, (currentPage + 1) * productsPerPage)

  return (
    <section className="container py-16">
      <div className="flex items-end justify-between mb-10">
        <SectionHeader label="Our Products" title="Explore Our Products" />
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
            disabled={currentPage === 0}
            className="w-11 h-11 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-background transition-colors disabled:opacity-50"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1))}
            disabled={currentPage >= totalPages - 1}
            className="w-11 h-11 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-background transition-colors disabled:opacity-50"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="text-center mt-20">
        <Link
          href="/products"
          className="inline-block bg-primary text-background px-12 py-4 rounded font-medium hover:bg-primary-hover transition-colors"
        >
          View All Products
        </Link>
      </div>
    </section>
  )
}