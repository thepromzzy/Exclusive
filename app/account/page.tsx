"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast" // 👈 Import toast
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import CustomBreadcrumb from "@/components/ui/custom-breadcrumb"
import { useApp } from "@/lib/store"
import { getStoredUser, saveUserToLocalStorage } from "@/hooks/auth-storage" // 👈 Import storage helpers

// NOTE: Ensure your useApp() user object includes 'id', 'email', 'firstName', 'lastName' 
// and that your 'auth-storage.ts' file defines the StoredUser interface with 'password'.

export default function AccountPage() {
  const router = useRouter()
  // Assuming 'user' object structure matches the data stored (minus the password)
  const { user, isAuthenticated, updateUser, logout } = useApp()

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
      return
    }

    if (user) {
      setFormData((prev) => ({
        ...prev,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        address: user.address || "",
      }))
    }
  }, [isAuthenticated, user, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const storedUser = getStoredUser()

    if (!storedUser) {
      toast.error("User session not found. Please log in again.")
      logout() // Force log out if storage is missing
      return
    }

    let newPasswordToSave = storedUser.password;
    let passwordChanged = false;

    // 1. Password Change Validation Logic
    if (formData.currentPassword || formData.newPassword || formData.confirmPassword) {
      
      // Check for mismatched new passwords
      if (formData.newPassword !== formData.confirmPassword) {
        toast.error("New passwords do not match.")
        return
      }

      // Check if current password is correct
      if (formData.currentPassword !== storedUser.password) {
        toast.error("Current password is incorrect.")
        return
      }
      
      // Update password
      newPasswordToSave = formData.newPassword;
      passwordChanged = true;
    }

    // 2. Prepare the updated user object
    const updatedUser = {
      ...storedUser,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      address: formData.address,
      password: newPasswordToSave, // Update password field
    }

    // 3. Update localStorage
    saveUserToLocalStorage(updatedUser)

    // 4. Update Global App State (pass data without password)
    const { password, ...userWithoutPassword } = updatedUser;
    updateUser(userWithoutPassword)

    // 5. Show Success Toast
    toast.success("Profile updated successfully!")

    // 6. Reset password fields in form state
    if (passwordChanged) {
        setFormData((prev) => ({ 
            ...prev, 
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        }))
    }
  }

  const handleLogout = () => {
    logout()
    // Show toast on successful logout
    toast.success("You have been logged out.")
    router.push("/")
  }

  if (!isAuthenticated) {
    return null
  }

  const menuItems = [
    { label: "Manage My Account", active: true },
    { label: "My Profile", active: true, sub: true },
    { label: "Address Book", sub: true },
    { label: "My Payment Options", sub: true },
    { label: "My Orders", href: "/orders" },
    { label: "My Returns" },
    { label: "My Cancellations" },
    { label: "My Wishlist", href: "/wishlist" },
  ]

  return (
    <>
      <Header />
      <main className="container">
        <div className="flex items-center justify-between py-6">
          <CustomBreadcrumb items={[{ label: "Home", href: "/" }, { label: "My Account" }]} />
          <p className="text-sm">
            Welcome!{" "}
            <span className="text-primary">
              {user?.firstName} {user?.lastName}
            </span>
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 py-10">
          {/* Sidebar */}
          <aside className="lg:w-64">
            <nav className="space-y-4">
              {menuItems.map((item, idx) => (
                <div key={idx} className={item.sub ? "pl-6" : ""}>
                  {item.href ? (
                    <Link
                      href={item.href}
                      className={`block py-1 transition-colors ${
                        item.active ? "text-primary" : " hover:text-foreground"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span
                      className={`block py-1 ${
                        item.active && !item.sub ? "font-medium" : item.active ? "text-primary" : ""
                      }`}
                    >
                      {item.label}
                    </span>
                  )}
                </div>
              ))}
              <button onClick={handleLogout} className="text-primary hover:text-primary-hover transition-colors">
                Logout
              </button>
            </nav>
          </aside>

          {/* Profile Form */}
          <div className="flex-1">
            <div className="bg-background shadow-lg rounded p-8 max-w-3xl">
              <h2 className="text-xl font-medium text-primary mb-6">Edit Your Profile</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm mb-2">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full bg-secondary rounded px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full bg-secondary rounded px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-secondary rounded px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Kingston, 5236, United State"
                      className="w-full bg-secondary rounded px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Password Changes</h3>
                  <input
                    type="password"
                    name="currentPassword"
                    placeholder="Current Password"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    className="w-full bg-secondary rounded px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
                  />
                  <input
                    type="password"
                    name="newPassword"
                    placeholder="New Password"
                    value={formData.newPassword}
                    onChange={handleChange}
                    className="w-full bg-secondary rounded px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
                  />
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm New Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full bg-secondary rounded px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-8 py-3 rounded font-medium hover:bg-secondary transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-primary text-background px-8 py-3 rounded font-medium hover:bg-primary-hover transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}