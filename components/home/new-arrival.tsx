import Link from "next/link"
import SectionHeader from "@/components/ui/section-header"

export default function NewArrival() {
  return (
    <section className="container py-16">
      <SectionHeader label="Featured" title="New Arrival" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* PlayStation 5 - Large Card */}
        <div className="bg-foreground rounded overflow-hidden relative min-h-[600px] flex items-end p-8">
          <img
            src="/ps5-slim-goedkope-playstation_large 1.png?height=500&width=500"
            alt="PlayStation 5"
            className="absolute inset-0 w-full h-full object-contain p-8"
          />
          <div className="relative z-10 text-background">
            <h3 className="text-2xl font-semibold mb-2">PlayStation 5</h3>
            <p className="mb-4 max-w-xs">
              Black and White version of the PS5 coming out on sale.
            </p>
            <Link
              href="/products"
              className="inline-block border-b border-background pb-1 hover:text-primary hover:border-primary transition-colors"
            >
              Shop Now
            </Link>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-6">
          {/* Women's Collection */}
          <div className="bg-[#0D0D0D] rounded overflow-hidden relative min-h-[284px] flex items-end p-8">
            <img
              src="/attractive-woman-wearing-hat-posing-black-background 1.png?height=300&width=400"
              alt="Women's Collection"
              className="absolute right-0 bottom-0 h-full object-contain"
            />
            <div className="relative z-10 text-background">
              <h3 className="text-2xl font-semibold mb-2">Women's Collections</h3>
              <p className="mb-4 max-w-xs">
                Featured woman collections that give you another vibe.
              </p>
              <Link
                href="/products"
                className="inline-block border-b border-background pb-1 hover:text-primary hover:border-primary transition-colors"
              >
                Shop Now
              </Link>
            </div>
          </div>

          {/* Bottom Two Cards */}
          <div className="grid grid-cols-2 gap-6">
            {/* Speakers */}
            <div className="bg-[#0D0D0D] rounded overflow-hidden relative min-h-[284px] flex items-end p-6">
              <img
                src="/Amazon-wireless-speakers.png?height=200&width=200"
                alt="Speakers"
                className="absolute inset-0 w-full h-full object-contain p-4"
              />
              <div className="relative z-10 text-background">
                <h3 className="text-xl font-semibold mb-2">Speakers</h3>
                <p className="text-sm mb-3">Amazon wireless speakers</p>
                <Link
                  href="/products"
                  className="inline-block border-b border-background pb-1 text-sm hover:text-primary hover:border-primary transition-colors"
                >
                  Shop Now
                </Link>
              </div>
            </div>

            {/* Perfume */}
            <div className="bg-[#0D0D0D] rounded overflow-hidden relative min-h-[284px] flex items-end p-6">
              <img
                src="/Gucci-perfume.png?height=200&width=200"
                alt="Perfume"
                className="absolute inset-0 w-full h-full object-contain p-4"
              />
              <div className="relative z-10 text-background">
                <h3 className="text-xl font-semibold mb-2">Perfume</h3>
                <p className="text-sm mb-3">GUCCI INTENSE OUD EDP</p>
                <Link
                  href="/products"
                  className="inline-block border-b border-background pb-1 text-sm hover:text-primary hover:border-primary transition-colors"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
