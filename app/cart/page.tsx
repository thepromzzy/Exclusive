"use client"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import CustomBreadcrumb from "@/components/ui/custom-breadcrumb"
import { useApp } from "@/lib/store"
import Image from "next/image"
import Link from "next/link"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function CartPage() {
  const { cart, updateCartQuantity, removeFromCart, cartTotal } = useApp()
  const shipping = cartTotal > 140 ? 0 : 10
  const total = cartTotal + shipping

  return (
    <>
      <Header />
      <main className="container mx-auto px-4">
        <CustomBreadcrumb items={[{ label: "Home", href: "/" }, { label: "Cart" }]} />

        <div className="py-10">
          {cart.length === 0 ? (
            <div className="text-center py-20">
              <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6">Add some products to your cart to continue shopping.</p>
              <Link href="/products">
                <Button className="bg-primary hover:bg-primary/90">Return To Shop</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Cart Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-4 px-4 font-medium">Product</th>
                      <th className="text-left py-4 px-4 font-medium">Price</th>
                      <th className="text-left py-4 px-4 font-medium">Quantity</th>
                      <th className="text-left py-4 px-4 font-medium">Subtotal</th>
                      <th className="py-4 px-4"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item) => (
                      <tr key={`${item.id}-${item.selectedColor}-${item.selectedSize}`} className="border-b">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-4">
                            <div className="relative w-16 h-16 bg-muted rounded">
                              <Image
                                src={item.image || "/placeholder.svg?height=64&width=64"}
                                alt={item.name}
                                fill
                                className="object-contain p-2"
                              />
                            </div>
                            <span className="font-medium">{item.name}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">${item.price}</td>
                        <td className="py-4 px-4">
                          <div className="flex items-center border rounded w-fit">
                            <button
                              onClick={() => updateCartQuantity(item.id, Math.max(1, item.quantity - 1))}
                              className="px-3 py-1 hover:bg-muted"
                            >
                              -
                            </button>
                            <span className="px-4 py-1 border-x">{item.quantity}</span>
                            <button
                              onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                              className="px-3 py-1 hover:bg-muted"
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="py-4 px-4">${(item.price * item.quantity).toFixed(2)}</td>
                        <td className="py-4 px-4">
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-primary hover:text-primary/80"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between">
                <Link href="/products">
                  <Button variant="outline">Return To Shop</Button>
                </Link>
                <Button variant="outline">Update Cart</Button>
              </div>

              {/* Coupon and Cart Total */}
              <div className="flex flex-col lg:flex-row gap-8 justify-between">
                <div className="flex gap-4">
                  <Input placeholder="Coupon Code" className="w-64" />
                  <Button className="bg-primary hover:bg-primary/90">Apply Coupon</Button>
                </div>

                <div className="border rounded-lg p-6 w-full lg:w-96">
                  <h3 className="text-xl font-semibold mb-6">Cart Total</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between pb-4 border-b">
                      <span>Subtotal:</span>
                      <span>${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between pb-4 border-b">
                      <span>Shipping:</span>
                      <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between font-semibold">
                      <span>Total:</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                  <Link href="/checkout" className="block mt-6">
                    <Button className="w-full bg-primary hover:bg-primary/90">Proceed to checkout</Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}