interface PortfolioLayoutProps {
  children: React.ReactNode
}

function PortfolioLayout({ children }: PortfolioLayoutProps) {
  return (
    <div className="flex justify-center">
      <div className="relative flex w-full max-w-[100rem] md:flex-row flex-col">
        {children}
      </div>
    </div>
  )
}

export default PortfolioLayout
