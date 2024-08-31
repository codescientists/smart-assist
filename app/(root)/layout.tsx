import Footer from "@/components/shared/Footer"
import Header from "@/components/shared/Header"

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <>
        <Header />
        <section>{children}</section>
        <Footer />
      </>
  )
}
