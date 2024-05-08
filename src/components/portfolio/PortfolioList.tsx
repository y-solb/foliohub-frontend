/* eslint-disable react/no-array-index-key */

import PortfolioItem from '@/components/portfolio/PortfolioItem'
import { PortfolioItemType } from '@/types'
import PortfolioItemSkeleton from './PortfolioItemSkeleton'

interface PortfolioListProps {
  isLoading: boolean
  isFetching: boolean
  portfolios: PortfolioItemType[]
  loaderRef: React.RefObject<HTMLDivElement>
}

function PortfolioList({
  isLoading,
  isFetching,
  portfolios,
  loaderRef,
}: PortfolioListProps) {
  if (isLoading)
    return (
      <ul className="grid gap-6 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 lg:px-20 px-10">
        {Array(12)
          .fill(0)
          .map((_, index) => (
            <PortfolioItemSkeleton key={index} />
          ))}
      </ul>
    )

  return (
    <>
      <ul className="grid gap-6 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 lg:px-20 px-10">
        {portfolios?.map((portfolio) => (
          <PortfolioItem key={portfolio.id} portfolio={portfolio} />
        ))}
        {isFetching &&
          Array(12)
            .fill(0)
            .map((_, index) => <PortfolioItemSkeleton key={index} />)}
      </ul>
      <div ref={loaderRef} className="h-8" />
    </>
  )
}

export default PortfolioList
