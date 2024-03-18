/* eslint-disable react/no-array-index-key */

'use client'

import PortFolioItem from '@/components/portfolio/PortfolioItem'
import { PortfolioItem } from '@/types'
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
