import Header from '@/components/Header'

interface BaseLayoutProps {
  children: React.ReactNode
}

function BaseLayout({ children }: BaseLayoutProps) {
  return (
    <div>
      <Header />
      {children}
    </div>
  )
}

export default BaseLayout
