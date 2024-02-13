import React, { useState } from 'react'
import { FaGithub } from 'react-icons/fa'
import { MdOutlineTitle } from 'react-icons/md'
import useOutsideClick from '@/hooks/useOutsideClick'
import { ToolType } from '@/types'
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

  const handleAddGithubId = (inputValue: string) => {
    onAdd('github', { githubId: inputValue })
    setActive('')
    setIsOpen(false)
  }

  const handleUploadImage = (imageUrl: string) => {
    onAdd('image', { imageUrl, link: '' })
  }

  return (
    <div ref={outRef} className="absolute top-5 left-1/2 toolbar-wrapper z-50">
      <button
        type="button"
        name="github"
        className={`p-1 rounded-lg hover:bg-gray-200 ${activeTab === 'github' ? 'bg-gray-200' : ''}`}
        aria-label="github"
        onClick={(e) => {
          setIsOpen(true)
          setActive((e.currentTarget as HTMLButtonElement).name)
        }}
      >
        <FaGithub size={24} />
      </button>
      {isOpen && (
        <InputToolbar
          defaultValue=""
          buttonLabel="add-githubId"
          onAdd={handleAddGithubId}
        />
      )}
      <button
        type="button"
        className="p-1 rounded-lg hover:bg-gray-200 active:bg-gray-200"
        aria-label="content"
        onClick={() => {
          onAdd('content')
        }}
      >
        <MdOutlineTitle size={24} />
      </button>
      <ImageUploadButton onUpload={handleUploadImage} />
    </div>
  )
}

export default Toolbar
