import uploadImage from '@/lib/uploadImage'
import { SocialLinks, UserData } from '@/types'
import { useRef } from 'react'
import Image from 'next/image'
import {
  FaInstagram,
  FaFacebook,
  FaGithub,
  FaXTwitter,
  FaLinkedin,
} from 'react-icons/fa6'
import { AiOutlineGlobal } from 'react-icons/ai'
import { TbCamera } from 'react-icons/tb'
import EmptyThumbnail from '@/components/EmptyThumbnail'

interface ProfileEditorProps {
  portfolio: UserData
  socialLinks: SocialLinks
  displayNameRef: React.RefObject<HTMLHeadingElement>
  shortBioRef: React.RefObject<HTMLHeadingElement>
  onProfileChange: (name: string, value: string) => void
  onSocialLinkChange: (name: string, value: string) => void
}

function ProfileEditor({
  portfolio,
  socialLinks,
  displayNameRef,
  shortBioRef,
  onProfileChange,
  onSocialLinkChange,
}: ProfileEditorProps) {
  const imageRef = useRef<HTMLInputElement | null>(null)

  const handleClickInputRef = () => {
    if (!imageRef.current) {
      return
    }
    imageRef.current.click()
  }

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageUrl = await uploadImage(e.target.files, 'thumbnail')
    onProfileChange('thumbnail', imageUrl)
  }

  const handleSocialLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSocialLinkChange(e.target.name, e.target.value)
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLElement>) => {
    e.preventDefault()
    const clipboardData = e.clipboardData || window.Clipboard
    const pastedText = clipboardData.getData('text/plain')
    const selection = window.getSelection()
    if (selection) {
      const range = selection.getRangeAt(0)
      range.deleteContents()
      range.insertNode(document.createTextNode(pastedText))

      // 붙여 넣은 텍스트 위치로 포커스 이동
      const newRange = document.createRange()
      const newNode = range.endContainer.childNodes[range.endOffset - 1]
      newRange.setStart(newNode, pastedText.length)
      newRange.setEnd(newNode, pastedText.length)
      selection.removeAllRanges()
      selection.addRange(newRange)
    }
  }

  return (
    <div className="flex flex-col justify-between md:w-80 h-full md:fixed md:top-0 md:left-0 px-8 pt-16 pb-8 overflow-y-scroll">
      <div className="flex flex-col gap-8">
        <div className="flex justify-center w-full">
          <button
            type="button"
            aria-label="change-thumbnail"
            className="relative flex w-48 h-48"
            onClick={handleClickInputRef}
          >
            {portfolio.thumbnail ? (
              <Image
                src={portfolio.thumbnail}
                alt="프로필 이미지"
                width={192}
                height={192}
                priority
                className="rounded-full border border-solid border-gray-100 bg-white w-full h-full object-fit"
              />
            ) : (
              <EmptyThumbnail />
            )}
            <div className="absolute bottom-0 right-4 rounded-full border border-solid border-gray-100 shadow-md bg-white p-2">
              <TbCamera size={24} />
            </div>
          </button>
          <input
            type="file"
            accept="image/*"
            ref={imageRef}
            className="hidden"
            onChange={handleUploadImage}
          />
        </div>
        <div className="flex flex-col gap-4">
          <h1
            data-placeholder="이름을 입력해주세요."
            ref={displayNameRef}
            className="break-all"
            contentEditable="true"
            onPaste={handlePaste}
            suppressContentEditableWarning
            dangerouslySetInnerHTML={{ __html: portfolio.displayName }}
          />
          <p
            id="shortBio"
            data-placeholder="간단한 소개글을 작성해주세요."
            ref={shortBioRef}
            className="subtitle1 text-gray-400 break-all"
            contentEditable="true"
            onPaste={handlePaste}
            suppressContentEditableWarning
            dangerouslySetInnerHTML={{ __html: portfolio.shortBio }}
          />
        </div>
      </div>
      <ul className="w-full flex flex-col gap-4 mt-4">
        <li className="flex gap-2">
          <AiOutlineGlobal size={24} />
          <input
            type="text"
            name="blogLink"
            id="blogLink"
            value={socialLinks.blogLink || ''}
            className="body2 w-full"
            placeholder="개인 링크 또는 블로그"
            onChange={handleSocialLinkChange}
          />
        </li>
        <li className="flex gap-2">
          <FaInstagram size={24} />
          <input
            type="text"
            name="instagramLink"
            id="instagramLink"
            value={socialLinks.instagramLink || ''}
            className="body2 w-full"
            placeholder="인스타그램"
            onChange={handleSocialLinkChange}
          />
        </li>
        <li className="flex gap-2">
          <FaFacebook size={24} />
          <input
            type="text"
            name="facebookLink"
            id="facebookLink"
            value={socialLinks.facebookLink || ''}
            className="body2 w-full"
            placeholder="페이스북"
            onChange={handleSocialLinkChange}
          />
        </li>
        <li className="flex gap-2">
          <FaGithub size={24} />
          <input
            type="text"
            name="githubLink"
            id="githubLink"
            value={socialLinks.githubLink || ''}
            className="body2 w-full"
            placeholder="깃허브"
            onChange={handleSocialLinkChange}
          />
        </li>
        <li className="flex gap-2">
          <FaXTwitter size={24} />
          <input
            type="text"
            name="twitterLink"
            id="twitterLink"
            value={socialLinks.twitterLink || ''}
            className="body2 w-full"
            placeholder="트위터"
            onChange={handleSocialLinkChange}
          />
        </li>
        <li className="flex gap-2">
          <FaLinkedin size={24} />
          <input
            type="text"
            name="linkedinLink"
            id="linkedinLink"
            value={socialLinks.linkedinLink || ''}
            className="body2 w-full"
            placeholder="링크드인"
            onChange={handleSocialLinkChange}
          />
        </li>
      </ul>
    </div>
  )
}

export default ProfileEditor
