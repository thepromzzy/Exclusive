"use client"

import type React from "react"
import { useRef } from "react"
import Link from "next/link"
import SectionHeader from "@/components/ui/section-header"
import { categories } from "@/lib/data"
import { Smartphone, Monitor, Watch, Camera, Headphones, Gamepad2, ChevronLeft, ChevronRight } from "lucide-react"

const iconMap: { [key: string]: React.ElementType } = {
  smartphone: Smartphone,
  monitor: Monitor,
  watch: Watch,
  camera: Camera,
  headphones: Headphones,
  gamepad: Gamepad2,
}

export default function Categories() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <section className="container py-16 border-b border-border">
      <div className="flex items-end justify-between mb-10">
        <SectionHeader label="Categories" title="Browse By Category" />
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
        className="flex gap-6 overflow-x-auto pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {categories.map((category) => {
          const IconComponent = iconMap[category.icon] || Smartphone
          return (
            <Link
              key={category.id}
              href={`/products?category=${encodeURIComponent(category.name)}`}
              className="min-w-[170px] h-[145px] flex flex-col items-center justify-center gap-4 border border-border rounded hover:bg-primary hover:text-background hover:border-primary transition-colors group flex-shrink-0"
            >
              <IconComponent className="w-14 h-14" />
              <span className="text-sm font-medium">{category.name}</span>
            </Link>
          )
        })}
      </div>
      <span className="mb-16 block border-border"/>
    </section>
  )
}
