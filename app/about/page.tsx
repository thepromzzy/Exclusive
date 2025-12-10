import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import CustomBreadcrumb from "@/components/ui/custom-breadcrumb"
import Services from "@/components/home/services"
import { Store, DollarSign, ShoppingBag, Coins, Twitter, Instagram, Linkedin } from "lucide-react"

const stats = [
  { icon: Store, value: "10.5k", label: "Sellers active our site" },
  { icon: DollarSign, value: "33k", label: "Monthly Product Sale", highlight: true },
  { icon: ShoppingBag, value: "45.5k", label: "Customer active in our site" },
  { icon: Coins, value: "25k", label: "Annual gross sale in our site" },
]

const team = [
  {
    name: "Tom Cruise",
    role: "Founder & Chairman",
    image: "/Tom-Cruise.png?height=400&width=350",
  },
  {
    name: "Emma Watson",
    role: "Managing Director",
    image: "/Emma-Watson.png?height=400&width=350",
  },
  {
    name: "Will Smith",
    role: "Product Designer",
    image: "/Will-Smith.png?height=400&width=350",
  },
]

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <div className="container">
          <CustomBreadcrumb items={[{ label: "Home", href: "/" }, { label: "About" }]} />
        </div>
     
        {/* Our Story */}
        <section className="container py-16">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 max-w-xl">
              <h1 className="text-4xl md:text-5xl font-semibold mb-8">Our Story</h1>
              <p className=" mb-6 leading-relaxed">
                Launched in 2015, Exclusive is South Asia's premier online shopping marketplace with an active presence
                in Bangladesh. Supported by wide range of tailored marketing, data and service solutions, Exclusive has
                10,500 sellers and 300 brands and serves 3 millions customers across the region.
              </p>
              <p className="leading-relaxed">
                Exclusive has more than 1 Million products to offer, growing at a very fast pace. Exclusive offers a
                diverse assortment in categories ranging from consumer.
              </p>
            </div>
            <div className="flex-1">
              <img src="/Side Image.png?height=500&width=600" alt="About Exclusive" className="w-full rounded" />
            </div>
          </div>
        </section>

        <span className="mb-20 block border-border"/>

        {/* Stats */}
        <section className="container py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className={`border rounded p-8 text-center transition-colors ${
                  stat.highlight
                    ? "bg-primary text-background border-primary"
                    : "border-border hover:bg-primary hover:text-background hover:border-primary"
                } group`}
              >
                <div
                  className={`w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center ${
                    stat.highlight ? "bg-background/20" : "bg-muted group-hover:bg-background/20"
                  }`}
                >
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center ${
                      stat.highlight
                        ? "bg-background text-foreground"
                        : "bg-foreground text-background group-hover:bg-background group-hover:text-foreground"
                    }`}
                  >
                    <stat.icon className="w-8 h-8" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold mb-2">{stat.value}</h3>
                <p
                  className={`text-sm ${stat.highlight ? "text-background/80" : "group-hover:text-background/80"}`}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        <span className="mb-20 block border-border"/>


        {/* Team */}
        <section className="container py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, idx) => (
              <div key={idx} className="text-center">
                <div className="bg-secondary rounded overflow-hidden mb-6">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-[400px] object-cover object-top"
                  />
                </div>
                <h3 className="text-2xl font-medium mb-1">{member.name}</h3>
                <p className="mb-4">{member.role}</p>
                <div className="flex justify-center gap-4">
                  <a href="#" className="hover:text-primary transition-colors">
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a href="#" className="hover:text-primary transition-colors">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="#" className="hover:text-primary transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-10">
            {[0, 1, 2, 3, 4].map((dot, idx) => (
              <button
                key={dot}
                className={`w-3 h-3 rounded-full transition-colors ${
                  idx === 2 ? "bg-primary ring-2 ring-primary ring-offset-2" : "bg-muted hover:bg-foreground"
                }`}
              />
            ))}
          </div>
        </section>
        <span className="mb-20 block border-border"/>


        {/* Services */}
        <Services />
        <span className="mb-20 block border-border"/>
      </main>
      <Footer />
    </>
  )
}
