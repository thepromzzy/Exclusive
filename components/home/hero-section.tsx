"use client"
import Link from "next/link"
import { ChevronRight, Apple } from "lucide-react"

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

export default function HeroSection() {
  return (
    <section className="container py-6">
      <div className="flex gap-8">
        {/* Sidebar Categories */}
        <aside className="hidden lg:block w-64 border-r border-border pr-4">
          <ul className="space-y-4 mt-10">
            {categories.map((category, idx) => (
              <li key={idx}>
                <Link
                  href={`/products?category=${encodeURIComponent(category)}`}
                  className="flex items-center justify-between text-foreground hover:text-primary transition-colors"
                >
                  {category}
                  {(idx === 0 || idx === 1) && <ChevronRight className="w-4 h-4" />}
                </Link>
              </li>
            ))}
          </ul>
        </aside>

        {/* Hero Banner */}
        <div className="flex-1 bg-foreground rounded-sm overflow-hidden relative mt-10">
          <div className="flex flex-col md:flex-row items-center justify-between p-8 md:p-12 min-h-[400px]">
            <div className="text-background z-10 max-w-md">
              <div className="flex items-center gap-4 mb-4">
                <img src="/Apple-grey-logo.png" alt="Apple Logo" className="w-10 h-11" />
                <span className="text-sm">iPhone 14 Series</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-semibold leading-tight mb-6">Up to 10% off Voucher</h1>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-background border-b border-background pb-1 hover:text-primary hover:border-primary transition-colors"
              >
                Shop Now
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="mt-8 md:mt-0 md:absolute md:right-8 md:top-1/2 md:-translate-y-1/2">
              <img
                src="/Iphone14.png?height=350&width=500"
                alt="iPhone 14"
                className="max-w-[300px] md:max-w-[400px] object-contain"
              />
            </div>
          </div>
          {/* Slider Dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {[0, 1, 2, 3, 4].map((dot, idx) => (
              <button
                key={dot}
                className={`w-3 h-3 rounded-full transition-colors ${
                  idx === 2 ? "bg-primary" : "bg-background/50 hover:bg-background"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
