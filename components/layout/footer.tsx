"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Send } from "lucide-react"

export default function Footer() {
  const [email, setEmail] = useState("")

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      alert("Thanks for subscribing!")
      setEmail("")
    }
  }

  return (
    <footer className="bg-foreground text-background pt-16 pb-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Exclusive */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold mb-6">Exclusive</h3>
            <p className="text-lg mb-4">Subscribe</p>
            <p className=" mb-4">Get 10% off your first order</p>
            <form onSubmit={handleSubscribe} className="flex items-center border border-muted rounded overflow-hidden">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent px-3 py-2 flex-1 outline-none text-sm"
              />
              <button type="submit" className="p-2 hover:bg-muted/20 transition-colors">
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-medium mb-6">Support</h3>
            <address className="not-italic space-y-3 text-sm">
              <p>
                111 Bijoy sarani, Dhaka,
                <br />
                DH 1515, Bangladesh.
              </p>
              <p>exclusive@gmail.com</p>
              <p>+88015-88888-9999</p>
            </address>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-lg font-medium mb-6">Account</h3>
            <nav className="flex flex-col gap-3 text-sm">
              <Link href="/account" className="hover:text-background transition-colors">
                My Account
              </Link>
              <Link href="/login" className="hover:text-background transition-colors">
                Login / Register
              </Link>
              <Link href="/cart" className="hover:text-background transition-colors">
                Cart
              </Link>
              <Link href="/wishlist" className="hover:text-background transition-colors">
                Wishlist
              </Link>
              <Link href="/products" className="hover:text-background transition-colors">
                Shop
              </Link>
            </nav>
          </div>

          {/* Quick Link */}
          <div>
            <h3 className="text-lg font-medium mb-6">Quick Link</h3>
            <nav className="flex flex-col gap-3 text-sm">
              <Link href="/privacy" className="hover:text-background transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-background transition-colors">
                Terms Of Use
              </Link>
              <Link href="/faq" className="hover:text-background transition-colors">
                FAQ
              </Link>
              <Link href="/contact" className="hover:text-background transition-colors">
                Contact
              </Link>
            </nav>
          </div>

          {/* Download App */}
          <div>
            <h3 className="text-lg font-medium mb-6">Download App</h3>
            <p className="text-xs mb-3">Save $3 with App New User Only</p>
            <div className="flex gap-2 mb-4">
              <div className="w-20 h-20 bg-background/10 rounded flex items-center justify-center">
                <img src="/Qr Code.png?height=80&width=80" alt="QR Code" className="w-16 h-16 cursor-pointer" />
              </div>
              <div className="flex flex-col gap-2">
                <img src="GooglePlay.png?height=40&width=120" alt="Google Play" className="h-9 cursor-pointer" />
                <img src="/download-appstore.png?height=40&width=120" alt="App Store" className="h-9 cursor-pointer" />
              </div>
            </div>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-primary transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-muted/30 pt-6 text-center text-muted-foreground text-sm">
          <p>&copy; Copyright Rimel 2022. All right reserved</p>
        </div>
      </div>
    </footer>
  )
}
