import React, { useState } from 'react'
import { FaGithub } from 'react-icons/fa'
import { MdOutlineTitle } from 'react-icons/md'
import useOutsideClick from '@/hooks/useOutsideClick'
import { ToolType } from '@/types'
import { RxLink2 } from 'react-icons/rx'
import ImageUploadButton from '../common/ImageUploadButton'
import InputToolbar from './InputToolbar'

interface ToolbarProps {
  onAdd: (name: ToolType, value?: any) => void
}

function Toolbar({ onAdd }: ToolbarProps) {
  const [activeTab, setActive] = useState('')
  const [isOpen, setIsOpen, outRef] = useOutsideClick<HTMLDivElement>(() => {
    setActive('')
  })

  const handleActiveTab = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsOpen(true)
    setActive((e.currentTarget as HTMLButtonElement).name)
  }

  const handleAddGithubId = (inputValue: string) => {
    if (activeTab === 'github') {
      onAdd('github', { githubId: inputValue })
    } else if (activeTab === 'link') {
      onAdd('link', { link: inputValue })
    }

    setActive('')
    setIsOpen(false)
  }

  const handleUploadImage = (imageUrl: string) => {
    onAdd('image', { imageUrl, link: '' })
  }

  return (
    <div ref={outRef} className="fixed top-2 left-1/2 toolbar-wrapper z-auto">
      <button
        type="button"
        name="github"
        className={`p-1 rounded-lg hover:bg-gray-200 ${activeTab === 'github' ? 'bg-gray-200' : ''}`}
        aria-label="github"
        onClick={handleActiveTab}
      >
        <FaGithub size={24} />
      </button>
      <button
        type="button"
        className="p-1 rounded-lg hover:bg-gray-200 active:bg-gray-200"
        aria-label="content"
        onClick={() => {
          onAdd('content', { content: null })
        }}
      >
        <MdOutlineTitle size={24} />
      </button>
      <ImageUploadButton onUpload={handleUploadImage} />

      <button
        type="button"
        name="link"
        className={`p-1 rounded-lg hover:bg-gray-200 ${activeTab === 'link' ? 'bg-gray-200' : ''}`}
        aria-label="link"
        onClick={handleActiveTab}
      >
        <RxLink2 size={24} />
      </button>
      {isOpen && (
        <InputToolbar
          defaultValue=""
          buttonLabel="add-input"
          onAdd={handleAddGithubId}
        />
      )}
    </div>
  )
}

export default Toolbar
