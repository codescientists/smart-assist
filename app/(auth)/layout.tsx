
export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <>
        <section className="h-screen flex flex-col items-center justify-center">{children}</section>
      </>
  )
}
