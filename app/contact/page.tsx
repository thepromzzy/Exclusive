"use client"

import type React from "react"
import { useState } from "react"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import CustomBreadcrumb from "@/components/ui/custom-breadcrumb"
import { Phone, Mail } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Message sent successfully! We will get back to you soon.")
    setFormData({ name: "", email: "", phone: "", message: "" })
  }

  return (
    <>
      <Header />
      <main className="container">
        <CustomBreadcrumb items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />

        <div className="flex flex-col lg:flex-row gap-8 py-16">
          {/* Contact Info */}
          <div className="lg:w-[340px] bg-background shadow-lg rounded p-8">
            {/* Call To Us */}
            <div className="mb-8 pb-8 border-b border-border">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                  <Phone className="w-5 h-5 text-background" />
                </div>
                <h3 className="font-medium">Call To Us</h3>
              </div>
              <p className="text-sm mb-3">We are available 24/7, 7 days a week.</p>
              <p className="text-sm">Phone: +8801611112222</p>
            </div>

            {/* Write To Us */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                  <Mail className="w-5 h-5 text-background" />
                </div>
                <h3 className="font-medium">Write To Us</h3>
              </div>
              <p className="text-sm mb-3">Fill out our form and we will contact you within 24 hours.</p>
              <p className="text-sm mb-1">Emails: customer@exclusive.com</p>
              <p className="text-sm">Emails: support@exclusive.com</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="flex-1 bg-background shadow-lg rounded p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name *"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-secondary rounded px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email *"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-secondary rounded px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Your Phone *"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="bg-secondary rounded px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                rows={8}
                className="w-full bg-secondary rounded px-4 py-3 outline-none focus:ring-2 focus:ring-primary resize-none"
              />

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-primary text-background px-12 py-4 rounded font-medium hover:bg-primary-hover transition-colors"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
