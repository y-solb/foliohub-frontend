'use client'

import BaseLayout from '@/components/layout/BaseLayout'
import { useInfinitePortfolioQuery } from '@/hooks/queries/portfolio'
import useInfiniteScroll from '@/hooks/useInfiniteScroll'
import Link from 'next/link'
import { useMemo, useRef } from 'react'
import Image from 'next/image'
import { IoMdHeart } from 'react-icons/io'

export default function Home() {
  const loaderRef = useRef<HTMLDivElement>(null)
  const { data, isLoading, fetchNextPage, isFetching, hasNextPage } =
    useInfinitePortfolioQuery()
  const portfolios = useMemo(() => {
    return [...(data?.pages?.flatMap((page) => page.data) || [])]
  }, [data])

  const fetchMorePortfolio = () => {
    if (!isFetching && hasNextPage) {
      fetchNextPage()
    }
  }

  useInfiniteScroll(loaderRef, fetchMorePortfolio)

  if (isLoading || !data) return null

  return (
    <BaseLayout>
      <div className="px-8">
        <ul className="grid gap-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
          {portfolios.map((portfolio) => (
            <li key={portfolio.id} className="grid-item-wrapper h-82">
              <Link
                href={`/${portfolio.userId}`}
                className="relative flex flex-col items-center px-10 py-8 w-full h-full"
              >
                <div className="relative flex w-32 h-32 rounded-full border border-solid border-gray-100 shadow-md overflow-hidden">
                  {portfolio.thumbnail && (
                    <Image
                      src={portfolio.thumbnail}
                      alt={`image_${portfolio.id}`}
                      priority
                      fill
                    />
                  )}
                </div>
                <div className="flex flex-col items-center mt-4 gap-2">
                  <h2>{portfolio.displayName}</h2>
                  <p className="body2 text-gray-400 ellipsis2">
                    {portfolio.shortBio}
                  </p>
                </div>
                <div className="flex items-center h-8 px-4 rounded-3xl text-gray-400 border border-solid border-gray-200 body2 font-medium mt-6">
                  {portfolio.userJob}
                </div>
                <div className="absolute bottom-3 right-6 flex gap-1 items-center justify-end">
                  <IoMdHeart size={16} className="text-gray-300" />
                  <span className="text-gray-300 body2">
                    {portfolio.likeCount}
                  </span>
                </div>
              </Link>
            </li>
          ))}
          {isFetching && (
            <p>무한스크롤 추가로 데이터 가져오는 스켈레톤 UI 추가</p>
          )}
        </ul>
        <div ref={loaderRef}>로딩중</div>
      </div>
    </BaseLayout>
  )
}
