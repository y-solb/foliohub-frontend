'use client'

import { MdModeEdit } from 'react-icons/md'
import { useMyQuery } from '@/hooks/queries/user'
import useToggle from '@/hooks/useToggle'
import Image from 'next/image'
import EmptyThumbnail from '@/components/common/EmptyThumbnail'
import ButtonLink from '@/components/common/ButtonLink'
import JobCategoryModal from './JobCategoryModal'
import MyProfileSkeleton from './MyProfileSkeleton'

function MyProfile() {
  const { data, isLoading } = useMyQuery()
  const [isOpen, toggle] = useToggle(false)

  if (isLoading) return <MyProfileSkeleton />

  return (
    <>
      <div className="px-8 py-10">
        <div className="flex items-center justify-center">
          <div className="flex gap-8">
            <div className="relative flex w-32 h-32 rounded-full border border-solid border-gray-100 overflow-hidden">
              {data?.thumbnail ? (
                <Image
                  src={data?.thumbnail}
                  className="object-cover"
                  alt={`image_${data?.id}`}
                  width={132}
                  height={132}
                  quality={100}
                  priority
                />
              ) : (
                <EmptyThumbnail />
              )}
            </div>
            <div className="flex flex-col justify-center gap-2">
              <h1>{data?.username}</h1>
              <div className="flex items-center gap-2">
                <p className="body1 text-gray-400">
                  {data?.job ? data?.job : '직업을 선택해주세요!'}
                </p>
                <button
                  type="button"
                  aria-label="edit-job"
                  className="flex items-center justify-center rounded-full border border-solid border-gray-200 text-gray-600 bg-white p-2 w-9 h-9"
                  onClick={toggle}
                >
                  <MdModeEdit size={16} />
                </button>
              </div>
              <ButtonLink href={`${data?.username}`}>
                포트폴리오 보러가기
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
      <JobCategoryModal
        jobCode={data?.jobCode ? data?.jobCode : null}
        isOpen={isOpen}
        onClose={toggle}
      />
    </>
  )
}

export default MyProfile
