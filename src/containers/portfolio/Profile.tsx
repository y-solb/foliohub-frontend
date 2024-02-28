import Image from 'next/image'
import { UserData } from '@/types'
import { GoSmiley } from 'react-icons/go'

interface ProfileProps {
  portfolio: UserData
}

function Profile({ portfolio }: ProfileProps) {
  return (
    <div className="flex flex-col gap-8 px-8 py-16 w-80">
      <div className="relative flex w-48 h-48">
        {portfolio.thumbnail ? (
          <Image
            src={portfolio.thumbnail}
            alt="프로필 이미지"
            width={192}
            height={192}
            priority
            className="rounded-full border border-solid border-gray-100 shadow-md bg-white w-full h-full"
          />
        ) : (
          <div className="relative rounded-full border border-solid border-gray-100 shadow-md bg-gray-200 w-full h-full">
            <GoSmiley
              color="white"
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-36 h-36"
            />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-4">
        <h1 className="break-all">{portfolio.displayName}</h1>
        <h3 className="text-gray-500 break-all">{portfolio.shortBio}</h3>
      </div>
    </div>
  )
}

export default Profile
