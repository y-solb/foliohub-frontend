import uploadImage from '@/lib/uploadImage'
import React, { useRef, useState } from 'react'
import { FaGithub } from 'react-icons/fa'
import { FaCirclePlus, FaImage } from 'react-icons/fa6'
import { MdOutlineTitle } from 'react-icons/md'
import useOutsideClick from '@/hooks/useOutsideClick'
import { ToolType } from '@/types'

interface ToolbarProps {
  onAdd: (name: ToolType, value?: any) => void
}

function Toolbar({ onAdd }: ToolbarProps) {
  const [activeTab, setActive] = useState('')
  const githubIdRef = useRef<HTMLInputElement | null>(null)
  const imageRef = useRef<HTMLInputElement | null>(null)

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
      onAdd('image', { imageUrl })
    }
  }

  return (
    <div className="absolute top-5 left-1/2 rounded-2xl border border-solid border-gray-100 shadow-md p-3 bg-white z-50">
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
              className="flex rounded-2xl border border-solid border-gray-100 shadow-md p-3 bg-white absolute -bottom-16 left-0"
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
          <button
            type="button"
            className="p-1 rounded-lg hover:bg-gray-200 active:bg-gray-200"
            aria-label="image"
            onClick={handleClickInputRef}
          >
            <FaImage size={24} />
          </button>
        </li>
      </ul>
      <input
        type="file"
        accept="image/*"
        ref={imageRef}
        className="hidden"
        onChange={handleUploadImage}
      />
    </div>
  )
}

export default Toolbar
