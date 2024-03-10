/* eslint-disable react/no-array-index-key */

'use client'

import PortFolioItem from '@/components/portfolio/PortfolioItem'
import { PortfolioItem } from '@/hooks/queries/portfolio'
import PortfolioItemSkeleton from './PortfolioItemSkeleton'

interface PortFolioListProps {
  isLoading: boolean
  isFetching: boolean
  portfolios: PortfolioItem[]
  loaderRef: React.RefObject<HTMLDivElement>
}

function PortFolioList({
  isLoading,
  isFetching,
  portfolios,
  loaderRef,
}: PortFolioListProps) {
  if (isLoading)
    return (
      <ul className="grid gap-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 px-8">
        {Array(12)
          .fill(0)
          .map((_, index) => (
            <PortfolioItemSkeleton key={index} />
          ))}
      </ul>
    )

  return (
    <>
      <ul className="grid gap-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 px-8">
        {portfolios?.map((portfolio) => (
          <PortFolioItem key={portfolio.id} portfolio={portfolio} />
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

export default PortFolioList
