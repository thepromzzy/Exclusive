"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Heart, ShoppingCart, User, Search, Menu, X } from "lucide-react"
import { useApp } from "@/lib/store"

export default function Header() {
  const pathname = usePathname()
  const { cartCount, wishlist, isAuthenticated } = useApp()
  const [searchQuery, setSearchQuery] = useState("")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/contact", label: "Contact" },
    { href: "/about", label: "About" },
    { href: "/signup", label: "Sign Up" },
  ]

  return (
    <header className="border-b border-border bg-background sticky top-0 z-50 padding-b-20">
      {/* Top Banner */}
      <div className="bg-foreground text-background py-3 text-center text-sm">
        <div className="container flex items-center justify-center gap-2">
          <span>Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!</span>
          <Link href="/products" className="font-semibold underline ml-2">
            ShopNow
          </Link>
          <select className="bg-transparent border-none text-background ml-auto hidden md:block cursor-pointer">
            <option value="en">English</option>
          </select>
        </div>
      </div>

      {/* Main Header */}
      <div className="container py-4">
        <div className="flex items-center justify-between gap-4  mt-5 mb-5">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold tracking-wide">
            Exclusive
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm hover:text-primary transition-colors relative ${
                  pathname === link.href
                    ? "text-foreground after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-primary"
                    : "text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Search & Actions */}
          <div className="flex items-center gap-4">
            {/* Search Bar */}
            <div className="hidden lg:flex items-center bg-secondary rounded px-3 py-2 gap-2">
              <input
                type="text"
                placeholder="What are you looking for?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none text-sm w-52"
              />
              <Search className="w-5 h-5 text-foreground" />
            </div>

            {/* Wishlist */}
            <Link href="/wishlist" className="relative p-2 hover:bg-secondary rounded-full transition-colors">
              <Heart className="w-6 h-6" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-background text-xs rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link href="/cart" className="relative p-2 hover:bg-secondary rounded-full transition-colors">
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-background text-xs rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User Account */}
            <Link
              href={isAuthenticated ? "/account" : "/login"}
              className={`p-2 rounded-full transition-colors ${
                isAuthenticated ? "bg-primary text-background" : "hover:bg-secondary"
              }`}
            >
              <User className="w-6 h-6" />
            </Link>

            {/* Mobile Menu Toggle */}
            <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-border pt-4">
            <div className="flex flex-col gap-4">
              {/* Mobile Search */}
              <div className="flex items-center bg-secondary rounded px-3 py-2 gap-2">
                <input
                  type="text"
                  placeholder="What are you looking for?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent border-none outline-none text-sm flex-1"
                />
                <Search className="w-5 h-5 text-foreground" />
              </div>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm py-2 ${pathname === link.href ? "text-primary font-medium" : "text-foreground"}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
