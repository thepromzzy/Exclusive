"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast" // 👈 React Hot Toast
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { useApp } from "@/lib/store"
import { saveUserToLocalStorage } from "@/hooks/auth-storage" // 👈 Local Storage Utility

export default function SignupPage() {
  const router = useRouter()
  const { login } = useApp()
  const [formData, setFormData] = useState({
    name: "",
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

    if (!formData.name || !formData.email || !formData.password) {
      setError("Please fill in all fields")
      return
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    // Prepare user object for storage and global state
    const nameParts = formData.name.split(" ")
    const user = {
      id: "1", 
      email: formData.email,
      password: formData.password, // Stored for comparison in Login
      firstName: nameParts[0],
      lastName: nameParts.slice(1).join(" ") || "",
    }

    // 1. Save user to localStorage
    saveUserToLocalStorage(user)
    
    // 2. Log user into global state (excluding the password)
    const { password, ...userWithoutPassword } = user
    login(userWithoutPassword) 
    
    // 3. Show success toast and redirect
    toast.success("Account created and logged in successfully!")
    router.push("/account")
  }

  return (
    <>
      <Header />
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
            <h1 className="text-4xl font-medium mb-3">Create an account</h1>
            <p className="mb-10">Enter your details below</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && <div className="bg-primary/10 text-primary px-4 py-3 rounded text-sm">{error}</div>}

              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border-b border-border py-3 outline-none focus:border-primary transition-colors"
                />
              </div>

              <div>
                <input
                  type="email"
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

              <button
                type="submit"
                className="w-full bg-primary text-background py-4 rounded font-medium hover:bg-primary-hover transition-colors"
              >
                Create Account
              </button>

              <button
                type="button"
                className="w-full border border-border py-4 rounded font-medium flex items-center justify-center gap-3 hover:bg-secondary transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Sign up with Google
              </button>
            </form>

            <p className="text-center mt-8">
              Already have account?{" "}
              <Link href="/login" className="text-foreground underline font-medium">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}