"use client"

import { useRef } from "react"
import Link from "next/link"
import ProductCard from "@/components/ui/product-card"
import SectionHeader from "@/components/ui/section-header"
import { flashSaleProducts } from "@/lib/data"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function FlashSales() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <section className="container py-16 border-b border-border">
      <div className="flex items-end justify-between mb-10">
        <SectionHeader label="Today's" title="Flash Sales" showTimer />
        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="w-11 h-11 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-background transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-11 h-11 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-background transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {flashSaleProducts.map((product) => (
          <div key={product.id} className="min-w-[270px] flex-shrink-0">
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      <div className="text-center mt-10">
        <Link
          href="/products"
          className="inline-block bg-primary text-background px-12 py-4 rounded font-medium hover:bg-primary-hover transition-colors"
        >
          View All Products
        </Link>
      </div>
      <span className="mb-16 block border-border"/>
    </section>
  )
}
