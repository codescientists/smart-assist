import Footer from "@/components/shared/Footer"
import Header from "@/components/shared/Header"

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <section>
        <Header />
        <section className="min-h-screen">{children}</section>
        <Footer />
      </section>
  )
}
