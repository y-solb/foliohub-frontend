/* eslint-disable @next/next/no-img-element */

'use client'

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
        <div className="flex">
          <div className="flex flex-col gap-8 px-8 py-16 w-80">
            <img
              className="rounded-full w-48 h-48"
              src="https://pbs.twimg.com/media/FPOm-o_agAA4xXW.jpg"
              alt="프로필 이미지"
            />
            <div className="flex flex-col gap-4">
              <h1 className="break-all">{data.displayName}</h1>
              <h3 className="text-gray-500 break-all">{data.shortBio}</h3>
            </div>
          </div>
          <div />
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
