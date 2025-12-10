import Link from "next/link"

export default function PromoBanner() {
  return (
    <section className="container py-16">
      <div className="bg-foreground rounded overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between p-8 md:p-16">
          <div className="text-background z-10 max-w-lg">
            <span className="text-accent font-semibold">Categories</span>
            <h2 className="text-3xl md:text-5xl font-semibold leading-tight mt-4 mb-8">
              Enhance Your Music Experience
            </h2>

            {/* Timer */}
            <div className="flex gap-4 mb-8">
              {[
                { label: "Hours", value: "23" },
                { label: "Days", value: "05" },
                { label: "Minutes", value: "59" },
                { label: "Seconds", value: "35" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="w-16 h-16 bg-background text-foreground rounded-full flex flex-col items-center justify-center"
                >
                  <span className="text-lg font-bold">{item.value}</span>
                  <span className="text-[10px]">{item.label}</span>
                </div>
              ))}
            </div>

            <Link
              href="/products"
              className="inline-block bg-accent text-foreground px-8 py-3 rounded font-medium hover:bg-accent/80 transition-colors"
            >
              Buy Now!
            </Link>
          </div>

          <div className="mt-8 md:mt-0">
            <img
              src="/Jbl.png?height=400&width=500"
              alt="JBL Speaker"
              className="max-w-[300px] md:max-w-[400px] object-contain drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
