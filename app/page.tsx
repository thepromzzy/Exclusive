import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import HeroSection from "@/components/home/hero-section"
import FlashSales from "@/components/home/flash-sales"
import Categories from "@/components/home/categories"
import BestSelling from "@/components/home/best-selling"
import PromoBanner from "@/components/home/promo-banner"
import ExploreProducts from "@/components/home/explore-products"
import NewArrival from "@/components/home/new-arrival"
import Services from "@/components/home/services"

import CategoriesSidebar from "@/components/home/categories-sidebar"

export default function HomePage() {
  return (
    <>
      <Header />

      {/* Main Layout Container */}
      <div className="container py-6">
        {/* Mobile: Stacked | Desktop: Grid with 2 columns */}
        <div className="grid grid-cols-1 lg:grid-cols-[256px_1fr] gap-8 lg:gap-10">
          {/* Sidebar Column - Hidden on mobile, Sticky on desktop */}
          <aside className="hidden lg:block">
            <div className="sticky top-20">
              <CategoriesSidebar />
            </div>
          </aside>

          {/* Main Content Column */}
          <div className="flex flex-col gap-20 lg:gap-0">
            {/* Hero Section */}
            <HeroSection />

            {/* All other sections */}
            <div className="py-8">
              <FlashSales />
              <hr className="my-20 border-border" />
              <Categories />
              <hr className="my-20 border-border" />
              <BestSelling />
              <PromoBanner />
              <hr className="my-20 border-border" />
              <ExploreProducts />
              <hr className="my-20 border-border" />
              <NewArrival />
              <hr className="my-20 border-border" />
              <Services />
              <hr className="my-20 border-border" />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}