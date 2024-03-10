import Header from '@/components/Header'

interface BaseLayoutProps {
  children: React.ReactNode
}

function BaseLayout({ children }: BaseLayoutProps) {
  return (
    <div className="max-w-[1800px] m-auto">
      <Header />
      <div className="pt-16">{children}</div>
    </div>
  )
}

export default BaseLayout
