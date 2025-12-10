"use client"
import Link from "next/link"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import CustomBreadcrumb from "@/components/ui/custom-breadcrumb"
import ProductCard from "@/components/ui/product-card"
import { useApp } from "@/lib/store"
import { bestSellingProducts } from "@/lib/data"
import { ShoppingCart, Trash2 } from "lucide-react"

export default function WishlistPage() {
  const { wishlist, moveToCart, removeFromWishlist, addToCart } = useApp()

  const handleMoveAllToCart = () => {
    wishlist.forEach((item) => moveToCart(item.id))
  }

  return (
    <>
      <Header />
      <main className="container">
        <CustomBreadcrumb items={[{ label: "Home", href: "/" }, { label: "Wishlist" }]} />

        <div className="py-10">
          {/* Wishlist Header */}
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-xl">Wishlist ({wishlist.length})</h2>
            {wishlist.length > 0 && (
              <button
                onClick={handleMoveAllToCart}
                className="border border-border px-8 py-3 rounded font-medium hover:bg-secondary transition-colors"
              >
                Move All To Bag
              </button>
            )}
          </div>

          {/* Wishlist Items */}
          {wishlist.length === 0 ? (
            <div className="text-center py-20">
              <h3 className="text-2xl font-semibold mb-4">Your wishlist is empty</h3>
              <p className="text-muted mb-8">Save items you love by clicking the heart icon.</p>
              <Link
                href="/products"
                className="inline-block bg-primary text-background px-8 py-3 rounded font-medium hover:bg-primary-hover transition-colors"
              >
                Explore Products
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
              {wishlist.map((item) => (
                <div key={item.id} className="group relative">
                  {/* Image Container */}
                  <div className="relative bg-secondary rounded overflow-hidden aspect-square mb-4">
                    {item.discount && (
                      <span className="absolute top-3 left-3 bg-primary text-background text-xs font-medium px-3 py-1 rounded">
                        -{item.discount}%
                      </span>
                    )}
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="absolute top-3 right-3 w-8 h-8 bg-background rounded-full flex items-center justify-center hover:bg-primary hover:text-background transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <Link href={`/product/${item.id}`}>
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-full h-full object-contain p-6"
                      />
                    </Link>
                    <button
                      onClick={() => moveToCart(item.id)}
                      className="absolute bottom-0 left-0 right-0 bg-foreground text-background py-2 flex items-center justify-center gap-2 text-sm font-medium hover:bg-primary transition-colors"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Add To Cart
                    </button>
                  </div>

                  <Link href={`/product/${item.id}`}>
                    <h3 className="font-medium text-foreground mb-2 hover:text-primary transition-colors">
                      {item.name}
                    </h3>
                  </Link>
                  <div className="flex items-center gap-3">
                    <span className="text-primary font-medium">${item.price}</span>
                    {item.originalPrice && (
                      <span className="text-muted line-through text-sm">${item.originalPrice}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Just For You Section */}
          <section>
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-4">
                <div className="w-5 h-10 bg-primary rounded" />
                <h2 className="text-xl">Just For You</h2>
              </div>
              <Link
                href="/products"
                className="border border-border px-8 py-3 rounded font-medium hover:bg-secondary transition-colors"
              >
                See All
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {bestSellingProducts.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} showAddToCart />
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
