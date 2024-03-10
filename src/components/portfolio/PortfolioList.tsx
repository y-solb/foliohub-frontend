/* eslint-disable react/no-array-index-key */

'use client'

import PortFolioItem from '@/components/portfolio/PortfolioItem'
import { useInfiniteLikePortfolioQuery } from '@/hooks/queries/portfolio'
import useInfiniteScroll from '@/hooks/useInfiniteScroll'
import { useMemo, useRef } from 'react'
import PortfolioItemSkeleton from './PortfolioItemSkeleton'

function PortFolioList() {
  const { data, fetchNextPage, isLoading, isFetching, hasNextPage } =
    useInfiniteLikePortfolioQuery()

  const portfolios = useMemo(() => {
    return [...(data?.pages?.flatMap((page) => page.data) || [])]
  }, [data])

  const fetchMorePortfolio = () => {
    if (!isFetching && hasNextPage) {
      fetchNextPage()
    }
  }
  const loaderRef = useRef<HTMLDivElement>(null)

  useInfiniteScroll(loaderRef, fetchMorePortfolio)

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
        {portfolios.map((portfolio) => (
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
