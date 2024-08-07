import React, { useState } from 'react'
import { FaGithub } from 'react-icons/fa6'
import useOutsideClick from '@/hooks/useOutsideClick'
import { AssetType, BreakpointType, ToolType } from '@/types'
import {
  TbEdit,
  TbSlideshow,
  TbDeviceDesktop,
  TbDeviceMobile,
} from 'react-icons/tb'
import ImageUploadButton from '@/components/common/ImageUploadButton'
import InputToolbar from '../InputToolbar'

interface ToolbarProps {
  isMobileMode: boolean
  breakpoint: BreakpointType
  toggleMobileMode: () => void
  onAdd: (name: ToolType, value: AssetType['value']) => void
}

function Toolbar({
  isMobileMode,
  breakpoint,
  toggleMobileMode,
  onAdd,
}: ToolbarProps) {
  const [activeTab, setActiveTab] = useState('')
  const [isOpenInputToolbar, setIsOpenInputToolbar, outRef] =
    useOutsideClick<HTMLDivElement>(() => {
      setActiveTab('')
    })

  const resetToolbar = () => {
    setActiveTab('')
    setIsOpenInputToolbar(false)
  }

  const handleActiveTabAndInput = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsOpenInputToolbar(true)
    setActiveTab((e.currentTarget as HTMLButtonElement).name)
  }

  const handleAddValue = (inputValue: string) => {
    if (activeTab === 'github') {
      onAdd('github', { githubId: inputValue })
    }
    resetToolbar()
  }

  const handleUploadImage = (imageUrl: string) => {
    onAdd('image', {
      imageUrl,
      link: '',
      pos: { md: { x: 50, y: 50 }, lg: { x: 50, y: 50 } },
    })
  }

  return (
    <div
      ref={outRef}
      className={`md:fixed sticky top-2 left-1/2 transform -translate-x-1/2 w-fit shadow-wrapper p-3 flex gap-2 ${isOpenInputToolbar ? 'z-50' : 'z-10'}`}
    >
      <button
        type="button"
        name="github"
        className={`p-1 rounded-lg hover:bg-gray-200 ${activeTab === 'github' ? 'bg-gray-200' : ''}`}
        aria-label="github"
        onClick={handleActiveTabAndInput}
      >
        <FaGithub size={24} />
      </button>
      <button
        type="button"
        className="p-1 rounded-lg hover:bg-gray-200 active:bg-gray-200"
        aria-label="content"
        onClick={() => {
          onAdd('content', { content: '' })
          resetToolbar()
        }}
      >
        <TbEdit size={24} />
      </button>
      <ImageUploadButton onClick={resetToolbar} onUpload={handleUploadImage} />
      <button
        type="button"
        className="p-1 rounded-lg hover:bg-gray-200 active:bg-gray-200"
        aria-label="card"
        onClick={() => {
          onAdd('card', {
            imageUrl: '',
            link: '',
            pos: { md: { x: 50, y: 50 }, lg: { x: 50, y: 50 } },
            title: '',
            description: '',
          })
          resetToolbar()
        }}
      >
        <TbSlideshow size={24} />
      </button>
      {((!isMobileMode && breakpoint === 'lg') ||
        (isMobileMode && breakpoint === 'md')) && (
        <button
          type="button"
          className="p-1 rounded-lg hover:bg-gray-200 active:bg-gray-200"
          aria-label="device"
          onClick={() => {
            toggleMobileMode()
            resetToolbar()
          }}
        >
          {isMobileMode ? (
            <TbDeviceDesktop size={24} />
          ) : (
            <TbDeviceMobile size={24} />
          )}
        </button>
      )}
      {isOpenInputToolbar && (
        <InputToolbar
          buttonLabel="add-input"
          placeholder="github id"
          defaultValue=""
          onAdd={handleAddValue}
        />
      )}
    </div>
  )
}

export default Toolbar
