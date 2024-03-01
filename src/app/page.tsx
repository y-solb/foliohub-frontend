'use client'

import Header from '@/components/Header'
import BaseLayout from '@/components/layout/BaseLayout'
import { useInfinitePortfolioQuery } from '@/hooks/queries/portfolio'
import { useMemo } from 'react'

export default function Home() {
  const { data, isLoading, fetchNextPage, hasNextPage } =
    useInfinitePortfolioQuery()
  const portfolios = useMemo(() => {
    return [...(data?.pages?.flatMap((page) => page.data) || [])]
  }, [data])

  if (isLoading || !data) return null

  return (
    <div>
      <Header />
      <BaseLayout />
      <ul>
        {portfolios.map((portfolio) => (
          <li key={portfolio.id}>
            <p>{portfolio.displayName}</p>
            <p>{portfolio.shortBio}</p>
            <p>{portfolio.userId}</p>
            <p>{portfolio.thumbnail}</p>
          </li>
        ))}
      </ul>
      {hasNextPage && (
        <button type="button" onClick={fetchNextPage}>
          더보기
        </button>
      )}
    </div>
  )
}
