/* eslint-disable @next/next/no-img-element */
import uploadImage from '@/lib/uploadImage'
import { UserData } from '@/types'
import { useRef } from 'react'
import { IoCamera } from 'react-icons/io5'
import { GoSmiley } from 'react-icons/go'

interface ProfileProps {
  portfolio: UserData
  displayNameRef: React.RefObject<HTMLHeadingElement>
  shortBioRef: React.RefObject<HTMLHeadingElement>
  onProfileChange: (
    name: 'displayName' | 'shortBio' | 'thumbnail',
    value: string,
  ) => void
}

function Profile({
  portfolio,
  displayNameRef,
  shortBioRef,
  onProfileChange,
}: ProfileProps) {
  const imageRef = useRef<HTMLInputElement | null>(null)

  const handleClickInputRef = () => {
    if (!imageRef.current) {
      return
    }
    imageRef.current.click()
  }

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const file = e.target.files[0]

    if (file) {
      const imageUrl = await uploadImage(file)
      onProfileChange('thumbnail', imageUrl)
    }
  }

  return (
    <div className="flex flex-col gap-8 px-8 py-16 w-80">
      <button
        type="button"
        aria-label="change-thumbnail"
        className="relative flex w-48 h-48"
        onClick={handleClickInputRef}
      >
        {portfolio.thumbnail ? (
          <img
            className="rounded-full border border-solid border-gray-100 shadow-md bg-white w-full h-full"
            src={portfolio.thumbnail}
            alt="프로필 이미지"
          />
        ) : (
          <div className="relative rounded-full border border-solid border-gray-100 shadow-md bg-gray-200 w-full h-full">
            <GoSmiley
              color="white"
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-36 h-36"
            />
          </div>
        )}
        <div className="absolute bottom-0 right-4 rounded-full border border-solid border-gray-100 shadow-md bg-white p-2">
          <IoCamera size={24} />
        </div>
      </button>
      <input
        type="file"
        accept="image/*"
        ref={imageRef}
        className="hidden"
        onChange={handleUploadImage}
      />
      <div className="flex flex-col gap-4">
        <h1
          data-placeholder="이름을 입력해주세요."
          ref={displayNameRef}
          className="break-all"
          contentEditable="true"
          suppressContentEditableWarning
        >
          {portfolio.displayName}
        </h1>
        <h3
          data-placeholder="간단한 소개글을 작성해주세요."
          ref={shortBioRef}
          className="text-gray-500 break-all"
          contentEditable="true"
          suppressContentEditableWarning
        >
          {portfolio.shortBio}
        </h3>
      </div>
    </div>
  )
}

export default Profile
