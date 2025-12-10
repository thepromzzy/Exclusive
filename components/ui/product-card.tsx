"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Heart, Eye, ShoppingCart, Star } from "lucide-react"
import type { Product } from "@/lib/types"
import { useApp } from "@/lib/store"

interface ProductCardProps {
  product: Product
  showAddToCart?: boolean
}

export default function ProductCard({ product, showAddToCart = false }: ProductCardProps) {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist, isInCart } = useApp()
  const [isHovered, setIsHovered] = useState(false)
  const router = useRouter()
  const inWishlist = isInWishlist(product.id)
  const inCart = isInCart(product.id)

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (inWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product, 1)
  }

  const handleViewProduct = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    router.push(`/product/${product.id}`)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-muted"}`}
      />
    ))
  }

  return (
    <div className="group relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      {/* Image Container */}
      <Link href={`/product/${product.id}`} className="block">
        <div className="relative bg-secondary rounded overflow-hidden aspect-square mb-4">
          {/* Discount Badge */}
          {product.discount && (
            <span className="absolute top-3 left-3 bg-primary text-background text-xs font-medium px-3 py-1 rounded">
              -{product.discount}%
            </span>
          )}

          {/* New Badge */}
          {product.isNew && (
            <span className="absolute top-3 left-3 bg-accent text-foreground text-xs font-medium px-3 py-1 rounded">
              NEW
            </span>
          )}

          {/* Action Buttons */}
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            <button
              onClick={handleWishlistToggle}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                inWishlist ? "bg-primary text-background" : "bg-background hover:bg-primary hover:text-background"
              }`}
            >
              <Heart className={`w-4 h-4 ${inWishlist ? "fill-current" : ""}`} />
            </button>
            <button
              onClick={handleViewProduct}
              className="w-8 h-8 bg-background rounded-full flex items-center justify-center hover:bg-primary hover:text-background transition-colors"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>

          {/* Product Image */}
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-full object-contain p-6 transition-transform duration-300 group-hover:scale-110"
          />

          {/* Add to Cart Button (appears on hover or always if showAddToCart) */}
          {(showAddToCart || isHovered) && (
            <button
              onClick={handleAddToCart}
              className="absolute bottom-0 left-0 right-0 bg-foreground text-background py-2 flex items-center justify-center gap-2 text-sm font-medium hover:bg-primary transition-colors"
            >
              <ShoppingCart className="w-4 h-4" />
              {inCart ? "Added to Cart" : "Add To Cart"}
            </button>
          )}
        </div>
      </Link>

      {/* Product Info */}
      <Link href={`/product/${product.id}`}>
        <h3 className="font-medium text-foreground mb-2 hover:text-primary transition-colors line-clamp-2">
          {product.name}
        </h3>
      </Link>

      <div className="flex items-center gap-3 mb-2">
        <span className="text-primary font-medium">${product.price}</span>
        {product.originalPrice && <span className="line-through text-sm">${product.originalPrice}</span>}
      </div>

      <div className="flex items-center gap-2">
        <div className="flex">{renderStars(product.rating)}</div>
        <span className="text-sm">({product.reviews})</span>
      </div>

      {/* Color Options */}
      {product.colors && product.colors.length > 0 && (
        <div className="flex gap-1 mt-2">
          {product.colors.map((color, idx) => (
            <div key={idx} className="w-4 h-4 rounded-full border border-muted" style={{ backgroundColor: color }} />
          ))}
        </div>
      )}
    </div>
  )
}
