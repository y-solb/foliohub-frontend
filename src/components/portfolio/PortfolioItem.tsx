import { PortfolioItem } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import { IoMdHeart } from 'react-icons/io'
import EmptyThumbnail from '../EmptyThumbnail'

interface PortFolioItemProps {
  portfolio: PortfolioItem
}

function PortFolioItem({
  portfolio: {
    id,
    username,
    userJob,
    thumbnail,
    displayName,
    shortBio,
    likeCount,
  },
}: PortFolioItemProps) {
  return (
    <li className="grid-item-wrapper">
      <Link
        href={`/${username}`}
        className="relative flex flex-col items-center px-10 py-8 w-full h-full"
      >
        <div className="relative flex min-w-32 min-h-32 rounded-full border border-solid border-gray-100 shadow-md overflow-hidden">
          {thumbnail ? (
            <Image src={thumbnail} alt={`image_${id}`} priority fill />
          ) : (
            <EmptyThumbnail />
          )}
        </div>
        <div className="w-full flex flex-col items-center mt-4 gap-2 h-20">
          <h2>{displayName}</h2>
          <p className="body2 text-gray-400 ellipsis2">{shortBio}</p>
        </div>
        <div className="flex items-center min-h-8 px-4 rounded-3xl text-gray-400 border border-solid border-gray-200 body2 font-medium mt-6">
          {userJob}
        </div>
        <div className="absolute bottom-3 right-6 flex gap-1 items-center justify-end">
          <IoMdHeart size={16} className="text-gray-300" />
          <span className="text-gray-300 body2">{likeCount}</span>
        </div>
      </Link>
    </li>
  )
}

export default PortFolioItem
