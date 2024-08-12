import Header from "@/components/shared/Header"

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <>
        <Header />
        <section className="h-screen flex flex-col items-center justify-center">{children}</section>
      </>
  )
}
