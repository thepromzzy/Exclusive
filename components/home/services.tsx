import { Truck, Headphones, ShieldCheck } from "lucide-react"

const services = [
  {
    icon: Truck,
    title: "FREE AND FAST DELIVERY",
    description: "Free delivery for all orders over $140",
  },
  {
    icon: Headphones,
    title: "24/7 CUSTOMER SERVICE",
    description: "Friendly 24/7 customer support",
  },
  {
    icon: ShieldCheck,
    title: "MONEY BACK GUARANTEE",
    description: "We return money within 30 days",
  },
]

export default function Services() {
  return (
    <section className="container py-20">
      <div className="flex flex-col md:flex-row items-center justify-center gap-20">
        {services.map((service) => (
          <div key={service.title} className="flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6">
              <div className="w-14 h-14 rounded-full bg-foreground flex items-center justify-center">
                <service.icon className="w-8 h-8 text-background" />
              </div>
            </div>
            <h3 className="font-bold text-lg mb-2">{service.title}</h3>
            <p className="text-sm">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
