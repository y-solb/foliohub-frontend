'use client'

import AssetGridLayout from '@/containers/portfolio/AssetGridLayout'
import Profile from '@/containers/portfolio/Profile'
import { usePortfolioQuery } from '@/hooks/queries/portfolio'
import Link from 'next/link'

export default function UserPage({ params }: { params: { userId: string } }) {
  const { data, isLoading } = usePortfolioQuery(params.userId)

  if (isLoading || !data) {
    return null
  }
  return (
    <>
      <div className="flex">
        <div className="flex w-full md:flex-row flex-col">
          <Profile portfolio={data} />
          <AssetGridLayout portfolio={data} layouts={data.layout} />
        </div>
      </div>
      <Link
        href={`/edit/${params.userId}`}
        className="fixed flex items-center bottom-8 left-8 h-8 px-5 rounded-2xl border border-solid border-gray-600 text-gray-600 bg-white"
      >
        편집하기
      </Link>
    </>
  )
}
