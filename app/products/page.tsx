"use client"

import { useState, useMemo, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import CustomBreadcrumb from "@/components/ui/custom-breadcrumb"
import ProductCard from "@/components/ui/product-card"
import { allProducts } from "@/lib/data"
import { ChevronDown, Grid, List, SlidersHorizontal } from "lucide-react"

function ProductsContent() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get("category")

  const [sortBy, setSortBy] = useState("default")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || "all")
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000])
  const [showFilters, setShowFilters] = useState(false)

  const filteredProducts = useMemo(() => {
    let products = [...allProducts]

    if (selectedCategory && selectedCategory !== "all") {
      products = products.filter((p) => p.category.toLowerCase() === selectedCategory.toLowerCase())
    }

    products = products.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1])

    switch (sortBy) {
      case "price-low":
        products.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        products.sort((a, b) => b.price - a.price)
        break
      case "rating":
        products.sort((a, b) => b.rating - a.rating)
        break
      case "newest":
        products = products.filter((p) => p.isNew).concat(products.filter((p) => !p.isNew))
        break
      default:
        break
    }

    return products
  }, [selectedCategory, sortBy, priceRange])

  const allCategories = ["all", ...new Set(allProducts.map((p) => p.category))]

  return (
    <>
      <Header />
      <main className="container">
        <CustomBreadcrumb items={[{ label: "Home", href: "/" }, { label: "Products" }]} />

        <div className="flex flex-col lg:flex-row gap-8 py-10">
          <aside className={`lg:w-64 ${showFilters ? "block" : "hidden lg:block"}`}>
            <div className="sticky top-24">
              <div className="mb-8">
                <h3 className="font-semibold mb-4">Categories</h3>
                <ul className="space-y-2">
                  {allCategories.map((cat) => (
                    <li key={cat}>
                      <button
                        onClick={() => setSelectedCategory(cat)}
                        className={`text-left w-full py-1 transition-colors ${
                          selectedCategory === cat
                            ? "text-primary font-medium"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {cat === "all" ? "All Categories" : cat}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-8">
                <h3 className="font-semibold mb-4">Price Range</h3>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                    className="w-20 border border-border rounded px-2 py-1 text-sm"
                    min={0}
                  />
                  <span>-</span>
                  <input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="w-20 border border-border rounded px-2 py-1 text-sm"
                    min={0}
                  />
                </div>
              </div>

              <button
                onClick={() => setShowFilters(false)}
                className="lg:hidden w-full bg-primary text-primary-foreground py-2 rounded font-medium"
              >
                Apply Filters
              </button>
            </div>
          </aside>

          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center gap-2 border border-border px-4 py-2 rounded"
                >
                  <SlidersHorizontal className="w-5 h-5" />
                  Filters
                </button>
                <p className="text-muted-foreground">
                  Showing <span className="text-foreground">{filteredProducts.length}</span> products
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none border border-border rounded px-4 py-2 pr-10 text-sm bg-background cursor-pointer"
                  >
                    <option value="default">Sort by: Default</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Rating</option>
                    <option value="newest">Newest</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
                </div>

                <div className="flex border border-border rounded overflow-hidden">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 ${viewMode === "grid" ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}`}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 ${viewMode === "list" ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg">No products found</p>
              </div>
            ) : (
              <div
                className={
                  viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "flex flex-col gap-4"
                }
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} showAddToCart />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ProductsContent />
    </Suspense>
  )
}
