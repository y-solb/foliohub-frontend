import React, { useRef, useState } from 'react'
import { FaGithub } from 'react-icons/fa'
import { FaCirclePlus } from 'react-icons/fa6'
import { MdOutlineTitle } from 'react-icons/md'
import useOutsideClick from '@/hooks/useOutsideClick'
import { ToolType } from '@/types'
import ImageUploadButton from '../common/ImageUploadButton'

interface ToolbarProps {
  onAdd: (name: ToolType, value?: any) => void
}

function Toolbar({ onAdd }: ToolbarProps) {
  const [activeTab, setActive] = useState('')
  const githubIdRef = useRef<HTMLInputElement | null>(null)

  const [isOpen, setIsOpen, outRef] = useOutsideClick(() => {
    setActive('')
  })

  const handleAddGithubId = () => {
    if (!githubIdRef.current) {
      return
    }
    if (!githubIdRef.current.value) {
      console.log('please press your github id') // TODO: need modal
      return
    }
    onAdd('github', { githubId: githubIdRef.current.value })
    setActive('')
    setIsOpen(false)
  }

  const handleUploadImage = (imageUrl: string) => {
    onAdd('image', { imageUrl, link: '' })
  }

  return (
    <div className="absolute top-5 left-1/2 toolbar-wrapper z-50">
      <ul className="flex gap-2">
        <li>
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
            <div
              ref={outRef}
              className=" absolute -bottom-16 left-0  toolbar-wrapper flex"
            >
              <input
                type="text"
                ref={githubIdRef}
                onKeyUp={(e) => {
                  if (e.key === 'Enter') {
                    handleAddGithubId()
                  }
                }}
              />
              <button
                type="button"
                aria-label="add-github"
                onClick={handleAddGithubId}
              >
                <FaCirclePlus size={24} />
              </button>
            </div>
          )}
        </li>
        <li>
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
        </li>
        <li>
          <ImageUploadButton onUpload={handleUploadImage} />
        </li>
      </ul>
    </div>
  )
}

export default Toolbar
