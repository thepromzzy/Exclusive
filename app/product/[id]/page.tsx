"use client"

import { useState, use } from "react"
import Link from "next/link"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import CustomBreadcrumb from "@/components/ui/custom-breadcrumb"
import ProductCard from "@/components/ui/product-card"
import { useApp } from "@/lib/store"
import { getProductById, getRelatedProducts } from "@/lib/data"
import { Heart, Minus, Plus, Truck, RotateCcw, Star } from "lucide-react"

export default function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const product = getProductById(id)
  const relatedProducts = product ? getRelatedProducts(id, product.category) : []

  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useApp()
  const [quantity, setQuantity] = useState(1)
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || "")
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || "")
  const [selectedImage, setSelectedImage] = useState(0)

  const inWishlist = product ? isInWishlist(product.id) : false

  if (!product) {
    return (
      <>
        <Header />
        <main className="container py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <Link href="/products" className="text-primary hover:underline">
            Browse all products
          </Link>
        </main>
        <Footer />
      </>
    )
  }

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize)
  }

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor, selectedSize)
    window.location.href = "/checkout"
  }

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
      />
    ))
  }

  const thumbnails = [product.image, product.image, product.image, product.image]

  return (
    <>
      <Header />
      <main className="container">
        <CustomBreadcrumb
          items={[
            { label: "Account", href: "/account" },
            { label: "Gaming", href: `/products?category=${product.category}` },
            { label: product.name },
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 py-10">
          {/* Product Images */}
          <div className="flex gap-6">
            <div className="flex flex-col gap-4">
              {thumbnails.map((thumb, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-[100px] h-[100px] bg-secondary rounded flex items-center justify-center overflow-hidden ${
                    selectedImage === idx ? "border-2 border-primary" : ""
                  }`}
                >
                  <img
                    src={thumb || "/placeholder.svg"}
                    alt={`View ${idx + 1}`}
                    className="w-full h-full object-contain p-2"
                  />
                </button>
              ))}
            </div>

            <div className="flex-1 bg-secondary rounded flex items-center justify-center min-h-[600px]">
              <img
                src={thumbnails[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                className="max-w-full max-h-[500px] object-contain"
              />
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-2xl font-semibold mb-4">{product.name}</h1>

            <div className="flex items-center gap-3 mb-4">
              <div className="flex">{renderStars(product.rating)}</div>
              <span className="text-muted-foreground">({product.reviews} Reviews)</span>
              <span className="text-muted-foreground">|</span>
              <span className={product.inStock ? "text-accent" : "text-primary"}>
                {product.inStock ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            <div className="text-2xl font-medium mb-6">${product.price.toFixed(2)}</div>

            <p className="text-foreground mb-6 pb-6 border-b border-border">
              {product.description ||
                "PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal Pressure sensitive."}
            </p>

            {product.colors && product.colors.length > 0 && (
              <div className="flex items-center gap-4 mb-6">
                <span className="font-medium">Colours:</span>
                <div className="flex gap-2">
                  {product.colors.map((color, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedColor(color)}
                      className={`w-5 h-5 rounded-full border-2 ${
                        selectedColor === color
                          ? "border-foreground ring-2 ring-offset-2 ring-foreground"
                          : "border-transparent"
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            )}

            {product.sizes && product.sizes.length > 0 && (
              <div className="flex items-center gap-4 mb-6">
                <span className="font-medium">Size:</span>
                <div className="flex gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-8 h-8 rounded border text-sm font-medium transition-colors ${
                        selectedSize === size
                          ? "bg-primary text-primary-foreground border-primary"
                          : "border-border hover:border-primary"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border border-border rounded">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors border-r border-border"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-16 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors border-l border-border"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={handleBuyNow}
                className="flex-1 bg-primary text-primary-foreground py-3 px-8 rounded font-medium hover:bg-primary/90 transition-colors"
              >
                Buy Now
              </button>

              <button
                onClick={handleWishlistToggle}
                className={`w-10 h-10 border rounded flex items-center justify-center transition-colors ${
                  inWishlist
                    ? "bg-primary border-primary text-primary-foreground"
                    : "border-border hover:border-primary"
                }`}
              >
                <Heart className={`w-5 h-5 ${inWishlist ? "fill-current" : ""}`} />
              </button>
            </div>

            <div className="border border-border rounded">
              <div className="flex items-center gap-4 p-4 border-b border-border">
                <Truck className="w-10 h-10" />
                <div>
                  <h4 className="font-medium">Free Delivery</h4>
                  <p className="text-sm text-muted-foreground underline cursor-pointer">
                    Enter your postal code for Delivery Availability
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4">
                <RotateCcw className="w-10 h-10" />
                <div>
                  <h4 className="font-medium">Return Delivery</h4>
                  <p className="text-sm text-muted-foreground">
                    Free 30 Days Delivery Returns. <span className="underline cursor-pointer">Details</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <section className="py-16">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-5 h-10 bg-primary rounded" />
              <span className="text-primary font-semibold">Related Item</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relProduct) => (
                <ProductCard key={relProduct.id} product={relProduct} showAddToCart />
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  )
}
