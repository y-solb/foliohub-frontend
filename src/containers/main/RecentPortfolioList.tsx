'use client'

import PortfolioItem from '@/components/portfolio/PortfolioItem'
import PortfolioItemSkeleton from '@/components/portfolio/PortfolioItemSkeleton'
import { useInfinitePortfolioQuery } from '@/hooks/queries/portfolio'
import useInfiniteScroll from '@/hooks/useInfiniteScroll'
import { Fragment, useRef } from 'react'

function RecentPortfolioList() {
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfinitePortfolioQuery()

  const fetchMorePortfolio = () => {
    if (!isFetchingNextPage && hasNextPage) {
      fetchNextPage()
    }
  }
  const loaderRef = useRef<HTMLDivElement>(null)

  useInfiniteScroll(loaderRef, fetchMorePortfolio)

  return (
    <>
      <ul className="grid gap-6 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 lg:px-20 px-10">
        {data?.pages.map((page, index) => (
          <Fragment key={index}>
            {page.data.map((portfolio) => (
              <PortfolioItem key={portfolio.id} portfolio={portfolio} />
            ))}
          </Fragment>
        ))}
        {typeof window !== 'undefined' &&
          isFetchingNextPage &&
          Array(12)
            .fill(0)
            .map((_, index) => <PortfolioItemSkeleton key={index} />)}
      </ul>
      <div ref={loaderRef} className="h-8" />
    </>
  )
}

export default RecentPortfolioList
