"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import CustomBreadcrumb from "@/components/ui/custom-breadcrumb"
import { useApp } from "@/lib/store"

export default function CheckoutPage() {
  const router = useRouter()
  const { cart, cartTotal, clearCart, user, isAuthenticated } = useApp()
  const shipping = cartTotal > 140 ? 0 : 10
  const total = cartTotal + shipping

  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    companyName: "",
    streetAddress: user?.address || "",
    apartment: "",
    city: "",
    phone: user?.phone || "",
    email: user?.email || "",
    saveInfo: false,
    paymentMethod: "cash",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate order placement
    alert("Order placed successfully!")
    clearCart()
    router.push("/")
  }

  if (cart.length === 0) {
    return (
      <>
        <Header />
        <main className="container py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <p className="mb-8">Add some products before checking out.</p>
          <button
            onClick={() => router.push("/products")}
            className="bg-primary text-background px-8 py-3 rounded font-medium hover:bg-primary-hover transition-colors"
          >
            Browse Products
          </button>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="container">
        <CustomBreadcrumb
          items={[
            { label: "Account", href: "/account" },
            { label: "My Account", href: "/account" },
            { label: "Product", href: "/products" },
            { label: "View Cart", href: "/cart" },
            { label: "CheckOut" },
          ]}
        />

        <div className="py-10">
          <h1 className="text-3xl font-medium mb-10">Billing Details</h1>

          <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-16">
            {/* Billing Form */}
            <div className="flex-1 space-y-6">
              <div>
                <label className="block mb-2">
                  First Name<span className="text-primary">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full bg-secondary rounded px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block mb-2">Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="w-full bg-secondary rounded px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block  mb-2">
                  Street Address<span className="text-primary">*</span>
                </label>
                <input
                  type="text"
                  name="streetAddress"
                  value={formData.streetAddress}
                  onChange={handleChange}
                  required
                  className="w-full bg-secondary rounded px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block mb-2">Apartment, floor, etc. (optional)</label>
                <input
                  type="text"
                  name="apartment"
                  value={formData.apartment}
                  onChange={handleChange}
                  className="w-full bg-secondary rounded px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block mb-2">
                  Town/City<span className="text-primary">*</span>
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full bg-secondary rounded px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block mb-2">
                  Phone Number<span className="text-primary">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full bg-secondary rounded px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block mb-2">
                  Email Address<span className="text-primary">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-secondary rounded px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="saveInfo"
                  checked={formData.saveInfo}
                  onChange={handleChange}
                  className="w-5 h-5 rounded border-border text-primary focus:ring-primary"
                />
                <span>Save this information for faster check-out next time</span>
              </label>
            </div>

            {/* Order Summary */}
            <div className="lg:w-[470px]">
              <div className="space-y-6">
                {/* Products */}
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-secondary rounded overflow-hidden">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <span className="text-sm">{item.name}</span>
                    </div>
                    <span>${item.price * item.quantity}</span>
                  </div>
                ))}

                {/* Totals */}
                <div className="border-t border-border pt-6 space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>${cartTotal}</span>
                  </div>
                  <div className="flex justify-between border-b border-border pb-4">
                    <span>Shipping:</span>
                    <span>{shipping === 0 ? "Free" : `$${shipping}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Total:</span>
                    <span className="font-medium">${total}</span>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="space-y-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bank"
                      checked={formData.paymentMethod === "bank"}
                      onChange={handleChange}
                      className="w-5 h-5 text-foreground"
                    />
                    <span>Bank</span>
                    <div className="ml-auto flex gap-2">
                      <img src="/bkash.png?height=30&width=40" alt="Visa" className="h-6" />
                      <img src="/visa.png?height=30&width=40" alt="Visa" className="h-6" />
                      <img src="/Mastercard.png?height=30&width=40" alt="Visa" className="h-6" />
                      <img src="/payment-card.png?height=30&width=40" alt="Mastercard" className="h-6" />
                    </div>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cash"
                      checked={formData.paymentMethod === "cash"}
                      onChange={handleChange}
                      className="w-5 h-5 text-foreground"
                    />
                    <span>Cash on delivery</span>
                  </label>
                </div>

                {/* Coupon */}
                <div className="flex gap-4">
                  <input
                    type="text"
                    placeholder="Coupon Code"
                    className="flex-1 border border-border rounded px-4 py-3 outline-none focus:border-primary"
                  />
                  <button
                    type="button"
                    className="bg-primary text-background px-6 py-3 rounded font-medium hover:bg-primary-hover transition-colors"
                  >
                    Apply Coupon
                  </button>
                </div>

                {/* Place Order */}
                <button
                  type="submit"
                  className="w-full bg-primary text-background py-4 rounded font-medium hover:bg-primary-hover transition-colors"
                >
                  Place Order
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  )
}
