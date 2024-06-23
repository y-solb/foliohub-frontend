'use client'

import { PortfolioItemType } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import { IoMdHeart } from 'react-icons/io'
import { removeTagsText } from '@/lib/utils'
import EmptyThumbnail from '@/components/common/EmptyThumbnail'

interface PortfolioItemProps {
  portfolio: PortfolioItemType
}

function PortfolioItem({
  portfolio: {
    id,
    username,
    userJob,
    thumbnail,
    displayName,
    shortBio,
    likeCount,
  },
}: PortfolioItemProps) {
  return (
    <li className="grid-item-wrapper">
      <Link
        href={`/${username}`}
        className="relative flex flex-col items-center px-10 py-8 w-full md:h-[344px] h-[301px]"
      >
        <div className="relative flex w-32 h-32 rounded-full border border-solid border-gray-100 shadow-md overflow-hidden">
          {thumbnail ? (
            <Image
              src={thumbnail}
              className="object-cover"
              alt={`image_${id}`}
              width={132}
              height={132}
              quality={100}
            />
          ) : (
            <EmptyThumbnail />
          )}
        </div>
        <div className="w-full flex flex-col items-center mt-4 gap-2 h-20">
          <h2 className="ellipsis1">{removeTagsText(displayName)}</h2>
          <p className="body2 text-gray-400 ellipsis2">
            {shortBio && removeTagsText(shortBio)}
          </p>
        </div>
        {userJob && (
          <div className="flex items-center min-h-8 px-4 rounded-3xl text-gray-400 border border-solid border-gray-200 body2 font-medium mt-6">
            {userJob}
          </div>
        )}
        <div className="absolute bottom-3 right-6 flex gap-1 items-center justify-end">
          <IoMdHeart size={16} className="text-gray-300" />
          <span className="text-gray-300 body2">{likeCount}</span>
        </div>
      </Link>
    </li>
  )
}

export default PortfolioItem
