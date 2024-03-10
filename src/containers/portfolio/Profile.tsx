import Image from 'next/image'
import { UserData } from '@/types'
import { GoSmiley } from 'react-icons/go'
import { IoMdHeartEmpty, IoMdHeart } from 'react-icons/io'
import {
  Portfolio,
  useLikePorfolioMutation,
  useUnlikePorfolioMutation,
} from '@/hooks/queries/portfolio'
import { useQueryClient } from '@tanstack/react-query'

interface ProfileProps {
  portfolio: UserData
}

function Profile({ portfolio }: ProfileProps) {
  const queryClient = useQueryClient()
  const { mutate: like } = useLikePorfolioMutation({
    onMutate() {
      queryClient.cancelQueries({
        queryKey: ['portfolio', portfolio.username],
      })

      const prevPortfolio = queryClient.getQueryData<Portfolio>([
        'portfolio',
        portfolio.username,
      ])
      if (!prevPortfolio) return

      queryClient.setQueryData<Portfolio>(['portfolio', portfolio.username], {
        ...prevPortfolio,
        isLike: true,
        likeCount: prevPortfolio.likeCount + 1,
      })
    },
    onError: () => {
      const prevPortfolio = queryClient.getQueryData<Portfolio>([
        'portfolio',
        portfolio.username,
      ])
      if (!prevPortfolio) return
      queryClient.setQueryData(['portfolio', portfolio.username], prevPortfolio)
    },
  })
  const { mutate: unlike } = useUnlikePorfolioMutation({
    onMutate() {
      queryClient.cancelQueries({
        queryKey: ['portfolio', portfolio.username],
      })

      const prevPortfolio = queryClient.getQueryData<Portfolio>([
        'portfolio',
        portfolio.username,
      ])
      if (!prevPortfolio) return

      queryClient.setQueryData<Portfolio>(['portfolio', portfolio.username], {
        ...prevPortfolio,
        isLike: false,
        likeCount: prevPortfolio.likeCount - 1,
      })
    },
    onError: () => {
      const prevPortfolio = queryClient.getQueryData<Portfolio>([
        'portfolio',
        portfolio.username,
      ])
      if (!prevPortfolio) return
      queryClient.setQueryData(['portfolio', portfolio.username], prevPortfolio)
    },
  })

  const handleLike = () => {
    if (portfolio.isLike) {
      unlike({
        portfolioId: portfolio.id,
      })
    } else {
      like({
        portfolioId: portfolio.id,
      })
    }
  }

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
        <h3 className="text-gray-400 break-all">{portfolio.shortBio}</h3>
      </div>
      <div className="flex gap-1 items-center justify-end">
        <button type="button" aria-label="좋아요" onClick={handleLike}>
          {portfolio.isLike ? (
            <IoMdHeart size={24} color="#ef4444" />
          ) : (
            <IoMdHeartEmpty size={24} color="#6b7280" />
          )}
        </button>
        <span className="text-gray-400 body2">{portfolio.likeCount}</span>
      </div>
    </div>
  )
}

export default Profile
