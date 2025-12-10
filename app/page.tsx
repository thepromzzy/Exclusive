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

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <span className="mb-20 block border-border"/>
        <FlashSales />
        <span className="mb-20 block border-border"/>
        <Categories />
        <span className="mb-20 block border-border"/>
        <BestSelling />
        <PromoBanner />
        <span className="mb-20 block border-border"/>
        <ExploreProducts />
         <span className="mb-20 block border-border"/>
        <NewArrival />
        <span className="mb-20 block border-border"/>
        <Services />
        <span className="mb-20 block border-border"/>
      </main>
      <Footer />
    </>
  )
}
