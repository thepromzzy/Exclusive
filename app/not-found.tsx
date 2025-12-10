import Link from "next/link"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import CustomBreadcrumb from "@/components/ui/custom-breadcrumb"

export default function NotFoundPage() {
  return (
    <>
      <Header />
      <main className="container">
        <CustomBreadcrumb items={[{ label: "Home", href: "/" }, { label: "404 Error" }]} />

        <div className="py-32 text-center">
          <h1 className="text-7xl md:text-9xl font-medium mb-8">404 Not Found</h1>
          <p className="text-muted mb-16">Your visited page not found. You may go home page.</p>
          <Link
            href="/"
            className="inline-block bg-primary text-background px-12 py-4 rounded font-medium hover:bg-primary-hover transition-colors"
          >
            Back to home page
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
