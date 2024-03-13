interface PortfolioWrapperProps {
  children: React.ReactNode
}

function PortfolioWrapper({ children }: PortfolioWrapperProps) {
  return (
    <div className="flex justify-center">
      <div className="relative flex w-full max-w-[100rem] md:flex-row flex-col">
        {children}
      </div>
    </div>
  )
}

export default PortfolioWrapper
