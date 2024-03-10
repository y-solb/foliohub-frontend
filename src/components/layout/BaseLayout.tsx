import Header from '@/components/Header'

interface BaseLayoutProps {
  children: React.ReactNode
}

function BaseLayout({ children }: BaseLayoutProps) {
  return (
    <div className="max-w-[1800px] m-auto">
      <Header />
      {children}
    </div>
  )
}

export default BaseLayout
