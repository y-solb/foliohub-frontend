import Image from 'next/image'
import { GoSmiley } from 'react-icons/go'
import { IoMdHeartEmpty, IoMdHeart } from 'react-icons/io'
import {
  Portfolio,
  useLikePorfolioMutation,
  useUnlikePorfolioMutation,
} from '@/hooks/queries/portfolio'
import { useQueryClient } from '@tanstack/react-query'
import {
  FaInstagram,
  FaFacebook,
  FaGithub,
  FaXTwitter,
  FaLinkedin,
} from 'react-icons/fa6'
import { AiOutlineGlobal } from 'react-icons/ai'
import Link from 'next/link'

interface ProfileProps {
  portfolio: Portfolio
}

function Profile({
  portfolio: {
    id,
    thumbnail,
    displayName,
    shortBio,
    username,
    isLike,
    likeCount,
    socialLink,
  },
}: ProfileProps) {
  const queryClient = useQueryClient()
  const { mutate: like } = useLikePorfolioMutation({
    onMutate() {
      queryClient.cancelQueries({
        queryKey: ['portfolio', username],
      })

      const prevPortfolio = queryClient.getQueryData<Portfolio>([
        'portfolio',
        username,
      ])
      if (!prevPortfolio) return

      queryClient.setQueryData<Portfolio>(['portfolio', username], {
        ...prevPortfolio,
        isLike: true,
        likeCount: prevPortfolio.likeCount + 1,
      })
    },
    onError: () => {
      const prevPortfolio = queryClient.getQueryData<Portfolio>([
        'portfolio',
        username,
      ])
      if (!prevPortfolio) return
      queryClient.setQueryData(['portfolio', username], prevPortfolio)
    },
  })
  const { mutate: unlike } = useUnlikePorfolioMutation({
    onMutate() {
      queryClient.cancelQueries({
        queryKey: ['portfolio', username],
      })

      const prevPortfolio = queryClient.getQueryData<Portfolio>([
        'portfolio',
        username,
      ])
      if (!prevPortfolio) return

      queryClient.setQueryData<Portfolio>(['portfolio', username], {
        ...prevPortfolio,
        isLike: false,
        likeCount: prevPortfolio.likeCount - 1,
      })
    },
    onError: () => {
      const prevPortfolio = queryClient.getQueryData<Portfolio>([
        'portfolio',
        username,
      ])
      if (!prevPortfolio) return
      queryClient.setQueryData(['portfolio', username], prevPortfolio)
    },
  })

  const handleLike = () => {
    if (isLike) {
      unlike({
        portfolioId: id,
      })
    } else {
      like({
        portfolioId: id,
      })
    }
  }

  return (
    <div className="flex flex-col justify-between md:w-80 h-full md:fixed md:top-0 md:left-0 px-8 py-16 overflow-y-scroll">
      <div className="flex flex-col gap-8">
        <div className="flex justify-center w-full">
          <div className="relative flex w-48 h-48">
            {thumbnail ? (
              <Image
                src={thumbnail}
                alt="프로필 이미지"
                width={192}
                height={192}
                priority
                className="rounded-full border border-solid border-gray-100 bg-white w-full h-full"
              />
            ) : (
              <div className="relative rounded-full border border-solid border-gray-100 bg-gray-200 w-full h-full">
                <GoSmiley
                  color="white"
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-36 h-36"
                />
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="break-all">{displayName}</h1>
          <p className="subtitle1 text-gray-400 break-all">{shortBio}</p>
        </div>
      </div>
      <div className="w-full flex flex-col gap-4 mt-4">
        <ul className="w-full flex gap-4">
          {socialLink.blogLink && (
            <Link
              href={socialLink.blogLink}
              className="rounded-full border border-gray-200 p-2"
              aria-label="blogLink"
              target="_blank"
            >
              <AiOutlineGlobal size={24} />
            </Link>
          )}
          {socialLink.instagramLink && (
            <Link
              href={socialLink.instagramLink}
              className="rounded-full border border-gray-200 p-2"
              aria-label="instagramLink"
              target="_blank"
            >
              <FaInstagram size={24} />
            </Link>
          )}
          {socialLink.facebookLink && (
            <Link
              href={socialLink.facebookLink}
              className="rounded-full border border-gray-200 p-2"
              aria-label="facebookLink"
              target="_blank"
            >
              <FaFacebook size={24} />
            </Link>
          )}
          {socialLink.githubLink && (
            <Link
              href={socialLink.githubLink}
              className="rounded-full border border-gray-200 p-2"
              aria-label="githubLink"
              target="_blank"
            >
              <FaGithub size={24} />
            </Link>
          )}
          {socialLink.twitterLink && (
            <Link
              href={socialLink.twitterLink}
              className="rounded-full border border-gray-200 p-2"
              aria-label="twitterLink"
              target="_blank"
            >
              <FaXTwitter size={24} />
            </Link>
          )}
          {socialLink.linkedinLink && (
            <Link
              href={socialLink.linkedinLink}
              className="rounded-full border border-gray-200 p-2"
              aria-label="linkedinLink"
              target="_blank"
            >
              <FaLinkedin size={24} />
            </Link>
          )}
        </ul>
        <div className="flex gap-1 items-center justify-end">
          <button type="button" aria-label="좋아요" onClick={handleLike}>
            {isLike ? (
              <IoMdHeart size={24} color="#ef4444" />
            ) : (
              <IoMdHeartEmpty size={24} color="#6b7280" />
            )}
          </button>
          <span className="text-gray-400 body2">{likeCount}</span>
        </div>
      </div>
    </div>
  )
}

export default Profile
