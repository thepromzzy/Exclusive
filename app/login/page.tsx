"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { useApp } from "@/lib/store"
import { getStoredUser } from "@/hooks/auth-storage" // 👈 Local Storage Utility

export default function LoginPage() {
  const router = useRouter()
  const { login } = useApp()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("") 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setError("")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // 1. Simple validation
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields")
      return
    }

    const storedUser = getStoredUser()

    if (
      storedUser &&
      storedUser.email === formData.email &&
      storedUser.password === formData.password
    ) {
      // 2. Successful Login
      // Create user object without the password for global state
      const { password, ...userWithoutPassword } = storedUser 
      
      login(userWithoutPassword)
      // Show **SUCCESS TOAST**
      toast.success("Login successful!")
      router.push("/account")
    } else {
      // 3. Failed Login - Show **ERROR TOAST** and prevent redirection
      toast.error("Invalid email or password.")
      // Optionally clear the password field on failure
      setFormData(prev => ({ ...prev, password: "" })) 
    }
  }

  return (
    <>
      <Header />
        <span className="mb-20 block border-border"/>
      <main className="flex min-h-[calc(100vh-200px)]">
        {/* Left Side - Image */}
        <div className="hidden lg:flex flex-1 bg-[#CBE4E8] items-center justify-center">
          <img
            src="/Andriod-phone-with-cart.png?height=600&width=700"
            alt="Shopping Cart"
            className="max-w-full max-h-[80%] object-contain"
          />
        </div>

        {/* Right Side - Form */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <h1 className="text-4xl font-medium mb-3">Log in to Exclusive</h1>
            <p className=" mb-10">Enter your details below</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && <div className="bg-primary/10 text-primary px-4 py-3 rounded text-sm">{error}</div>}

              <div>
                <input
                  type="text"
                  name="email"
                  placeholder="Email or Phone Number"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border-b border-border py-3 outline-none focus:border-primary transition-colors"
                />
              </div>

              <div>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full border-b border-border py-3 outline-none focus:border-primary transition-colors"
                />
              </div>

              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-primary text-background px-12 py-4 rounded font-medium hover:bg-primary-hover transition-colors"
                >
                  Log In
                </button>
                <Link href="/forgot-password" className="text-primary hover:underline">
                  Forgot Password?
                </Link>
              </div>
            </form>

            <p className="text-center mt-8">
              Don't have an account?{" "}
              <Link href="/signup" className="text-foreground underline font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </main>
      <span className="mb-20 block border-border"/>
      <Footer />
    </>
  )
}