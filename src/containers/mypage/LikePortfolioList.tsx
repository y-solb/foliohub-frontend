'use client'

import PortfolioList from '@/components/portfolio/PortfolioList'
import { useInfiniteLikePortfolioQuery } from '@/hooks/queries/portfolio'
import useInfiniteScroll from '@/hooks/useInfiniteScroll'
import { useMemo, useRef } from 'react'

function LikePortfolioList() {
  const { data, fetchNextPage, isFetching, hasNextPage } =
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

  return (
    <PortfolioList
      // isLoading={isLoading}
      // isFetching={isFetching}
      loaderRef={loaderRef}
      portfolios={portfolios}
    />
  )
}

export default LikePortfolioList
