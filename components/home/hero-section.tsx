"use client"

import { ChevronRight } from "lucide-react"
import Link from "next/link"

export default function HeroSection() {
  return (
    <section className="w-full">
      <div className="bg-foreground rounded-sm overflow-hidden relative">
        <div className="flex flex-col md:flex-row items-center justify-between p-8 md:p-12 min-h-[400px]">
          <div className="text-background z-10 max-w-md">
            <div className="flex items-center gap-4 mb-4">
              <img src="/Apple-grey-logo.png" alt="Apple Logo" className="w-10 h-11" />
              <span className="text-sm">iPhone 14 Series</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-semibold leading-tight mb-6">
              Up to 10% off Voucher
            </h1>
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
          {[0, 1, 2, 3, 4].map((_, idx) => (
            <button
              key={idx}
              className={`w-3 h-3 rounded-full transition-colors ${
                idx === 2 ? "bg-primary" : "bg-background/50 hover:bg-background"
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}